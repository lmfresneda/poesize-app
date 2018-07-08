<template>
  <q-page padding class="bg-green-7 register-page nosession-page">
    <div class="content text-white text-weight-thin">
      <!-- <div class="nosession__logo">
        <img src="~assets/logo-register.png" alt="Logotipo Poesize">
      </div> -->
      <div class="nosession__form fixed-bottom" v-show="!loading">

        <div v-if="level.toString() === '1'" class="register__section register__section--1">
          <p class="nosession__form__title">Necesitamos saber algo más de ti</p>
          <q-input
            class="nosession__form__input"
            v-model.trim="user"
            placeholder="Indica un nombre de usuario"
            color="white"
            hide-underline
            dark/>
          <q-input
            class="nosession__form__input"
            v-model.trim="email"
            placeholder="Indica un email válido"
            color="white"
            hide-underline
            type="email"
            dark/>
          <q-input
            class="nosession__form__input"
            v-model.trim="pass"
            placeholder="Indica también una contraseña"
            color="white"
            hide-underline
            type="password"
            dark/>
          <!-- <q-datetime
            class="nosession__form__input nosession__form__input--noborder nosession__form__datetime"
            color="white"
            :placeholder="`Fecha de nacimiento (> ${$config.minYearsOld})`"
            hide-underline
            v-model="date"
            type="date"
            :max="minDate"
            dark/> -->
          <button class="nosession__form__btn" @click="goToSecondLevelFromFirst()">
            Continuar <q-icon name="keyboard_arrow_right"/>
          </button>
        </div>

        <div v-if="level.toString() === '2'" class="register__section register__section--2">
          <p class="nosession__form__title">Por último, elige tus temas favoritos</p>
          <p class="nosession__form__title nosession__form__title--subtitle">
            Solo si quieres, no es obligatorio hacerlo ahora
          </p>


          <div class="register__section__topics">

            <span
              v-for="(item, index) in availableTopics"
              :key="index"
              :class="topics.map(t => t.slug).includes(item.slug) ? 'register__section__topics--active' : ''"
              @click="setTopic(item)">
              {{ item.description }}
              <q-icon name="done" />
            </span>

          </div>

          <div class="nosession__form__btn__group register__section__buttons--2">
            <button class="nosession__form__btn" @click="goTo(1)">
              <q-icon name="keyboard_arrow_left"/> Atrás
            </button>
            <button class="nosession__form__btn" @click="modalConditions = true">
              Registrar <q-icon name="keyboard_arrow_right"/>
            </button>
          </div>

        </div>

        <div class="nosession__form__link">
          <a @click="$router.push({ name: 'login' })">Cancelar</a>
        </div>

      </div>
    </div>
    <div class="bg-blur"></div>
    <q-modal
      v-model="error"
      position="bottom"
      content-classes="register__modal__error" >
      <q-list highlight>
        <q-list-header>Ups, hubo algún problema</q-list-header>
        <div class="register__modal__error__close" @click="error = false">
          <q-icon name="close"/>
        </div>
        <q-item v-for="(item, index) in errorMessages" :key="index" multiline>
          <q-item-side>
            <q-icon name="error_outline" />
          </q-item-side>
          <q-item-main
            :label="item.msg"
            label-lines="20"
            :sublabel="item.small"
            sublabel-lines="20"
          />
        </q-item>
      </q-list>
    </q-modal>
    <q-modal
      v-model="modalConditions"
      minimized
      no-backdrop-dismiss
      no-esc-dismiss
      content-classes="register__modal__conditions" >
      <div class="register__modal__conditions__icon">
        <q-icon name="done" />
      </div>
      <div class="register__modal__conditions__text">
        <div class="register__modal__conditions__text--title">
          Ya casi está!
        </div>
        Al registrarte entendemos que aceptas las
        <a href="#" target="blank">Condiciones de Uso</a> y las <a href="#" target="blank">Políticas de Privacidad</a> ¿No?
      </div>
      <div class="register__modal__conditions__buttons">
        <button
          class="register__modal__conditions__buttons--cancel"
          @click="modalConditions = false">
          No
        </button>
        <button
          class="register__modal__conditions__buttons--yes"
          @click="register()">
          Sí
        </button>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { UserExistError, EmailExistError } from '@errors'
