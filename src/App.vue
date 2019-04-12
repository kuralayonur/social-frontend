<template>
  <div id="app" class="container margin-top">
    <hr>
    <router-view></router-view>
    <router-link to="/"></router-link>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

