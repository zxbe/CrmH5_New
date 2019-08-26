<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-guanbi1 f16 left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
        <a @click="posting" class="posting-btn right f16 lanText" data-lanid="1000244_发帖"></a>
    </header>

    <div class="content">
        <div class="post-title-div">
            <input v-model="postTitle" class="lanInputPlaceHolder post-title f16" data-lanid="1000298_请输入标题" type="text" maxlength="100"/>
            <div class="word-number f12"><span>{{titleCount}}/100</span></div>
        </div>
        <div class="post-content-div">
            <!-- <textarea class="lanInputPlaceHolder post-content f14" data-lanid="1000368_请输入内容"></textarea> -->
            <div id="postContent" class="lanInputPlaceHolder post-content f14" contenteditable="true" data-lanid="1000368_请输入内容"></div>
        </div>

        <!-- @ -->
        <div class="function">
            <input class="btn-item f18" id="" @click="selectUser" type="button" value="@" />
            <!-- <div class="btn-item f18" id="" @click="selectUser">@</div> -->
        </div>

        <div class="post-tag f14">
            <span class="lable lanText" data-lanid="1000302_标签"></span>
            <div class="tag-list" @click="goToTage">
                  <div class="tag-list-div">
                    <span v-for="item in selectTags" :key="item.AutoID" class="tag-item">{{item.Name}}</span>
                  </div>
                  <i class="arrow calcfont calc-you"></i>
            </div>
        </div>
    </div>


    <!-- 选择@用户 -->
    <div v-show="showLayer" class="layer selectList">
        <header class="header sticky">
            <a @click="layerBack" class="calcfont calc-fanhui left"></a>
            <h1 class="mui-title lanText" data-lanid="1000377_请选择用户"></h1>
            <a @click="layerSave" class="calc-gou  calcfont right" id="save"></a>
            <a @click="layerClear" class="calc-shanchu  calcfont right" id="clear"></a>
        </header>

        <div class="search">
            <div class="search-box">
                <span class="calcfont calc-sousuo input-search-icon"></span>
                <input
                  type="text"
                  id="searchInput"
                  class="search-input lanInputPlaceHolder" data-lanid="780_搜索" placeholder=""/>
            </div>
        </div>

        <div class="scroll-box">
              <vue-scroll
                v-show="!noData"
                :showToTop="false"
                :options="{ pullup: false, pulldown: false }"
                :scrollbar="false" ref="scroll">
                    <!-- 列表 -->
                    <div class="dataList checkboxList">
                        <div v-for="item in userList" :key="item.AutoID" class="item-div">
                            <label class="checkbox-label">
                            <input type="checkbox" name="checkbox" :value="item.AutoID" v-model="checkboxValue"/><i class="checkbox"></i><span class="radios f14">{{item.Realname}}</span>
                        </label>
                        </div>
                    </div>
              </vue-scroll>
              <nothing v-show="noData" style="padding-top:0.8rem;"></nothing>
        </div>

        <!-- 全选 -->
        <div class="selectAll">
            <div class="item-div">
                <label class="checkbox-label">
                    <input @click="layerSelectAll" type="checkbox" name="sex"/><i class="checkbox checkAll"></i>
                    <span class="lanText"	data-lanid="595_全部">all</span>
                </label>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import Scroll from '@/components/customPlugin/scroll/Scroll';
