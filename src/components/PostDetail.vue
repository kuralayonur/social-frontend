<template>
    <div class="container-fluid postDetail margin-top">
        <div class="text-center" >
            <h1 class="display-6 ">{{ data.data.title }}</h1>
            <a v-bind:href="'/#/@/'+ data.data.user_name" class="btn">
            Written by |  <img id="senderPic" class="rounded-circle" alt="upvote" src="../assets/logo.png">
            </a>
            <a v-bind:href="'/#/@/'+ data.data.user_name" class="btn" role="button">
              <span class="stronFont"> {{data.data.user_name}}({{reputation}})</span>
            </a>
            <div class="mt-5">
              <img id="detailImg" v-bind:src="data.data.image_ipfs">
            </div>
            <div class="mt-5" v-html="data.data.ipfs_hash">{{data.data.ipfs_hash}}</div>
        </div>
        <hr>
        <div class="signUp" v-if="!username">
          <div class="information" >
            Authors get paid when people like you upvote their post.
            If you enjoyed what you read here, create your account today and start earning FREE ETHEREUM!
        <br>
          </div>
          <div class="text-center">
              <button class="infoBtn e-Btn i-btn"><a class="btn" href="/#/register">Sign Up</a></button>
          </div>
        <hr> 
        </div>
        <div id="qw" class="postBottom ml-auto" v-if="username">
            <button id="upvote" v-on:click="upvote">ʌ</button>
            <button id="downvote" v-on:click="downvote">v</button>
            <button v-on:click="reply">Reply</button>
            <span>| {{money}} ETH |</span>
            <span>{{vote}} vote</span>
        </div>
        <div id="comment" v-if="replycomment">
          <ckeditor :editor='editor' v-model='editorData'></ckeditor>
          <div class='form-group'>
            <button class='btn btn-success mt-1' v-on:click="share">Share</button>
          </div>
        </div>

        <div class="showComments mb-5">
          <ul class="comments mt-5">
            <li class="" v-for="item in comments">
              <div class="postDetail">             
                <div class="postHead">
                  <a class="btn">
                    <img id="senderPic" class="rounded-circle" alt="upvote" src="../assets/logo.png">
                  </a>
                  <a v-bind:href="'/#/@/'+ item.user_name" class="btn" role="button">
                    <span class="stronFont">{{item.user_name}}</span>
                  </a>
                  <span class="stronFont" v-html="item.comment"></span>
                </div>
              </div>
            </li>    
          </ul>
        </div>
      </div>
</template>

<script>
import Axios from 'axios'
import ipfs from '@/js/ipfs'
import Store from '@/js/store'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data () {
    return {
      data: null,
      username: Store.state.username,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      replycomment: false,
      reputation: null,
      comments: null,
      money: null,
      userlevel: null,
      vote: null,
      likeStatus: null,
      postUser: null
    }
  },
  beforeCreate () {
    Axios.get(`http://localhost:3000/postdetail/${this.$route.params.id}`)
    .then(response => {
      let oData = response
      ipfs.cat(oData.data.ipfs_hash, (err, file) => {
        if (err) {
          throw err
        }
        oData.data.ipfs_hash = file.toString('utf8')
      })
      let url = 'http://localhost:3000/users/' + oData.data.user_name
      Axios.get(url).then(reputation => {
        this.reputation = reputation.data.reputation
      })
      ipfs.cat(oData.data.image_ipfs, (err, file) => {
        if (err) {
          throw err
        }
        let blob = new Blob([file], {type: 'image/jpg'})
        let urlCreator = window.URL || window.webkitUrl
        let imgUrl = urlCreator.createObjectURL(blob)
        oData.data.title = oData.data.title.toUpperCase()
        oData.data.image_ipfs = imgUrl
        this.money = oData.data.money
        this.vote = oData.data.vote
        this.data = oData
        this.postUser = oData.data.user_name
      })
      url = 'http://localhost:3000/comments/' + this.$route.params.id
      Axios.get(url).then((result) => {
        this.comments = result.data.reverse()
      }).catch((err) => {
        throw err
      })
    })
  },
  methods: {
    upvote (e) {
      if (!Store.state.user_name) {
        if (this.username !== this.postUser) {
          let url = 'http://localhost:3000/likes/' + this.$route.params.id + '/' + this.username
          Axios.get(url).then((result) => {
            if (!result.data.status) {
              this.money += Store.state.reputation * 0.00065
              this.vote++
              url = 'http://localhost:3000/posts/put/' + this.$route.params.id + '/' + this.vote + '/' + this.money + '/' + true
              Axios.put(url).then((result) => {
                alert('Like it')
              })
              url = 'http://localhost:3000/likes/post/' + this.$route.params.id + '/' + this.username
              Axios.post(url).then((result) => {
                if (result.data.status) {
                  this.likeStatus = true
                } else this.likeStatus = false
              })
            } else alert('Zaten oy verdiniz!')
          })
        } else alert('Post sahibi oy veremez')
      } else alert('Lütfen giriş yapın')
    },
    reply (e) {
      if (this.replycomment) {
        this.replycomment = false
      } else this.replycomment = true
    },
    downvote (e) {
      if (!Store.state.user_name) {
        if (this.username !== this.postUser) {
          let url = 'http://localhost:3000/likes/' + this.$route.params.id + '/' + this.username + '/' + false
          Axios.get(url).then((result) => {
            if (!result.data.status) {
              this.vote++
            } else alert('Zaten oy verdiniz.')
          })
        } else alert('Post sahibi oy veremez')
      } else alert('Lütfen giriş yapın!')
    },
    share (e) {
      let url = 'http://localhost:3000/comments/' + this.$route.params.id + '/' + this.username + '/' + this.editorData
      Axios.post(url).then((result) => {
        this.comments.push(result.data)
        console.log(result)
      })
      console.log(url)
    }
  }
}
</script>


