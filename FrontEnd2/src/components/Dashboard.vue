<template>
  <!-- <div id="app"> -->
  <!-- MAIN SECTION CONTAINING ALL CONTENT SECTIONS -->
  <main id="section-root-container">
    <div>
      <div>
        <!-- FANS -->
        <section id="section-fan" class="section-main">
          <div class="section-main-header">
            <h3>Daily Output</h3>
          </div>

          <div class="section-main-content fan-content">
            <a href="#" class="content-block fan-content-block">
              <div :class="[output.fanAction === true ? 'fan-image' : 'fan_stopimg']"></div>
              <div class="blocktitle">TOTAL</div>
              <div class="blockvalue">{{ dailyProductivity.dailyTotal + output.total }} <span>qty</span></div>
            </a>
            <a href="#" class="content-block fan-content-block">
              <div :class="[output.fanAction === true ? 'fan-image' : 'fan_stopimg']"></div>
              <div class="blocktitle">GOODSET</div>
              <div class="blockvalue">{{ dailyProductivity.dailyGoodSet + output.goodSet }} <span>qty</span></div>
            </a>
            <a href="#" class="content-block fan-content-block">
              <div :class="[output.fanAction === true ? 'fan-image' : 'fan_stopimg']"></div>
              <div class="blocktitle">FAILURE</div>
              <div class="blockvalue">{{ dailyProductivity.dailyFailure + output.failure }} <span>qty</span></div>
            </a>
          </div>
          <!-- fan-content -->
        </section>
      </div>

      <div>
        <!-- FULL SINGLE SECTIONS -->

        <section id="section-single-frequency" class="section-single">
          <div class="section-main-header">
            <h3>Process Life Cycle</h3>
          </div>

          <div class="section-main-content frequency-content">
            <!-- battery img -->
            <div class="battery-background">
              <div class="battery-item" style="display: flex">
                <div class="battery">
                  <div class="battery_subTitle">
                    <h3 class="blocktitle">No.1</h3>
                  </div>
                  <div id="batery--container">
                    <div id="batery--container-body">
                      <span
                        :class="{
                          'batery--loadG': num1Color === 'Green',
                          'batery--loadY': num1Color === 'Yellow',
                          'batery--loadR': num1Color === 'Red'
                        }"
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="battery">
                  <div class="battery_subTitle">
                    <h3 class="blocktitle">No.2</h3>
                  </div>
                  <div id="batery--container">
                    <div id="batery--container-body">
                      <span
                        :class="{
                          'batery--loadG': num2Color === 'Green',
                          'batery--loadY': num2Color === 'Yellow',
                          'batery--loadR': num2Color === 'Red'
                        }"
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="battery">
                  <div class="battery_subTitle">
                    <h3 class="blocktitle">No.3</h3>
                  </div>
                  <div id="batery--container">
                    <div id="batery--container-body">
                      <span
                        :class="{
                          'batery--loadG': num3Color === 'Green',
                          'batery--loadY': num3Color === 'Yellow',
                          'batery--loadR': num3Color === 'Red'
                        }"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="frequency-single-content">
              <div class="frequency-single-histogram">
                <!-- count -->
                <div class="frequency-single-info">
                  <div class="full-txtBlock">
                    <div class="blocktitle">Process 1</div>
                    <div class="blockvalue">{{ cycleCount.process1 + output.process1Count }} <span>count</span></div>
                  </div>
                  <div class="full-txtBlock">
                    <div class="blocktitle">Process 2</div>
                    <div class="blockvalue">{{ cycleCount.process2 + output.process2Count }} <span>count</span></div>
                  </div>
                  <div class="full-txtBlock">
                    <div class="blocktitle">Process 3</div>
                    <div class="blockvalue">{{ cycleCount.process3 + output.process3Count }} <span>count</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- MAIN SECTION CONTAINING ALL CONTENT SECTIONS -->
  </main>
  <!-- </div> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  props: {
    output: Object
  },
  data() {
    return {
      data: false,
      fanstatus: false,
      BatteryColor: 'Green',
      num1Color: null,
      num2Color: null,
      num3Color: null,
      process1Count: 0,
      process2Count: 0,
      process3Count: 0
      // num1MaxCycle:this.cycleCount.process1Max,
    }
  },
  computed: {
    ...mapState('Monitoring', {
      dailyProductivity: 'dailyProductivity',
      cycleCount: 'cycleCount'
      // assignedUser: 'assignedUser'
    })
  },
  mounted() {
    this.computedColor()
  },
  methods: {
    computedColor() {
      console.log('데이터 : ', this.cycleCount)
      const process1Max = this.cycleCount.process1Max || 0
      const process2Max = this.cycleCount.process2Max || 0
      const process3Max = this.cycleCount.process3Max || 0

      this.output.process1Count = this.process1Count
      this.output.process2Count = this.process2Count
      this.output.process3Count = this.process3Count

      console.log(`1호기맥스:${process1Max} 2호기맥스: ${process2Max} 3호기맥스: ${process3Max}`)
      const num1status = ((this.cycleCount.process1 + this.process1Count) / process1Max) * 100
      const num2status = ((this.cycleCount.process2 + this.process2Count) / process2Max) * 100
      const num3status = ((this.cycleCount.process3 + this.process3Count) / process3Max) * 100

      console.log(`1호기:${num1status} 2호기: ${num2status} 3호기: ${num3status}`)

      if (num1status >= 90) {
        this.num1Color = 'Green'
      } else if (num1status < 90 && num1status > 20) {
        this.num1Color = 'Yellow'
      } else {
        this.num1Color = 'Red'
      }

      if (num2status >= 50) {
        this.num2Color = 'Green'
      } else if (num2status < 50 && num2status > 20) {
        this.num2Color = 'Yellow'
      } else {
        this.num2Color = 'Red'
      }

      if (num3status >= 50) {
        this.num3Color = 'Green'
      } else if (num3status < 50 && num3status > 20) {
        this.num3Color = 'Yellow'
      } else {
        this.num3Color = 'Red'
      }
    }
  }
}
</script>
<style scoped>
body {
  line-height: 1.5;
  min-height: 100%;
  background: #28282e;
}

