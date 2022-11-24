// eslint-disable-next-line camelcase
function make_leaklevel_charts (data) {
  var echarts = require('echarts')
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('leaklevel'))
  var minData = Math.min(...data) - 0.1
  // console.log(minData)
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'LeakLevel: Three Day Prediction'
    },
    tooltip: { trigger: 'axis' },
    legend: {

      data: ['Leak level']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Day-1-05:00', 'Day-1-05:30', 'Day-1-06:00', 'Day-1-06:30', 'Day-1-07:00', 'Day-1-07:30', 'Day-1-08:00', 'Day-1-08:30', 'Day-1-09:00', 'Day-1-09:30', 'Day-1-10:00', 'Day-1-10:30', 'Day-1-11:00', 'Day-1-11:30', 'Day-1-12:00', 'Day-1-12:30', 'Day-1-13:00', 'Day-1-13:30', 'Day-1-14:00', 'Day-1-14:30', 'Day-1-15:00', 'Day-1-15:30', 'Day-1-16:00', 'Day-1-16:30', 'Day-1-17:00', 'Day-1-17:30', 'Day-1-18:00',
        'Day-2-05:00', 'Day-2-05:30', 'Day-2-06:00', 'Day-2-06:30', 'Day-2-07:00', 'Day-2-07:30', 'Day-2-08:00', 'Day-2-08:30', 'Day-2-09:00', 'Day-2-09:30', 'Day-2-10:00', 'Day-2-10:30', 'Day-2-11:00', 'Day-2-11:30', 'Day-2-12:00', 'Day-2-12:30', 'Day-2-13:00', 'Day-2-13:30', 'Day-2-14:00', 'Day-2-14:30', 'Day-2-15:00', 'Day-2-15:30', 'Day-2-16:00', 'Day-2-16:30', 'Day-2-17:00', 'Day-2-17:30', 'Day-2-18:00',
        'Day-3-05:00', 'Day-3-05:30', 'Day-3-06:00', 'Day-3-06:30', 'Day-3-07:00', 'Day-3-07:30', 'Day-3-08:00', 'Day-3-08:30', 'Day-3-09:00', 'Day-3-09:30', 'Day-3-10:00', 'Day-3-10:30', 'Day-3-11:00', 'Day-3-11:30', 'Day-3-12:00', 'Day-3-12:30', 'Day-3-13:00', 'Day-3-13:30', 'Day-3-14:00', 'Day-3-14:30', 'Day-3-15:00', 'Day-3-15:30', 'Day-3-16:00', 'Day-3-16:30', 'Day-3-17:00', 'Day-3-17:30', 'Day-3-18:00'],
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      min: minData.toFixed(1)

    },
    series: [{
      name: 'Leak level',
      type: 'line',
      data: data
    }]
  })
}

// eslint-disable-next-line camelcase
function make_leaklevel_histogram_charts (data) {
  var echarts = require('echarts')
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('leaklevel_histogram'))
  var minData = Math.min(...data) - 0.1
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'Leaklevel Histogram'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['min', 'Q1', 'median', 'mean', 'Q3', 'max']
    },
    yAxis: {
      type: 'value',
      min: minData.toFixed(1)

    },
    series: [{
      name: 'Leak level',
      type: 'bar',
      barWidth: 30,
      data: data,
      itemStyle: {
        normal: {
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: 'black',
              fontSize: 16
            }
          }
        }
      }
    }]
  })
}

// eslint-disable-next-line camelcase
function make_frequency_histogram_charts (data) {
  var echarts = require('echarts')
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('frequency_histogram'))
  var minData = Math.min(...data) - 0.1
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'Frequency Histogram'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['min', 'Q1', 'median', 'mean', 'Q3', 'max']
    },
    yAxis: {
      type: 'value',
      min: minData.toFixed(1)

    },
    series: [{
      name: 'Frequency level',
      type: 'bar',
      barWidth: 30,
      data: data,
      itemStyle: {
        normal: {
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: 'black',
              fontSize: 16
            }
          }
        }
      }
    }]
  })
}

// eslint-disable-next-line camelcase
function make_frequency_charts (data) {
  var echarts = require('echarts')
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('frequency'))
  var minData = Math.min(...data) - 0.1
  // console.log(minData)
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'Frequency: Three Day Prediction'
    },
    tooltip: { trigger: 'axis' },
    legend: {

      data: ['Frequency']
    },
    xAxis: {

      // 斜体处理，附加日期
      // Day-1-05:00
      type: 'category',
      boundaryGap: false,
      data: ['Day-1-05:00', 'Day-1-05:30', 'Day-1-06:00', 'Day-1-06:30', 'Day-1-07:00', 'Day-1-07:30', 'Day-1-08:00', 'Day-1-08:30', 'Day-1-09:00', 'Day-1-09:30', 'Day-1-10:00', 'Day-1-10:30', 'Day-1-11:00', 'Day-1-11:30', 'Day-1-12:00', 'Day-1-12:30', 'Day-1-13:00', 'Day-1-13:30', 'Day-1-14:00', 'Day-1-14:30', 'Day-1-15:00', 'Day-1-15:30', 'Day-1-16:00', 'Day-1-16:30', 'Day-1-17:00', 'Day-1-17:30', 'Day-1-18:00',
        'Day-2-05:00', 'Day-2-05:30', 'Day-2-06:00', 'Day-2-06:30', 'Day-2-07:00', 'Day-2-07:30', 'Day-2-08:00', 'Day-2-08:30', 'Day-2-09:00', 'Day-2-09:30', 'Day-2-10:00', 'Day-2-10:30', 'Day-2-11:00', 'Day-2-11:30', 'Day-2-12:00', 'Day-2-12:30', 'Day-2-13:00', 'Day-2-13:30', 'Day-2-14:00', 'Day-2-14:30', 'Day-2-15:00', 'Day-2-15:30', 'Day-2-16:00', 'Day-2-16:30', 'Day-2-17:00', 'Day-2-17:30', 'Day-2-18:00',
        'Day-3-05:00', 'Day-3-05:30', 'Day-3-06:00', 'Day-3-06:30', 'Day-3-07:00', 'Day-3-07:30', 'Day-3-08:00', 'Day-3-08:30', 'Day-3-09:00', 'Day-3-09:30', 'Day-3-10:00', 'Day-3-10:30', 'Day-3-11:00', 'Day-3-11:30', 'Day-3-12:00', 'Day-3-12:30', 'Day-3-13:00', 'Day-3-13:30', 'Day-3-14:00', 'Day-3-14:30', 'Day-3-15:00', 'Day-3-15:30', 'Day-3-16:00', 'Day-3-16:30', 'Day-3-17:00', 'Day-3-17:30', 'Day-3-18:00'],
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      min: minData.toFixed(1)

    },
    series: [{
      name: 'Frequency',
      type: 'line',
      data: data
    }]
  })
}
export {
  // eslint-disable-next-line camelcase
  make_leaklevel_charts,
  // eslint-disable-next-line camelcase
  make_frequency_charts,
  // eslint-disable-next-line camelcase
  make_leaklevel_histogram_charts,
  // eslint-disable-next-line camelcase
  make_frequency_histogram_charts
}

// 통계 수치
// min q1 median average(mean) q3 max

// log

// frequency 325 first time
// leaklevel 12 time
