<template>
  <div class="search-box">
    <i class="calcfont calc-shaixuan2 search-icon"></i>
    <input
      v-if="enableInput"
      v-model="searchValue"
      class="search-input"
      :placeholder="placeholder"
      type="text"
      @input="inputChange"
      @keyup="onkeyUp($event)"
      ref="curInput"
      v-click-focus
      v-focus
    />
    <input
      v-else
      v-model="searchValue"
      class="search-input disable"
      :placeholder="placeholder"
      type="text"
    />
    <i
      v-if="isShowClearIcon"
      v-show="showClearIcon"
      class="calcfont calc-guanbi1 delete-icon f14"
      @click.stop="clearEvent"
    ></i>
    <!-- <input
      type="button"
      class="hideBtn"
      value="focusInput"
      @click.stop="triggerInputFocus"
      style="display:none"
      ref="triggerBtn"
    /> -->
  </div>
</template>

<script>
const clickFocus = {
  // 初始化指令
  bind(el, binding, vnode) {
    function clickHandler(e) {
        el.focus();
        //设置光标
        tool.setCursorPosition(el,(el.value||"").length);
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    el.addEventListener('click', clickHandler);

  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    el.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
export default {
  data() {
    return {
      searchValue: ""
    };
  },
  directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
            el.focus();
            //设置光标
            tool.setCursorPosition(el,(el.value||"").length);
        }
      },
      clickFocus
  },

  computed: {
    showClearIcon() {
      return this.searchValue == "" ? false : true;
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    // defaultValue: {
    //   type: String,
    //   default: ""
    // },
    enableInput: {
      type: Boolean,
      default: true
    },
    isShowClearIcon:{
      type: Boolean,
      default: true
    }
  },
  created() {
    let _self = this;
    //默认为空
    _self.searchValue = "";
  },
  methods: {
    //触发input控件获取焦点
    // triggerInputFocus:function(){
    //   let _self = this;
    //   _self.$refs.curInput.focus();
    //   //$('#searchHeader .search-input').focus();
    // },
    //输入内容改变事件
    inputChange() {
      let _self = this;
      //调用父组件的模糊查询方法
      if (_self.$parent.getDropListByAutoVal != null && _self.$parent.getDropListByAutoVal != undefined) {
        _self.$parent.getDropListByAutoVal(_self.searchValue);
      }
    },
    //点击键盘搜索/回车按钮
    onkeyUp(e) {
      let _self = this;
      var code = e.charCode || e.keyCode;
      if(code != "13"){
        return false;
      }
      //del by Dylan 20191127 允许空值回车情况
      //若为空值，则pass
      // if (tool.isNullOrEmptyObject(_self.searchValue.trim())) {
      //     return false;
      // }
      //end del
      if (!tool.isNullOrEmptyObject(_self.$parent.excuteSeach)) {
        _self.$parent.excuteSeach(_self.searchValue.trim());
      }
    },
    //清空输入内容
    clearEvent() {
      let _self = this;
      _self.searchValue = "";

      if (_self.$parent.clearSearchValue != null && _self.$parent.clearSearchValue != undefined) {
        _self.$parent.clearSearchValue();
      }
    }

  }

};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 0 10px;
  border-radius: 0.5rem;
  position: relative;
}
.search-icon {
  font-size: 0.36rem;
  color: #ccc;
}
.search-input {
  flex: 1;
  outline: 0 none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  position: relative;
  line-height: 20px;
  border: 0;
  padding: 5px;
  box-sizing: border-box;
}
.delete-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 10px;
  background: #ccc;
  color: #ffffff;
  width: 20px;
  height: 20px;
  text-align: center;
}
</style>