* {
  box-sizing: border-box;
  font-family: 'Roboto', 'Helvetica Neue';
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
}

a {
  text-decoration: none;
}

#app {
  width: 90%;
  max-width: 1000px;
  height: 100%;
  margin: 15px auto 30px auto;
  padding: 5px 15px 15px 15px;
  background-color: #121212;
  border-radius: 7px;
  box-shadow: 0px 0px 6px 4px #222;
}

#section-root-container {
  overflow: hidden;
  position: relative;
  background-color: #121212;
  margin: 15% 5% 0 0;
}

.section-main,
.section-expanded,
.section-single {
  width: 100%;
  display: inline-block;
  position: relative;
  visibility: visible;
  background-color: #212121;
  transition: opacity 0.3s, transform 0.3s;
  border-radius: 5px;
}
.section-main .section-main-header,
.section-expanded .section-main-header,
.section-single .section-main-header {
  text-align: left;
  width: 100%;
  height: 30px;
  padding: 5px 5px 5px 12px;
}
.section-main .section-main-header h3,
.section-expanded .section-main-header h3,
.section-single .section-main-header h3 {
  font-size: 0.85rem;
  color: #2c97de;
  text-transform: uppercase;
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  display: inline-block;
  margin: 0;
}
.section-main .section-main-header .options-wrapper,
.section-expanded .section-main-header .options-wrapper,
.section-single .section-main-header .options-wrapper {
  float: right;
  position: relative;
}
.section-main .section-main-header .options-wrapper .options-btn,
.section-expanded .section-main-header .options-wrapper .options-btn,
.section-single .section-main-header .options-wrapper .options-btn {
  background: #212121;
  height: 22px;
  width: 22px;
  color: #666;
  text-align: center;
  padding: 0;
  font-size: 0.9em;
  border: 0;
  border-radius: 4px;
  transition: background-color 0.1s;
}
.section-main .section-main-header .options-wrapper .options-content,
.section-expanded .section-main-header .options-wrapper .options-content,
.section-single .section-main-header .options-wrapper .options-content {
  z-index: 1;
  display: none;
  overflow: auto;
  position: absolute;
  right: 0;
  min-width: 160px;
  background-color: #2d2d2d;
  border: solid 2px #434343;
  box-shadow: 0px 8px 16px 0px #121212;
}
.section-main .section-main-header .options-wrapper .options-content button,
.section-expanded .section-main-header .options-wrapper .options-content button,
.section-single .section-main-header .options-wrapper .options-content button {
  width: 100%;
  display: block;
  outline: none;
  border: 0;
  padding: 8px 12px;
  font-size: 0.8em;
  text-align: left;
  letter-spacing: 1px;
  color: #ddd;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
  text-decoration: none;
  background-color: #2d2d2d;
  transition: background-color 0.08s;
}
.section-main .section-main-header .options-wrapper .options-content button i,
.section-expanded .section-main-header .options-wrapper .options-content button i,
.section-single .section-main-header .options-wrapper .options-content button i {
  margin-right: 8px;
}
.section-main .section-main-header .options-wrapper .options-content button:hover,
.section-expanded .section-main-header .options-wrapper .options-content button:hover,
.section-single .section-main-header .options-wrapper .options-content button:hover {
  cursor: pointer;
  background-color: #212121;
}
.section-main .section-main-header .options-wrapper:hover .options-btn,
.section-expanded .section-main-header .options-wrapper:hover .options-btn,
.section-single .section-main-header .options-wrapper:hover .options-btn {
  cursor: pointer;
  background-color: #434343;
  color: #ddd;
}
.section-main .section-main-header .options-wrapper:hover .options-content,
.section-expanded .section-main-header .options-wrapper:hover .options-content,
.section-single .section-main-header .options-wrapper:hover .options-content {
  display: block;
}
.section-main.section-single .section-main-header,
.section-expanded.section-single .section-main-header,
.section-single.section-single .section-main-header {
  padding: 6px 5px 5px 12px;
}

