<template>
  <div id='post'>
    <form>
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
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Ipfs from '@/js/ipfs'
import buffer from 'buffer'
import Vue from 'vue'
import Vuex from 'vuex'
import async from 'q'
import store from '@/js/store'
import Axios from 'axios'

Vue.use(async)

const bufferVuex = new Vuex.Store({
  state: {
    imgBuffer: null
  }
})
// const title = document.getElementById('exampleFormControlInput1')
export default {
  name: 'post',
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      isLoading: true
    }
  },
  methods: {
    postIt: async function (e) {
      e.preventDefault()
      let imgHash
      let postHash
      if (store.state.imgBuffer == null || this.editorData == null) {
        alert('Tüm alanları doldurmak zorunludur!')
      } else {
        store.state.loading = true
        await Ipfs.add(buffer.Buffer(this.editorData), (err, hash) => {
          if (err) throw err
          else postHash = hash
        })
        await Ipfs.add(bufferVuex.state.imgBuffer, (err, hash) => {
          if (err) throw err
          else imgHash = hash
        })
        Axios.post(`localhost:3000/posts/${store.state.username}/${postHash}/${imgHash}`)
        .then(response => {
          const data = response.data
          if (data.status) {
            alert('Yükeleme Başarılı')
          } else alert('Bir şeyler yanlış gitti')
        })
      }
    },
    captureFile: function () {
      const reader = new FileReader()
      const image = document.getElementById('exampleFormControlFile1')
      reader.readAsArrayBuffer(image.files[0])
      reader.onloadend = async function () {
        store.state.imgBuffer = buffer.Buffer(reader.result)
        console.log(bufferVuex.state.imgBuffer)
      }
    }
  }
}
</script>