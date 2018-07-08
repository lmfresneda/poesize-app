<template>
  <q-page v-touch-swipe.right="handlerToBack">
    Perfil del usuario {{ user }}
  </q-page>
</template>

<script>
// pantalla para ver un perfil
// contendrá un UserSection, botón de follow/unfollow si
// no es nuestro perfil, MenuProfile (o MenuProfileMe si es nuestro
// perfil) y ProfileTimeline
export default {
  name: 'profile-page',
  props: ['user'],
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
