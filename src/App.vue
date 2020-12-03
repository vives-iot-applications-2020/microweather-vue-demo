<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

        <span v-if="user" class="ma-5">{{ user.email }}</span>
        <v-btn @click="login" v-if="!user">login</v-btn>
        <v-btn @click="logout" v-if="user">logout</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {

  mounted() {
    if(!this.user) {
      this.$router.push('/')
    }
  }

  login() {
    this.$store.dispatch('authenticate', { email: "test@test.be", password: "secret" })
  }

  logout() {
    this.$store.dispatch('logout');
  }

  get user() {
    return this.$store.getters.user;
  }



}
</script>