.section-main-content {
  width: 100%;
  color: #ddd;
}
.section-main-content .content-block {
  float: left;
  overflow: auto;
  color: #ddd;
  opacity: 0.8;
  transition: opacity 0.08s, background 0.08s;
}
.section-main-content .content-block:hover {
  opacity: 1;
  text-decoration: none;
  color: inherit;
  background-color: rgba(200, 200, 255, 0.025);
}
.section-main-content .content-block:hover .freq-blockchart {
  background-color: #2d2d2d;
  border: solid #434343 2px;
}
.blocktitle {
  font-weight: 500;
  font-size: 0.8em;
  line-height: 1.2;
  margin-bottom: 0.15rem;
  color: #2dbda8;
}
.blockvalue {
  /* 3800.0 */
  margin-top: 0.4rem;
  font-size: 1.15em;
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
}
.blockvalue span {
  /* UNITS, MHz, V, rpm */
  margin-top: 0.2rem;
  font-size: 0.7em;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
}
#section-topbar {
  width: 100%;
  height: auto;
  padding: 0;
  display: grid;
  padding: 3px 0;
  margin: 0 0 5px 0;
  text-align: left;
  grid-template-columns: 60% 40%;
}
#section-topbar #topheader {
  height: 100%;
  padding: 0;
}
#section-topbar #topheader #top-pic {
  width: 64px;
  float: left;
  overflow: auto;
  margin: 0 15px 0 5px;
  padding: 5px 0 0 0;
}
#section-topbar #topheader #top-pic img {
  width: 100%;
  height: 100%;
}
#section-topbar #topheader #topheading {
  width: 75%;
  height: 100%;
  float: left;
  overflow: auto;
  margin: 0;
  padding: 0;
}
#section-topbar #topheader #topheading h1 {
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
  color: #ddd;
  font-size: 2.35em;
  letter-spacing: 3px;
  margin: 0;
  font-weight: 700;
}
#section-topbar #topheader #topheading h1 span {
  color: #2c97de;
  font-weight: 400;
}
#section-topbar #topheader #topheading h2 {
  font-size: 1.02rem;
  margin: 0;
  margin-top: -5px;
  font-weight: 500;
  color: #666;
  letter-spacing: 0.03rem;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
}
#section-topbar #date {
  height: 100%;
  text-align: right;
  padding-top: 40px;
}
#section-topbar #date #pvm {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 400;
  letter-spacing: 0.02rem;
  color: #666;
}
@media (max-width: 768px) {
  #section-topbar {
    width: 100%;
    height: auto;
    grid-template-columns: 100%;
  }
  #section-topbar #topheader #top-pic {
    width: 49px;
    margin-left: 0;
    margin-right: 10px;
    padding: 3px 0 0 0;
  }
  #section-topbar #topheader #topheading {
    width: 100%;
    height: auto;
    float: initial;
    overflow: initial;
  }
  #section-topbar #topheader #topheading h1 {
    font-size: 1.85em;
  }
  #section-topbar #topheader #topheading h2 {
    font-size: 0.82em;
  }
  #section-topbar #date {
    text-align: left;
    padding-top: 10px;
  }
}

