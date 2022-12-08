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
        <span>{{ currentUserInfo.name }}</span>
      </v-list-item>
      <v-list-item class="UserInfo"
        ><span>{{ currentUserInfo.employeeNumber }}</span>
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
      <router-link to="/login" @click="logout">
        <button>
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
export default {
  data() {
    return {
      drawer: true,
      src: 'https://randomuser.me/api/portraits/women/25.jpg',
      currentUserInfo: {
        employeeNumber: '',
        email: '',
        name: '',
        authorization: 'level A'
      },
      contentsList: [
        { title: 'Line Management', icon: 'mdi-factory', route: '/' },
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
  mounted() {
    this.CurrentUserInfo()
  },
  methods: {
    CurrentUserInfo() {
      const employeeNumber = localStorage.getItem('employeeNumber')
      const email = localStorage.getItem('email')
      const name = localStorage.getItem('name')
      this.currentUserInfo.employeeNumber = employeeNumber
      this.currentUserInfo.email = email
      this.currentUserInfo.name = name
    },
    routing(route) {
      console.log(`${window.location.href}`)
      console.log(`${route}`)
      if (window.location.href.split('/')[3] !== route) {
        this.$router.push(`${route}`)
      } else {
        console.log('same page')
      }
    },
    logout() {
      console.log('Try logout')
    }
  }
  //
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
