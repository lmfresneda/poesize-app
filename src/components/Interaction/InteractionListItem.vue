<template>
  <div>My component</div>
</template>

<script>
// Contendrá un User y según el tipo de interacción
// contendrá una info u otra
// De momento los tipos de interacciones que hay son:
/*
  FOLLOW_US: Nos han seguido
  LIKE_POE: han dado like a un Poe nuestro
  COMMENT_POE: Han dado like a un comentario nuestro
  MENTION_POE: Nos han mencionado en un poe
  CATEGORIZE_POE: Han categorizado un Poe nuestro
  MENTION_COMMENT: Nos han mencionado en un comentario
*/
export default {
  name: 'interaction-list-item',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
