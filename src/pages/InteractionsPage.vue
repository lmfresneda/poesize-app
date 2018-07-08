<template>
  <q-page v-touch-swipe.left="handlerToBack">
    InteractionsPage
  </q-page>
</template>

<script>
// se verán las interacciones que han hecho los usuarios con
// mis elementos (poes, comentarios, me siguen).
// Contendrá un InteractionsList
export default {
  name: 'interactions-page',
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
