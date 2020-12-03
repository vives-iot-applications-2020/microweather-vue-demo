<template>
  <div class="home">
    <ul>
      <li v-for="sensor in sensors" :key="sensor._id"> 
        <router-link :to="getSensorLink(sensor)">
          {{ sensor.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {

  mounted() {
    this.$store.dispatch('getSensors')
  }

  get sensors() {
    return this.$store.getters.sensors;
  }

  getSensorLink(sensor: any) {
    return `/sensors/${sensor._id}`
  }

}
</script>
