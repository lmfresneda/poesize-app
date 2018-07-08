<template>
  <q-page padding v-touch-swipe.right="handlerToBack">
    PoeDetailPage
  </q-page>
</template>

<script>
// contendrá User (+ slot posición y etiqueta), MenuPoe,
// Poe y Comments
export default {
  props: ['poeId'],
  name: 'poe-detail-page',
  data() {
    return {
    }
  },
  methods: {
    handlerToBack(obj) {
      console.log('handlerToBack', obj)
      if (obj.distance.x > this.$config.minDistanceSwipeGlobal) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
