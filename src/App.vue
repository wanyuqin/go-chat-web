<template>
<Chat></Chat>
</template>

<script>
import Chat from './components/ChatVue.vue';
export default {
  name: 'App',
  components: {
    Chat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;  */
  /* height: 100vh; */
}
/* .common-layout{
  height: 100vh;
} */

.el-container{
  height: 90vh
}

.el-main{
  height: 100vh;
}

</style>
