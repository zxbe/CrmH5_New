<template>
<div>
    <!-- <div>
        <keep-alive :max="3">
            <router-view v-if="$route.meta.keepAlive" ></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" ></router-view>
    </div> -->

    <div>
        <keep-alive :include="includes">
            <router-view></router-view>
        </keep-alive>
    </div>

</div>
</template>

<script>
export default {
  name: 'App',
  computed:{
      includes(){
        return this.$store.state.includes
      }
  },
  created:function(){
  }
}
</script>

<style scoped>

</style>




