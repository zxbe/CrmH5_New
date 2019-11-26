<template>
  <div class="sort sticky">
    <div class="sort-left">
      <div clsss="sort-t" @click="dropDownToggle">
        <span class="sort-text">{{ activeSortItemText }}</span>
        <i
          class="calcfont calc-sanjiaoxing sort-sjx f12"
          :class="sortSjxClass"
        ></i>
      </div>
    </div>
    <div @click="showRightPanel">
      <span>{{ lanFilter }}</span>
      <i class="calcfont calc-shaixuan3"></i>
    </div>

    <div class="drop-down" v-show="showDropDown">
      <div
        v-for="(item, index) in sortData"
        :key="index"
        class="drop-down-item"
        @click="tapItem(item, index)"
      >
        <div
          class="item-text"
          :class="{ active: highlightIndex == index ? true : false }"
        >
          {{ item.sortText }}
        </div>
        <i
          v-if="highlightIndex == index"
          class="calcfont calc-chenggong gou-icon f14"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sortData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    sortObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      lanFilter: lanTool.lanContent("1000517_过滤"),
      showDropDown: false, //是否显示了下拉模块
      sortSjxClass: "calc-sanjiaoxing", //三角形类名：calc-sanjiaoxing：向下；calc-sanjiaoxingshang：向上
      highlightIndex: -1, //高亮项目索引，默认不选中
      activeSortItemText: ""
    };
  },
  created: function() {
    let _self = this;

    //1>处理数据排序
    if (!tool.isNullOrEmptyObject(_self.sortData)) {
      _self.sortData.sort(function(a, b) {
        return a.sort - b.sort;
      });
    }

    //2>初始化默认的排序项,并执行查询动作
    _self.initDefultSortItem();
  },
  methods: {
    //下拉显示/隐藏
    dropDownToggle: function() {
      let _self = this;
      _self.showDropDown = !_self.showDropDown;
      if (_self.showDropDown) {
        _self.sortSjxClass = "calc-sanjiaoxingshang";
      } else {
        _self.sortSjxClass = "calc-sanjiaoxing";
      }
    },
    //隐藏下拉(供外部使用的方法)
    closeDownToggle:function(){
      let _self = this;
      //若下拉已经隐藏，则pass
      if(!_self.showDropDown){
        return true;
      }
      _self.dropDownToggle();
    },
    //点击排序
    //isTriggerDropDownToggle:是否触发dropDownToggle事件,默认为true
    //isExeQueryisExeQuery:是否执行查询,默认执行
    tapItem: function(data, index, isTriggerDropDownToggle,isExeQuery) {
      let _self = this;

      isTriggerDropDownToggle =
        isTriggerDropDownToggle == undefined || isTriggerDropDownToggle == null
          ? true
          : isTriggerDropDownToggle;
        
        isExeQuery = (isExeQuery == null || isExeQuery == undefined) 
          ? true 
          : isExeQuery;

      if (tool.isNullOrEmptyObject(data) || tool.isNullOrEmptyObject(index)) {
        return;
      }
      _self.highlightIndex = index;
      _self.activeSortItemText = data.sortText || "";

      if (isTriggerDropDownToggle) {
        _self.dropDownToggle();
      }

      //设置父组件的属性(sortName和sortOrder是固定名称，每个列表页面都必须有)
      _self.$set(_self.sortObj, "sortName", data.sortName || "");
      _self.$set(_self.sortObj, "sortOrder", data.sortOrder || "");
      // console.log("子组件sortName:"+_self.sortObj.sortName);
      // console.log("子组件sortOrder:"+_self.sortObj.sortOrder);

      //若不需要执行查询，则pass
      if(!isExeQuery){
        return true;
      }

      _self.$nextTick(function() {
        //调用父组件的查询方法
        _self.$parent.delegateQuery();
      });
    },
    //初始化默认的排序项,并执行查询动作
    //isExeQuery:是否执行查询,默认执行
    initDefultSortItem: function(isExeQuery) {
      isExeQuery = (isExeQuery == null || isExeQuery == undefined) ? true : isExeQuery;
      let _self = this;
      //若为空，则不处理
      if (tool.isNullOrEmptyObject(_self.sortData)) {
        return;
      }

      //获取默认排序项
      var indexTemp = -1;
      if (tool.isNullOrEmptyObject(_self.sortData)) {
        indexTemp = 0;
      } else {
        indexTemp = _self.sortData.findIndex(function(item) {
          if (!item.hasOwnProperty("isActive")) {
            return false;
          } else {
            return item.isActive;
          }
        });
        if(indexTemp<=-1){
          indexTemp = 0;
        }
      }

      _self.tapItem(_self.sortData[indexTemp], indexTemp, false,isExeQuery);
    },
    //显示筛选
    showRightPanel: function() {
      let _self = this;
      if (_self.showDropDown) {
        _self.dropDownToggle();
      }
      eventBus.$emit("showScreenEvent");
    }
  }
};
</script>

<style scoped>
.sort {
  position: fixed;
  top: 0.88rem;
  left: 0;
  right: 0;
  z-index: 99;
  height: 0.7rem;
  display: flex;
  align-items: center;
  padding: 0 10px 0 15px;
  background: #ffffff;
}
.sort-left {
  flex: 1;
  display: flex;
}
.sort-t {
  display: flex;
  align-items: center;
}
.sort-text,
.sort-sjx,
.gou-icon {
  color: #ff9900;
}

.drop-down {
  background: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0.7rem;
}
.drop-down-item {
  display: flex;
  line-height: 0.7rem;
  border-bottom: 1px solid #e6e8ea;
  padding: 0 10px 0 15px;
}
.item-text {
  flex: 1;
}
.item-text.active {
  color: #ff9900;
}
</style>
