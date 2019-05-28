import contract from 'truffle-contract'
import SocialContract from '@contracts/Social.json'
import Web3 from 'web3'

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Social = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(SocialContract)
      self.contract.setProvider(web3.currentProvider)
      web3.eth.getAccounts(console.log)
      self.contract.deployed().then(instance => {
        self.instance = instance
        instance.InsertUser('starter', 'userName', 'password', 'emailD', 'ether', 0, 0, {from: '0xb7d4Dbddc84a4559273450c13dCB81f3430C553E'})
        resolve(instance)
      }).catch(err => {
        reject(err)
      })
    })
  },

  InsertUser: function (id, username, password, email, etherwallet, level, reputation) {
    let self = this
    console.log(this)
    return new Promise((resolve, reject) => {
      self.instance.InsertUser.call(
        id, username, password, email, etherwallet, level, reputation,
        {from: window.web3.eth.accounts[0]}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
      })
    })
  },

  InsertComment: function (id, postid, username, vote, commenthash) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.InsertComment.call(
        id, postid, username, vote, commenthash,
        {from: window.web3.eth.accounts[0]}
      ).then(pseudo => {
        resolve(window.web3.toUtf8(pseudo))
      }).catch(err => {
        reject(err)
      })
    })
  },

  InsertPost: function (id, title, username, ipfshash, imagehash, vote) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.InsertPost(
        id, title, username, ipfshash, imagehash, vote,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Social
