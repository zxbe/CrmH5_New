import Vue from 'vue'
import Router from 'vue-router'

//单点登陆
import SingleSignOn from '@/components/otherPage/SingleSignOn'
import Index from '@/components/otherPage/Index'
import Login from '@/components/otherPage/Login'

import Searchmodule from '@/components/searchModule/Searchmodule'

//论坛消息
import ForumNotification from '@/components/msgNotify/ForumNotification'
import Notification from '@/components/msgNotify/Notification'

import Previewfile from '@/components/documentModule/Previewfile'
import Uploadinput from '@/components/documentModule/Uploadinput'

import Meetinglist from '@/components/linkListPage/Meetinglist'
import MeetingListForRelation from '@/components/linkListPage/MeetingListForRelation'
import Businesslist from '@/components/linkListPage/BusinessList'
import Contactsof from '@/components/linkListPage/Contactsof'

// import Tripmeeting from '@/components/tripmeeting/Tripmeeting'
// import Meetinginfo from '@/components/tripmeeting/Meetinginfo'
import MeetingNoteinfo from '@/components/tripmeeting/MeetingNoteinfo'

import Contacts from '@/components/contacts/Contacts'
import Contactsinfo from '@/components/contacts/Contactsinfo'
import Organizationsinfo from '@/components/contacts/Organizationsinfo'

import BusinessCategories from '@/components/business/BusinessCategories'
import Opportunitiesinfo from '@/components/business/Opportunitiesinfo'
//dba
import AirlineDatabase from '@/components/business/AirlineDatabase'
import FleetDetailsList from '@/components/business/FleetDetailsList'

import Selectlist from '@/components/customPlugin/Selectlist'
import Sharelist from '@/components/customPlugin/Sharelist'
import Groupselectlist from '@/components/customPlugin/Groupselectlist'
import Poweruser from '@/components/customPlugin/Poweruser'
import Linkedpage from '@/components/customPlugin/Linkedpage'

//用户活动
import UserEvents from '@/components/userEvents/UserEvents'
import UserEventsInfo from '@/components/userEvents/UserEventsInfo'


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
    { path: '/meetinglistforrelation',name:'meetinglistforrelation', component: MeetingListForRelation},
    { path: '/businesslist',name:'businesslist', component: Businesslist},


    //会议&出差
    { path: '/tripmeeting',
      name:'tripmeeting',
      component: (resolve) => require(['@/components/tripmeeting/Tripmeeting'], resolve)
    },
    { path: '/meetinginfo/:id',
      name:'meetinginfo',
      component: (resolve) => require(['@/components/tripmeeting/Meetinginfo'], resolve)
    },
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
 { path:'/forumlist',
   name:'forumlist',
   component: (resolve) => require(['@/components/forum/ForumList'], resolve)
  },
  { path:'/foruminfo/:id',
   name:'foruminfo',
   component: (resolve) => require(['@/components/forum/ForumInfo'], resolve)
  },
  { path:'/forumtags',
   name:'forumtags',
   component: (resolve) => require(['@/components/forum/ForumTags'], resolve)
  },
  { path:'/forumsearch',
   name:'forumsearch',
   component: (resolve) => require(['@/components/forum/ForumSearch'], resolve)
  },
  { path:'/forumposting',
   name:'forumposting',
   component: (resolve) => require(['@/components/forum/ForumPosting'], resolve)
  },

  { path:'/test',
   name:'test',
   component: (resolve) => require(['@/components/customPlugin/scroll/test'], resolve)
  },


 //用户活动
 { path:'/userEvents',name:'UserEvents',component:UserEvents},
 { path:'/userEventsInfo',name:'UserEvents',component:UserEventsInfo},
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
