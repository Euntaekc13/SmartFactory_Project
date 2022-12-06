<template>
  <div>
    {{ token }}
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  // mapState를 import 하고
  // computed에 mapState를 넣고 state에서 만든 변수를 넣어주면
  // 이 파일 안에서는 변수처럼 사용 가능하다.
  // 그럼 token이라고 사용 할 수 있는거임
  computed: {
    ...mapState(['token'])
  },
  // mapMutations를 import 하고
  // methods안에서 똑같이 넣어주면
  // 이 파일안에서 메서드 처럼 사용 할 수 있다.
  // 이러면 SET_IS_ADD_BOARD 함수 쓸 수 있음

  // mapActions도 마찬가지로 사용할 수 있다.
  methods: {
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['LOGIN'])
  }
}
</script>

<style lang="scss" scoped></style>
