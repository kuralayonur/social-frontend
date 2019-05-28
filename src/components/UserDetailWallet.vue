<template>
  <div>
    <div class="userpage-top user-container">
      <div class ="userDetailImg" style="background:#000;"></div>
      <!-- <img class="userDetailImg" src="../assets/background.jpg" alt> -->
      <div class="centered">
        <div class="mt-5">
          <img id="senderPic" class="rounded-circle" src="../assets/logo.png" alt>
          <span class="ml-2">{{username}} ({{user.reputation}})</span>
        </div>
        <div class="user-bio mt-2">
          <span v-if="user.description == null">Acıklama yok</span>
          <span v-if="user.description != null">{{user.description}}</span>
        </div>
        <div class="detailing-user">
         <span>
            <span v-if="user.followerCount == 0">Bu kullanıcının henüz takipçisi yok |</span>
            <a v-if="user.followerCount > 0" class="user-a" href>{{user.followedCount}} Takipçi |</a>
          </span>
          <span>
            <span v-if="user.followerCount == 0">Bu kullanıcının henüz gönderisi yok |</span>
            <a v-if="user.followerCount > 0"  class="user-a" href>{{user.postCount}} Gönderiler |</a>
          </span>
          <span>
            <span v-if="user.followerCount == 0">Bu kullanıcı kimseyi takip etmiyor </span>
            <a v-if="user.followerCount > 0"  class="user-a" href>{{user.followerCount}} Takip Edilen</a>
          </span>
        </div>
      </div>
      <div class="top-right mt-3"><button>Follow</button></div>
    </div>
    <div class="userdetailslogs">
        <a v-bind:href="'/#/@/' + username" class="logsA ml-2 ">Blog</a>
        <a v-bind:href="'/#/@/' + username + '/comments'" class="logsA " >Comments</a>
        <a v-bind:href="'/#/@/' + username + '/wallet'"  class="logsA ml-auto mr-2" style="background-color: #fff; color: #000;">Wallet</a>
    </div>
    <div class="container">
      <h4 class="mt-5">Wallet</h4>
      <ul class="">
      <li class="mt-5">
        <div class="postDetail">
          <div class="postHead">
            <!-- <a href class="btn" role="button">
              <span class="stronFont">{{item.time_stamp}}</span>
            </a> -->
          </div>
          <div class="postContent d-flex">
            <div class="postContentText">
              <div class="postContentEntry">
                  <a class="text-secondary" >Bakiye: {{balance}} ETH</a>                    
              </div>
            </div>
          </div>
        </div>
      </li>     
    </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Web3 from 'web3'
export default {
  data () {
    return {
      username: this.$route.params.username,
      user: null,
      balance: null
    }
  },
  mounted () {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    // this.balance = this.balance.toPrecision()
    let url = 'http://localhost:3000/users/' + this.$route.params.username
    axios.get(url).then(response => {
      this.user = response.data
      this.balance = parseFloat(web3.eth.getBalance(this.user.etherwallet), 10)
    })
  }
}
</script>
