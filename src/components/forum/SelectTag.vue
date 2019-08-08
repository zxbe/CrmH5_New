<template>
<div>
    <header class="header">
        <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
        <h1 class="title-text f18">{{title}}</h1>
        <a @click="save" class="mycalcfont calcfont calc-gou right"></a>
    </header>

    <div class="content">

        <div v-show="showAddTag" class="add-tag">
            <input id="addInput" type="text" class="input lanInputPlaceHolder" data-lanid="1000370_请输入标签" />
        </div>

        <div class="content-title">
          <i class="f18 calcfont calc-fenlei"></i>
          <span class=" f16">已选标签</span>
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
        allTagData:[
          {
            "AutoID": 7,
            "Name": "Web",
            "InternalSort": null,
            "PostCount": 18,
            "IsFollow": "fa-star"
          }, {
            "AutoID": 8,
            "Name": "JS",
            "InternalSort": null,
            "PostCount": 8,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 11,
            "Name": "python",
            "InternalSort": null,
            "PostCount": 4,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 14,
            "Name": "C#",
            "InternalSort": 100,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 13,
            "Name": "React",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 4,
            "Name": "Boeing",
            "InternalSort": null,
            "PostCount": 4,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 5,
            "Name": "CALC",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 10,
            "Name": "NodeJS",
            "InternalSort": null,
            "PostCount": 3,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 6,
            "Name": "M737Max",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 3,
            "Name": "AirBus",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 15,
            "Name": "前端",
            "InternalSort": null,
            "PostCount": 3,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 2,
            "Name": "MRO",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 12,
            "Name": "m787",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 9,
            "Name": "Proxy",
            "InternalSort": null,
            "PostCount": 2,
            "IsFollow": "fa-star-o"
          }, {
            "AutoID": 16,
            "Name": "A320",
            "InternalSort": null,
            "PostCount": 1,
            "IsFollow": "fa-star-o"
          }
        ],
        selectTagData:[
            // {
            //   "AutoID": 7,
            //   "Name": "Web"
            // }
        ]
      }
    },
    created:function(){

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
  position:absolute;right:-5px;top:-6px;
}



.add-tag{
  padding:10px 0 0;
  border-bottom:1px solid #ccc;
  /* display:none */
}
.add-tag .input{
    border: none;
    outline: none;
    line-height: 16px;
    padding: 10px 10px 10px 0;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

</style>
