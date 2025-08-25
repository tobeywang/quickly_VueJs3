<template>
  <div class="hello">
    <h1>Welcome to Your Vue.js App</h1>
    <p>To get started, edit <code>src/components/HelloWorld.vue</code> and save to reload.</p>
  </div>
  <div><router-link to="/about">前往 About 頁面</router-link></div>
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