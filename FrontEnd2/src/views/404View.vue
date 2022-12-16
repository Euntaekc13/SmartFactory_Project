<template>
  <div>
    <v-main>
      <div class="text__error">
        <p>{{ string404 }}</p>
      </div>
      <div class="text__link">
        <a>{{ stringLink }} </a>
      </div>
      <div class="text__button">
        <button>Go Home</button>
      </div>
    </v-main>
  </div>
</template>

<script>
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str
  return str.substr(0, index) + chr + str.substr(index + 1)
}

let text404 = '404 page not found'
let textLink = 'click here to go home'
let progress404 = 0
let total404 = 0
let totalLink = 0

export default {
  components: {},
  data() {
    return {
      // total404: 0,
      // totalLink: 0,
      // progress404: 0,
      progressLink: 0,
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>,./?[{()}]!@#$%^&*~`|'.split(''),
      string404: '',
      stringLink: '',
      flag: false
    }
  },
  created() {},
  mounted() {
    this.dataSetting()
    // this.setTimeout()
  },
  methods: {
    // setCharAt(str, index, chr) {
    //   if (index > str.length - 1) return str
    //   return str.substr(0, index) + chr + str.substr(index + 1)
    // },
    letterSpin() {
      this.string404 = text404
      this.stringLink = textLink
      console.log('여러번 도나?')
      console.log('check - this.total404 : ', this.total404)

      for (let i = 0; i < this.total404; i++) {
        if (i >= progress404) {
          this.string404 = setCharAt(
            this.string404,
            i,
            this.characters[Math.round(Math.random() * (this.characters.length - 1))]
          )
        }
      }

      for (let i = 0; i < this.totalLink; i++) {
        if (i >= this.progressLink) {
          this.stringLink = setCharAt(
            this.stringLink,
            i,
            this.characters[Math.round(Math.random() * (this.characters.length - 1))]
          )
        }
      }

      // this.flag = true
      console.log('string', this.string404)
      console.log('stringLink', this.stringLink)
    },
    dataSetting() {
      total404 = text404.length
      this.totalLink = textLink.length
      let scrambleInterval = setInterval(this.letterSpin, 1000 / 60)

      setTimeout(function () {
        let revealInterval = setInterval(function () {
          console.log('자 이제 여기다', progress404)
          console.log(total404)
          if (progress404 < total404) {
            progress404++
          } else if (this.progressLink < this.totalLink) {
            this.progressLink++
          } else {
            clearInterval(revealInterval)
            clearInterval(scrambleInterval)
          }
        }, 50)
      }, 1000)
    }
  }
}
</script>

<style scoped>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
}

html {
  font-size: 62.5%;
}

body {
  background-color: #000;
  font-family: 'Raleway', sans-serif;
}

a {
  text-decoration: none;
  cursor: pointer;

  /* :hover {
    text-decoration: underline;
  } */
}

.text__error,
.text__link,
.text__button {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
}

.text__error {
  margin-top: 35px;
  height: 30px;
  line-height: 30px;
  font-size: 2rem;
}

.text__link {
  margin-top: 80px;
  height: 20px;
  line-height: 20px;
  font-size: 1.4rem;
}

.text__button {
  margin-top: 150px;
  height: 20px;
  line-height: 20px;
  font-size: 1.4rem;
}
</style>
