

import tensorflow as tf
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import datetime
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from keras.models import load_model
import random
import schedule
import time
from application import db

import keras.backend as K

from lib.set_logger.set_logger import logger


random.seed(100)

from models.Model import Model, Model_predict





def remove_col(input_data, col):
    remove_col = input_data.drop(col, axis=1)
    return remove_col

def shift(input_data, look_back, col):
    for s in range(1, look_back+1):
        input_data['shift_{}'.format(s)] = input_data[col].shift(s)
    return input_data

def train_split(input_train, col):
    x_train = input_train.dropna().drop(col, axis=1)
    x_train = x_train.values
    y_train = input_train.dropna()[[col]]
    y_train = y_train.values
    return x_train, y_train

def reshape_lstm(input_data, look_back):
    x_train = input_data.reshape(input_data.shape[0], look_back, 1)
    return x_train

def model_fit(x, y, model, mode):
    history = model.fit(x, y, epochs=200, batch_size=1, verbose=0, shuffle=False)
    model.save('lstm_model_' + mode + '.h5' )
    return history


# In[3]:

def data_preprocessing(data, time_index):

    logger.info('================= data preprocessing ==============')

    # df = pd.read_csv(data, encoding='cp949')
    df = data
    # for i in range(0, len(df)):
    #     print(i)
    #     df[time_index][i] = df[time_index][i][0:19]
    df[time_index] = df[time_index].map(lambda x:x[0:19])

    df[time_index] = pd.to_datetime(df[time_index], format='%Y-%m-%d %H:%M:%S', errors = 'coerce')

    logger.info('================== time_index complete ==================')

    data_min = df.groupby(time_index)
    data_min = data_min.mean()
    date_index = data_min.index
    first_date = str(date_index[0])
    sli_data=data_min[first_date[:10]+' 05:00':first_date[:10]+' 16:00']
    data_30T = sli_data.resample(rule='30min').mean()
    data_30T = data_30T.fillna(method='bfill')

    logger.info('================== data_preprocessing complete ==================')

    return data_30T, first_date


# In[4]:

def data_modeling(input_data, col1, col2, look_back, filename,mode):

    logger.info('================= Data modeling ==============')

    re_col = remove_col(input_data, col2)
    sc = MinMaxScaler()
    train_sc = sc.fit_transform(re_col)
    train_sc=pd.DataFrame(train_sc, columns=[col1], index=re_col.index)
    df_shift = shift(train_sc, look_back, col1)
    x_train, y_train= train_split(df_shift, col1)
    x_train = reshape_lstm(x_train, look_back)

    logger.info('================== Normalization complete ==================')
    LSTM_model = load_model(filename)
    history = model_fit(x_train, y_train, LSTM_model ,mode)
    trainScore = LSTM_model.evaluate(x_train, y_train, batch_size=1, verbose=0)

    logger.info('Train Score: '+str(trainScore))

    logger.info('================== Modeling complete ==================')
    look_ahead = 81
    xhat = x_train[0]
    predic = pd.DataFrame([])
    predictions = np.zeros((look_ahead,1))
    for i in range(look_ahead):
        prediction = LSTM_model.predict(np.array([xhat]), batch_size=1)
        predictions[i] = prediction
        xhat = np.vstack([xhat[1:],prediction])
    final=pd.DataFrame(predictions, columns = ['predict'])
    final = sc.inverse_transform(final)
    final=pd.DataFrame(final, columns = ['predict'])
    logger.info('================== Predict complete ==================')

    return final


# In[5]:

def visualization(first_date, final, col):

    logger.info('================== Visualization ==================')

    dti = pd.date_range(first_date[:10], periods=4)
    index_frame=pd.DataFrame([])
    for i in range(1, len(dti)):
        imp = pd.DataFrame([])
        imp = pd.date_range(dti[i], periods = 48, freq='30T')
        imp = pd.DataFrame(imp[10:37])
        index_frame = pd.concat([index_frame, imp], axis=0)
    index_frame=index_frame[0].apply(lambda x: x.strftime('%Y-%m-%d %H:%M'))
    index_frame=index_frame.reset_index()
    for i in range(0, len(index_frame)):
        index_frame[0][i] = index_frame[0][i][8:]
    result = pd.concat([final, index_frame[:][0]], axis=1)
    result = result.set_index(0)

    # print(result)
    logger.info('================== Make Index complete ==================')

    plt.figure(figsize=(20,10))
    plt.plot(result, 'gs-', label="Predicted value", linewidth=3)
    plt.xticks(fontsize=13, rotation=70)
    plt.yticks(fontsize=15)
    plt.title("Prediction", fontsize=25)
    plt.xlabel('Date', fontsize=15)
    plt.ylabel(col, fontsize=15)
    plt.legend(fontsize=15)
    # plt.savefig('Prediction.jpg', dpi=300)
    plt.show()

    return result


# In[6]:

def main(data, in_col, col1, col2, look_back, model_h5 , mode):
    data_30T, first_date = data_preprocessing(data, in_col)
    final = data_modeling(data_30T, col1, col2, look_back, model_h5, mode)
    result = visualization(first_date, final, col1)
    return result










