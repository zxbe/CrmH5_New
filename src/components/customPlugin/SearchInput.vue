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
    />
    <input
      v-else
      v-model="searchValue"
      class="search-input disable"
      :placeholder="placeholder"
      type="text"
    />
    <i
      v-if="enableInput"
      v-show="showClearIcon"
      class="calcfont calc-guanbi1 delete-icon f14"
      @click="clearEvent"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: ""
    };
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
    }
  },
  created() {
    let _self = this;
    //默认为空
    _self.searchValue = "";
  },
  methods: {
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
      //若为空值，则pass
      if (tool.isNullOrEmptyObject(_self.searchValue.trim())) {
          return false;
      }
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
