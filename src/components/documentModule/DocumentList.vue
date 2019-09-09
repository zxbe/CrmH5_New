<template>
<div>

<div class="meetingRecord">
  <div class="headerBlock">
      <div class="headerBlockLeftIcon">
        <span class="calcfont calc-wendang2"></span>
      </div>
      <div data-lanid="750_文档" class="headerBlockContent f16 lanText"></div>

      <div v-show="addible=='true'" class="headerBlockRightIcon controlEdit">
        <span @click="goUpload($event)" data-url="/MeetingNoteinfo/-1" class="calcfont calc-jia"></span>
      </div>

    </div>
</div>

 <!-- 会议记录文档列表  -->
<div class="meetingDocList">
    <div v-for="fileItem in documentData" :key="fileItem.ObjectName" class="docListCell">
        <div class="docListCellLeft" @click="goFileInfo(fileItem)">
            <div class="docListCellLeftContent f12"><span class="calcfont calc-fujian"></span>{{fileItem.ObjectName}}</div>
        </div>
        <div class="docListCellRight">
            <div class="docListCellRightContent">{{fileItem.AddTime|MeetingTimeFormat}}</div>
        </div>
        <div v-show="deletable=='true'" class="headerDivRightDelete controlEdit"  @click="deleteFile(fileItem,$event)" >
            <span class="calcfont calc-delete"></span>
        </div>
    </div>
</div>


</div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['documentData','addible','deletable','sourceId','fromTypeID','fromID'],
  created:function(){
  },
  methods:{
    //点击去文件详情页
    goFileInfo:function(data){
        if(tool.isNullOrEmptyObject(data)){
            return ;
        }
        this.$router.push({path:'/previewfile', query: data});
    },
    //删除文件
    deleteFile:function(fileItem,e){
        var _self = this;
        var autoID = fileItem.AutoID||"";
        if(tool.isNullOrEmptyObject(autoID)){
          return;
        }

        var autoIDArray = new Array();
        var obj = {
            AutoID:autoID,
            FromID:fileItem["FromID"]||"",
            ObjectName:fileItem["ObjectName"]||"",
        };
        autoIDArray.push(obj);

        tool.showConfirm(
            lanTool.lanContent("593_您确定要删除数据吗？"),
            function() {
                var loadingIndexClassName = tool.showLoading();
                var urlTemp = tool.AjaxBaseUrl();
                var controlName = tool.Api_DocumentsHandle_Delete;
                //传入参数
                var jsonDatasTemp = {
                    CurrentLanguageVersion: lanTool.currentLanguageVersion,
                    UserName: tool.UserName(),
                    _ControlName: controlName,
                    _RegisterCode: tool.RegisterCode(),
                    AutoID: JSON.stringify(autoIDArray),
                    FromID: _self.fromID||""
                };

                $.ajax({
                    async: true,
                    type: "post",
                    url: urlTemp,
                    data: jsonDatasTemp,
                    success: function (data) {
                        tool.hideLoading(loadingIndexClassName);
                        data = tool.jObject(data);
                        if (data._ReturnStatus == false) {
                            tool.showText(tool.getMessage(data));
                            return true;
                        }

                        // //刷新会议列表
                        // var fromType = "Opportunitiesinfo";
                        // //渲染会议记录列表
                        // _self.iniMeetingNoteList();

                        //渲染会议记录列表
                        _self.$parent.InitDocList(_self.meetingId);
                    },
                    error: function (jqXHR, type, error) {
                        console.log(error);
                        tool.hideLoading(loadingIndexClassName);
                        return true;
                    },
                    complete: function () {
                        //tool.hideLoading();
                        //隐藏虚拟键盘
                        document.activeElement.blur();
                    }
                });

            },
            function() {}
        );

    },
    //点击去上传页面
    goUpload: function (e) {
        var _self = this;
        if(tool.isNullOrEmptyObject(_self.fromID)){
          return;
        }
        var url = "/uploadinput";
        var parameter = {
            FromID:_self.fromID,
            FromTypeID:_self.fromTypeID||""
        };
        _self.$router.push({
            path: url,
            query: parameter
        });
    }
  }
}
</script>

<style scoped>
.meetingRecord {
    margin-top: 10px;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background-color: #fff;
}
.headerBlock {
    position: relative;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    padding: 10px 0;
}
.headerBlock:after {
    position: absolute;
    content: '';
    left: 0.6rem;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #F5F5DC;
}

.headerBlock .headerBlockLeftIcon {
    width: 0.6rem;
    margin: auto 0;
}

.headerBlock .headerBlockLeftIcon .calcfont {
    font-size: 0.44rem;
    color: #8a8a8a;
}
.headerBlock .headerBlockContent {
    width: calc(100% - 1.16rem);
    margin: auto 0;
    color: #FF5A21;
}

.headerBlock .headerBlockRightIcon {
    width: 0.56rem;
    text-align: right;
    margin: auto 0;
}

.headerBlock .headerBlockRightIcon .calcfont {
    font-size: 0.4rem;
    color: #FF5A21;
}



/*列表*/
.meetingDocList {
    padding:0 0.3rem;
    background: #fff;
}
.meetingDocList .docListCell {
    position: relative;
    display: flex;
    height: 1rem;
    line-height: 1rem;
}
.meetingDocList .docListCell:after {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #F5F5DC;
}
.meetingDocList .docListCellLeft {
    width: 58%!important;
    font-size: 0.28rem;
    color: #2A79C8;
}
.meetingDocList .docListCellLeft .docListCellLeftContent{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:#2a79c8;
}

.meetingDocList .docListCellRight {
    width: 36%!important;
    font-size: 0.28rem;
    text-align: left;
}

.docListCellLeftContent span {
    color: #FF5A21;
    display: inline-block;
    width: 0.5rem;
}

.meetingDocList .headerDivRightDelete {
    width: 0.4rem;
    margin: auto 0;
}
.meetingDocList .headerDivRightDelete .calcfont {
    font-size: 0.4rem;
    color: #aaaaaa;
}

</style>

