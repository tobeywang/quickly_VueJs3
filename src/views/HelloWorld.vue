<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js App</h1>
    <p>請試著在<code>開發環境</code> 建立一套一樣的專案，並逐步了解/撰寫各功能作法與流程.</p>
  </div>
  <div><router-link :to="{ name: 'About', query: { msg : 'Component API'}}" >前往 About Component API 頁面</router-link></div>
  <div><router-link :to="{ name: 'About_Option', query: { msg: ' '}}">前往 About Option API 頁面</router-link></div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 20px;
}
</style>