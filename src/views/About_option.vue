<template>
    <h2>About 頁面</h2>
    <p>{{ message }}</p>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script>
export default {
  // 特徵1：data 選項
  data() {
    const route = this.$route;
    return {
      count: 0,
      message: route.query.msg ? 'Hello ' + route.query.msg : 'Hello, Default Option API  !'
    };
  },
  // 特徵2：methods 選項
  methods: {
    increment() {
      // 特徵3：大量使用 'this'
      this.count++;
    },
  },
  // 特徵4：生命週期選項
  mounted() {
    console.log('Component is mounted!');
  },
};
</script>
