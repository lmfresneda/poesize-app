<template>
  <div class="friends">
    <friends-list-item
      v-for="(user, index) in users"
      :key="index"
      :user="user"
      :type="type"
      :clickToProfile="clickToProfile"
    />
  </div>
</template>

<script>
import FriendsListItem from './FriendsListItem'
// Este componente se usará tanto para un seguidor como para un seguido
// como para la lista de perfiles trend en el landing page
// Contendrá una lista de FriendsListItem
// Recibirá un array de usuarios
export default {
  props: ['users', 'type', 'clickToProfile'],
  name: 'friends-list',
  components: {
    FriendsListItem
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
