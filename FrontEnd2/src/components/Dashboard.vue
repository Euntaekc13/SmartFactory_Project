<template>
  <!-- <div id="app"> -->
  <!-- MAIN SECTION CONTAINING ALL CONTENT SECTIONS -->
  <main id="section-root-container">
    <div>
      <div>
        <!-- FANS -->
        <section id="section-fan" class="section-main">
          <div class="section-main-header">
            <h3>Product</h3>
          </div>

          <div class="section-main-content fan-content">
            <a href="#" class="content-block fan-content-block">
              <div class="fan-image"></div>
              <div class="blocktitle">Failure</div>
              <div class="blockvalue">2200 <span>rpm</span></div>
            </a>
            <a href="#" class="content-block fan-content-block">
              <div class="fan-image"></div>
              <div class="blocktitle">Daily yield</div>
              <div class="blockvalue">950 <span>rpm</span></div>
            </a>
            <a href="#" class="content-block fan-content-block">
              <div class="fan-image"></div>
              <div class="blocktitle">Total</div>
              <div class="blockvalue">600 <span>rpm</span></div>
            </a>
          </div>
          <!-- fan-content -->
        </section>
      </div>

      <div>
        <!-- FULL SINGLE SECTIONS -->

        <section id="section-single-frequency" class="section-single">
          <div class="section-main-header">
            <h3>CPU Frequency</h3>
          </div>

          <div class="section-main-content frequency-content">
            <div class="frequency-single-subheader">
              <h4>Intel(R) Core(TM) i5-6600K CPU @ 3.80GHz</h4>
            </div>

            <div class="frequency-single-content">
              <div class="frequency-single-histogram">
                <div id="frequency-histogram-label-vertical" class="frequency-histogram-label">
                  <p>100</p>
                  <p>50</p>
                </div>
                <div class="frequency-histogram-chart">
                  <div id="freq-single-core-chart-core1" class="freq-single-core-chart active"></div>
                </div>
                <div id="frequency-histogram-label-horizontal" class="frequency-histogram-label">
                  <p>0<span></span></p>
                  <p>5<span>s</span></p>
                  <p>10<span>s</span></p>
                  <p>15<span>s</span></p>
                </div>

                <div class="frequency-single-info">
                  <div class="full-txtBlock">
                    <div class="blockvalue">3800.0 <span>MHz</span></div>
                    <div class="blocktitle">CPU Frequency</div>
                  </div>
                  <div class="full-txtBlock">
                    <div class="blockvalue">100.0 x 38</div>
                    <div class="blocktitle">CPU Ratio</div>
                  </div>
                  <div class="full-txtBlock">
                    <div class="blockvalue">26.0 <span>watts</span></div>
                    <div class="blocktitle">Power consumption</div>
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
export default {
  name: 'Dashboard',
  data() {
    return {}
  }
}
</script>
<style scoped>
body {
  line-height: 1.5;
  min-height: 100vh;
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
  margin: 10% 5% 0 0;
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
  font-size: 1.15em;
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
}

.blockvalue span {
  /* UNITS, MHz, V, rpm */
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
  background-repeat: none;
}
#section-fan .fan-content .fan-content-block:hover .fan-image {
  opacity: 1;
}
@media (max-width: 1024px) {
  #section-fan .fan-content .fan-content-block .blockvalue span {
    margin-top: -3px;
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
  padding: 25px 25px 10px 30px;
  margin: 0 auto 0 auto;
  overflow: auto;
}
#section-single-frequency .frequency-content .frequency-single-subheader {
  display: block;
  width: 100%;
  margin-bottom: 25px;
}
#section-single-frequency .frequency-content .frequency-single-subheader h4 {
  margin: 0;
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
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select
  input:checked {
  color: #ddd;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select
  input:checked
  ~ .checkmark {
  background-color: #2196f3;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select
  input:checked
  ~ .select-title {
  color: #ddd;
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
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select:nth-child(1)
  .checkmark {
  border-color: #ddd;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select:nth-child(1)
  input:checked
  ~ .checkmark {
  background-color: #ddd;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select:nth-child(2)
  .checkmark {
  border-color: #2c97de;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-cores
  .core-select:nth-child(2)
  input:checked
  ~ .checkmark {
  background-color: #2c97de;
}
#section-single-frequency .frequency-content .frequency-single-content .frequency-single-histogram {
  position: absolute;
  text-align: left;
  margin-right: 5%;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-label
  p {
  margin: 0;
  line-height: 1;
  font-size: 0.875rem;
  color: #666;
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-label
  p
  span {
  font-family: 'Electrolize', 'Helvetica Neue', Helvetica, sans-serif;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-label#frequency-histogram-label-vertical {
  width: 35px;
  height: 220px;
  margin-right: -4px;
  display: inline-grid;
  vertical-align: top;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-label#frequency-histogram-label-horizontal {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-label#frequency-histogram-label-horizontal
  p {
  display: inline-block;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-chart {
  width: calc(100% - 35px);
  height: 220px;
  position: relative;
  display: inline-block;
  margin-right: -4px;
  background-color: #121212;
  border-left: 1px #666 solid;
  border-bottom: 1px #666 solid;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-chart
  .freq-single-core-chart {
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: 0 0;
  animation-duration: 35s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-chart
  .freq-single-core-chart.active {
  opacity: 1;
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-chart
  .freq-single-core-chart#freq-single-core-chart-core1 {
  animation-name: freq_chart_anim1;
}
@keyframes freq_chart_anim1 {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1705px 0;
  }
}
#section-single-frequency
  .frequency-content
  .frequency-single-content
  .frequency-single-histogram
  .frequency-histogram-chart
  img {
  width: 100%;
  height: 100%;
  opacity: 0.7;
  margin-top: 10px;
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
