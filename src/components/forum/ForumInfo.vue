<template>
<div>
    <!-- <Infoheader class="sticky infoheader" :isAddNew="isAddNew" :onlyView="onlyView" :operation="operation" :title="ptitle"></!--> 
    <header class="mui-bar mui-bar-nav">
        <a @click="back" class="calcfont calc-fanhui left" id="back"></a>

        <h1 class="mui-title f18">{{ptitle}}</h1>

        <a  @click="editClick" class="calcfont calc-fa-edit right" id="gengduo"></a>
        <a  @click="saveClick" class="calcfont calc-jieshu right" id="save"></a>
        <a  @click="delClick" class="calcfont calc-shanchu right" id="delete"></a>
    </header>
    <div class="pageContent">
        <p class="forumTitle">什么是stream定义流的英文stream，流（Stream）是一个抽象的数据接口</p>
        <div class="forumContentDiv">
            <img class="userHeadImg" src="../../assets/images/forum/default_user_img.png" alt="">
            <span class="userName">aoniruan</span>
            <p class="content">如果你觉得排版难看，请点击 下面链接 或者 拉到 下面关注公众号也可以吧【Vue原理】Computed - 源码版@dylanxu今天要记录 computed 的源码，有时候想，理解不就好了吗，为什么要记录一遍源码。现在终于想通了过了一段时间之后，你就会忘记你的所谓理解是怎么来的“哎，为什么会这么做，关系为什么是这样，我c…”于是，记录并简化源码，就有助我们迅速找到根源，解决我们的疑惑，还能加强我们的理解@alancheng好吧嗯，这篇文章很长很详细哦，做好阅读的准备，唔该我们重点说明，几个问题的源码实现</p>
            <div class="containTag">
                <span>web</span>
                <span>JS</span>
                <span>C#</span>
                <span>Vue</span>
                <span>web</span>
                <span>JS</span>
                <span>C#</span>
                <span>Vue</span><span>web</span>
                <span>JS</span>
                <span>C#</span>
                <span>Vue</span><span>web</span>
                <span>JS</span>
                <span>C#</span>
                <span>Vue</span><span>web</span>
                <span>JS</span>
                <span>C#</span>
                <span>Vue</span>
            </div>
            <div class="infoStatus">
                <span class="info-state">Unresolved</span>
                <span class="info-state">In Progress</span>
            </div>
            <div class="feeditemfooter">
                <span class="time">2019-08-08 13:03</span>
                <span class="hand">
                    <span class="calcfont calc-zan1"></span><span>3</span>
                </span>
                <span class="hand">
                    <span class="calcfont calc-cai"></span><span>1</span>
                </span>
                <span class="replies">
                    <span class="lanText" data-lanid="1000350_答复"></span><span>2</span>
                </span>
            </div>
        </div>
        <div class="replyList">
            <div class="replyItem">
                <img class="replyUserImg" src="../../assets/images/forum/default_user_img.png" />
                <span class="replyUserName">alancheng</span>
                <p class="replyContent">说明：视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题</p>
                <div class="feeditemfooter">
                    <span class="time">2019-08-07 22:00</span>
                    <span class="hand">
                        <span class="calcfont calc-zan1" data-autoid ="1"></span><span class="ActionCount">3</span>
                    </span>
                    <span class="hand">
                        <span class="calcfont calc-cai" data-autoid ="1"></span><span class="ActionCount">2</span>
                    </span>

                </div>
            </div>
          <div class="replyItem">
                <img class="replyUserImg" src="../../assets/images/forum/default_user_img.png" />
                <span class="replyUserName">alancheng</span>
                <p class="replyContent">说明：视频播放的这个例子，如果我们不使用管道和流动的方式，直接先从服务端加载完视频文件，然后再播放。会造成很多问题</p>
                <div class="feeditemfooter">
                    <span class="time">2019-08-07 22:00</span>
                    <span class="hand">
                        <span class="calcfont calc-zan1" data-autoid ="2"></span><span class="ActionCount">3</span>
                    </span>
                    <span class="hand">
                        <span class="calcfont calc-cai" data-autoid ="2"></span><span class="ActionCount">2</span>
                    </span>

                </div>
            </div>
        </div>

    </div>
    <div class="replayDiv">
        <input class="reply" type="text" placeholder="想对Ta说点什么">
    </div>

       <div id="closeThis" class="elastic-layer">
        <div class="elastic-layer-content">
            <div class="elastic-layer-title lanText f18" data-lanid="1060_帖子结果"></div>

            <div class="elastic-layer-items">
                <div class="elastic-layer-item f14">
                    <span class="nessesary f18">*</span>
                    <div class="ListCellContentLeft leftContent">
                        <div class="ListCellContentLeftText lanText" data-lanid="1060_帖子结果"></div>
                    </div>
                    <div class="ListCellContentRight rightContent">
                        <input type="text"
                              data-field="BusinessType"
                              data-lanid="1060_帖子结果"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_ViewBaseAllTypes"
                              TypeValue="Companybusinesstype"
                              class="ListCellContentRightText"/>
                    </div>
                    <!-- <div class="ListCellContentRight rightContent">
                        <input type="text"
                              data-field="Matter"
                              data-lanid="947_商业事项"
                              data-fieldControlType="picker"
                              data-fieldVal=""
                              Code="DropDowList_DtbAllTypes"
                              TypeValue="Matter"
                              class="ListCellContentRightText"/>
                    </div> -->
                    <div class="ListCellRightIcon"><span class="calcfont calc-you"></span></div>
                </div>
            </div>
            <div class="btn-div">
                <a href="javascript:;" class="mybtn btn-ok lanText" data-lanid="545_确定"></a>
                <a href="javascript:;" class="mybtn btn-cancel lanText" data-lanid="570_取消"></a>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import Infoheader from '@/components/customPlugin/Infoheader'
export default {
    components: {
        Infoheader,
    },
    data() {
        return {
            isAddNew: true,
            onlyView: true,
            operation: false,
            ptitle: lanTool.lanContent("1000369_论坛详情")
        }
    },
    created: function () {

    },
    mounted: function () {
      var _self = this;
        lanTool.updateLanVersion();
        tool.InitiateInfoPageControl(_self, _self.id, function(){});
    },
    methods: {
        back: function () {
            this.$router.back(-1);
        },
        //编辑事件
        editClick:function(){
          console.log("编辑");
        },
        //保存事件
        saveClick:function(){
          console.log("保存");
           var _self = this;
            $('#closeThis').show();

            //取消
            $('#closeThis').find('a.btn-cancel').off('click').on('click',function(){
                $('#closeThis').hide();
            })

            //确定
            $('#closeThis').find('a.btn-ok').off('click').on('click',function(){
                console.log("确定");
                 $('#closeThis').hide();
            })
        },
        //删除事件
        delClick:function(){
          	tool.showConfirm(
			lanTool.lanContent("593_您确定要删除数据吗？"),
			function() {
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
							return true;
						}

						if (!tool.isNullOrEmptyObject(myCallBack)) {
							myCallBack();
						}

						//返回到上一页
						_self.$router.back(-1);
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
    }
}
</script>

<style scoped>
@import "../../assets/css/pages/calendarinfo.css";
@import "../../assets/css/forum/ForumInfo.css";
</style>