// Formulario de registro, se compone de 3 pasos, al terminar
// nos lleva al LandingPage
export default {
  props: ['level'],
  name: 'register-page',
  data () {
    return {
      loading: false,
      error: false,
      modalConditions: false,
      errorMessages: []
    }
  },
  watch: {
    loading() {
      if (this.loading) this.$q.loading.show({ delay: 0 })
      else this.$q.loading.hide()
    },
    error() {
      if (this.error) {
        this.$router.push({
          name: 'register',
          params: { level: this.level },
          query: { error: true }
        })
      } else {
        this.$router.replace({
          name: 'register',
          params: { level: this.level }
        })
      }
    }
  },
  computed: {
    user: {
      get() { return this.$store.getters['register/getUserRegister'] },
      set(value) {
        this.$store.commit('register/setDataRegister',
          { field: 'user', value })
      }
    },
    pass: {
      get() { return this.$store.getters['register/getPasswordRegister'] },
      set(value) {
        this.$store.commit('register/setDataRegister',
          { field: 'pass', value })
      }
    },
    email: {
      get() { return this.$store.getters['register/getEmailRegister'] },
      set(value) {
        this.$store.commit('register/setDataRegister',
          { field: 'email', value })
      }
    },
    availableTopics() {
      return this.$store.getters['register/getAvailableTopics']
    },
    topics: {
      get() { return this.$store.getters['register/getTopicsRegister'] },
      set(value) {
        this.$store.commit('register/setDataRegister',
          { field: 'topics', value })
      }
    },
    acceptConditions: {
      get() { return this.$store.getters['register/getAcceptConditions'] },
      set(value) {
        this.$store.commit('register/setDataRegister',
          { field: 'acceptConditions', value })
      }
    }
  },
  async beforeMount() {
    this.cleanForm()

    // pedimos caché si no la tenemos
    if (!this.$store.getters['register/isCachered']) {
      this.loading = true
      await this.$store.dispatch('register/cache')
    }
    this.loading = false
  },
  methods: {
    cleanForm() {
      ['user', 'pass', 'email'].forEach((field) => {
        this.$store.commit('register/setDataRegister',
          { field, value: null })
      })
      this.$store.commit('register/setDataRegister',
        { field: 'acceptConditions', value: false })
      this.$store.commit('register/setDataRegister',
        { field: 'topics', value: [] })
    },
    validateForm() {
      // validar formulario 1
      const userOk = this.$utils.validation.username(this.user || '')
      const emailOk = this.$utils.validation.email(this.email || '')
      const passOk = this.$utils.validation.password(this.pass || '')
      this.errorMessages = []
      if (!userOk) {
        this.errorMessages.push({
          msg: 'O no has indicado un usuario o es incorrecto',
          small: 'Un usuario solo debe contener letras, números y guiones ' +
          'bajos no consecutivos, por ejemplo \'usuario_valido\', y debe tener de 3 a 39 caracteres'
        })
      }
      if (!emailOk) {
        this.errorMessages.push({
          msg: 'O no has indicado email o es incorrecto',
          small: 'Un email válido tiene un aspecto como este \'hablamos@poesize.com\''
        })
      }
      if (!passOk) {
        this.errorMessages.push({
          msg: 'O no has indicado una contraseña o es incorrecta',
          small: 'Una contraseña solo debe contener letras, números y símbolos tales como _!@#$%^&* ' +
          'por ejemplo \'$Una_Passw0rd!Va1id4\',  y debe tener de 8 a 50 caracteres'
        })
      }
    },
    goToSecondLevelFromFirst() {
      this.validateForm()

      if (this.errorMessages.length) {
        return this.showError(this.errorMessages)
      }

      this.goTo(2)
    },
    goTo(level) {
      this.$router.push({ name: 'register', params: { level } })
    },
    setTopic(topic) {
      if (this.topics.map(t => t.slug).includes(topic.slug)) {
        // retirar
        this.topics = this.topics.filter(t => t.slug !== topic.slug)
      } else {
        // incluir
        this.topics = [...this.topics, topic]
      }
    },
    async register() {
      this.validateForm()

      if (this.errorMessages.length) {
        return this.showError(this.errorMessages)
      }

      this.modalConditions = false
      this.loading = true
      const user = {
        user: this.user,
        name: this.user,
        email: this.email,
        password: this.pass,
        acceptTermsConditions: true,
        categories: this.topics
      }

      try {
        const response = await this.$api.user.signUp(user)
        if (response) {
          // ir a landing
          this.$utils.setUser(response.user)
          this.$utils.setTokenSession(response.token)
          this.cleanForm()
          this.$router.push({ name: 'landing', params: { level: 1 } })
          this.loading = false
        } else {
          this.loading = false
          this.showNotifyError('Ocurrió un error inesperado')
        }
      } catch (err) {
        this.loading = false
        if (err.type === 'UserExistError' || err.type === 'EmailExistError') {
          this.showNotifyError(err.message)
        } else {
          this.showNotifyError('Ocurrió un error inesperado')
        }
      }
    },
    showError(msg = []) {
      this.errorMessages = msg
      this.error = true
    },
    showNotifyError(message) {
      this.$q.notify({ type: 'negative', message })
    }
  }
}
</script>

