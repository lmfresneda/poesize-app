<template>
  <q-page class="timeline-page"
    v-touch-swipe.left="handlerToPoeDetailPage"
    v-touch-swipe.right="handlerToInteractionsPage"
    v-touch-swipe.vertical="handlerNavigation">
    <timeline-poe-list />
    <timeline-actions />
  </q-page>
</template>

<script>
import TimelinePoeList from '@components/Timeline/TimelinePoeList'
import TimelineActions from '@components/Timeline/TimelineActions'

// Contendrá un TimelinePoeList y un TimelineActions (fixed)
// si se arrastra a la izquierda se va a InteractionsPage
// si se arrastra a la derecha se va a PoeDetailPage
export default {
  name: 'timeline-page',
  components: {
    TimelinePoeList,
    TimelineActions
  },
  data() {
    return {
      currentPoe: null
    }
  },
  methods: {
    handlerToPoeDetailPage(obj) {
      if (obj.distance.x > this.$config.minDistanceSwipeGlobal) {
        this.$router.push({ name: 'poedetail', params: { poeId: 1 } })
      }
    },
    handlerToInteractionsPage(obj) {
      if (obj.distance.x > this.$config.minDistanceSwipeGlobal) {
        this.$router.push({ name: 'interactions' })
      }
    },
    // TODO esto seguramente vaya en el TimelinePoeList
    handlerNavigation(obj) {
      if (obj.distance.x > this.$config.minDistanceSwipeGlobal) {
        switch (obj.direction) {
          case 'up': return this.goUp()
          case 'bottom': return this.goDown()
        }
      }
    },
    goUp() {
      console.log('up!')
    },
    goDown() {
      console.log('down')
    }
  }
}
</script>

<style lang="scss">
</style>