#section-fan {
  width: 100%;
  min-height: 140px;
  margin: 0 0 15px 0;
}
#section-fan .fan-content {
  height: auto;
  display: grid;
  column-gap: 13px;
  row-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 10px 10px 10px;
}
#section-fan .fan-content .fan-content-block {
  height: auto;
  text-align: center;
}
#section-fan .fan-content .fan-content-block .fan-image {
  width: 35px;
  height: 35px;
  margin: 5px auto 5px auto;
  opacity: 1;
  background-image: url('https://raw.githubusercontent.com/allu91/cpumeter/master/img/icon-fan.png');
  background-size: 100% 100%;
}
#section-fan .fan-content .fan-content-block:hover .fan-image {
  opacity: 1;
}
.fan-image {
  animation: rotate_startImg 1s linear infinite;
  transform-origin: 50% 50%;
  /* transform: rotate(0deg); */
}
@keyframes rotate_startImg {
  100% {
    transform: rotate(360deg);
  }
}
#section-fan .fan-content .fan-content-block .fan_stopimg {
  width: 35px;
  height: 35px;
  margin: 5px auto 5px auto;
  opacity: 1;
  background-image: url('https://raw.githubusercontent.com/allu91/cpumeter/master/img/icon-fan.png');
  background-size: 100% 100%;
}

#section-fan .fan-content .fan-content-block:hover .fan_stopimg {
  opacity: 1;
}

@media (max-width: 1024px) {
  #section-fan .fan-content .fan-content-block .blockvalue span {
    margin-top: -2px;
    display: block;
  }
}

