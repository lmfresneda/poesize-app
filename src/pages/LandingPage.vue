<template>
  <q-page class="landingpage">
    <q-inner-loading :visible="loading">
      <q-spinner size="50px" color="purple-7" />
    </q-inner-loading>
    <div v-if="!loading && level === 1" class="landingpage__section landingpage__section--1">
      <div class="landingpage__section-thanks">
        <!-- Aquí el agradecimiento -->
        <h3 class="landingpage__section-thanks--first">Estupendo!</h3>
        <img src="~assets/applause.png" />
        <p class="landingpage__section-thanks--second">Para empezar, si quieres puedes seguir a las personas más trending del momento</p>
      </div>
      <div class="landingpage__section-trends">
        <!-- Aquí la lista de perfiles trend -->
        <div v-show="cache">
          <friends-list :users="trends" :type="'follow'" :clickToProfile="false" />
        </div>
        <!-- Aparecerá cargando hasta que estén cargados -->
        <q-inner-loading :visible="!cache">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </div>
      <div class="landingpage__section-buttons">
        <button class="btn-nav btn-nav--right" @click="goToLevel(2)">
          Continuar <q-icon name="chevron_right" />
        </button>
      </div>
    </div>
    <div v-if="!loading && level === 2" class="landingpage__section landingpage__section--2">
      <!-- Aquí le decimos si quiere elegir una foto y un nombre opcionalmente -->
      <!-- También le decimos que si quiere elegir un color opcional, y terminamos -->
      <div class="landingpage__section-thanks">
        <!-- Aquí el agradecimiento -->
        <h3 class="landingpage__section-thanks--first">Último paso!</h3>
        <p class="landingpage__section-thanks--second">Estás a punto de acceder a Poesize</p>
      </div>
      <div class="landingpage__section-photo" @click="openCamera">
        <div class="landingpage__section-photo-circle">
          <span class="landingpage__section-photo-circle-bg">
            <img v-if="photo" :src="photo" />
            <img v-else src="~assets/profile-default.png" class="landingpage__section-photo-circle-bg--default"/>
          </span>
          <span class="landingpage__section-photo-circle-icon">
            <q-icon name="photo_camera"></q-icon>
          </span>
        </div>
        <q-icon name="keyboard_arrow_up" style="font-size: 1.5em;"></q-icon>
        <p v-if="!photo" class="landingpage__section-paragraph">A la gente le gusta más con foto</p>
        <p v-else class="landingpage__section-paragraph">Bien hecho!</p>
      </div>
      <div class="landingpage__section-name">
        <q-input
          color="dark"
          v-model="name"
          hide-underline
          float-label="¿Cómo te llamas?"
        />
      </div>
      <div class="landingpage__section-colors">
        <label>¿Cuál es tu color favorito?</label>
        <q-btn-dropdown
          :class="colorSelected && colorSelected === 'surprise'
            ? 'landingpage__section-colors-color-gradient' : ''"
          :style="colorSelected && colorSelected !== 'surprise'
            ? `background-color: ${colorSelected.color}` : ''">
          <q-list link style="padding: 0px">
            <q-item v-for="(item, index) in colors" :key="index" v-close-overlay :style="`background-color: ${item.color}`"
              @click.native="colorSelected = item" class="landingpage__section-colors-color">
              <q-item-main>
                <!-- <q-item-tile label>{{ item.description }}</q-item-tile> -->
              </q-item-main>
            </q-item>
            <q-item v-close-overlay
              @click.native="colorSelected = 'surprise'"
              class="landingpage__section-colors-color landingpage__section-colors-color-gradient">
              <q-item-main>
                <!-- <q-item-tile label>Sorpréndeme!</q-item-tile> -->
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <p class="landingpage__section-paragraph landingpage__section-paragraph--small">
        * Ninguno de estos datos es obligatorio
      </p>
      <div class="landingpage__section-buttons">
        <button class="btn-nav btn-nav--right" @click="end()">
          Terminar <q-icon name="done" style="margin-left: 5px"/>
        </button>
      </div>
    </div>
    <q-modal v-model="showImageToCrop" class="landingpage__imagetocrop">
      <span @click="rotate()" class="landingpage__imagetocrop-menu landingpage__imagetocrop-menu-rotate">
        <q-icon name="autorenew"></q-icon>
      </span>
      <span @click="imageCropped()" class="landingpage__imagetocrop-menu">
        <q-icon name="done"></q-icon>
      </span>
      <vue-cropper
        ref="cropper"
        :aspect-ratio="1"
        :view-mode="2"
        responsive
        restore
        :src="this.imageToCrop">
      </vue-cropper>
    </q-modal>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import VueCropper from 'vue-cropperjs'
