<template>
  <div>
    <div >
      <keep-alive :include="includes">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    includes() {
      return this.$store.state.includes;
    }
  },
  data() {
    return {
    };
  },


};
</script>

