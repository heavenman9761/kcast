# coding: utf-8

# In[1]:

import tensorflow as tf
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error, mean_squared_log_error
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import SimpleRNN
from keras.layers import LSTM
from keras.layers import Bidirectional
from keras.models import load_model
import random

import keras.backend as K
from keras.callbacks import EarlyStopping

np.random.seed(100)


# In[2]:

def timeindex(frame, index_col):
    frame[index_col] = pd.to_datetime(frame[index_col], format='%Y-%m-%d %H:%M:%S', errors='coerce')
    min = frame.groupby(index_col)
    min = min.mean()
    return min


# timeindex를 정의하는 함수
# MEASUREDAT를 timeindex로 설정하고 1분단위로 측정치를 묶어 평균값을 구한 뒤 반환

def ch_col(frame, col):
    ch_df = frame.drop(col, axis=1)
    return ch_df


# 예측에 필요없는 칼럼을 제외함

def shift(ts, frame, col1, col2):
    for s in range(1, ts + 1):
        frame['shift_{}'.format(s)] = frame[col1].shift(s)
    for s in range(1, ts + 1):
        frame['shift2_{}'.format(s)] = frame[col2].shift(s)
    return frame


# 정해진 시간간격 ts만큼 shift 시킴

def split_data(time, frame):
    split1 = frame.loc[:time, ]
    split2 = frame.loc[time:, ]
    return split1, split2


# 학습에 활용할 시계열 데이터와 테스트를 할 시계열 데이터를 특정 기점 기준으로 나눔

def train_test(frame1, frame2, col):
    x_train = frame1.dropna().drop(col, axis=1)
    x_train = x_train.values
    y_train = frame1.dropna()[[col]]
    y_train = y_train.values

    x_test = frame2.dropna().drop(col, axis=1)
    x_test = x_test.values
    y_test = frame2.dropna()[[col]]
    y_test = y_test.values
    return x_train, y_train, x_test, y_test


# train과 test 셋을 학습에 적합한 형태로 변경함

def reshape_lstm(frame1, frame2, ts, a):
    x_frame1_t = frame1.reshape(frame1.shape[0], ts, a)
    x_frame2_t = frame2.reshape(frame2.shape[0], ts, a)
    return x_frame1_t, x_frame2_t


# lstm 모델에 넣기위해 데이터 형태 변환

def LSTM_m(node, ts, a):
    LSTM_model = Sequential()
    LSTM_model.add(LSTM(node, input_shape=(ts, a)))
    LSTM_model.add(Dense(1, activation='linear'))
    LSTM_model.compile(loss='mean_squared_error', optimizer='adam')
    LSTM_model.summary()
    return LSTM_model


# lstm 모델 정의

def model_fit(x, y, model):
    early_stop = EarlyStopping(monitor='loss', patience=1, verbose=1)
    history = model.fit(x, y, epochs=200, batch_size=300, verbose=1, callbacks=[early_stop], shuffle=False)
    # model.save('lstm_model.h5')
    # history = model.fit(x, y, epochs=50, batch_size=300, verbose=1, shuffle=False) #early_stop을 하지 않을 경우 활용
    return history


# train set을 이용해 학습 진행

def model_pred(x, model):
    pred = model.predict(x[:, :])
    return pred


# 학습 예측값 리턴

def estimate(real_y, pred_y):
    MAE = mean_absolute_error(real_y, pred_y)
    RMSE = mean_squared_error(real_y, pred_y) ** 0.5
    return MAE, RMSE


# 결과에 대한 MAE와 RMSE의 차이를 도출함


# In[3]:

def test_predict(data, ts, node, col1, col2, index_col, split_time):
    print('예측 변수', col1)
    data_min = timeindex(data, index_col)
    sc = MinMaxScaler()
    sc2 = MinMaxScaler()
    #     df1 = ch_col(data_min, col2)
    #     train_sc = sc.fit_transform(df1)
    df1 = ch_col(data_min, col2)
    final_sc = sc.fit_transform(df1)
    train_sc = sc2.fit_transform(data_min)

    df_sc = pd.DataFrame(train_sc, columns=[col1, col2], index=data_min.index)
    df_shift = shift(ts, df_sc, col1, col2)
    df_shift = ch_col(df_shift, col2)
    train, test = split_data(split_time, df_shift)
    x_train, y_train, x_test, y_test = train_test(train, test, col=col1)
    x_train_t, x_test_t = reshape_lstm(x_train, x_test, ts, 2)
    LSTM_model = LSTM_m(node, ts, 2)
    history = model_fit(x_train_t, y_train, LSTM_model)
    pred_y = model_pred(x_test_t, LSTM_model)
    pred_y = sc.inverse_transform(pred_y)
    real_y = sc.inverse_transform(y_test)

    return pred_y, real_y, test.index


# 전체 모델 실행 및 예측 값 리턴

def score(r_y, p_y, index_test):
    LSTM_MAE, LSTM_RMSE = estimate(r_y, p_y)
    print('OUTPUT')
    print('mae = ', LSTM_MAE)
    print('rmse = ', LSTM_RMSE)

    pred_result = pd.DataFrame(p_y, columns=['predict'], index=index_test)
    pred_real = pd.DataFrame(r_y, columns=['real'], index=index_test)

    plt.figure(figsize=(20, 7))
    plt.plot(pred_result, '-', label="predict")
    plt.plot(pred_real, '-', label="real")
    plt.legend()
    plt.title("Compared")
    plt.show()


# 리턴된 예측 값을 활용해, 최종 그래프 및 오차율 생성


# In[4]:

def main(data, node, col1, col2, ts, index, split_time):
    p_y, r_y, index_test = test_predict(data, ts, node, col1, col2, index, split_time)
    score(r_y, p_y, index_test)


# In[15]:

if __name__ == "__main__":
    main(data=pd.read_csv("june_2.csv", encoding='cp949'), node=1200, col2='FREQUENCY', col1='LEAKLEVEL', ts=16,
         index='MEASUREDAY', split_time='2020-06-09 00:00')

# data = pd.read_csv("F:/work_0717/june.csv", encoding='cp949')
# input data 설정

# node = 800
# 학습 노드 갯수 수정


# col1 = 'FREQUENCY'
# col2 = 'LEAKLEVEL'
# col1은 학습에 사용될 변수
# col2는 학습에서 사용하지 않을 변수

# ts = 16
# Timeshift 간격 조정

# index = 'MEASUREDAY'
# index로 활용할 변수

# split_time = '2020-06-09 00:00'
# train / test를 나눌 때 분기점


# In[ ]:
