<template>
<div class="person-wrap" ref="personWrap">
  <ul class="person-list" ref="personTab">
    <li @click="scrollTo($event)" v-for="item in listData" :key="item.id" class="person-item">{{item.text}}</li>
  </ul>
</div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "ReserveInfo",
  data() {
    return {
      listData:[
        {
          id:1,
          text:'Alan1'
        },
        {
          id:2,
          text:'Alan2'
        },
        {
          id:3,
          text:'Alan3'
        },
        {
          id:4,
          text:'Alan4'
        },
        {
          id:5,
          text:'Alan5'
        },
        {
          id:6,
          text:'Alan6'
        },
      ],
      // scroll:{}
    };
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  methods: {
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 6 * 120;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },

    scrollTo:function(e){
      console.log(e);
      var el = e.target;
      this.scroll.scrollToElement(el,300,true);
    }


  }
}
</script>

<style scoped>
ul,li{
  list-style: none;
  padding:0;margin: 0;
}
.person-wrap{
  width: 100%;overflow: hidden;
}
.person-list{
  display: flex;
  height: 100px;
  align-items:center;

}
li{width: 120px;}
</style>
