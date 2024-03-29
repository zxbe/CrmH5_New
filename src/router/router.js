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


import MeetingNoteinfo from '@/components/tripmeeting/MeetingNoteinfo'

import Opportunitiesinfo from '@/components/business/Opportunitiesinfo'
//dba
import AirlineDatabase from '@/components/business/AirlineDatabase'
import FleetDetailsList from '@/components/business/FleetDetailsList'

import Selectlist from '@/components/customPlugin/Selectlist'
import Sharelist from '@/components/customPlugin/Sharelist'
import Groupselectlist from '@/components/customPlugin/Groupselectlist'
import Poweruser from '@/components/customPlugin/Poweruser'
import Linkedpage from '@/components/customPlugin/Linkedpage'



Vue.use(Router)

const router =  new Router({
  mode:'hash',
  routes: [

    { path: '/',name:'login', component: Login },
    { path: '/login',name:'login', component: Login },
    { path: '/index',name:'index', component:Index },
    { path: '/homesearch',
      name:'homesearch',
      component: (resolve) => require(['@/components/otherPage/HomeSearch'], resolve)
    },

    { path: '/notification',name:'notification', component:Notification },
    { path: '/searchmodule/:paramStr',name:'searchmodule',component: Searchmodule},
    { path: '/meetinglistforrelation',name:'meetinglistforrelation', component: MeetingListForRelation},


    //请求数据访问消息列表页面
    { path:'/dataAccessRequestNotification',
      name:'dataAccessRequestNotification',
      component: (resolve) => require(['@/components/msgNotify/DataAccessRequestNotification'], resolve)
    },

    //会议
    { path: '/meeting',
      name:'meeting',
      component: (resolve) => require(['@/components/tripmeeting/MeetingList'], resolve)
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
    { path:'/contacts',
      name:'contacts',
      component: (resolve) => require(['@/components/contacts/ContactsList'], resolve)
    },
    { path:'/contactsinfo/:id',
      name:'contactsinfo',
      component: (resolve) => require(['@/components/contacts/Contactsinfo'], resolve)
    },

    //中间链接页面
    { path: '/meetingof',
      name:'meetingof',
      component: (resolve) => require(['@/components/linkListPage/Meetinglist'], resolve)
    },
    { path:'/contactsof',name:'contactsof',component:Contactsof},
    { path: '/businesslist',name:'businesslist', component: Businesslist},

    //公司
    { path:'/organizations',
      name:'organizations',
      component: (resolve) => require(['@/components/organizations/OrganizationsList'], resolve)
    },
    { path:'/organizationsinfo/:id',
      name:'organizationsinfo',
      component: (resolve) => require(['@/components/organizations/Organizationsinfo'], resolve)
    },

    //商业类别
    { path: '/pitches',
      name:'pitches',
      component: (resolve) => require(['@/components/business/PitchesList'], resolve)
    },
    { path: '/pipeline',
      name:'pipeline',
      component: (resolve) => require(['@/components/business/PipelineList'], resolve)
    },
    { path:'/opportunitiesinfo/:id',name:'opportunitiesinfo',component:Opportunitiesinfo},

    //LOI单详情
    { path:'/loiinfo/:id',
      name:'loiinfo',
      component: (resolve) => require(['@/components/business/LOIinfo'], resolve)
    },


    { path:'/selectlist',name:'selectlist',component:Selectlist},
    { path:'/sharelist',name:'sharelist',component:Sharelist},
    { path:'/groupselectlist',name:'groupselectlist',component:Groupselectlist},
    { path:'/poweruser',name:'poweruser',component:Poweruser},
    { path:'/singleSignOn',name:'singleSignOn',component:SingleSignOn},

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
    { path:'/selecttag',
    name:'selecttag',
    component: (resolve) => require(['@/components/forum/SelectTag'], resolve)
    },

    //用户活动
    { path:'/userEvents',
      name:'userEvents',
      component: (resolve) => require(['@/components/userEvents/UserEvents'], resolve)
    },
    { path:'/userEventsInfo/:id',
      name:'userEventsInfo',
      component: (resolve) => require(['@/components/userEvents/UserEventsInfo'], resolve)
    },
    //共享文件
    { path:'/bIShareMaterials',
      name:'bIShareMaterials',
      component: (resolve) => require(['@/components/bIShareMaterials/BIShareMaterials'], resolve)
    },
    { path:'/bilist',
      name:'bilist',
      component: (resolve) => require(['@/components/bIShareMaterials/BIList'], resolve)
    },


  ]
});

//路由拦截
router.beforeEach(function(to, from, next){

    var toName = to.name || "";
    toName = $.trim(toName).toLowerCase();
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
