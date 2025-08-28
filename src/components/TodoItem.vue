<!-- 子組件 -->
<template>
  <li class="todo-item">
    <!-- 當 checkbox 狀態改變時，觸發 'toggle-done' 事件，並把 todo 的 id 傳出去 -->
    <input
      type="checkbox"
      :checked="todo.done"
      @change="$emit('toggle-done', todo.id)"
    />
    <!-- 根據傳入的 todo.done 狀態來決定是否加上 'done' class -->
    <span :class="{ done: todo.done }">{{ todo.text }}</span>
    <!-- 當移除按鈕被點擊時，觸發 'remove-todo' 事件，並把 todo 的 id 傳出去 -->
    <button @click="$emit('remove-todo', todo.id)" class="remove-btn">移除</button>
  </li>
</template>

<script setup>
// defineProps 用來宣告這個組件會接收哪些從父組件傳來的資料
// 這裡我們宣告需要一個名為 'todo' 的 prop，它的型別是物件。
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

// defineEmits 用來宣告這個組件會觸發哪些自訂事件
// 父組件將會監聽這些事件
defineEmits(['toggle-done', 'remove-todo'])
</script>

<style scoped>
/* 這裡的樣式與之前在 TodoPage.vue 中的幾乎一樣 */
.todo-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item span {
  flex-grow: 1;
  margin-left: 0.75rem;
}

.todo-item span.done {
  text-decoration: line-through;
  color: #aaa;
}

.remove-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e53935;
  background-color: #fff;
  color: #e53935;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.remove-btn:hover {
  background-color: #e53935;
  color: white;
}
</style>