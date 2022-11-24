# coding: utf-8
import datetime
import logging

from sqlalchemy import Column, Float, Index, String, Table
from sqlalchemy.schema import FetchedValue
from application import db
import pandas as pd

from lib.set_logger.set_logger import logger
from werkzeug.debug import console


class Model(db.Model):
    __tablename__ = "t_equip_data_continuous"
    __table_args__ = {'extend_existing': True}

    mc_id = db.Column('MC_ID', db.String(64),primary_key=True)
    d00 = db.Column('D00', db.Float,primary_key=True)
    d01 = db.Column('D01', db.Float)
    d02 = db.Column('D02', db.Float)
    d03 = db.Column('D03', db.Float)
    d04 = db.Column('D04', db.Float)
    d05 = db.Column('D05', db.Float)
    d06 = db.Column('D06', db.Float)
    d07 = db.Column('D07', db.Float)
    d08 = db.Column('D08', db.Float)
    d09 = db.Column('D09', db.Float)
    d10 = db.Column('D10', db.Float)
    d11 = db.Column('D11', db.Float)
    d12 = db.Column('D12', db.Float)
    d13 = db.Column('D13', db.Float)
    d14 = db.Column('D14', db.Float)
    d15 = db.Column('D15', db.Float)
    d16 = db.Column('D16', db.Float)
    d17 = db.Column('D17', db.Float)
    d18 = db.Column('D18', db.Float)
    d19 = db.Column('D19', db.Float)
    dt = db.Column('DT', db.String(40),primary_key=True)
    updated = db.Column('UPDATED', db.String(1), server_default=db.FetchedValue())

    @staticmethod
    def query_by_date(start_date,end_date):

        try:
            data = Model.query.filter(Model.dt.between(start_date,  end_date),Model.mc_id == 'H_MC_01_INV').with_entities(Model.d01,
                                                                                   Model.d07,Model.dt).all()
        except Exception as e:
            logger.error("error in query from db===" + str(e))
            db.session.rollback()
            data = pd.DataFrame([])
        else:
            # 周末没数据
            try:
                data = pd.DataFrame(data)
                data.columns = ['FREQUENCY', 'LEAKLEVEL', 'MEASUREDAY']
            except Exception as e:
                logger.error('Error while transform data to dataframe' + str(e))
                # 返回一个空的数据帧以供判断
                data = pd.DataFrame([])
        finally:
            db.session.close()

        # drop 0 from dataframe
        # data = data.drop(data[(data['FREQUENCY'] == 0 )| (data['LEAKLEVEL'] == 0)].index)

        return data

class Model_predict(db.Model):
    __tablename__ = "model_predict"

    date = db.Column('date', db.String(255),primary_key=True)

    is_missing = db.Column('is_missing', db.Boolean)

    type = db.Column('type', db.String(64),primary_key=True)

    three_day = db.Column('three_day', db.Text())

    @staticmethod
    def get_data(date,type):
        model = Model_predict.query.filter_by(date = date,type = type).first()

        return model.three_day

    @staticmethod
    def check_data(date,type):
        model = Model_predict.query.filter_by(date = date,type = type).first()
        return model.is_missing


    @staticmethod
    def commit_db(date, data, is_missing, type):
        """
        commit result to db
        date: today
        data: future three day's predict
        is_missing: if error in process
        type: leaklevel or frequence
        """
        model = Model_predict()
        model.date = str(date)
        model.three_day = data
        model.is_missing = is_missing
        model.type = type
        # open a session to commit
        try:
            db.session.add(model)
            db.session.commit()
        except Exception as error:
            logger.error("error in commit to db===" + str(error))
            logger.info("==== Now start rollback =====")
            db.session.rollback()

        else:
            logger.info("=========success commit data to db==============")
        finally:
            db.session.close()

    @staticmethod
    def commit_changes_to_db(date, data, is_missing, type):
        """
        commit changes to db, just modify
        """
        model = Model_predict.query.filter_by(date=date, type=type).first()
        model.is_missing = is_missing
        model.three_day = data

        try:
            db.session.add(model)
            db.session.commit()
        except Exception as error:
            logger.error("error in commit to db===" + str(error))
            logger.info("==== Now start rollback =====")
            db.session.rollback()

        else:
            logger.info("=========success commit data to db==============")
        finally:
            db.session.close()





# db.create_all()






