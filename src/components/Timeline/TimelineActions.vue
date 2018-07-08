<template>
  <div class="timeline-actions row no-wrap fixed-bottom">
    <div class="col">
      <!-- aquí va el temporizador -->
      <button class="timeline-actions__button"><q-icon name="update" /></button>
    </div>
    <div class="col">
      <!-- búsqueda -->
      <button class="timeline-actions__button"><q-icon name="search" /></button>
    </div>
    <div class="col-3">
      <!-- nuevo poe -->
      <q-btn class="timeline-actions__button-new" round color="secondary" icon="add"
        @click="$router.push({ name: 'new' })"/>
    </div>
    <div class="col">
      <!-- perfil -->
      <button class="timeline-actions__button" @click="verMiPerfil()"><q-icon name="person" /></button>
    </div>
    <div class="col">
      <!-- interacciones -->
      <button class="timeline-actions__button"
        @click="$router.push({ name: 'interactions' })"><q-icon name="timeline" /></button>
    </div>
  </div>
</template>

<script>
// Contiene las acciones que se pueden llevar a cabo mientras
// vemos el timeline, como son, de izquierda a derecha:
/*
  -Temporizador: Cuenta atrás para pasar al siguiente Poe
  -Búsqueda
  -Alta nuevo Poe
  -Ver nuestro Perfil
  -Ver Interacciones
*/
export default {
  name: 'timeline-actions',
  data () {
    return {}
  },
  mounted() {
    // TODO
    this.$router.push({ name: 'new' })
  },
  methods: {
    verMiPerfil() {
      // recuperar nuestro usuario
      const { user } = this.$utils.getUser()
      this.$router.push({ name: 'profile', params: { user } })
    }
  }
}
</script>

<style lang="scss">
.timeline-actions {
  padding: 7px;
  box-shadow: 1px -1px 1px 0px rgb(202, 201, 201);

  > div {
    text-align: center;
  }

  &__button {
    background-color: transparent;
    border: 0px;
    font-size: 1.7em;
    user-select: none;
    color: rgb(99, 99, 99);

    &:focus {outline:0;}
  }
  &__button-new {
    font-size: 1.3em;
    margin-top: -24px;
  }
}
</style>
