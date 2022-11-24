<template>
  <div class="about">
    <h1>This is an log page</h1>

    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-card class="box-card">
          <p v-for="(item,index) in data" :key="index" >
              {{item}}
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Log',
  data () {
    return {
      data: ''
    }
  },
  beforeCreate () {
    this.$axios({
      method: 'get',
      url: '/api/log'
    }).then(res => {
      this.data = res.data.data.log
    })
  }

}

</script>
