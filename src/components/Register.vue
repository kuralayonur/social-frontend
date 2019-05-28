<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <!-- form card login-->
            <div class="card rounded-0">
              <div class="card-header">
                <h3 id="ether" class="mb-0">Kayıt Ol</h3>
              </div>
              <div class="card-body">
                <form
                  class="form"
                  id="formLogin"
                  role="form"
                  autocomplete="off"
                  novalidate
                  method="POST"
                >
                  <div class="form-group">
                    <label for="uname1">Kullanıcı Adı</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="uname1"
                      type="text"
                      name="uname1"
                      required
                      v-model='uname'
                    >
                  </div>
                  <div class="form-group">
                    <label>Şifre</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="pwd1"
                      type="password"
                      required
                      autocomplete="new-password"
                    >
                  </div>
                  <div class="form-group">
                    <label>E-mail</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="email"
                      type="email"
                      required
                      autocomplete="email"
                    >
                  </div>
                  <button
                    class="btn btn-success btn-lg float-right"
                    id="btnLogin"
                    type="button"
                    @click='userRegister'
                  >Kayıt ol</button>
                </form>
                <div v-if="alert" class="alert alert-success" role="alert">
                  This is a success alert—check it out!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '@/js/store'
import Axios from 'axios'
import Social from '@/js/social'
export default {
  name: 'register',
  data () {
    return {
      ether: null,
      alert: false
    }
  },
  beforeCreate () {
    Social.init()
  },
  methods: {
    userRegister: (e) => {
      // const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e4fa3509d85d43db9435d70e9fa8fb1c'))
      console.log(Store.state.ether)
      try {
        const uname1 = document.getElementById('uname1')
        const pwd1 = document.getElementById('pwd1')
        const email = document.getElementById('email')
        let userName = uname1.value
        let password = pwd1.value
        let emailD = email.value
        console.log(uname1.value)
        console.log(pwd1.value)
        console.log(email.value)
        let ether = Store.state.ether
        console.log(ether)
        Axios.post(`http://localhost:3000/users/${userName}/${password}/${emailD}/${ether}`)
        .then(response => {
          let data = response.data
          if (data) {
            this.alert = 'Bekleyiniz!'
            let starter = 0
            setTimeout(() => {
              Social.InsertUser('starter', userName, password, emailD, ether, starter, starter)
              .then(tx => {
                console.log(tx)
              })
            }, 2000)
            // setTimeout(() => {
            //   window.location.href = 'http://localhost:8080/#/login'
            // }, 2000)
          } else alert('Registration Failed!')
        })
      } catch (e) {
        console.log(e)
      }
      e.preventDefault()
    }
  },
  mounted () {
    Store.state.ether = this.$route.params.ether
  }
}
</script>