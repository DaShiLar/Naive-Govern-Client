'use strict';
var HOST_URI = 'https://45053688.hazelnutsgz.com/';

// 获取所有节点
var ALL_NODES_LIST = 'api/nodes';

//获取最热文章列表
var HOTEST_LIST = 'api/passages/hotest'

//获取最近文章列表
var LATEST_LIST = 'api/passages/latest'

// 获取某一节点下的文章列表 
// para: node_id
var NODE_LIST = 'api/passages/node';
 
 //获取某一篇文章的具体内容
 //para: passage_id
 var PASSAGE_DETAIL = "api/detail/passage"

 //返回某一篇文章的评论列表
 //para: passage_id
 var COMMENT_DETAIL_LIST = "api/detail/comment"


// 获取用户信息
//TODO 此接口目前保留
var GET_USERINFO = 'members/';


//提交评论
var POSTCOMMENT = 'post/comment'


//用map的方法把函数转换
function _obj2uri(obj){
	return Object.keys(obj).map(function(k) {
		return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
	}).join('&');
}


function _getAllNodesList(){
	return HOST_URI+ALL_NODES_LIST;
}

function _getHotestList(){
  return HOST_URI+HOTEST_LIST;
}

function _getLatestList(){
  return HOST_URI+LATEST_LIST;
}

function _getNodeList(obj){
  return HOST_URI+NODE_LIST+'?'+_obj2uri(obj);
}

function _getPassageDetail(obj){
  return HOST_URI+PASSAGE_DETAIL+'?'+_obj2uri(obj);
}

function _getCommentDetailList(obj){
  return HOST_URI+COMMENT_DETAIL_LIST+'?'+_obj2uri(obj);
}

function _postComment(){
  return HOST_URI+POSTCOMMENT;
}



module.exports = {
	getAllNodesList: _getAllNodesList,
  getHotestList: _getHotestList,
  getLatestList: _getLatestList,
  getNodeList: _getNodeList,
  getPassageDetail: _getPassageDetail,
  getCommentDetailList: _getCommentDetailList,

  postComment: _postComment
};