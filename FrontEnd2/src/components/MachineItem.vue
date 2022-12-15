<template>
  <div class="machine-container">
    <div class="machine__Process__list">
      <div class="ImgDiv">
        <div class="ImgDiv__Img">
          <p>img</p>
          <img src="" alt="" />
        </div>
      </div>
      <div class="machine__Process__desc">
        <div class="desc__LineName">
          <div>
            <p>Process type: {{ processData.processType }}</p>
          </div>
        </div>
        <div class="desc__Number">
          <div>
            <p>Count: {{ processData.processCount }}</p>
          </div>
        </div>
        <div class="desc__LifeCycle">
          <div>
            <p>Max Life Cycle: {{ processData.processMax }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachineItem',
  props: {
    processData: Object
  },
  data() {
    return {
      lol: 'lol'
    }
  },
  created() {
    this.checkThis()
  },
  methods: {
    checkThis() {
      console.log('들어오나?')
      console.log(this.processData)
    }
  }
}
</script>

<style scoped>
.machine-container {
  width: 80%;
  height: 80%;
  margin: 7% 10% 5% 10%;
  position: relative;
  border: 1px solid black;
  margin-right: 3%;
}

.machine-container:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.machine__Process__list {
  display: flex;
  height: 100%;
}
.ImgDiv {
  margin: 10% 10% 0 10%;
  width: 20%;
  height: 80%;
}
.ImgDiv__Img {
  margin: 10%;
}
.machine__Process__desc {
  margin: 10% 0 0 3%;
}
</style>
