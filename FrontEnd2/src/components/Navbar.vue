<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :mini-variant.sync="sideBarOpen"
    permanent
    color="#172b4d"
    position:absolute
    height="100vh"
  >
    <!-- Once User information is set, this part will be rerendered based on the information -->
    <div v-show="!sideBarOpen" class="navbarTitle"><div class="innerTitle">Smart Factory</div></div>
    <div class="UserInfo">
      <v-list-item-avatar v-if="sideBarOpen" size="42" style="margin: 15px auto 15px auto">
        <v-btn size="42" icon @click.stop="sideBarOpen = !sideBarOpen">
          <!-- <v-img :src="navUserImgRender" alt=""></v-img> -->
        </v-btn>
      </v-list-item-avatar>

      <v-list-item-avatar v-else size="96">
        <v-btn size="80" icon @click.stop="sideBarOpen = !sideBarOpen">
          <!-- <v-img :src="navUserImgRender" alt=""></v-img> -->
        </v-btn>
      </v-list-item-avatar>
    </div>

    <v-list-item-avatar v-if="sideBarOpen" size="42" style="margin: 15px 0px 15px 5px">
      <v-btn size="42" icon style="color: darkgray" @click.stop="sideBarOpen = !sideBarOpen">
        <i class="fa-sharp fa-solid fa-industry fa-xl"></i>
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-avatar v-if="sideBarOpen" size="42" style="margin: 15px 0px 15px 5px">
      <v-btn size="42" icon style="color: darkgray" @click.stop="sideBarOpen = !sideBarOpen">
        <i class="fa-solid fa-desktop fa-xl"></i>
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-avatar v-if="sideBarOpen" size="42" style="margin: 15px 0px 15px 5px">
      <v-btn size="42" icon style="color: darkgray" @click.stop="sideBarOpen = !sideBarOpen">
        <i class="fa-sharp fa-solid fa-list fa-xl"></i>
      </v-btn>
    </v-list-item-avatar>

    <v-list v-show="!sideBarOpen">
      <v-list-item class="UserInfo">
        <span style="color: white">{{ TokenUser.name }}</span>
      </v-list-item>
      <v-list-item class="UserInfo"
        ><span style="color: white">{{ TokenUser.employee_number }}</span>
      </v-list-item>
    </v-list>

    <div v-show="!sideBarOpen" class="controlBar" dense>
      <router-link to="/mypage">
        <button class="iconButton">
          <i class="fa-solid fa-user fa-xl" color="gray"></i>
        </button>
      </router-link>
      <router-link to="/login">
        <button class="iconButton" @click="logout()">
          <i class="fa-solid fa-right-to-bracket fa-xl"></i>
        </button>
      </router-link>
      <router-link to="/configuration">
        <button class="iconButton">
          <i class="fa-solid fa-gear fa-xl"></i>
        </button>
      </router-link>
    </div>

    <v-divider></v-divider>

    <div v-show="!sideBarOpen" class="navBarList" dense rounded>
      <div class="innerList">
        <button class="spanButton" @click="routingToLine">
          <div class="buttonArea">
            <i class="fa-sharp fa-solid fa-industry fa-xl"></i>
            <span>Line Management&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </button>
      </div>

      <div class="innerList">
        <button class="spanButton" @click="routingToProcess">
          <div class="buttonArea">
            <i class="fa-solid fa-desktop fa-xl"></i>
            <span>Process Management</span>
          </div>
        </button>
      </div>

      <div class="innerList">
        <button class="spanButton" @click="routingToHistory">
          <div class="buttonArea">
            <i class="fa-sharp fa-solid fa-list fa-xl"></i>
            <span>History Management</span>
          </div>
        </button>
      </div>
    </div>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
      src: 'https://randomuser.me/api/portraits/women/25.jpg',
      contentsList: [
        { title: 'Line Management', icon: `${(<i class="fa-solid fa-industry-windows"></i>)}`, route: 'machine' },
        {
          title: 'Process Management',
          icon: 'mdi-view-dashboard',
          route: 'process'
        },
        {
          title: 'Production History',
          icon: 'mdi-clipboard-text',
          route: 'history'
        }
      ],
      sideBarOpen: true
    }
  },
  computed: {
    ...mapGetters(`Auth`, {
      TokenUser: 'TokenUser'
    }),
    ...mapState(`Monitoring`, {
      assignedUser: 'assignedUser'
    })
  },
  mounted() {
    this.navUserImgRenderFunction()
  },
  methods: {
    logout() {
      console.log('User logout attempting - Navbar')
      this.$store.commit('Auth/LOGOUT', null)
    },
    routingToLine() {
      this.$router.push('/machine')
    },
    routingToProcess() {
      this.$router.push('/process')
    },
    routingToHistory() {
      this.$router.push('/history')
    },
    navUserImgRenderFunction() {
      // this.navUserImgRender = ''
      // console.log('Nav', this.assignedUser.userImage)
      // this.navUserImgRender = require(`../../public/img/${this.assignedUser.userImage}`)
    }
  }
}
</script>

<style scoped>
.UserInfo {
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  align-items: center;
  /* color: white; */
}
.navbarTitle {
  text-align: center;
  color: white;
  font-size: xx-large;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
}
.innerTitle {
  padding: 3px;
  border: 1px solid black;
}
.SideBarList {
  font-family: 'Raleway', sans-serif;
}
.controlBar {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  font-family: 'Raleway', sans-serif;
}
.iconButton {
  color: darkgray;
  /* margin-bottom: 5px; */
}
.navBarList {
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 0px;
  justify-content: center;
  align-content: center;
  vertical-align: middle;
  font-family: 'Raleway', sans-serif;
}
.spanButton {
  padding: 10px 0px 10px 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: darkgray;
  font-family: 'Raleway', sans-serif;
}
.innerList {
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  vertical-align: middle;
  margin: 5px 5px 5px 5px;
  font-family: 'Raleway', sans-serif;
}
.buttonArea {
  /* background-color: red; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
