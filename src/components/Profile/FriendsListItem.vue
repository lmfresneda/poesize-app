<template>
  <div class="friends-item">
    <user-component
      :clickToProfile="clickToProfile"
      :user="user">
      <span class="friends-item__followers">
        SEGUIDORES {{ user.followers_count | humanizeNumber }}
      </span>
    </user-component>
    <div class="friends-item__button">
      <!-- aqui ver de qué tipo es y en función pintar botón -->
      <q-btn
        v-if="cType === 'follow'"
        :loading="loadingBtn"
        @click="follow()"
        color="pink" icon="add" size="sm" round no-ripple outline>
        <q-spinner-dots slot="loading" size="1em" />
      </q-btn>
      <q-btn
        v-if="cType === 'unfollow'"
        :loading="loadingBtn"
        @click="unfollow()"
        color="blue-grey-3" icon="close" size="sm" round no-ripple outline>
        <q-spinner-dots slot="loading" size="1em" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import UserComponent from './User'
// Contendra un User (+ slot con los seguidores que tiene)
// y un icono que indica si nos seguimos mutuamente, solo le sigo yo
// o solo me sigue él. O si es para la lista de perfiles trend de
// la landing page, directamente aparecerá como que no le sigo
// En estos dos últimos casos el icono servirá para seguirle en ese momento.
// Recibirá un usuario

export default {
  props: ['user', 'type', 'clickToProfile'],
  name: 'friends-list-item',
  components: {
    UserComponent
  },
  data () {
    return {
      loadingBtn: false,
      cType: this.type + ''
    }
  },
  methods: {
    async follow() {
      this.loadingBtn = true
      await this.$api.profile.follow(this.user.user)
      this.cType = 'unfollow'
      this.loadingBtn = false
    },
    async unfollow() {
      this.loadingBtn = true
      await this.$api.profile.unfollow(this.user.user)
      this.cType = 'follow'
      this.loadingBtn = false
    }
  }
}
</script>

<style lang="scss">
.friends-item {
  border-bottom: 1px solid #e3e3e3;
  padding: 5px;
  position: relative;
  background-color: #fdfdfd;

  &:first-child {
    border-top: 1px solid #e3e3e3;
  }

  > div {
    display: inline-block;
  }

  .user {
    width: 85%;
  }

  &__button {
    width: 10%;
    text-align: right;
    float: right;
    position: absolute;
    top: 50%;
    right: 4%;
    transform: translateY(-50%);
  }
}
</style>
