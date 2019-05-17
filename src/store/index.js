import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        includes: [],
        tripmeetingShowModule:0,
        contactsShowModule:0,
        businessShowModule:0,
    },
    mutations: {
        SET_TRIPMEETING_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.tripmeetingShowModule = val
        },
        SET_CONTACTS_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.contactsShowModule = val
        },
        SET_BUSINESS_SHOW_MODULE(state, val){
            val = (val == '' || val == undefined) ? 0 : val;
            state.businessShowModule = val
        },

        SET_KEEP_ALIVE(state,setdata){
            state.includes = setdata;
            console.log(state.includes);
        },
        SET_ITEM(state, value){
          var index = state.includes.indexOf(value);
          if(index <= -1){
            state.includes.push(value);
            console.log(state.includes);
          }
        },
        REMOVE_ITEM(state, value){
            state.includes.remove(value);
            console.log(state.includes);
        }

    },
    actions: {

    }
})


export default store
