// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Navbar from './components/Navbar'
import Web3 from 'web3'
import router from './router'
import JWT from 'jsonwebtoken'
import Store from '@/js/store'

Vue.config.productionTip = false

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }
  const token = localStorage.getItem('user')
  if (token) {
    JWT.verify(JSON.parse(token), 'important', (err, decode) => {
      if (err) {
        Store.state.username = null
      } else {
        Store.state.username = decode.user
        Store.state.reputation = decode.reputation
      }
    })
  }
  // using the promise

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
  new Vue({
    el: '#header',
    router,
    template: '<Navbar/>',
    components: { Navbar }
  })
})