<style lang="scss">
.register-page {

  .bg-blur {
    background-image: url('~assets/bg-register.jpg');
  }

  .nosession__logo {
    margin-top: 2em;
  }

  .nosession__form {
    margin-bottom: 5%;

    &__title {
      font-size: 1.3em;
      text-align: center;

      &--subtitle {
        font-size: .8em;
      }
    }

    &__input {
      background-color: rgba(56, 142, 60, .4);
    }

    // &__datetime {
    //   .q-input-target {
    //     color: rgba(255, 255, 255, .7)!important;
    //     margin-left: auto!important;
    //     margin-right: auto!important;
    //     flex-basis: initial!important;
    //     flex-grow: initial!important;
    //     width: auto!important;
    //   }
    //   .q-icon {
    //     display: none;
    //   }
    // }

    &__btn {
      background-color: rgba(255, 255, 255, 0.20);
      color: rgba(255, 255, 255, 0.8);
    }

    &__link {
      text-align: center;
      margin-top: 2em;
      opacity: .7;
    }

  }

  .register__section__topics {
    border-top: 1px solid rgba(255, 255, 255, .3);

    > span {
      width: 50%;
      display: inline-block;
      padding: .7em;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
      background-color: rgba(56, 142, 60, .5);
      position: relative;
      transition: .3s background-color;

      &:nth-child(1n) {
        border-right: 1px solid rgba(255, 255, 255, .3);
      }
    }

    .q-icon {
      visibility: hidden;
      position: absolute;
      left: 7%;
      top: calc(50% - 0.5em);
      transition: .1s visibility;
    }

    &--active {
      background-color: rgba(27, 105, 31, .7)!important;

      .q-icon {
        visibility: visible;
      }
    }
  }
}

.register__modal__error {
  position: relative;

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5em;
    opacity: .7;
  }

  .q-list-header {
    font-size: 1.2em;
  }
  .q-item-side-left {
    font-size: 2em !important;
  }
  .q-item-sublabel {
    font-size: 85%;
  }
}

.register__modal__conditions {
  background-color: rgb(250, 250, 250);

  &__icon {
    text-align: center;
    margin-top: 1em;

    .q-icon {
      border: 2px solid rgb(170, 170, 170);
      color: rgb(170, 170, 170);
      padding: .2em;
      font-size: 2.5em;
      border-radius: 100%;
    }
  }

  &__text {
    padding: 3em 1em;
    font-size: .9em;
    line-height: 1.6em;
    text-align: center;

    &--title {
      font-size: 2em;
      padding-bottom: .5em;
    }

    a {
      text-decoration: none;
      color: rgb(49, 93, 236);
    }
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    > button {
      flex: 1 1 auto;
      border: 0px;
      min-height: 3em;
    }
    &--cancel {
      background-color: rgb(235, 235, 235);
      color: rgb(77, 77, 77);
    }

    &--yes {
      background-color: rgb(51, 185, 58);
      color: rgb(255, 255, 255);
    }
  }
}
</style>
