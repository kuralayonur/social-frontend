<template>
  <div id="home">
    <ul class="posts">
      <li class="mt-5" v-for="item in data">
        <div class="postDetail">
          <div class="postHead">
            <a v-bind:href="item.id" class="btn">
              <img id="senderPic" class="rounded-circle" alt="upvote" src="../assets/logo.png">
            </a>
            <a v-bind:href="item.id" class="btn" role="button">
              <span class="stronFont">{{item.user_name}}</span>
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
                      <a href=""><img src="../assets/vote.png" alt=""></a>
                      <a href="" class="btn font-weight-light">money</a>
                      <span class="btn font-weight-light">comment</span>
                      <a href="" class="btn font-weight-light">{{item.vote}}</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ipfs from '@/js/ipfs'
export default {
  name: 'home',
  data () {
    return {
      data: null,
      link: []
    }
  },
  mounted () {
    axios.get('http://192.168.1.24:3000/posts').then(response => {
      // this.data = response.data
      response.data.forEach((element, index) => {
        ipfs.cat(element.ipfs_hash, (err, file) => {
          if (err) {
            throw err
          }
          const date = new Date()
          const oldDate = new Date(element.time_stamp)
          response.data[index].ipfs_hash = file.toString('utf8').substring(0, 50)
          response.data[index].time_stamp = (date.getDate() + 1) - oldDate.getDate()
          console.log(element.id)
          response.data[index].id = 'http://localhost:8080/#/postdetail/' + element._id
          // let newAdress = 'https://ipfs.io/ipfs/' + element.image_ipfs
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
  }
}
</script>


