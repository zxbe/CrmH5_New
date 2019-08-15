<template>
<div>
    <header class="mui-bar mui-bar-nav">
            <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
            <h1 class="mui-title f18">{{title}}</h1>
            <!-- <a @click="relationAction" class="calcfont calc-gou right" id=""></a> -->
    </header>

    <div class="page-content disable">
        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="563_编号"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.bianh"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="710_标题"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.requestname"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000257_提交人"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.loginid"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000258_申请日期"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.shenqrq}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000259_职务"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.jobtitlename"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000260_所属部门"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.departmentname"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000277_项目名称"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.xiangmmc"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000261_计划签署日期"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.jihqsrq"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000262_项目亮点及航空公司背景简介"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.xiangmldjbj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000263_交付部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.jiaofbyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000264_工程部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.gongcbyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000265_法务部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.fawbyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000266_融资部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.Bankable" name="inlineRadioOptions1" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Bankable</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.NonBankable" name="inlineRadioOptions1" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Non-bankable, Limit Remains:</span>
                </label>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000267_定价团队审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">
                <div class="lanText paddingB5" data-lanid="1000268_批准要求"></div>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.COO" name="inlineRadioOptions2" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">COO</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.CEO" name="inlineRadioOptions2" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">CEO</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.SC" name="inlineRadioOptions2" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">SC</span>
                </label>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000269_税务团队审阅意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.shuiwtdyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000270_首席运营官审阅意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.shouxyygyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000271_首席商务官审批"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.shouxswg"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000272_飞机租赁总监意见"></span><span>:</span>
            </div>
            <div class="item-value auto-line-feed" v-html="dataModel.feijzlzjyj"></div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000273_首席执行官审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.check1" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Go Ahead (Non-bankable)</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.rongzfs" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Financing Method</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.check2" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Project Finance</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.check3" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Self-Funded</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.check5" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">JOLCO</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.check4" name="inlineRadioOptions3" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">Other:</span>
                </label>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000274_合同事务经理填写"></span><span>:</span>
            </div>
            <div class="item-value">
                  <div class="paddingB5">
                    <span class="lanText" data-lanid="1000275_合同签署日期"></span>
                    <span v-html="dataModel.hetqsrq"></span>
                  </div>
                  <div class="auto-line-feed" v-html="dataModel.shenhyj"></div>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000276_公司秘书填写"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.None" name="inlineRadioOptions4" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">无</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.DisclosableTransaction" name="inlineRadioOptions4" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">可披露交易</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.MajorTransaction" name="inlineRadioOptions4" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">主要交易</span>
                </label>
                <label class="checkbox-label">
                    <input type="radio" v-model="dataModel.VSAVSD" name="inlineRadioOptions4" value="1"/>
                    <i class="checkbox"></i><span class="radios f14">VSA/VSD</span>
                </label>
            </div>
        </div>

    </div>
</div>
</template>


<script>
export default {
  data(){
    return{
      title:lanTool.lanContent('1000227_LOI单号'),
      loiId:'',
      dataModel:{
        //   bianh:'',
        //   requestname:'',
        //   loginid:'',
        //   shenqrq:'',
        //   jobtitlename:'',
        //   departmentname:'',
        //   xiangmmc:'',
        //   jihqsrq:'',
        //   xiangmldjbj:'',
        //   jiaofbyj:'',
        //   gongcbyj:'',
        //   fawbyj:'',
        //   rongzbyj:[],
        //   dingjtdyj:[],
        //   shuiwtdyj:'',
        //   shouxyygyj:'',
        //   shouxswg:'',
        //   feijzlzjyj:'',
        //   shouxzxgyj:[],
        //   //合同事务经理填写:
        //   hetqsrq:'',
        //   shenhyj:'',

        //   shenhyj1:['None','VSAVSD']
      }

    }
  },
  created:function(){
      var _self = this;
      _self.loiId = _self.$route.params.id || '';
      //console.log(_self.loiId);
      //查询LOI单详情
      _self.querySingle();
  },
  mounted:function(){
    lanTool.updateLanVersion();
  },
  methods:{
      back:function(){
        this.$router.back(-1);
      },
      //查询LOI单详情
      querySingle:function(){
        let _self = this;
        var urlTemp = tool.AjaxBaseUrl();
        var controlName = tool.Api_OALOIHandle_QuerySingle;
        //传入参数
        var jsonDatasTemp = {
            CurrentLanguageVersion: lanTool.currentLanguageVersion,
            UserName: tool.UserName(),
            _ControlName: controlName,
            _RegisterCode: tool.RegisterCode(),
            AutoID:_self.loiId
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
                if (data._ReturnStatus == false) {
                    tool.showText(tool.getMessage(data));
                    return true;
                }
                data = data._OnlyOneData || {};
                console.log(data);
                _self.dataModel = data;
            },
            error: function (jqXHR, type, error) {
                console.log(error);
                tool.hideLoading(loadingIndexClassName);
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
header.mui-bar {
  position: fixed;
  background: #f8f2dc;
  overflow: hidden;
  top:0;left:0;right:0;
  z-index: 9;
}
.mui-bar .calcfont{
    font-size: 0.48rem;
    text-align: center;
    padding: 0.2rem 10px;
    position: relative;
    z-index: 20;
    display: inline-block;
    text-decoration: none;
    line-height: 1;
}
.mui-bar .mui-title {
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


.disable {
    pointer-events: none;
}

.page-content{
  padding-top:0.88rem;
  padding:1rem 10px 10px 10px;
}
.item{
    position: relative;
    padding-bottom:10px;
}
.item::after{
    position: absolute;
    content: "";
    left: 0;
    right:0;
    bottom: 0;
    height: 1px;
    background-color: beige;
}
.label{
  padding:8px 0;
  color:#000;
}
.item-value{
    color:#545454;
}
.auto-line-feed{
    word-wrap: break-word;
    word-break: normal;
}

.item-value label{
  display:flex;
  padding-bottom: 5px;
}
.item-value label .radios{flex:1}

.paddingB5{padding-bottom: 5px;}

/*checkbox style*/
label.checkbox-label .checkbox{
    width: 15px;
    height: 15px;
    border-color: #ccc;
    margin-right: 5px;
    margin-top:2px;
}
label.checkbox-label input:checked+.checkbox{
    background: none;
    border: 1px solid #ccc;

}
label.checkbox-label input:checked+.checkbox:after{
    width: 8px;
    height: 4px;
    top: -1px;
    left: 1px;
    border-color:#999;
}

</style>
