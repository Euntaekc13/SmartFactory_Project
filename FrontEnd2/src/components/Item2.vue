<template>
  <div class="courses-container">
    <div class="course">
      <div class="course-preview">
        <h6>&nbsp;</h6>
        <h2><slot name="title"> default Title </slot></h2>
        <span>Status <i class="fas fa-chevron-right"></i><slot name="status"> 대기중 </slot></span>
      </div>
      <div class="course-info">
        <div class="progress-container">
          <!-- <div class="progress"></div> -->
          <span class="progress-text"> &nbsp; </span>
        </div>
        <!-- <h4>관리자</h4> -->
        <h4>Manager</h4>
        <h2><slot name="name"> default Title </slot></h2>
        <!-- <h4>공정 정보</h4> -->
        <h4>Process Information</h4>
        <h2><slot name="description"> default Title </slot></h2>
        <!-- <button class="btn">Continue</button> -->
        <div class="Item-footer">
          <slot name="footer"> difault button </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.course {
  background-color: #fff;
  /* border-radius: 10px; */
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  width: 1200px;
}

.course h4 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.course h2 {
  letter-spacing: 1px;
  margin: 10px 0;
}

.course-preview {
  background-color: #445379;
  /* background-color: #000025; */
  /* background-color: #7795f8; */
  /* background-color: #424242; */
  color: #fff;
  padding: 30px;
  width: 30%;
  max-width: 300px;
  min-width: 200px;
}

.course-preview span {
  color: #fff;
  display: inline-block;
  font-size: 15px;
  opacity: 0.8;
  margin-top: 25px;
  text-decoration: none;
}

.course-info {
  padding: 30px;
  position: relative;
  width: 100%;
  background-color: #ecf2f6;
}

.progress-container {
  position: absolute;
  top: 30px;
  right: 30px;
  text-align: right;
  width: 150px;
}

.progress {
  background-color: #ddd;
  border-radius: 3px;
  height: 5px;
  width: 100%;
}

.progress::after {
  border-radius: 3px;
  background-color: #2a265f;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 66%;
}

.progress-text {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 1px;
}

.btn {
  background-color: #2a265f;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
}
</style>
