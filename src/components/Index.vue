<template>
  <div id="home">
    <ul class="posts">
      <li class="mt-5" v-for="item in data">
        <div class="postDetail">
          <div class="postHead">
            <a href class="btn">
              <img src="../assets/logo.png" id="senderPic" class="rounded-circle" alt="upvote">
            </a>
            <a href class="btn" role="button">
              <span class="stronFont">{{item.user_name}}</span>
            </a>
            <a href class="btn" role="button">
              <span class="stronFont">{{item.time_stamp}}</span>
            </a>
          </div>
          <div class="postContent d-flex">
            <div class="postContentPicture">
              <a href class="btn">
                <img id="postİmg" src="../assets/logo.png" alt>
              </a>
            </div>
            <div class="postContentText">
              <h5>
                <a href class="text-secondary font-weight-bold">{{item.title}}</a>
              </h5>
              <div class="postContentEntry">
                  <a href="" class="text-secondary"> | What is the blockchain good for to the average guy? Yes, you can pay
                      | without using banks as an intermediary. But…</a>                    
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
export default {
  name: 'home',
  data () {
    return {
      data: null
    }
  },
  mounted () {
    axios.get('http://172.20.10.3:3000/posts').then(response => { this.data = response.data })
  }
}
</script>


