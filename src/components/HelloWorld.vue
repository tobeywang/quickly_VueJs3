<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js App</h1>
    <p>To get started, edit <code>src/components/HelloWorld.vue</code> and save to reload.</p>
  </div>
  <div><router-link :to="{ name: 'About', query: { msg : 'Component API'}}" >前往 About Component API 頁面</router-link></div>
  <div><router-link :to="{ name: 'About_Option', query: { msg: ' '}}">前往 About Option API 頁面</router-link></div>
  <div><router-link :to="{ name: 'ApiAxios', query: { msg: ' '}}">前往呼叫 任意API 頁面</router-link></div>
  <div><router-link :to="{ name: 'GridForm', query: { msg: ' '}}">前往 ETF最新股價 頁面</router-link></div>
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