<template>
  <div>
      <header class="header">
          <a @click="back" class="mycalcfont calcfont calc-fanhui left" id="back"></a>
          <h1 class="title-text">{{title}}</h1>
      </header>

      <div class="weui-cells">
        <a v-for="(item,index) in dataList" :key="index" @click.stop="goPage(item)" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p>{{item.text}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>

  </div>
</template>

<script>

function CalcDomain(){
    var ajaxUrl = tool.AjaxBaseUrl();
    if(!tool.isNullOrEmptyObject(ajaxUrl)){
      //console.log(ajaxUrl.substring(0,ajaxUrl.indexOf('/crm/ApiHome')));
      return ajaxUrl.substring(0,ajaxUrl.indexOf('/crm/ApiHome'));
    }
}
// import '@/assets/js/common/RootFontSize.js'
export default {
    data(){
      return{
          title:'',
          domain:'123',
          outlook:[
             {
               text:lanTool.lanContent("1123_Boeing"),
               url:'https://www.boeing.com/commercial/market/commercial-market-outlook'
             },
             {
               text:lanTool.lanContent("1122_AirBus"),
               url:'https://www.airbus.com/aircraft/market/global-market-forecast.html'
             },
             {
               text:lanTool.lanContent("1000328_Embraer"),
               url:'https://www.embraermarketoutlook2019.com/'
             },
             {
               text:lanTool.lanContent("1000329_Bombardier"),
               url:'https://businessaircraft.bombardier.com/sites/default/files/2018-03/market_forecast_en.pdf'
             }
          ],
          materials:[
             {
               text:lanTool.lanContent("1000363_集团简介2019年7月"),
               url: CalcDomain() + '/FileUpload/CompanyPresentationMaterials/PitchingMaterials/20190717_CALC Group Corporate Presentation_CN.pdf'
             },
             {
               text:lanTool.lanContent("1000362_Corporate Presentation July 2019"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/20190717_CALC Group Corporate Presentation_EN.pdf'
             },
             {
               text:lanTool.lanContent("1000364_2018年度企业简介2019年6月"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/CALC 2018AR PPT_Chi.pdf'
             },
             {
               text:lanTool.lanContent("1000365_2018 Annual Results Presentation | June 2019"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/CALC 2018AR PPT_Eng.pdf'
             },
             {
               text:lanTool.lanContent("1000408_CALC简报"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/Factsheet_Chi.pdf'
             },
             {
               text:lanTool.lanContent("1000407_CALC Factsheet"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/Factsheet_Eng.pdf'
             }

             ,
             {
               text:lanTool.lanContent("1000410_Daiwa Capital Markets_China Aircraft Leasing Group Stable earnings with attractive yield"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/Daiwa Capital Markets_China Aircraft Leasing Group Stable earnings with attractive yield.pdf'
             },
             {
               text:lanTool.lanContent("1000411_CICC_China Aircraft Leasing Group_190829_Fleet expansion under pressure in 2019; fleet management still strong"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/CICC_China Aircraft Leasing Group_190829_Fleet.pdf'
             },
             {
               text:lanTool.lanContent("1000412_China Aircraft Leasing_28-Aug-2019_HK_CG (results)"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/China Aircraft Leasing_28-Aug-2019_HK_CG (results).pdf'
             },
             {
               text:lanTool.lanContent("1000413_BOCOM 1848_HK-190828e"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/BOCOM 1848_HK-190828e.pdf'
             },
             {
               text:lanTool.lanContent("1000414_20190827-Daiwa-China Aircraft Leasing Group (1848 HK)"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/20190827-Daiwa-China Aircraft Leasing Group (1848 HK).pdf'
             },
             {
               text:lanTool.lanContent("1000415_CALC 2019 Interims Results"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/20190827 CALC 2019IR PPT (eng).pptx'
             },
             {
               text:lanTool.lanContent("1000416_CALC 2019年中期业绩"),
               url:CalcDomain() +'/FileUpload/CompanyPresentationMaterials/PitchingMaterials/20190827 CALC 2019IR PPT (chi).pptx'
             }
          ],
          memberships:[
            {
               text:lanTool.lanContent("1000330_speednews"),
               url:'http://speednews.com/'
            },
            {
               text:lanTool.lanContent("1000338_民航资源网"),
               url:'http://www.carnoc.com/'
            },
            {
               text:lanTool.lanContent("1000331_Air Fax"),
               url:'http://www.airfax.aero/'
            },
            {
               text:lanTool.lanContent("1000332_Avi Trader"),
               url:'https://www.avitrader.com/'
            },
            {
               text:lanTool.lanContent("1000354_Aviation Finance"),
               url:'http://www.aviationfinance.aero/'
            },
            {
               text:lanTool.lanContent("1000355_Aircraft Commerce"),
               url:'http://www.aircraft-commerce.com/'
            },
            {
               text:lanTool.lanContent("1000356_Air Finance Journal"),
               url:'https://www.airfinancejournal.com/'
            },
            {
               text:lanTool.lanContent("1000357_IATA"),
               url:'https://www.iata.org/pages/default.aspx'
            },
            {
               text:lanTool.lanContent("1000358_ISTAT"),
               url:'http://www.istat.org/'
            },
            {
               text:lanTool.lanContent("1000360_IAMAC"),
               url:'http://www.iamac.org.cn/'
            },
            {
               text:lanTool.lanContent("1000361_CSF"),
               url:'http://www.chinasecuritization.org/'
            }
          ],

          dataList:[],  //渲染在页面上的列表数据

      }
    },
    created:function(){
       var _self = this;
       _self.title = _self.$route.query.title || '';
       var type = _self.$route.query.type || '';
       switch(type) {
            case 'outlook':
                _self.dataList = _self.outlook;
                break;
            case 'materials':
                _self.dataList = _self.materials;
                break;
            case 'memberships':
                _self.dataList = _self.memberships;
                break;
       }

         //console.log(_self.materials[0].url);
    },
    // beforeRouteEnter:function(to, from, next){
        // console.log(to);
        // console.log(from);
      // if (from.name == 'bIShareMaterials') {
      //     this.$router.replace({
      //         path: '/bIShareMaterials'
      //     });
      //     //保证地址替换后再刷新
      //     setTimeout(function () {
      //         window.location.reload();
      //     }, 80);
      // }
    //   next();
    // },
    mounted:function(){
        var _self = this;
        lanTool.updateLanVersion();
    },
    methods:{
      //返回上一页
      back:function(){
          // this.$router.back(-1);
          var _self = this;
            _self.$router.replace({
                path: '/bIShareMaterials'
            });
            //保证地址替换后再刷新
            setTimeout(function () {
                window.location.reload();
            }, 80);
      },
      //页面跳转
      goPage:function(obj){
        var _self = this;
        if(tool.isNullOrEmptyObject(obj.url)){
            return;
        }
        //console.log(obj.url);
        //return;
        window.open(obj.url,"_blank");
        //window.location.href = obj.url;
      }
    }

}
</script>

<style scoped>
.mycalcfont {
  font-size: 24px;
  text-align: center;
  padding: 10px;
  position: relative;
  z-index: 20;
  display: inline-block;
  text-decoration: none;
  line-height: 1;
}
.header{
  position: fixed;
  top:0;left:0;right:0;
  background:#f8f2dc;
  z-index: 9;
  height: 44px!important;
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
    font-size: 18px;
    line-height: 44px;
}


.weui-cells{
  margin-top:44px;
}


</style>