import FriendsList from '@components/Profile/FriendsList'
// En esta pantalla se caerá cuando se registra un usuario
// se dará a elegir gente para seguir, nombre real, colores y foto
export default {
  props: ['level'],
  name: 'landing-page',
  components: {
    FriendsList,
    VueCropper
  },
  data () {
    return {
      cameraOk: false,
      photoOk: false,
      imageToCrop: null,
      showImageToCrop: false,
      loading: false,
      colorSelected: null
    }
  },
  async beforeMount() {
    this.name = this.user + ''
    await this.$store.dispatch('landing/cache')
    this.cacheOk = true
  },
  created () {
    window.addEventListener('deviceready', () => {
      this.cameraOk = true
    }, false)
  },
  beforeDestroy () {
    window.removeEventListener('deviceready', () => {
      this.cameraOk = false
    }, false)
  },
  computed: {
    ...mapState({
      cache: state => state.landing.cache,
      trends: state => state.landing.trends,
      colors: state => state.landing.colors,
      user: state => state.register.user
    }),
    colorsMapped() {
      return this.colors.map(color => (
        {
          label: color.description,
          value: color._id,
          icon: 'invert_colors',
          leftColor: color.slug
        }
      ))
    },
    name: {
      get() { return this.$store.getters['landing/getNameLanding'] },
      set(value) {
        this.$store.commit('landing/setDataLanding', { field: 'name', value })
      }
    },
    photo: {
      get() { return this.$store.getters['landing/getPhotoLanding'] },
      set(value) {
        this.$store.commit('landing/setDataLanding', { field: 'photo', value })
      }
    },
    color: {
      get() { return this.$store.getters['landing/getColorLanding'] },
      set(value) {
        this.$store.commit('landing/setDataLanding', { field: 'color', value })
      }
    }
  },
  watch: {
    colorSelected(value) {
      if (value && value !== 'surprise') {
        this.color = value._id
      } else {
        this.color = ''
      }
    }
  },
  methods: {
    async end() {
      this.loading = true
      const storedUser = this.$utils.getUser()
      // ver si hay que actualizar el usuario
      if ((this.name && this.name !== this.user) ||
        this.photo || this.color) {
        this.loading = true
        // actualizar el usuario
        const profile = {}
        if (this.name && this.name !== this.user) {
          profile.name = this.name
          storedUser.name = this.name
        }
        if (this.photo) {
          profile.image = this.photo
          storedUser.photo = this.photo
        }
        if (this.color) {
          profile.color = this.color
          storedUser.color = this.color
        }
        await this.$api.profile.updateProfile(profile)
        this.loading = false
      }
      this.photo = null
      this.name = null
      this.color = null
      this.$utils.setUser(storedUser)

      this.$router.push({ name: 'default' })
    },
    async openCamera() {
      if (this.photoOk) {
        this.$q.actionSheet({
          title: 'Elige una acción',
          actions: [
            {
              label: 'Borrar la foto elegida',
              color: 'negative',
              icon: 'delete',
              handler: () => {
                this.photo = null
                this.photoOk = false
              }
            },
            {
              label: 'Tomar foto de nuevo',
              color: 'secondary',
              icon: 'camera',
              handler: () => {
                this.photoOk = false
                this.openCamera()
              }
            }
          ]
        })
      } else {
        const selectOption = async (sourceType) => {
          const data = await this.$utils.openCamera({
            allowEdit: false,
            cameraDirection: Camera.Direction.FRONT,
            sourceType,
            quality: 25
          })
          this.imageToCrop = `data:image/jpeg;base64,${data}`
          this.openCropper()
        }
        this.$q.actionSheet({
          title: 'Elige una acción',
          actions: [
            {
              label: 'Hacer una foto',
              color: 'secondary',
              icon: 'photo_camera',
              handler: async () => {
                selectOption(Camera.PictureSourceType.CAMERA)
              }
            },
            {
              label: 'Seleccionar de la galería',
              color: 'secondary',
              icon: 'photo_library',
              handler: async () => {
                selectOption(Camera.PictureSourceType.SAVEDPHOTOALBUM)
              }
            }
          ]
        })
      }
    },
    openCropper() {
      this.$refs.cropper.replace(this.imageToCrop)
      this.showImageToCrop = true
    },
    imageCropped() {
      const cropped = this.$refs.cropper.getCroppedCanvas()
      cropped.toBlob((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.photo = reader.result
          this.showImageToCrop = false
          this.photoOk = true
        }
        reader.readAsDataURL(blob)
      }, 'image/jpeg', 0.5)
    },
    goToLevel(level) {
      this.$router.push({ name: 'landing', params: { level } })
    },
    rotate() {
      this.$refs.cropper.rotate(90)
    }
  }
}
</script>

