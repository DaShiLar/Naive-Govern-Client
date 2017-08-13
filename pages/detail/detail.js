// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    replies: [],
    owner_avatar: '',
    hidden: false,
    radios: [{id: 1,checked:false,value:'点赞'},
             {id: 2,checked: false,value:'中立'},
             {id: 3, checked: false, value: '反对'}
      ],
    passage_id: -1,
    attitude: -1
  },

  listenerRadioGroup: function(e){
    console.log(e.detail.value);
    this.data.attitude = e.detail.value;
  },

  bindFormSubmit: function (e) {
    var valid=false;
    var that = this;
    var text = e.detail.value;
    var attitude = this.data.attitude;
    var passage_id = that.data.passage_id;
    console.log(attitude);
    console.log(text);
    console.log(passage_id);
    if (attitude==-1){
      wx.showToast({
        title: '请选择你的观点',
        icon: 'fail',
        duration: 2000
      });
    }else{
      wx.request({
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          post_data: JSON.stringify({
              passage_id: passage_id,
              comment_incline: attitude,
              comment_content: text
            })
        },
        url: Api.postComment(),
        success: function(e){
          wx.showToast({
            title: '成功提交请求',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    }
  },

  bindFormReset: function () {
    console.log("Reset");
  },

  fetchDetail: function(id) {
    var that = this;
    console.log("detail id is "+id);
    wx.request({
      url: Api.getPassageDetail({
        passage_id: id
      }),
      success: function(res) {
        console.log(res);
        that.setData({
          detail: res.data[0],
          owner_avatar: '/images/'+res.data[0].passage_owner+'.jpg'
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
    });
    this.setData({
      passage_id: options.id
    });
    console.log("option id "+options.id);
    this.fetchDetail(options.id);
  }
})
