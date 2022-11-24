import configparser

from flask import Blueprint, request

from lib.check_threshold import check_threshold
from lib.return_data_helper import return_JSON
from models.Model import Model_predict
import numpy as np
import os

api = Blueprint("api", __name__)


@api.route('/', methods=["POST"], endpoint='index')
def index():
    """
    @:param:
    String date

    :return:
    图表
    """
    req = request.get_json(silent=True)
    date = req['date']

    try:
        res_1 = Model_predict.get_data(date, 'LEAKLEVEL')
        res_2 = Model_predict.get_data(date, 'FREQUENCY')
    except Exception as e:
        return return_JSON(502, 'cannot get data from db')
    else:
        leak = res_1.split(' ')
        if len(leak) <= 5:
            leak_static = [0, 0, 0, 0, 0]
        else:
            leak = [round(float(x), 2) for x in leak]
            sorted_leak = sorted(leak)
            leak_static = [min(leak), np.quantile(sorted_leak, 0.25, interpolation='lower'), np.median(sorted_leak),
                           round(np.mean(leak), 2), np.quantile(sorted_leak, 0.75, interpolation='higher'), max(leak)]

        freq = res_2.split(' ')
        if len(freq) <= 5:
            freq_static = [0, 0, 0, 0, 0]
        else:
            freq = [round(float(x), 2) for x in freq]
            sorted_freq = sorted(freq)
            freq_static = [min(freq), np.quantile(sorted_freq, 0.25, interpolation='lower'), np.median(sorted_freq),
                           round(np.mean(freq), 2), np.quantile(sorted_freq, 0.75, interpolation='higher'), max(freq)]

        path = os.path.dirname(__file__)
        config_path = path + '/../config/threshold.ini'
        config = configparser.ConfigParser()
        config.read(config_path)

        return return_JSON(200, 'success', data={'leaklevel': leak, 'frequency': freq, 'leak_static': leak_static,
                                                 'freq_static': freq_static,
                                                 'leaklevel_threshold': int(config['DEFAULT']['LEAKLEVEL'])
            , 'frequency_threshold': int(config['DEFAULT']['FREQUENCY'])})


@api.route('/log', methods=['GET'])
def get_log():
    with open('./lib/log/new.log', 'r') as f:
        log = f.readlines()[-150:]
    return return_JSON(200, 'Successfully get log', {'log': log})


@api.route('/edit_threshold', methods=['POST'], endpoint='edit_threshold')
def edit_threshold():
    req = request.get_json(silent=True)
    frequency: int = req['frequency']
    leaklevel: int = req['leaklevel']
    if check_threshold(frequency) and check_threshold(leaklevel):
        path = os.path.dirname(__file__)
        config_path = path + '/../config/threshold.ini'
        config = configparser.ConfigParser()
        config.read(config_path)
        with open(config_path, 'w') as f:
            config['DEFAULT']['FREQUENCY'] = str(frequency)
            config['DEFAULT']['LEAKLEVEL'] = str(leaklevel)
            config.write(f)
        return return_JSON(200, 'success', data={'leaklevel_threshold': int(config['DEFAULT']['LEAKLEVEL'])
            , 'frequency_threshold': int(config['DEFAULT']['FREQUENCY'])})
    else:
        return return_JSON(403, 'Failed to edit threshold , Please check your input')
