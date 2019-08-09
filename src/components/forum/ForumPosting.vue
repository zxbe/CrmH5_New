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
            <span @click="selectUser">@</span>
            <input id="innerUser" @click="innerUser"  type="button" value="@" />
        </div>

        <div class="post-tag f14">
            <span class="lable lanText" data-lanid="1000302_标签"></span>
            <div class="tag-list" @click="goToTage">

                  <span v-for="item in selectTags" :key="item.AutoID" class="tag-item">{{item.Name}}</span>

                  <i class="arrow calcfont calc-you"></i>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
  name:'forumposting',
  data(){
    return{
        title:'发帖',
        postTitle:'',
        str:'',
        postId:-1, // 帖子id -1：新增；非-1:编辑
        selectTags:[], //用户选择的标签
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
      _self.$store.commit('SET_ITEM', 'forumposting');
      if(!tool.isNullOrEmptyObject(_self.$route.params.id)){
          _self.postId = _self.$route.params.id;
      }

      if( _self.postId != -1){
          _self.getPostData();
      }

  },
  mounted:function(){
    lanTool.updateLanVersion();
  },
  activated:function(){
        var _self = this;


        //处理选择标签后返回来的逻辑
        _self.selectTags = _self.$store.state.selectTags || [];
        //清空store中 selectTags 变量
        _self.$store.commit('SET_SELECT_TAGS');

        //处理@功能返回来的逻辑
        if(!tool.isNullOrEmptyObject(eventBus.selectListData)){

            var selectUser = eventBus.selectListData;
            //清空全局变量
            eventBus.selectListData = null;
            selectUser = selectUser.value.text.split(',');

            if(selectUser==''|| selectUser.length<1 ){
                return;
            }
            //把选择的用户插入帖子内容中
            var str = '';
            for(var i=0; i<selectUser.length; i++){
              str += '<a class="targetUserName" data-username="'+ selectUser[i] +'" contenteditable="false" style="color:#048ec6;white-space: nowrap;">@'+ selectUser[i] +'</a>'
            }
            _self.str = str;

            // $('#innerUser').trigger('click');
            document.getElementById('postContent').focus();
            _self.insertHtmlAtCaret(_self.str);
        }
  },
  methods:{
      //在光标处插入@用户
      insertHtmlAtCaret:function(html) {

          var sel, range;
          if (window.getSelection) {
              // IE9 and non-IE
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                  range = sel.getRangeAt(0);
                  range.deleteContents();
                  // Range.createContextualFragment() would be useful here but is
                  // non-standard and not supported in all browsers (IE9, for one)
                  var el = document.createElement("div");
                  el.innerHTML = html;
                  var frag = document.createDocumentFragment(), node, lastNode;
                  while ((node = el.firstChild)) {
                      lastNode = frag.appendChild(node);
                      console.log(lastNode);
                  }
                  range.insertNode(frag);
                  // Preserve the selection
                  if (lastNode) {
                      range = range.cloneRange();
                      range.setStartAfter(lastNode);
                      range.collapse(true);
                      sel.removeAllRanges();
                      sel.addRange(range);
                  }
              }
          } else if (document.selection && document.selection.type != "Control") {
              // IE < 9
              document.selection.createRange().pasteHTML(html);
          }
      },

      //返回上一页
      back:function(){
          this.$router.back(-1);
      },
      //发帖
      posting:function(){

      },
      //@用户
      selectUser:function(){
          var _self = this;
          var parameter = {
              addUrl: "",
              code: "DropDowList_AccountManager",
              field: "Participants",
              filter: "",
              fromType: "",
              linkIDField: "",
              linkNameField: "",
              selectType: "checkbox",
              title: "Participants",
              typeValue: "",
              value: ""
            };
            _self.$router.push({
              path: '/selectlist',
              query: parameter
            });
      },
      //插入
      innerUser:function(){
        var _self = this;

        _self.str = '<b contenteditable="false">InerHtml</b>'
        document.getElementById('postContent').focus();
        _self.insertHtmlAtCaret(_self.str);
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
.post-title-div{position: relative;}
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
}
.post-content:empty::before{ color:lightgrey; content:attr(placeholder); }
.content .function{
  padding-top:20px;
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
  padding:0 15px 5px 5px;
  min-height: 22px;
  position: relative;
  border-bottom:1px solid #ccc;
  /* border-radius: 5px; */
}
.post-tag .tag-list .arrow{
  position: absolute;right:0;top:6px;color:#ccc;
}
.post-tag .tag-item{
  padding: 2px 5px;
  background: #7ebbff;
  border-radius: 3px;
  margin: 5px 5px 0 0;
  display: inline-block;

}
</style>
