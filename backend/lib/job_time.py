import datetime
from lib.lstm_model_new import main

from models.Model import Model, Model_predict
import os

from lib.set_logger.set_logger import logger
from werkzeug.debug import console


def job_leak(is_modify):
    """
    is_modufy: When you need to overwrite inherent data
    """
    # get today time
    # oneday = datetime.timedelta(days=1)
    start_time = str(datetime.date.today() ) + ' 05:00:00'
    stop_time = str(datetime.date.today() ) + ' 18:30:00'

    h5_path = os.path.dirname(__file__)
    h5_path = h5_path + '/lstm_model_LEAKLEVEL.h5'

    # try:
    #     a = Model.query_by_date(start_time, stop_time)
    # except Exception as e:
    #     logger.error(e)
    #     return
    a = Model.query_by_date(start_time, stop_time)
    if a.empty:
        return


    try:
        result = main(data=a,
                      in_col='MEASUREDAY',
                      col1='LEAKLEVEL',  # LEAKLEVEL 측정시 col1과 col2의 값을 바꿔야함
                      col2='FREQUENCY',
                      look_back=4,  # LEAKLEVEL 일 경우 4
                      model_h5=h5_path
                      , mode='LEAKLEVEL')
    except Exception as e:
        Model_predict.commit_db(datetime.date.today(), '', True, "LEAKLEVEL")
        logger.error(e)
    else:
        three_day = [str(item[0]) for item in result.values]
        three_day = ' '.join(three_day)
        if is_modify:
            Model_predict.commit_changes_to_db(datetime.date.today(), three_day, False, "LEAKLEVEL")
        else:
            Model_predict.commit_db(datetime.date.today(), three_day, False, "LEAKLEVEL")
        logger.info("=======Success worked===============")
    # commit result to database


def job_freq(is_modify):
    """
        is_modufy: When you need to overwrite inherent data
    """
    # get today time
    # oneday = datetime.timedelta(days=1)

    start_time = str(datetime.date.today()) + ' 05:00:00'
    stop_time = str(datetime.date.today()) + ' 18:30:00'
    h5_path = os.path.dirname(__file__)
    h5_path = h5_path + '/lstm_model_FREQUENCY.h5'

    # try:
    #     a = Model.query_by_date(start_time, stop_time)
    # except Exception as e:
    #     logger.error(e)
    #     return
    a = Model.query_by_date(start_time, stop_time)
    if a.empty:
        return

    try:
        result = main(data=a,
                      in_col='MEASUREDAY',
                      col1='FREQUENCY',  # LEAKLEVEL 측정시 col1과 col2의 값을 바꿔야함
                      col2='LEAKLEVEL',
                      look_back=12,  # LEAKLEVEL 일 경우 4
                      model_h5=h5_path
                      , mode='FREQUENCY')
    except Exception as e:
        Model_predict.commit_db(datetime.date.today(), '', True, "FREQUENCY")
        logger.error(e)
    else:
        three_day = [str(item[0]) for item in result.values]
        three_day = ' '.join(three_day)
        if is_modify:
            Model_predict.commit_changes_to_db(datetime.date.today(), three_day, False, "FREQUENCY")
        else:
            Model_predict.commit_db(datetime.date.today(), three_day, False, "FREQUENCY")
        logger.info("=======Success worked===============")


# if __name__ == '__main__':
    # job_freq(False)
    # oneday = datetime.timedelta(days=1)
    # start_time = str(datetime.date.today() - oneday) + ' 05:00:00'
    # stop_time = str(datetime.date.today() - oneday) + ' 18:30:00'
    # a = Model.query_by_date(start_time,stop_time)



