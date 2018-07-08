<template>
  <q-page padding class="bg-pink-10 rememberpass-page nosession-page">
    <div class="content text-white text-weight-thin">
      <div class="nosession__logo">
        <img src="~assets/logo-remember.png" alt="Logotipo Poesize">
      </div>
      <div v-if="!sended" class="nosession__form fixed-bottom">
        <p :class="`nosession__form--error ${error ? '' : 'zero-opacity'} text-red-11 text-weight-regular`">
          {{ messageError }}
        </p>

        <q-input
          class="nosession__form__input"
          v-model.trim="email"
          placeholder="Indica un email"
          color="white"
          hide-underline
          type="email"
          dark/>

        <button class="nosession__form__btn" @click="remember">Recordar contraseña</button>

        <div class="nosession__form__link">
          <a @click="$router.go(-1)">Cancelar</a>
        </div>

      </div>
      <div v-else class="nosession__form fixed-bottom">
        <p :class="`nosession__form--error text-red-11 text-weight-regular`">
          Se ha enviado un correo para recuperar la contraseña
        </p>

        <div class="nosession__form__link">
          <a @click="$router.go(-1)">Volver</a>
        </div>
      </div>

    </div>
    <div class="bg-blur"></div>
  </q-page>
</template>

<script>
// Formulario para recordar password. Al finalizar, devuelve
// al login
export default {
  name: 'remember-pass-page',
  data () {
    return {
      email: null,
      error: false,
      messageError: 'Indica un email válido',
      sended: false
    }
  },
  beforeMount() {
    this.$q.loading.hide()
  },
  methods: {
    showError(msg = null) {
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 2000)
    },
    async remember () {
      if (!this.email) {
        return this.showError('Indica un email válido')
      }
      if (!this.$utils.validation.email(this.email)) {
        return this.showError('El email indicado no es válido')
      }

      try {
        await this.$api.user.recoveryPass(this.email)
      } catch (err) {
        console.error(err)
        return this.showError('Ocurrió un error al enviar el correo')
      }
      this.sended = true
    }
  }
}
</script>

<style lang="scss">
.rememberpass-page {

  .bg-blur {
    background-image: url('~assets/bg-rememberpass.jpg');
  }

  .nosession__logo {
    margin-top: 5em;
  }

  .nosession__form {
    margin-bottom: 8em;

    &__input {
      background-color: rgba(136, 14, 79, .4);
    }

    &__link {
      text-align: center;
      margin-top: 2em;
      opacity: .7;
    }

  }
}
</style>
