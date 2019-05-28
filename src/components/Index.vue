<template>
  <div class="container">
    <div class="kapsayici">
      <div class="left">
      asdasd
      </div>
    <ul class="posts ml-auto">
      <li class="mt-5" v-for="(item, index) in data">
        <div class="postDetail">
          <div class="postHead">
            <a v-bind:href="'/#/@/'+ item.user_name" class="btn">
              <img id="senderPic" class="rounded-circle" alt="upvote" src="../assets/logo.png">
            </a>
            <a v-bind:href="'/#/@/'+ item.user_name" class="btn" role="button">
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
              <div class="postContentEntry" style="font-size:1rem">
                  <a v-bind:href="item.id" class="text-secondary" v-html="item.ipfs_hash">{{item.ipfs_hash}}</a>                    
              </div>
              <div class="postContentFooter d-flex">
                  <div class="vote">
                      <span>{{item.money}} ETH |</span>
                      <span id="countComment">{{countArray[index]}} Yorum |</span>
                      <span id="voteCount"> {{item.vote}} Oy</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </li>     
    </ul>
    <div class="right ml-auto">
      asd
    </div>
    </div>
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
      countArray: [],
      reputationArray: []
    }
  },
  beforeCreate () {
    axios.get('http://localhost:3000/posts').then(response => {
      // this.data = response.data
      response.data.reverse().forEach((element, index) => {
        ipfs.cat(element.ipfs_hash, (err, file) => {
          if (err) {
            throw err
          }
          const date = new Date()
          const oldDate = new Date(element.time_stamp)
          let dt1 = new Date()
          let dt2 = new Date(oldDate)
          const difference = Math.abs(Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24)))
          if (difference > 7) {
            axios.post(url)
          }
          let url = 'http://localhost:3000/comments/count/' + response.data[index]._id
          axios.get(url).then(count => {
            this.countArray.push(count.data.count)
          })
          response.data[index].ipfs_hash = file.toString('utf8').substring(0, 60)
          response.data[index].time_stamp = (date.getDate() + 1) - oldDate.getDate()
          response.data[index].id = '/#/postdetail/' + element._id
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


