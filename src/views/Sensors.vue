<template>
    <div v-if="sensor">
        {{ sensor }}
        {{ values }}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Sensors extends Vue {
    mounted() {
        const sensorId = this.$route.params.id
        this.$store.dispatch('getSensorDetails', sensorId)
        this.$store.dispatch('getSensorValues', sensorId)
    }

    get sensor() {
        return this.$store.getters.sensorDetails
    }

    get values() {
        return this.$store.getters.sensorValues
    }
}
</script>