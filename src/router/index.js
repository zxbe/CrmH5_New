import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import Login from '@/components/Login'

import Searchmodule from '@/components/pages/Searchmodule'
import Notification from '@/components/pages/Notification'
import Previewfile from '@/components/pages/Previewfile'
import Uploadinput from '@/components/pages/Uploadinput'
import Meetinglist from '@/components/pages/Meetinglist'
import Businesslist from '@/components/pages/BusinessList'

import Tripmeeting from '@/components/pages/Tripmeeting'
import Meetinginfo from '@/components/pages/Meetinginfo'
import MeetingNoteinfo from '@/components/pages/MeetingNoteinfo'

import Contacts from '@/components/pages/Contacts'
import Contactsinfo from '@/components/pages/Contactsinfo'
import Organizationsinfo from '@/components/pages/Organizationsinfo'
import Contactsof from '@/components/pages/Contactsof'

import BusinessCategories from '@/components/pages/BusinessCategories'
import Opportunitiesinfo from '@/components/pages/Opportunitiesinfo'

import Selectlist from '@/components/common/Selectlist'
import Sharelist from '@/components/pages/Sharelist'
import Groupselectlist from '@/components/common/Groupselectlist'
import Poweruser from '@/components/pages/Poweruser'
import Linkedpage from '@/components/pages/Linkedpage'



//dba
import AirlineDatabase from '@/components/pages/AirlineDatabase'
import FleetDetailsList from '@/components/pages/FleetDetailsList'

//单点登陆
import SingleSignOn from '@/components/SingleSignOn'

//论坛相关
import ForumNotification from '@/components/pages/ForumNotification'
// import Report from '@/components/pages/Report'
// import PrCalendarinfo from '@/components/pages/PrCalendarinfo'
//dba
// import AirlineDatabase from '@/components/pages/AirlineDatabase'
// import Search from '@/components/pages/Search'
// import Business from '@/components/pages/Business'
// import Tripinfo from '@/components/pages/Tripinfo'
// import AddTripExpense from '@/components/pages/AddTripExpense'
// import Addmeeting from '@/components/pages/Addmeeting'
// import AddRouteOrRoom from '@/components/pages/AddRouteOrRoom'

Vue.use(Router)

const router =  new Router({
  mode:'hash',
  routes: [

    { path: '/',name:'login', component: Login },
    { path: '/login',name:'login', component: Login },
    { path: '/index',name:'index', component:Index },

    { path: '/notification',name:'notification', component:Notification },
    { path: '/searchmodule/:paramStr',name:'searchmodule',component: Searchmodule},

    { path: '/meetinglist',name:'meetinglist', component: Meetinglist},
    { path: '/businesslist',name:'businesslist', component: Businesslist},


    //会议&出差
    { path: '/tripmeeting',name:'tripmeeting', component:Tripmeeting},
    { path: '/meetinginfo/:id',name:'meetinginfo', component:Meetinginfo},
    //会议记录
    { path: '/meetingNoteinfo/:id',name:'meetingNoteinfo', component:MeetingNoteinfo,},
    //上传文件
    { path:'/Uploadinput',name:'uploadinput',component:Uploadinput},
    //文档查看
    { path:'/previewfile',name:'previewfile',component:Previewfile},
    { path:'/linkedpage',name:'linkedpage',component:Linkedpage },

    //联系人
    { path:'/contacts',name:'contacts',component:Contacts},
    { path:'/organizationsinfo/:id',name:'organizationsinfo',component:Organizationsinfo},
    { path:'/contactsinfo/:id',name:'contactsinfo',component:Contactsinfo},
    { path:'/contactsof',name:'contactsof',component:Contactsof},

    //商业类别
    { path: '/businessCategories',name:'businessCategories', component:BusinessCategories},
    { path:'/opportunitiesinfo/:id',name:'opportunitiesinfo',component:Opportunitiesinfo},

    { path:'/selectlist',name:'selectlist',component:Selectlist},
    { path:'/sharelist',name:'sharelist',component:Sharelist},
    { path:'/groupselectlist',name:'groupselectlist',component:Groupselectlist},
    { path:'/poweruser',name:'poweruser',component:Poweruser},
    { path:'/singleSignOn',name:'singleSignOn',component:SingleSignOn},

    // { path: '/tripinfo/:id',name:'tripinfo', component:Tripinfo},
    // { path: '/search',name:'search',component: Search},
    // { path: '/prcalendarinfo/:id',name:'prcalendarinfo', component:PrCalendarinfo },

    //添加住宿/机票
    // { path: '/addRouteOrRoom',name:'addRouteOrRoom', component:AddRouteOrRoom },
     //添加会议
    // { path: '/addmeeting',name:'addmeeting', component:Addmeeting },
    //添加出差报销单
    // { path: '/addTripExpense/:id',name:'addTripExpense', component:AddTripExpense },
     //database
    // { path:'/airlineDatabase',name:'airlineDatabase',component:AirlineDatabase},


   //database
 { path:'/airlineDatabase',name:'airlineDatabase',component:AirlineDatabase},
 { path:'/fleetDetailsList',name:'fleetDetailsList',component:FleetDetailsList},
 //论坛
 { path:'/forumNotification',name:'ForumNotification',component:ForumNotification},
  ]
});

//路由拦截
router.beforeEach(function(to, from, next){

    var toName = to.name || "";
    toName = $.trim(toName).toLowerCase();
    //console.log(toName);
    //特殊处理单点登陆页面
    //若不是单点登陆页面，则需要验证RegisterCode
    if(toName == "singlesignon"){
      next();
      return;
    }else{
      var registerCodeTemp = tool.RegisterCode();
      if(!tool.isNullOrEmptyObject(registerCodeTemp)){
          //已登录
          if (to.path == '/login' || to.path == '/') {//跳转到首页
              return next({path: '/index'});
          }
          next();
      }else{ //未登录
          if (to.path != '/login') {//跳转到登录页
              return  next({path: '/login'});
          }
          next();

      }
    }

});

export default router
