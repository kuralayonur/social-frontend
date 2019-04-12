<template>
  <div class='container py-5'>
    <div class='row'>
      <div class='col-md-12'>
        <div class='row'>
          <div class='col-md-6 mx-auto'>
            <div class='card rounded-0'>
              <div class='card-header'></div>
              <div class='card-body'>
                <form id='formLogin' class='form' action method='post' autocomplete='on' novalidate>
                  <div class='form-group'>
                    <label for='uname1'>Username</label>
                    <input
                      type='text'
                      id='uname1'
                      class='form-control form-control-lg rounded-0'
                      required
                    >
                  </div>
                  <div class='form-group'>
                    <label for='password'>Password</label>
                    <input
                      type='password'
                      id='pwd1'
                      class='form-control form-control-lg rounded-0'
                      required
                    >
                  </div>
                  <button
                    id='btnLogin'
                    class='btn btn-success btn-lg float-right'
                    type='button'
                    @click='controlUser'
                  >Login</button>
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
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      data: null
    }
  },
  methods: {
    controlUser: (e) => {
      e.preventDefault()
      const username = document.getElementById('uname1')
      const password = document.getElementById('pwd1')
      return axios
        .get(
          `http://172.20.10.3:3000/users/${username.value}/${password.value}`
        )
        .then(response => {
          this.data = response.data
          if (this.data.status) {
            localStorage.setItem('user', JSON.stringify(this.data.token))
            window.location.href = 'http://localhost:8080/'
          } else alert(this.data.message)
        }).catch(err => {
          if (err) {
            alert(err)
          }
        })
    }
  }
}
</script>
