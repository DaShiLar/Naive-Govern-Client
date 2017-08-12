// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    replies: [],
    hidden: false
  },
  fetchDetail: function(id) {
    var that = this;
    wx.request({
      url: Api.getPassageDetail({
        passage_id: id
      }),
      success: function(res) {
        that.setData({
          detail: res.data
        })
      }
    })
    that.fetchReplies(id);
  },
  fetchReplies: function(id) {
    var that = this;
    wx.request({
      url: Api.getCommentDetailList({
        passage_id: id
      }),
      success: function(res) {
        that.setData({
          replies: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      hidden: false
    })
    this.fetchDetail(options.id);
  }
})
