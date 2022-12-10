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
      <v-list-item-avatar v-if="sideBarOpen" size="42">
        <v-btn size="42" icon @click.stop="sideBarOpen = !sideBarOpen">
          <v-img src="https://randomuser.me/api/portraits/women/25.jpg"> </v-img>
        </v-btn>
      </v-list-item-avatar>

      <v-list-item-avatar v-else size="96">
        <v-btn size="80" icon @click.stop="sideBarOpen = !sideBarOpen">
          <v-img src="https://randomuser.me/api/portraits/women/25.jpg"> </v-img>
        </v-btn>
      </v-list-item-avatar>
    </div>

    <v-list v-show="!sideBarOpen">
      <v-list-item class="UserInfo">
        <span>{{ TokenUser.name }}</span>
      </v-list-item>
      <v-list-item class="UserInfo"
        ><span>{{ TokenUser.employee_number }}</span>
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
      <li>
        <router-link to="/line">
          <button>Line Management</button>
        </router-link>
      </li>
      <li>
        <router-link to="/machine">
          <button>Process Management</button>
        </router-link>
      </li>
      <li>
        <router-link to="/history">
          <button>History Management</button>
        </router-link>
      </li>
    </div>

    <!-- <v-list-item v-for="item in contentsList" :key="item.title" @click="routing(item.route)">
        <v-list-item-icon>
          {{ item.icon }}
          <i class="fa-solid fa-right-to-bracket fa-xl"></i>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    <!-- </v-list> -->

    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: true,
      src: 'https://randomuser.me/api/portraits/women/25.jpg',
      contentsList: [
        { title: 'Line Management', icon: `${(<i class="fa-solid fa-industry-windows"></i>)}`, route: 'line' },
        {
          title: 'Process Management',
          icon: 'mdi-view-dashboard',
          route: 'machine'
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
    })
  },
  mounted() {},
  methods: {
    ...mapActions('Auth', ['LOGOUT_AUTH']),
    async logout() {
      console.log('로그 아웃 버튼')
      console.log('초기화 해야하는 대상 : ', this.TokenUser)
      await this.LOGOUT_AUTH({ state: this.TokenUser }).then(() => {
        // api 와 store 작업이 끝나면 아래 주로 화면 전환
        // this.$router.push('/login')
      })
    },
    routing(route) {
      console.log(`${window.location.href}`)
      console.log(`${route}`)
      if (window.location.href.split('/')[3] !== route) {
        this.$router.push(`${route}`)
      } else {
        console.log('same page')
      }
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
</style>
