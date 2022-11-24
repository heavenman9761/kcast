<template>
  <div class="home">
    <el-row type="flex" justify="center">
      <el-col>
            <el-date-picker
      v-model="date"
      align="right"
      type="date"
      placeholder="Select Basic Date"
      :picker-options="pickerOptions">
    </el-date-picker>
        <el-button @click="get_charts">Get charts!</el-button>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input_Leaklevel" placeholder="Leaklevel Threshold" type="number" maxlength="7">
          <template slot="prepend">Leaklevel Threshold</template>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model="input_Frequency" placeholder="Frequency Threshold" type="number" maxlength="7">
          <template slot="prepend">Frequency Threshold</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="edit_threshold">Edit Threshold</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <el-row type="flex" justify="center">
      <el-col :span="16">
        <div id="frequency" style="height: 400px; width: 100%"></div>
      </el-col>
      <el-col :span="8">
        <div id="frequency_histogram" style="height: 400px; width: 100%"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <div id="leaklevel" style="height: 400px; width: 100%"></div>
      </el-col>
      <el-col :span="8">
        <div id="leaklevel_histogram" style="height: 400px; width: 100%"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line camelcase
import { make_leaklevel_charts, make_frequency_charts, make_leaklevel_histogram_charts, make_frequency_histogram_charts } from '../lib/echarts'
const d = new Date()
const year = d.getFullYear()
const month = d.getMonth()
const day = d.getDate() - 1
const yesterday = new Date(year, month, day)
export default {
  name: 'Home',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      date: yesterday,
      input_Leaklevel: '',
      input_Frequency: ''
    }
  },
  methods: {
    get_charts () {
      if (this.date === '' || this.date === null) {
        this.$message.error('You need select date!')
      } else {
        // manage date to 'xxxx-xx-xx'
        var year = this.date.getFullYear()
        var month = this.date.getMonth() + 1
        var day = this.date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        var nowDate = year + '-' + month + '-' + day
        this.$axios({
          method: 'post',
          url: '/api/',
          data: {
            date: nowDate
          }
        }).then(async res => {
          if (res.data.code === 200) {
            this.$message({
              message: 'Successfully get data!',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            // console.log(res.data.data.leaklevel)
            this.input_Leaklevel = res.data.data.leaklevel_threshold
            this.input_Frequency = res.data.data.frequency_threshold
            make_frequency_charts(res.data.data.frequency)
            make_leaklevel_charts(res.data.data.leaklevel)
            make_frequency_histogram_charts(res.data.data.freq_static)
            make_leaklevel_histogram_charts(res.data.data.leak_static)
            // console.log(Math.max(...res.data.data.leaklevel) > 10)
            if (Math.max(...res.data.data.leaklevel) >= res.data.data.leaklevel_threshold) {
              await this.$notify({
                title: 'Warning',
                message: 'Leak Level exceeds the alert number(' + res.data.data.leaklevel_threshold + ')! It is ' + Math.max(...res.data.data.leaklevel),
                type: 'warning',
                duration: 0
              })
            }
            if (Math.max(...res.data.data.frequency) > res.data.data.frequency_threshold) {
              console.log('Math.max(...res.data.data.frequency) : ' + Math.max(...res.data.data.frequency))
              console.log('res.data.data.frequency_threshold : ' + res.data.data.frequency_threshold)
              // eslint-disable-next-line no-implied-eval
              // console.log(' freq is running')
              await this.$notify({
                title: 'Warning',
                message: 'Frequency exceeds the alert number(' + res.data.data.frequency_threshold + ')! It is ' + Math.max(...res.data.data.frequency),
                type: 'warning',
                duration: 0
              })
            }
          } else {
            this.$message.error('Unable get data == ' + res.data.msg)
          }
        })
      }
    },
    edit_threshold () {
      if (this.input_Leaklevel === '' || this.input_Frequency === '') {
        this.$notify.error({
          title: 'Warning',
          message: 'Please input leaklevel threshold and frequency threshold!',
          duration: 2000
        })
      } else {
        this.$axios({
          method: 'post',
          url: '/api/edit_threshold',
          data: {
            frequency: parseFloat(this.input_Frequency),
            leaklevel: parseFloat(this.input_Leaklevel)
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: 'Successfully edit threshold! Please refresh the page',
              type: 'success',
              showClose: true,
              duration: 2000
            })
          } else {
            this.$message({
              message: 'Failed to edit threshold!Please check your input',
              type: 'error',
              showClose: true,
              duration: 2000
            })
          }
        })
      }
    }
  },
  mounted () {
    this.get_charts()
  }
}
</script>