import Nothing from "@/components/customPlugin/Nothing"
export default {
  name:'forumposting',
  components:{
      'vue-scroll':Scroll,
      'nothing': Nothing
  },
  data(){
    return{
        title:lanTool.lanContent('1000244_发帖'),
        postTitle:'',
        str:'',
        postId:-1, // 帖子id -1：新增；非-1:编辑
        selectTags:[], //用户选择的标签
        sel:{},
        range:{},
        showLayer:false, //是否显示弹出选择@用户
        noData: false, //没数据
        userList: [
          // {
          //   "id": 52,
          //   "text": "abeyeung楊舒雅"
          // }, {
          //   "id": 558,
          //   "text": "ada kwong"
          // }, {
          //   "id": 398,
          //   "text": "Ada Wong"
          // }
        ], //存放用户列表数据
        checkboxValue: [],//选择@的用户
    }
  },
  computed: {
      titleCount:function(){
          var _self = this;
          return _self.postTitle.length;
      }
  },
  created:function(){
      var _self = this;
      //设置为Keep-Alive页面
      _self.$store.commit('SET_ITEM', 'forumposting');
      if(!tool.isNullOrEmptyObject(_self.$route.params.id)){
          _self.postId = _self.$route.params.id;
      }
      if( _self.postId != -1){
          _self.getPostData();
      }
  },
  mounted:function(){
    var _self = this;
    lanTool.updateLanVersion();
    //监听搜索
    _self.search();
    //查询用户列表
    _self.queryUserList();
  },
  activated:function(){
      var _self = this;
      //处理选择标签后返回来的逻辑
      _self.selectTags = _self.$store.state.selectTags || [];
  },
  methods:{
      //查询用户列表
      queryUserList:function(){
        let _self = this;
        //api接口地址
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_BaseUserBaseInfHandle_Query;
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            IsUsePager: false,
            PageSize: 1,
            PageNum: 10,
            QueryCondiction: []
        };
        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                // console.log(data);
                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    return;
                }
                data = data._OnlyOneData.Rows||[];
                data = data.filter(function(item){
                    return item.UserName != tool.UserName();
                })
                _self.userList = data;
            },
            error: function (jqXHR, type, error) {
                tool.hideLoading(loadingIndexClassName);
                console.log(error);
                return true;
            },
            complete: function () {
                //隐藏虚拟键盘
                document.activeElement.blur();
            }
        });
      },
      //在光标处插入@用户
      insertHtmlAtCaret:function(html) {
          var _self = this;
          /*
          var sel, range;
          // document.getElementById('postContent').focus();
          if (window.getSelection) {
              // IE9 and non-IE
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = sel.getRangeAt(0);
                  */
                  _self.range.deleteContents();
                  // Range.createContextualFragment() would be useful here but is
                  // non-standard and not supported in all browsers (IE9, for one)
                  var el = document.createElement("div");
                  el.innerHTML = html;
                  var frag = document.createDocumentFragment(), node, lastNode;
                  while ((node = el.firstChild)) {
                      lastNode = frag.appendChild(node);
                  }
                  _self.range.insertNode(frag);
                  // Preserve the selection
                  if (lastNode) {
                      _self.range = _self.range.cloneRange();
                      _self.range.setStartAfter(lastNode);
                      _self.range.collapse(true);
                      _self.sel.removeAllRanges();
                      _self.sel.addRange(_self.range);
                  }
                  /*
              }
          } else if (document.selection && document.selection.type != "Control") {
              // IE < 9
              document.selection.createRange().pasteHTML(html);
          }
          */
      },

      //返回上一页
      back:function(){
          this.$router.back(-1);
      },
      //发帖
      posting:function(){
        var _self = this;
        //获取内容
        var htmlContent = $('#postContent').html();
        var content = $('#postContent').text();
        var tagID = "";
        var tagIDArray = _self.selectTags || [];
        for(var i=0;i<tagIDArray.length;i++){
          if(tagIDArray[i]["AutoID"]<=-1){
            tagID += tagIDArray[i]["Name"] + ",";
          }else{
            tagID += tagIDArray[i]["AutoID"] + ",";
          }
        }
        tagID = tool.isNullOrEmptyObject(tagID)?"":tagID.substring(0,tagID.length-1);
        var theName = $("input.post-title").val() || "";

        //api接口地址
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_ForumHandle_PostSaveOrUpdate;
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            TagID:tagID,
            Theme:theName,
            HtmlContent:htmlContent,
            Content:content,
            AutoID:_self.postId || -1
        };
        var loadingIndexClassName = tool.showLoading();
        $.ajax({
            async: true,
            type: "post",
            url: urlTemp,
            data: jsonDatasTemp,
            success: function (data) {
                tool.hideLoading(loadingIndexClassName);
                data = tool.jObject(data);
                // console.log(data);
                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    console.log(tool.getMessage(data));
                    return;
                }
                _self.$store.commit('REMOVE_ITEM', 'forumlist');
                _self.$router.back(-1);
            },
            error: function (jqXHR, type, error) {
                tool.hideLoading(loadingIndexClassName);
                console.log(error);
                return true;
            },
            complete: function () {
                //隐藏虚拟键盘
                document.activeElement.blur();
            }
        });

      },
      //@用户
      selectUser:function(){
          var _self = this;
          document.getElementById('postContent').focus();
          var sel, range;
          if (window.getSelection) {
              // IE9 and non-IE
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = sel.getRangeAt(0);
                  //保存到全局中
                  _self.range = range;
                  _self.sel = sel;

                 //显示弹出
                 _self.showLayer = true;
                 //清除模糊查询的值
                 $("#searchInput").val("").trigger("click");

                  //ios下需要失去焦点，不然在选择用户的时候还看到光标
                 if (tool.getSystem() == 'ios') {
                    document.getElementById('postContent').blur();
                 }

              }
          }else if (document.selection && document.selection.type != "Control") {
              // IE < 9
              document.selection.createRange().pasteHTML(html);
          }
      },
      //去选标签
      goToTage:function(){
          var _self = this;
          var parameter = {
                'selectTags': _self.selectTags
              };
          _self.$router.push({
            name:'selecttag',
            params:parameter
          });
      },
      //若是从修改进来，获取帖子数据
      getPostData:function(){
      },
      //弹层的返回按钮事件
      layerBack:function(){
          var _self = this;
          _self.showLayer = false;
          _self.checkboxValue = [];
      },
      //弹层的保存
      layerSave:function(){
          var _self = this;
          //组装插入编辑框的str
          var str = '';
          $.each(_self.userList, function (index, item) {
              if( _self.checkboxValue.indexOf(item.AutoID) != -1){
                  str += '<a class="targetUserName" data-username="'+ item.UserName +'" contenteditable="false" style="color:#048ec6;">@'+ item.Realname +'</a>'
              }
          })
          _self.insertHtmlAtCaret(str);
          _self.showLayer = false;
          _self.checkboxValue = [];
      },
      //弹层的清楚动作
      layerClear:function(){
          var _self = this;
          _self.checkboxValue = [];
      },
      //弹层中的选择全部
      layerSelectAll:function(e){
          var self = this;
          var el = e.target,
              t = $(e.target).is(":checked");
          if (t) {
              $.each(self.userList, function (index, item) {
                  self.checkboxValue.push(item.AutoID);
              })
              console.log(self.checkboxValue);
          } else {
              self.checkboxValue = [];
          }
      },
      //弹层中的筛选
      search: function () {
          var _self = this;
          _self.$nextTick(function () {
              var listDom = $('.dataList');
              $('#searchInput').unbind().bind('input', function () {
                  var queryStr = $.trim($(this).val());
                  if (queryStr === '') {
                      listDom.find('div.item-div').show();
                  } else {
                      listDom.find('div.item-div').hide().filter(":lowerCaseContains('" + queryStr + "')").show();
                  }
              })
          });
      }
  },
  beforeRouteLeave:function(to, from, next){
    if(to.name == 'forumlist'){
        this.$store.commit('REMOVE_ITEM', 'forumposting');
    }
    next();
  }
}
</script>

