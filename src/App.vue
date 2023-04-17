<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
<Terminal></Terminal>
</template>

<script>
import Terminal from './components/Terminal.vue';

export default {
  name: 'App',
  components: {
     Terminal
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
/* } */

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
