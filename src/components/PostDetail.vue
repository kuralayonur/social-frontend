<template>
    <div>
        <div v-for="item in data">
            <h1 class="display-3">{{ item.title }}</h1>
            <div class="mt-5">
              <img id="detailImg" v-bind:src="item.image_ipfs">
            </div>
            <div class="mt-5" v-html="item.ipfs_hash">{{item.ipfs_hash}}</div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import ipfs from '@/js/ipfs'
export default {
  data () {
    return {
      data: null
    }
  },
  beforeCreate () {
    Axios.get(`http://localhost:3000/postdetail/${this.$route.params.id}`)
    .then(response => {
      let oData = response
      console.log(oData.data.ipfs_hash)
      ipfs.cat(oData.data.ipfs_hash, (err, file) => {
        if (err) {
          throw err
        }
        oData.data.ipfs_hash = file.toString('utf8')
        console.log(oData.data.ipfs_hash)
      })
      ipfs.cat(oData.data.image_ipfs, (err, file) => {
        if (err) {
          throw err
        }
        let blob = new Blob([file], {type: 'image/jpg'})
        let urlCreator = window.URL || window.webkitUrl
        let imgUrl = urlCreator.createObjectURL(blob)
        oData.data.image_ipfs = imgUrl
        this.data = oData
      })
    })
  },
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>
