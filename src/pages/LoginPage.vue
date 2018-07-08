<template>
  <q-page padding class="bg-deep-orange-6 login-page nosession-page">
    <div class="content text-white text-weight-thin">
      <div class="nosession__logo">
        <img src="~assets/logo.png" alt="Logotipo Poesize">
      </div>
      <div class="nosession__form fixed-bottom">
        <p :class="`nosession__form--error ${error ? '' : 'zero-opacity'} text-red-14 text-weight-regular`">
          {{ messageError }}
        </p>

        <q-input
          class="nosession__form__input"
          v-model.trim="user"
          placeholder="Usuario"
          color="white"
          hide-underline
          dark/>
        <q-input
          class="nosession__form__input nosession__form__input--noborder"
          v-model.trim="pass"
          type="password"
          placeholder="Contraseña"
          color="white"
          hide-underline
          dark/>

        <button class="nosession__form__btn" @click="login">Entrar</button>

        <div class="nosession__form__btn__group register__section__buttons--2">
          <button class="nosession__form__btn">
            <router-link :to="{ name: 'register', params: { level: 1 } }">Crear una cuenta</router-link>
            <!-- <q-icon name="keyboard_arrow_left"/> Atrás -->
          </button>
          <button class="nosession__form__btn">
            <router-link :to="{ name: 'rememberpass' }">Olvidé mi contraseña</router-link>
            <!-- Registrar <q-icon name="keyboard_arrow_right"/> -->
          </button>
        </div>

        <!-- <div class="nosession__form__link nosession__form__link--new float-left">
          <router-link :to="{ name: 'register', params: { level: 1 } }">Crear una cuenta</router-link>
        </div> -->

        <!-- <div class="nosession__form__link nosession__form__link--rememberpass float-right">
          <router-link :to="{ name: 'rememberpass' }">Olvidé mi contraseña</router-link>
        </div> -->

      </div>

    </div>
    <div class="bg-blur"></div>
  </q-page>
</template>

<script>
// Formulario de login, al dar login, nos lleva al TimelinePage
// (si hace login correcto obviamente)
// puede ir a crear nuevo usuario o recordar contraseña
export default {
  name: 'login-page',
  data () {
    return {
      user: '',
      pass: '',
      error: false,
      messageError: 'Indica usuario y contraseña'
    }
  },
  beforeMount() {
    this.$q.loading.hide()
  },
  mounted() {
  },
  methods: {
    showError(msg = null) {
      this.error = true
      this.messageError = msg || this.messageError
      setTimeout(() => {
        this.error = false
      }, 2000)
    },
    async login () {
      if (!this.user || !this.pass) {
        return this.showError('Indica usuario y contraseña')
      }

      const validateUser = await this.$api.user.signIn(this.user, this.pass)
      if (validateUser && validateUser.token) {
        this.$utils.setUser(validateUser.user)
        this.$utils.setTokenSession(validateUser.token)
        this.$router.replace({ path: 'timeline' })
      } else {
        this.showError('Usuario y/o contraseña incorrecta')
      }
    }
  }
}
</script>

<style lang="scss">
.login-page {

  .bg-blur {
    background-image: url('~assets/bg-login.jpg');
  }

  .nosession__logo {
    margin-top: 5em;
  }

  .nosession__form {
    margin-bottom: 2em;

    &__input {
      background-color: rgba(230, 57, 0, .3);
    }

    &__link--rememberpass,
    &__link--new {
      text-align: center;
      padding: 2em 1em;
      opacity: .7;
      display: inline;
    }

  }
}
</style>