<style scoped>
.mycalcfont {
  font-size: 0.48rem;
  text-align: center;
  padding: 0.2rem 10px;
  position: relative;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  line-height: 1;
  margin: 4px 0 0 4px;
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background: #fff;
}
.header .title-text{
    right: 40px;
    left: 40px;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
    position: absolute;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    line-height: 0.88rem;
}
.header .posting-btn{
  line-height:0.88rem;
  padding:0 10px;
  color:#7ebbff;
}

.content{
  padding:0.88rem 15px 0 15px;
}
.post-title-div{position: relative;border-bottom:1px solid #ccc;}
.content .post-title{
  border:none;
  outline: none;
  line-height: 16px;
  padding:10px 50px 10px 0;
  width: 100%;
  box-sizing: border-box;
}
.content .post-title::-webkit-input-placeholder{
    color:lightgrey;
}
.content .word-number{
  display: inline-block;
  position: absolute;
  right:0;
  bottom:15px;
  color:#ccc;
  line-height: 14px;
  height: 14px;
  overflow: hidden;
}
.post-content-div{
  padding-top:5px;
}
.post-content{
  border:none;
  outline: none;
  line-height:1.4;
  width: 100%;
  height:4rem;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  /* word-break:break-all; */
  word-break: normal;
  word-wrap: break-word;
  /* word-break:break-all; */
}
.post-content:empty::before{ color:lightgrey; content:attr(placeholder); }
.content .function{
  padding-top:20px;
}
.content .function .btn-item{
  background-color: transparent;
  background:#fff;
  outline: none;
  border:none;
  border: 0;
  color:#333;
  -webkit-appearance:none;
}
.post-tag{
  padding:20px 0 10px;
  display: flex;
}
.post-tag .lable{
  line-height: 32px;
  width: 0.8rem;
}
.post-tag .tag-list{
  flex: 1;
  padding:0 0px 5px 5px;
  min-height: 22px;
  position: relative;
  border-bottom:1px solid #ccc;
  /* border-radius: 5px; */
  display: flex;
  align-items: center;
}
.post-tag .tag-list .tag-list-div{flex: 1;}
.post-tag .tag-list .arrow{
  color:#ccc;
}
.post-tag .tag-item{
  padding: 2px 5px;
  background: #7ebbff;
  border-radius: 3px;
  margin: 5px 5px 0 0;
  display: inline-block;
  color:#fff;

}

/*弹出层 style*/
.layer{
  position:fixed;top:0;left:0;bottom:0;right:0;
  background: #fff;
  /* display: none; */
}
/*页面头部style*/
.layer header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  line-height: 0.2rem;
  background: #f8f2dc;
}
.layer .mui-title {
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 72%;
    font-size: 0.34rem;
    margin: 0 0 0 -10px;
    text-overflow: ellipsis;
    padding: 0;
    text-align: center;
    white-space: nowrap;
    line-height: 0.88rem;
}
.layer .calcfont {
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
    margin-left:-10px;
}
/* .selectList .header .calcfont{margin-left:-10px;} */
.layer .header .calc-fanhui {margin-left:0;}
.layer header .mui-title,.selectList header a {
    color: #333;font-weight: 400;
}
/*搜索框style*/
.layer .search {
    padding:10px 5px 5px;
    position: fixed;top:0.88rem;left:0;right:0;
}
.layer .search-box{
    line-height: 34px;
    position: relative;
    background: #f2f2f2;
}
.layer .search-input {
    padding: 10px 15px 10px 32px;
    box-sizing: border-box;
    height: 34px;
    border: 0;
    font-size: 16px;
    width: 100%;
    font-size: 14px;
    color: #999;
    line-height: 14px;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background: #f2f2f2;
    border-radius: 8px;
}
.layer .search .calc-sousuo {
    padding: 0;
    color: #333;
    position: absolute;
    left:5px;top:6px;
    width:23px;height: 23px;text-align: center;line-height: 23px;
    margin-left: 0;
}
/*滚动列表*/
.layer .scroll-box{
  position: fixed;
  left:0;right:0;bottom:50px;top:calc(0.88rem + 50px);
}
.scroll-box .item-div {
    padding: 10px;
    border-bottom: solid 1px beige;
}
.scroll-box .item-div label{display:block;line-height:40px;position: relative;margin:-10px 0;}
.scroll-box .item-div .checkbox-label .checkbox{position: absolute;left:0;top:12px;}
.scroll-box .item-div span {
    padding:10px 0  10px 26px;display: block;word-wrap : break-word;line-height: 20px;
}
/*全选*/
.layer .selectAll{
	position: fixed;
	left: 0;
	right: 0;
	height: 50px;
  line-height: 50px;
  padding-left:10px;
	bottom: 0;
  z-index: 2;
  background-color: rgb(245,245,245);
  color: gray;
}
.layer .selectAll .checkbox-label{position: relative;}
.layer .selectAll span{padding-left:26px;}
.layer .selectAll .item-div .checkbox-label .checkbox{
    top:2px;
    position: absolute;
    left: 0;
}

</style>
