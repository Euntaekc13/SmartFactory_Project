<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :mini-variant.sync="sideBarOpen"
    permanent
    dark
    position:absolute
    height="100vh"
  >
    <!-- Once User information is set, this part will be rerendered based on the information -->
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
        <button>
          <v-icon>
            {{ myPageIcon.icon }}
          </v-icon>
        </button>
      </router-link>
      <router-link to="/login">
        <button @click="logout()">
          <v-icon>
            {{ logOutIcon.icon }}
          </v-icon>
        </button>
      </router-link>
      <router-link to="/configuration">
        <button>
          <v-icon>
            {{ configurationIcon.icon }}
          </v-icon>
        </button>
      </router-link>
    </div>

    <v-divider></v-divider>

    <v-list v-show="!sideBarOpen" dense rounded class="SideBarList">
      <v-list-item v-for="item in contentsList" :key="item.title" @click="routing(item.route)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

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
        { title: 'Line Management', icon: 'mdi-factory', route: 'line' },
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
      logOutIcon: {
        title: 'logout',
        icon: 'mdi-logout'
      },
      myPageIcon: {
        title: 'myPage',
        icon: 'mdi-account-circle'
      },
      configurationIcon: {
        title: 'configuration',
        icon: 'mdi-octagram'
      },
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

<style lang="scss" scoped>
.UserInfo {
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  align-items: center;
}
.SideBarList {
  font-family: 'Raleway', sans-serif;
}
.controlBar {
  display: flex;
  // flex-direction: column-reverse;
  justify-content: space-evenly;
  margin-bottom: 15px;
  font-family: 'Raleway', sans-serif;
}
</style>
