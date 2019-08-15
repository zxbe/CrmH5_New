<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
        <a @click="save" class="mycalcfont calcfont calc-gou right"></a>
    </header>

    <div class="content">

        <div v-show="showAddTag" class="add-tag">
            <input v-model="newTag" id="addInput" type="text" class="input lanInputPlaceHolder" data-lanid="1000370_请输入标签" />
            <!-- <div class="add-btn lanText" data-lanid="28_新增"></div> -->
        </div>

        <div class="content-title">
          <i class="f18 calcfont calc-yixuan1"></i>
          <span class="f16 lanText" data-lanid="1000371_已选标签"></span>
        </div>
        <div class="tag-list f14 ">
            <div
              v-for="item in selectTagData"
              :key="item.AutoID"
              class="item left"
              >{{item.Name}}<span @click="removeTag(item.AutoID)" class="remove-tag calcfont calc-shanchu1"></span>
              </div>

              <div class="clear"></div>
        </div>

        <div class="content-title">
          <i class="f18 calcfont calc-fenlei"></i>
          <span class="lanText f16" data-lanid="1000295_所有标签"></span>
        </div>

        <div class="tag-list f14 ">
            <!-- 字段IsFollow值为fa-star表示关注；fa-star-o表示未关注 -->
            <div
              v-for="item in allTagData"
              :key="item.AutoID"
              :data-id="item.AutoID"
              class="item left"
              :class="{'active': selectTagId.indexOf(item.AutoID) == -1 ? false : true}"
              @click="selectTag(item, $event)"
              >{{item.Name}}</div>

            <div v-show="!showAddTag" @click="showAdd" class="item left calcfont calc-jiahao f14"></div>
            <div class="clear"></div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data(){
      return{
        title:'选择标签',
        showAddTag:false, //是否显示添加标签输入框
        newTag:'', //新增的标签
        allTagData:[],
        selectTagData:[],  //用户选择的标签对象
      }
    },
    computed:{
        selectTagId(){  //用户选择的标签id集合，用于初始化页面时标志是否已经选择
          var _self = this;
          var arr = [];
          if(_self.selectTagData.length > 0){
              $.each(_self.selectTagData,function(index, item){
                  arr.push(item.AutoID);
              })
          }
          return arr;
        }
    },
    created:function(){
      var _self = this;
      //获取已选择的标签
      _self.selectTagData = _self.$route.params.selectTags || [];
      //获取全部标签
      _self.getAllTag();
    },
    mounted:function(){
      let _self = this;
      lanTool.updateLanVersion();
    },
    methods:{
        //返回上一页
        back:function(){
            this.$router.back(-1);
        },
        //保存动作
        save:function(){
            var _self = this;
            var newTag = {};
            if(!tool.isNullOrEmptyObject(_self.newTag)){
               //有新增的标签，组装AutoID=-1的对象
                newTag.AutoID = -1;
                newTag.Name = _self.newTag;

                _self.selectTagData.push(newTag);
            }
            //保存到 store 中 ,先清空再保存
            _self.$store.commit('SET_SELECT_TAGS');
            _self.$store.commit('SET_SELECT_TAGS', _self.selectTagData);
            _self.$router.back(-1);
        },
        //移除已选的标签
        removeTag:function(id){
            var _self = this;
            if(tool.isNullOrEmptyObject(id)){
                return;
            }
            //根据 id 移除 selectTagData 中的对象
            _self.selectTagData = _self.selectTagData.filter(function(obj){
                return obj.AutoID != id ? true : false;
            });
            //移除dom中的active类
            $('div[data-id="'+id+'"]').removeClass('active');

        },
        //选择标签
        selectTag:function(item , e){
            var _self = this;
            var curObj = $(e.target) || '';
            //如果已经选择了就不做处理
            if(curObj.hasClass('active')){
              return ;
            }
            var obj = {
              "AutoID": item.AutoID,
              "Name": item.Name
            }
            if(!tool.isNullOrEmptyObject(curObj)){
                _self.selectTagData.push(obj);
                curObj.addClass('active');
            }
        },
        //显示添加标签输入框
        showAdd:function(){
            var _self = this;
            _self.showAddTag = !_self.showAddTag;
            $('#addInput').focus();
        },

        //获取所有标签
        getAllTag:function(){
          var _self = this;
          //api接口地址
          var urlTemp = tool.AjaxBaseUrl();
          var controlName = tool.Api_ForumHandle_TagQuery;
          var jsonDatasTemp = {
              CurrentLanguageVersion: lanTool.currentLanguageVersion,
              UserName: tool.UserName(),
              _ControlName: controlName,
              _RegisterCode: tool.RegisterCode(),
              IsUsePager: false,
              PageSize: 1,
              PageNum: 10,
              QueryCondiction: [],
              IsContainAll: false
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
                  data = data._OnlyOneData.Rows || [];
                  
                  //循环selectTagData找出AutoID为-1
                  $.each(_self.selectTagData, function(index, item){
                      if(item.AutoID <= -1){
                          data.push(item);
                      }
                  })
                  _self.allTagData = data;
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
        }
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
  padding:0.88rem 15px 15px;
}
.content-title{padding:10px 0;}
.content-title i{margin-right: 5px;color:#8b8d8c;}

/* .content .tag-list{max-height: } */
.content .item{
  padding:8px 12px;
  border:1px solid #e3e3e3;
  margin: 5px 10px 5px 0;
  border-radius: 5px;
  position:relative;
}
.content .item.active{
  color:rgb(255, 90, 33);
}
.content .item .remove-tag{
  position:absolute;right:-7px;top:-8px;
  color:#e3e3e3;
  background: #fff;
}



.add-tag{
  padding:10px 0 0;
  display:flex;
  align-items: center;
}
.add-tag .input{
    flex: 1;
    border: none;
    outline: none;
    line-height: 16px;
    padding: 10px 10px 10px 0;
    /* width: 100%; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom:1px solid #ccc;
}
/* .add-tag .add-btn{
  border:1px solid #ccc;
  border-radius: 5px;
  padding:3px 8px;
  margin-left: 10px;
} */

</style>