<style lang="scss">
.landingpage {

  &__imagetocrop {
    > div {
      background-color: rgb(2, 2, 2);
    }

    &-menu {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 40px;
      height: 40px;
      z-index: 999;
      border-radius: 5px;
      background-color: white;
      opacity: .5;

      i {
        color: rgb(74, 74, 74);
        font-size: 2.5em;
        border-radius: 5px;
      }

      &-rotate {
        left: 5px !important;
      }
    }

    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__section {
    &-thanks {
      text-align: center;

      > img {
        height: 100px;
      }

      &--first {
        margin-bottom: 0px;
      }

      &--second {
        padding: 0px 10px;
        font-size: .9em;
      }
    }

    &-photo {
      text-align: center;

      &-circle {
        margin: 20px auto 5px auto;
        position: relative;
        width: 40%;
        padding-top: 40%;
        border: 1px solid gray;
        border-radius: 100%;
        overflow: hidden;

        > span {
          position: absolute;
          left: 0;
          right: 0;
        }

        &-bg {
          top: 0;
          img {
            max-width: 100%;
          }

          &--default {
            max-width: 60% !important;
            transform: translateY(30%);
          }
        }
        &-icon {
          bottom: 0;
          font-size: 1.4em;
          background-color: rgba(0, 0, 0, 0.5);
          height: 25%;
          color: white;

          i {
            vertical-align: bottom;
          }
        }
      }
    }

    &-name {
      > div {
        width: 90%;
        margin: 0px auto;
      }
      .q-if-label {
        top: 32px;
        left: 11px;
      }
      .q-if-label-above {
        -webkit-transform: scale(0.75) translate(-8px, -36px);
        transform: scale(0.75) translate(-8px, -36px);
      }
      input{
        font-size: 1.1em;
        border: 1px solid rgb(187, 187, 187);
        padding: 10px;
        height: 100%;
        border-radius: 3px;
      }
      input {
        margin: 10px 0px 5px 0px;
      }
    }

    &-colors {
      width: 90%;
      margin: 10px auto 0px auto;

      > label {
        display: block;
        font-size: .8em;
        color: rgb(151, 151, 151);
        margin-left: 5px;
        margin-bottom: 3px;
      }

      > button {
        width: 100%;
      }

      &-color {
        min-height: 50px;

        &-gradient {
          background: linear-gradient(
            to right,
            rgb(255, 255, 255),
            rgb(255, 105, 180),
            rgb(220, 220, 220),
            rgb(255, 165, 0),
            rgb(255, 228, 181),
            rgb(216, 191, 216),
            rgb(72, 61, 139),
            rgb(60, 179, 113),
            rgb(0, 139, 139),
            rgb(100, 149, 237),
            rgb(47, 79, 79)
          );
        }
      }

    }

    &--2 {
      padding: 10px;
    }

    &-buttons {
      text-align: center;
      padding: 15px 0px;

      > button {
        background-color: rgb(149, 117, 205);
        color: white;
        border-radius: 2px;
        width: 90%;
        box-shadow: 1px 1px 1px rgb(181, 181, 181);
      }
    }

    &-paragraph {
      text-align: center;
      padding: 10px 10px;
      font-size: .9em;

      &--small {
        font-size: .7em;
        opacity: .7;
        padding-bottom: 0px;
        margin-bottom: 0px;
      }
    }
  }
}
</style>
