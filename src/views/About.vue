<template>
  <div>
    <h2>About 頁面</h2>
    <p>{{ message }}</p>
    <button @click="increment">Count is: {{ count }}</button>
  </div>
</template>

<script>
// Composition API 從 vue 中導入 ref、reactive、computed、onMounted 等函式
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'About',
  setup() {
    const route = useRoute();
    // 這裡可以放置組件的邏輯
    const message = ref(route.query.msg ? 'Hello ' + route.query.msg : 'Hello, Default Composition API !');
    const count = ref(0);
    return { message,count,
      increment() {
        count.value++;
      }
    };
  }
}
</script>