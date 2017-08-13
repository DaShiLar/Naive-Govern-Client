// latest.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '最新话题',
    latest: [],
    hidden: false
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('onPullDownRefresh', new Date())
  },
  
  // 事件处理函数
  redictDetail: function(e) {
    var id = e.currentTarget.id;
    console.log("latest to detail " + id);
    var url = '../detail/detail?id=' + id;
      
    wx.navigateTo({
      url: url
    })
  },

  fetchData: function() {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getLatestList(),
      success: function(res) {
        console.log(res);
        res.data.map(function(node){
          node.avatar = '/images/'+node.passage_owner+'.jpg';
        });
        that.setData({
          latest: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function () {
    this.fetchData();
  }
})