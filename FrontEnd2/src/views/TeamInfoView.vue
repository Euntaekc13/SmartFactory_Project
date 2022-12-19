<template>
  <div class="wrap">
    <Navbar></Navbar>
    <v-main>
      <div class="box">
        <h1>안녕하세요.<br />Team LOCK 입니다.</h1>
      </div>
      <div class="box">
        <h1>저희는 이번 프로젝트에서</h1>
        <h1>스마트팩토리를 주제로</h1>
        <h1>모니터링 서비스를 구현하였습니다.</h1>
      </div>
      <div class="box">
        <h1>에듀킷으로부터 데이터시그널을 받아</h1>
      </div>
      <div class="box">
        <h1>브로커를 통해 Backend 와 Frontend 로 데이터를 전달했죠.</h1>
      </div>
      <div class="box">
        <h1>Backend 에서는 전달받은 데이터를 가공하여</h1>
      </div>
      <div class="box">
        <h1>Usable 한 정보로 바꿔 DB 에 저장해두고</h1>
      </div>
      <div class="box">
        <h1>Frontend 에서는 User 를 위해</h1>
      </div>
      <div class="box">
        <h1>전달받은 데이터를 시각화 시켰습니다.</h1>
      </div>
      <div class="box">
        <h1>Three.js 까지 이용해서 말이죠.</h1>
        <h3><img src="../../public/img/Threejs.jpg" alt="" /></h3>
      </div>
      <div class="box">
        <h1>이제 이 모든걸 해낸 팀원들을 소개하겠습니다.</h1>
      </div>
      <div class="box">
        <h1>Team LOCK에서</h1>
      </div>
      <div class="box">
        <h1>"L"</h1>
      </div>
      <div class="box">
        <h1>이준규 개발자입니다.</h1>
      </div>
      <div class="text">
        <div><img src="../../public/img/LJK.jpg" alt="" /></div>
        <h2>
          In charge of : IoT + Frontend<br /><br />
          Github address : <br />
          Short Introduction : <br />
        </h2>
      </div>
      <div class="box">
        <h1>Team LOCK에서</h1>
      </div>
      <div class="box">
        <h1>"O"</h1>
      </div>
      <div class="box">
        <h1>옥윤성 개발자입니다.</h1>
      </div>
      <div class="text">
        <h3><img src="../../public/img/OYS.jpg" alt="" /></h3>
        <h2>
          In charge of : Backend <br /><br />
          Github address : <br />
          Short Introduction : <br />
        </h2>
      </div>
      <div class="box">
        <h1>Team LOCK에서</h1>
      </div>
      <div class="box">
        <h1>"C"</h1>
      </div>
      <div class="box">
        <h1>최은택 개발자입니다.</h1>
      </div>
      <div class="text">
        <div><img src="../../public/img/CET.jpg" alt="" /></div>
        <h2>
          In charge of : WebGL + Frontend <br /><br />
          Github address : <br />
          Short Introduction : <br />
        </h2>
      </div>
      <div class="box">
        <h1>Team LOCK에서</h1>
      </div>
      <div class="box">
        <h1>"K"</h1>
      </div>
      <div class="box">
        <h1>김민혁 개발자입니다.</h1>
      </div>
      <div class="text">
        <h3><img src="../../public/img/KMH.jpg" alt="" /></h3>
        <h2>
          In charge of : Frontend <br /><br />
          Github address : <br />
          Short Introduction : <br />
        </h2>
      </div>
      <div class="box">
        <h1>지금까지 Team LOCK 였습니다.</h1>
      </div>
      <div class="box">
        <h1>감사합니다.</h1>
      </div>
    </v-main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'TeamInfoView',
  components: {
    Navbar
  },
  provide() {
    return {}
  },

  data() {
    return {}
  },
  create() {},
  mounted() {
    this.setUpDate()
  },
  methods: {
    setUpDate() {
      let options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // 50%가 viewport에 들어와 있어야 callback 실행
      }

      let observer = new IntersectionObserver(e => {
        e.forEach(box => {
          if (box.isIntersecting) {
            box.target.style.opacity = 1
          } else {
            box.target.style.opacity = 0
          }
        })
      })

      let observer2 = new IntersectionObserver(e => {
        e.forEach(entry => {
          console.log(entry.isIntersecting)
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          } else {
            entry.target.classList.remove('active')
          }
        })
      }, options)

      let observer3 = new IntersectionObserver(e => {
        e.forEach(entry => {
          console.log(entry.isIntersecting)
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          } else {
            entry.target.classList.remove('active')
          }
        })
      }, options)

      let divBox = document.querySelectorAll('div')
      let introSetLeft = document.querySelectorAll('h2')
      let introSetRight = document.querySelectorAll('h3')
      let imgSet = document.querySelectorAll('img')

      divBox.forEach(el => observer.observe(el))
      introSetLeft.forEach(el => observer2.observe(el))
      introSetRight.forEach(el => observer2.observe(el))
      imgSet.forEach(el => observer2.observe(el))

      // observer.observe(divBox[0])
      // observer.observe(divBox[1])
      // observer.observe(divBox[2])
      // observer.observe(divBox[3])
    }
  }
}
</script>

<style>
/* html {
  height: 100vh;
} */
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
} */

html {
  height: 100vh;
}

body {
  height: 1000px;
  background: #000;
  font-family: 'Raleway', sans-serif;
}
.wrap {
  height: 20000px;
  background: #000;
  font-family: 'Raleway', sans-serif;
}
.box {
  margin-top: 350px;
  margin-bottom: 350px;
  color: white;
  text-align: center;
  opacity: 0;
  transition: all 1.5s;
}

h2 {
  margin-left: 10px;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.8s;
}

h2.active {
  margin-left: 10px;
  transform: translateX(0);
  opacity: 1;
}

h3 {
  margin-left: 10px;
  transform: translateX(50%);
  opacity: 0;
  transition: 0.8s;
}

h3.active {
  margin-left: 10px;
  transform: translateX(0);
  opacity: 1;
}

img {
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.8s;
}

img.active {
  margin-left: 10px;
  transform: translateX(0);
  opacity: 1;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  color: #fff;
  /* background: #3056a1; */
  background: #000;
  font-size: 0.9rem;
}
</style>
