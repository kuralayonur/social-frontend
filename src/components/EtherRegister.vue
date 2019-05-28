<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <!-- form card login-->
            <div class="card rounded-0">
              <div class="card-header">
                <h3 class="mb-0">Confirm Ether Account</h3>
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
                    <label>Ether Account</label>
                    <input
                      class="form-control form-control-lg rounded-0"
                      id="ethwallet"
                      type="text"
                      required
                    >
                  </div>
                  <a href="https://www.myetherwallet.com/create-wallet " target="_blank">Click for get an ethereum account.</a>
                  <button
                    class="btn btn-success btn-lg float-right"
                    id="btnLogin"
                    type="button"
                    v-on:click='userRegister'
                  >Confirm</button>
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
export default {
  methods: {
    userRegister: (e) => {
      e.preventDefault()
      const etherwallet = document.getElementById('ethwallet')
      let wallet = ''
      // const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e4fa3509d85d43db9435d70e9fa8fb1c'))
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      try {
        wallet = etherwallet.value
        let balance = web3.eth.getBalance(wallet)
        console.log(balance)
        window.location.href = 'http://localhost:8080/#/register/' + wallet
      } catch (e) {
        alert('Invalid Address')
      }
    }
  }
}
</script>
