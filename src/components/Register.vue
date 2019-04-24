<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <!-- form card login-->
            <div class="card rounded-0">
              <div class="card-header">
                <h3 class="mb-0">Register</h3>
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
                    <label for="uname1">Username</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="uname1"
                      type="text"
                      name="uname1"
                      required
                      v-model='uname'
                    >
                    <small
                      class="text-danger form-text"
                      id="unameHelp"
                    >Username lenght must be longer than 3 letter and must be shorter than 15 letters.</small>
                    <small class="text-danger form-text" id="unwHelp">This username already exists</small>
                  </div>
                  <div class="form-group">
                    <label>Password</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="pwd1"
                      type="password"
                      required
                      autocomplete="new-password"
                    >
                    <small
                      class="text-danger form-text"
                      id="psHelp"
                    >Password must be longer than 8 letter.
                    </small>
                  </div>
                  <div class="form-group">
                    <label>Confirm Password</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="pwd2"
                      type="password"
                      required
                      autocomplete="new-password"
                    >
                    <small class="text-danger form-text" id="pmHelp">Passwords didn't match!</small>
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
                    <small
                      class="text-danger form-text"
                      id="eHelp"
                    >You have entered an invalid email address!</small>
                    <small class="text-danger form-text" id="e2Help">This email already exists</small>
                  </div>
                  <div class="form-group">
                    <label>Ether Account</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="ethwallet"
                      type="text"
                      required
                      v-model='ether'
                    >
                    <small class="text-danger form-text" id="ethHelp">Ether Account is Invalid!</small>
                  </div>
                  <button
                    class="btn btn-success btn-lg float-right"
                    id="btnLogin"
                    type="button"
                    @click='userRegister'
                  >Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
// import Axios from 'axios'
const uname1 = document.getElementById('uname1')
const pwd1 = document.getElementById('pwd1')
const email = document.getElementById('email')
const etherwallet = document.getElementById('ethwallet')
let wallet = ''
let userName = ''
let password = ''
let emailD = ''
export default {
  name: 'register',
  data () {
    return {
      ether: '',
      uname: ''
    }
  },
  methods: {
    userRegister: (e) => {
      e.preventDefault()
      // const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e4fa3509d85d43db9435d70e9fa8fb1c'))
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      try {
        alert(this.ether)
        wallet = etherwallet.value
        userName = uname1.value
        password = pwd1.value
        emailD = email.value
        let balance = web3.eth.getBalance(wallet)
        console.log(web3.toDecimal(balance))
      } catch (e) {
        console.log(e)
      }
      console.log(wallet)
      console.log(userName)
      console.log(password)
      console.log(emailD)
      // Axios.post(`http://192.168.1.24:3000/users/${uname1.value}/${pwd1.value}/${email.value}/${etherwallet.value}`)
      // .then(response => {
      //   let data = response.data
      //   if (data) {
      //     window.location.href = 'http://192.168.1.24:8080/'
      //   } else alert('Registration Failed!')
      // })
    }
  }
}
</script>