<template>
  <header id='header'>
    <nav class='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
      <div class='navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2'>
        <ul class='navbar-nav mr-auto'>
          <li class='nav-item active'>
            <a href='/#/' class='nav-link'>Social</a>
          </li>
        </ul>
        <div class=''>
          <ul class='navbar-nav'>
            <li class='nav-item active'>
              <a href='#' class='nav-link'>Trending</a>
            </li>
            <li class='nav-item active'>
              <a href='#' class='nav-link'>Hot</a>
            </li>
            <li class='nav-item active'>
              <a href='#' class='nav-link'>New</a>
            </li>
            <li v-if='username' class='nav-item active'>
              <a href='/#/post' class='nav-link'>Post</a>
            </li>
          </ul>
        </div>
        <ul class='navbar-nav ml-auto'>
          <li v-if='!username' class='nav-item active'>
            <a href='/#/login' class='nav-link'>Login</a>
          </li>
          <li v-if='!username' class='nav-item active'>
            <a href='/#/register' class='nav-link'>Register</a>
          </li>
        </ul>
        <div class="btn-group dropleft ml-auto" v-if="username">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{username}}
          </button>
          <div class="dropdown-menu mt-1">
            <a class='dropdown-item' @click="logOut">My Profile</a>
            <a class='dropdown-item' @click="logOut">My Posts</a>
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



