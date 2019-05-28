<template>
  <div id='post' class="container" v-if="!login">
    <form v-if="first">
      <div class='form-group'>
        <label for='exampleFormControlInput1'>Title</label>
        <input class='form-control' id='exampleFormControlInput1' type='text' placeholder='Title'>
      </div>
      <div class='form-group'>
        <hr>
        <label for='exampleFormControlFile1'>Article Image</label>
        <input class='form-control-file' id='exampleFormControlFile1' type='file' @change="captureFile">
        <hr>
      </div>
      <div class='form-group'>
        <ckeditor :editor='editor' v-model='editorData'></ckeditor>
      </div>
      <div class='form-group'>
        <button class='btn btn-success mt-1' @click='postIt'>Post</button>
      </div>
    </form>
    <div class="alert alert-success" role="alert" v-if="success">
      This is a success alert—check it out!
    </div>
    <div class="alert alert-danger" role="alert" v-if="failed">
      This is a success alert—check it out!
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Ipfs from '@/js/ipfs'
import buffer from 'buffer'
import Store from '@/js/store'
import Axios from 'axios'

let title
let imgBuffer = null
export default {
  name: 'post',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      isLoading: true,
      success: false,
      failed: false,
      first: true,
      login: null
    }
  },
  beforeCreate () {
    if (!Store.state.username) {
      this.login = false
      window.location.href = 'http://localhost:8080/'
    } else this.login = true
  },
  mounted () {
    title = document.getElementById('exampleFormControlInput1')
  },
  methods: {
    postIt: async function (e) {
      e.preventDefault()
      let imgHash
      let postHash
      if (imgBuffer == null || this.editorData == null) {
        alert('Tüm alanları doldurmak zorunludur!')
      } else {
        Ipfs.add(imgBuffer, (err, hash) => {
          if (err) throw err
          else {
            imgHash = hash[0].hash
            console.log('img' + imgHash)
            Ipfs.add(buffer.Buffer(this.editorData), (err, hash) => {
              if (err) throw err
              else {
                postHash = hash[0].hash
                console.log(postHash)
                let titleValue = title.value
                Axios.post(`http://localhost:3000/posts/${Store.state.username}/${postHash}/${imgHash}/${titleValue}`)
                .then(response => {
                  const data = response.data
                  if (data.status) {
                    window.location.href = 'http://localhost:8080/'
                  } else {
                    alert('Ups something went wrong!')
                  }
                })
              }
            })
          }
        })
      }
    },
    captureFile: function () {
      const reader = new FileReader()
      const image = document.getElementById('exampleFormControlFile1')
      reader.readAsArrayBuffer(image.files[0])
      reader.onloadend = async function () {
        imgBuffer = buffer.Buffer(reader.result)
        console.log(imgBuffer)
      }
    }
  }
}
</script>