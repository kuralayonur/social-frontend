<template>
  <header id='header'>
    <nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
      <div class='navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2'>
        <ul class='navbar-nav mr-auto'>
          <li class='nav-item active'>
            <a href='/#/' class='nav-link'>Social</a>
          </li>
        </ul>
        <div class='ml-auto' v-if="username">
          <ul class='navbar-nav'>
            <li v-if='username' class='nav-item active'>
              <a href='/#/post' class='nav-link'>Post</a>
            </li>
          </ul>
        </div>
        <div class='' v-if="!username">
          <ul class='navbar-nav'>
            <li v-if='username' class='nav-item active'>
              <a href='/#/post' class='nav-link'>Post</a>
            </li>
          </ul>
        </div>
        <ul class='navbar-nav ml-auto'>
          <li v-if='!username' class='nav-item active'>
            <a href='/#/login' class='nav-link'>Giriş Yap</a>
          </li>
          <li v-if='!username' class='nav-item active'>
            <a href='/#/confirmether' class='nav-link'>Kayıt</a>
          </li>
        </ul>
        <div class="navbar-nav btn-group dropleft ml-auto" v-if="username">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{username}}
          </button>
          <div class="dropdown-menu mt-1">
            <a class='dropdown-item' >Edit Posts</a>
            <a class='dropdown-item' @click="logOut">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import Store from '@/js/store'
export default {
  name: 'header',
  data () {
    return {
      username: Store.state.username
    }
  },
  methods: {
    logOut: (e) => {
      localStorage.removeItem('user')
      location.reload()
    }
  }
}
</script>



