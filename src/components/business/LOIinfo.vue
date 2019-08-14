<template>
<div>
    <header class="mui-bar mui-bar-nav">
            <a @click="back" class="calcfont calc-fanhui left" id="back"></a>
            <h1 class="mui-title f18">{{title}}</h1>
            <!-- <a @click="relationAction" class="calcfont calc-gou right" id=""></a> -->
    </header>

    <div class="page-content">
        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="563_编号"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.bianh}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="710_标题"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.requestname}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000257_提交人"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.loginid}}</div>
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
            <div class="item-value">{{dataModel.jobtitlename}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000260_所属部门"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.departmentname}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000277_项目名称"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.xiangmmc}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000261_计划签署日期"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.jihqsrq}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000262_项目亮点及航空公司背景简介"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.xiangmldjbj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000263_交付部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.jiaofbyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000264_工程部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.gongcbyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000265_法务部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.fawbyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000266_融资部审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.rongzbyj" name="inlineRadioOptions1" value="Bankable"/>
                    <i class="checkbox"></i><span class="radios f14">Bankable</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.rongzbyj" name="inlineRadioOptions1" value="NonBankable"/>
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
                    <input type="checkbox" v-model="dataModel.dingjtdyj" name="inlineRadioOptions2" value="COO"/>
                    <i class="checkbox"></i><span class="radios f14">COO</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.dingjtdyj" name="inlineRadioOptions2" value="CEO"/>
                    <i class="checkbox"></i><span class="radios f14">CEO</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.dingjtdyj" name="inlineRadioOptions2" value="SC"/>
                    <i class="checkbox"></i><span class="radios f14">SC</span>
                </label>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000269_税务团队审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.shuiwtdyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000270_首席运营官审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.shouxyygyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000271_首席商务官审批"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.shouxswg}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000272_飞机租赁总监意见"></span><span>:</span>
            </div>
            <div class="item-value">{{dataModel.feijzlzjyj}}</div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000273_首席执行官审阅意见"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="check1"/>
                    <i class="checkbox"></i><span class="radios f14">Go Ahead (Non-bankable)</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="rongzfs"/>
                    <i class="checkbox"></i><span class="radios f14">Financing Method</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="check2"/>
                    <i class="checkbox"></i><span class="radios f14">Project Finance</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="check3"/>
                    <i class="checkbox"></i><span class="radios f14">Self-Funded</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="check5"/>
                    <i class="checkbox"></i><span class="radios f14">JOLCO</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shouxzxgyj" name="inlineRadioOptions3" value="check4"/>
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
                    <span>{{dataModel.hetqsrq}}</span>
                  </div>
                  <div>{{dataModel.shenhyj}}</div>
            </div>
        </div>

        <div class="item f14">
            <div class="label">
                <span class="lanText" data-lanid="1000276_公司秘书填写"></span><span>:</span>
            </div>
            <div class="item-value">
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shenhyj1" name="inlineRadioOptions4" value="None"/>
                    <i class="checkbox"></i><span class="radios f14">无</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shenhyj1" name="inlineRadioOptions4" value="DisclosableTransaction"/>
                    <i class="checkbox"></i><span class="radios f14">可披露交易</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shenhyj1" name="inlineRadioOptions4" value="MajorTransaction"/>
                    <i class="checkbox"></i><span class="radios f14">主要交易</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="dataModel.shenhyj1" name="inlineRadioOptions4" value="VSAVSD"/>
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
          bianh:'',
          requestname:'',
          loginid:'',
          shenqrq:'',
          jobtitlename:'',
          departmentname:'',
          xiangmmc:'',
          jihqsrq:'',
          xiangmldjbj:'',
          jiaofbyj:'',
          gongcbyj:'',
          fawbyj:'',
          rongzbyj:[],
          dingjtdyj:[],
          shuiwtdyj:'',
          shouxyygyj:'',
          shouxswg:'',
          feijzlzjyj:'',
          shouxzxgyj:[],
          //合同事务经理填写:
          hetqsrq:'',
          shenhyj:'',

          shenhyj1:['None','VSAVSD']
      }

    }
  },
  created:function(){
      var _self = this;

      _self.loiId = _self.$route.params.id || '';
      console.log(_self.loiId);

  },
  mounted:function(){
    lanTool.updateLanVersion();
  },
  methods:{
      back:function(){
            this.$router.back(-1);
      },
      //
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

.page-content{
  padding-top:0.88rem;
  padding:1rem 10px 10px 10px;
}

.label{
  padding:8px 0;
  color:#000;
}
.item-value{
  color:#545454;
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
