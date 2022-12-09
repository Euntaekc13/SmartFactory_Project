<template>
  <div>
    <Navbar></Navbar>
    <v-main>
      <h3>Machine Page</h3>
      <div class="donut-chart" :data-percent="`${data}`">
        <p>{{ data }}%</p>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import $ from 'jquery'

export default {
  name: 'Machine',
  components: {
    Navbar
  },
  data() {
    return {
      data: 50
    }
  },
  created() {},
  mounted() {
    function Donut_chart(options) {
      this.settings = $.extend(
        {
          element: options.element,
          percent: 100
        },
        options
      )

      this.circle = this.settings.element.find('path')
      this.settings.stroke_width = parseInt(this.circle.css('stroke-width'))
      this.radius = (parseInt(this.settings.element.css('width')) / 1.5 - this.settings.stroke_width) / 2
      this.angle = -97.5 // Origin of the draw at the top of the circle
      this.i = Math.round(0.75 * this.settings.percent)
      this.first = true

      this.animate = function () {
        this.timer = setInterval(this.loop.bind(this), 10)
      }

      this.loop = function (data) {
        this.angle += 5
        this.angle %= 360
        var radians = (this.angle / 180) * Math.PI
        var x = this.radius + this.settings.stroke_width / 2 + Math.cos(radians) * this.radius
        var y = this.radius + this.settings.stroke_width / 2 + Math.sin(radians) * this.radius
        let d
        if (this.first == true) {
          d = this.circle.attr('d') + ' M ' + x + ' ' + y
          this.first = false
        } else {
          d = this.circle.attr('d') + ' L ' + x + ' ' + y
        }
        this.circle.attr('d', d)
        this.i--

        if (this.i <= 0) {
          clearInterval(this.timer)
        }
      }
    }

    $(function () {
      $('.donut-chart').each(function (index) {
        $(this).append(
          '<svg preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" id="donutChartSVG' +
            index +
            '"><path d="M100,100" /></svg>'
        )
        var p = new Donut_chart({ element: $('#donutChartSVG' + index), percent: $(this).attr('data-percent') })
        p.animate()
      })
    })
  }
}
</script>

<style>
.donut-chart svg {
  pointer-events: none;
  height: 100%;
}
.donut-chart svg path {
  fill: none;
  stroke-width: 35px;
  stroke: #19a8ff;
}

.donut-chart {
  width: 200px;
  height: 200px;
  position: relative;
  display: inline-block;
}
.donut-chart p {
  margin: 0;
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 2em;
}
.donut-chart span {
  display: block;
  font-size: 0.5em;
}

/* Just for the purpose of this pen */
body {
  text-align: center;
}
</style>