#section-frequency {
  min-height: 140px;
  margin: 5px auto 15px auto;
}
#section-frequency .frequency-content {
  height: auto;
  display: grid;
  column-gap: 13px;
  row-gap: 15px;
  padding: 10px;
  grid-template-columns: repeat(6, 1fr);
}
#section-frequency .frequency-content .frequency-content-block {
  height: auto;
  float: none;
  display: block;
  position: relative;
  text-align: center;
}
#section-frequency .frequency-content .freq-blockchart1,
#section-frequency .frequency-content .freq-blockchart2 {
  width: 100%;
  height: 57px;
  opacity: 0.7;
  margin-top: 8px;
  transition: 0.08s;
  border: solid #2d2d2d 2px;
  background-size: auto;
  background-position: bottom;
  background-repeat: repeat-x;
}
#section-frequency .frequency-content .freq-blockchart1 {
  background-image: url('https://raw.githubusercontent.com/allu91/cpumeter/master/img/chart1.svg');
}
#section-frequency .frequency-content .freq-blockchart2 {
  background-image: url('https://raw.githubusercontent.com/allu91/cpumeter/master/img/chart2.svg');
}
@media (max-width: 1024px) {
  #section-frequency .frequency-content {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  #section-frequency .frequency-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

#section-single-frequency {
  min-height: 500px;
}
#section-single-frequency .frequency-content {
  font-size: 1em;
  font-weight: 500;
  width: 100%;
  padding: 25px 25px 0px 30px;
  margin: 0 0 0 0;
  overflow: auto;
}
#section-single-frequency .frequency-content .frequency-single-subheader {
  display: flex;
  width: 100%;
  margin-bottom: 25px;
  margin: 0 0 0 0;
}
#section-single-frequency .frequency-content .frequency-single-subheader h4 {
  margin: 0 0 30px 50px;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.03rem;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
  color: #ddd;
}
#section-single-frequency .frequency-content .frequency-single-content {
  display: grid;
  row-gap: 20px;
  column-gap: 15px;
  grid-template-columns: 120px 1fr;
}
#section-single-frequency .frequency-content .frequency-single-content .frequency-single-cores .core-select {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Hide the browser's default checkbox */
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select
  .select-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: 0.02rem;
  color: #2dbda8;
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
}
#section-single-frequency .frequency-content .frequency-single-content .frequency-single-cores .core-select input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
#section-single-frequency .frequency-content .frequency-single-content .frequency-single-cores .core-select .checkmark {
  position: absolute;
  top: 0px;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 2px solid;
}
#section-single-frequency .frequency-content .frequency-single-content .frequency-single-histogram {
  position: absolute;
  text-align: left;
  margin: 6% 5%;
  width: 80%;
}
#section-single-frequency.frequency-content .battery-background {
  background: #0e141a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  position: relative;
}
#section-single-frequency.frequency-content .battery-background .battery-item {
  margin: 8% 0 0 1.5%;
  width: 25%;
  height: 100%;
  display: flex;
}
.battery_subTitle {
  margin: 2%;
  align-self: center;
  padding: 0 30%;
}

.battery {
  margin: 0 0 0 8.5%;
}

#batery--container {
  width: 6rem;
  height: 12rem;
  position: relative;
  /* 			margin: 0 auto; */
}
#batery--container:before {
  width: 50%;
  height: 1.3rem;
  margin: 0 auto;
  left: 24px;
  bottom: 98%;
  border-radius: 4px 4px 0 0;
}
#batery--container-body,
#batery--container:before {
  border: solid 4px rgb(74, 74, 74);
}
#batery--container:after,
#batery--container:before,
#batery--load:before,
#batery--load:after {
  content: '';
  position: absolute;
}
#batery--container-body {
  width: 100%;
  margin-top: 25px;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  /* animation-fill-mode: forwards; */
}

.batery--loadG {
  position: absolute;
  height: 12rem;
  background: #388d4d;
  bottom: 0;
  width: 100%;
  transition: 2s;
}
.batery--loadY {
  position: absolute;
  height: 5rem;
  background: rgb(173, 173, 70);
  bottom: 0;
  width: 100%;
  transition: 2s;
}
.batery--loadR {
  position: absolute;
  height: 2rem;
  background: rgb(173, 33, 33);
  bottom: 0;
  width: 100%;
  transition: 2s;
}

#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-single-info {
  width: 100%;
  display: grid;
  row-gap: 20px;
  column-gap: 3%;
  margin-top: 30px;
  grid-template-columns: repeat(3, 1fr);
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-single-info
  .full-txtBlock {
  padding: 10px;
  border-radius: 7px;
  background-color: #2d2d2d;
  display: inline-block;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-single-info
  .blocktitle {
  font-size: 0.95em;
  text-align: center;
  color: #2c97de;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-single-info
  .blockvalue {
  font-size: 1.4em;
  text-align: center;
}
@media (max-width: 768px) {
  #section-single-frequency .frequency-content .frequency-single-content {
    column-gap: 0;
    grid-template-columns: 100%;
  }
  #section-single-frequency .frequency-content .frequency-single-content .frequency-single-cores .core-select {
    min-width: 90px;
    display: inline-block;
    padding-left: 25px;
    margin-bottom: 15px;
    margin-right: 20px;
  }
  #section-single-frequency
    .frequency-content
    .frequency-single-content
    .frequency-single-histogram
    .frequency-single-info {
    column-gap: 0;
    margin-top: 20px;
    grid-template-columns: 100%;
  }
}
</style>
