import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        includes: [],
        addID:'', //用于记录新增记录的id
        linkePageShow:0, //用于linkePage页面记录显示的模块

        //只在列表页面用
        tripmeetingShowModule:0,
        contactsShowModule:0,
        businessShowModule:0,
        viewType:'listView', //Tripmeeting模块视图切换

        selectTags:[],//论坛模块发帖子时选择的标签

        //只在详情页面用
        // fromType:"",//联系人:6;公司:7;会议:8;商机&交易:9;
        // businessType:"",//交易:29;商机:30
        // fromID:""  //每条记录的id

        //homesearch页面用，把searchModuleFromType，businessType记录下来
        searchModuleFromType:'8',
        businessType:''
    },
    mutations: {
        //设置homesearch页面用到的searchModuleFromType，businessType
        setValueFromHomeSearch(state, data){
            if(tool.isNullOrEmptyObject(data)){
              return ;
            }
            state.searchModuleFromType = data.searchModuleFromType || '';
            state.businessType = data.businessType || '';
        },

        //记录发帖时选择的标签 val为空时表示清空
        SET_SELECT_TAGS(state, val){
            if(val == '' || val == undefined){
              state.selectTags = []
            }else{
              state.selectTags = val;
            }
        },

        //设置linkPage页面需要展示的模块
        SET_LINKE_PAGE_SHOW(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.linkePageShow = val
        },
        SET_ADD_ID(state,val){
            if(val != undefined){
              state.addID = val;
            }
        },
        //设置Tripmeeting模块视图切换
        SET_VIEW_TYPE(state, val){
            if(val != '' && val != undefined){
              state.viewType = val;
            }
        },
        //设置tripmeeting列表页面展示的模块
        SET_TRIPMEETING_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.tripmeetingShowModule = val
        },
        //设置contacts列表页面展示的模块
        SET_CONTACTS_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.contactsShowModule = val
        },
        //设置BUSINESS列表页面展示的模块
        SET_BUSINESS_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.businessShowModule = val
        },
        //整体设置includes
        SET_KEEP_ALIVE(state,setdata){
            state.includes = setdata;
        },
        //给includes添加项
        SET_ITEM(state, value){
            var index = state.includes.indexOf(value);
            if(index <= -1){
              state.includes.push(value);
            }
        },
        //移除includes中的项
        REMOVE_ITEM(state, value){
            state.includes.remove(value);
        }

    },
    actions: {

    }
})


export default store
