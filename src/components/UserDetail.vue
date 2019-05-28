<template>
  <div>
    <div class="userpage-top user-container">
      <div class ="userDetailImg" style="background:#000;"></div>
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
        <a href class="logsA ml-2" style="background-color: #fff; color: #000;">Blog</a>
        <a v-bind:href="'/#/@/' + username + '/comments'" class="logsA ">Yorumlar</a>
        <a v-bind:href="'/#/@/' + username + '/wallet'"  class="logsA ml-auto mr-2">Cüzdan</a>
    </div>
    <div class="container">
      <h4 class="mt-5">Blog</h4>
      <ul class="">
      <li class="mt-5" v-for="(item,index) in data">
        <div class="postDetail">
          <div class="postHead">
            <a v-bind:href="'/#/@/'+ item.user_name" class="btn">
              <img id="senderPic" class="rounded-circle" alt="upvote" src="../assets/logo.png">
            </a>
            <a v-bind:href="'/#/@/'+ item.user_name" class="btn" role="button">
              <span class="stronFont">{{item.user_name}}({{user.reputation}})</span>
            </a>
            <!-- <a href class="btn" role="button">
              <span class="stronFont">{{item.time_stamp}}</span>
            </a> -->
          </div>
          <div class="postContent d-flex">
            <div class="postContentPicture">
              <a v-bind:href="item.id" class="btn">
                <img id="postImg" v-bind:src="item.image_ipfs" alt>
              </a>
            </div>
            <div class="postContentText">
              <h5>
                <a v-bind:href="item.id" class="text-secondary font-weight-bold">{{item.title}}</a>
              </h5>
              <div class="postContentEntry">
                  <a v-bind:href="item.id" class="text-secondary" v-html="item.ipfs_hash">{{item.ipfs_hash}}</a>                    
              </div>
              <div class="postContentFooter d-flex">
                  <div class="vote">
                      <span>{{item.money}} ETH |</span>
                      <span>{{countArray[index]}}  Yorum |</span>
                      <span>{{item.vote}} Oy</span>
                  </div>
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
import ipfs from '@/js/ipfs'
export default {
  data () {
    return {
      username: this.$route.params.username,
      data: null,
      user: null,
      countArray: []
    }
  },
  mounted () {
    console.log(this.$route.params.username)
    let url = 'http://localhost:3000/posts/' + this.$route.params.username
    axios.get(url).then(response => {
      // this.data = response.data
      response.data.reverse().forEach((element, index) => {
        ipfs.cat(element.ipfs_hash, (err, file) => {
          if (err) {
            throw err
          }
          const date = new Date()
          const oldDate = new Date(element.time_stamp)
          response.data[index].ipfs_hash = file.toString('utf8').substring(0, 60)
          response.data[index].time_stamp = (date.getDate() + 1) - oldDate.getDate()
          response.data[index].id = 'http://localhost:8080/#/postdetail/' + element._id
          url = 'http://localhost:3000/comments/count/' + element._id
          axios.get(url).then(count => {
            this.countArray.push(count.data.count)
          })
          ipfs.cat(element.image_ipfs, (err, file) => {
            if (err) {
              throw err
            }
            let blob = new Blob([file], {type: 'image/jpg'})
            let urlCreator = window.URL || window.webkitUrl
            let imgUrl = urlCreator.createObjectURL(blob)
            response.data[index].image_ipfs = imgUrl
          })
        })
      })
      this.data = response.data
    })
    url = 'http://localhost:3000/users/' + this.$route.params.username
    axios.get(url).then(response => {
      this.user = response.data
    })
  }
}
</script>
