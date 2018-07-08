<template>
  <q-page padding class="new-poe-page">
    <user-component :user="this.user" :clickToProfile="false">
      <span>
        {{ infoMap }}
        <!-- Aquí info del mapa -->
      </span>
    </user-component>
    <form>
      <q-input
        v-model="text"
        hide-underline
        @blur="controlaUrls"
        type="textarea"
        class="new-poe-page__text"
        placeholder="Escribe algo..."/>
    </form>
    <div class="new-poe-page__link-preview">

    </div>
  </q-page>
</template>

<script>
import UserComponent from '@components/Profile/User'
// Contendrá User (+ slot posición si elige),
// Formulario para crear el poe
export default {
  name: 'new-poe-page',
  components: {
    UserComponent,
    LinkPrevue
  },
  data() {
    return {
      user: null,
      infoMap: '',
      text: ''
    }
  },
  watch: {
    text() {
      // revisar si el último caracter es un espacio
      if ([' ', '.', ',', ';', ':', '\n'].includes(this.text.split('').pop())) {
        this.controlaUrls()
      }
    }
  },
  beforeMount() {
    this.user = this.$utils.getUser()
  },
  methods: {
    controlaUrls() {
      // saca las urls
      const urls = this.utils.getLinks(this.text)
      if (urls && urls.length) {
        // pasarle la primera al link-preview

      }
    }
  }
}
</script>

<style lang="scss">
.new-poe-page {
  &__text {
    margin: 15px 8px 5px 8px;
  }

  &__link-preview {
    text-align: center;
  }
}
</style>
