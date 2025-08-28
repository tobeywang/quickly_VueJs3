<!-- 父組件 -->
<template>
  <div class="todo-page">
    <h2>功能三：組件通訊 (props, emit)</h2>
    <p>父組件管理資料，子組件負責顯示與回報事件。</p>

    <form @submit.prevent="addTodo" class="add-todo-form">
      <input type="text" v-model="newTodoText" placeholder="新增一個任務..." />
      <button type="submit">新增</button>
    </form>

    <ul class="todo-list">
      <!-- 4. 使用 TodoItem 組件來渲染列表 -->
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-done="handleToggleDone"
        @remove-todo="handleRemoveTodo"
      />
    </ul>

    <p v-if="todos.length === 0" class="empty-message">
      太棒了，所有任務都完成了！
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 1. 引入子組件
import TodoItem from '../components/TodoItem.vue'

let nextTodoId = 0
const newTodoText = ref('')
const todos = ref([
  { id: nextTodoId++, text: '學習 Vue 3 基礎', done: true },
  { id: nextTodoId++, text: '建立一個待辦事項列表', done: false },
  { id: nextTodoId++, text: '學習組件通訊', done: false }
])

function addTodo() {
  if (newTodoText.value.trim() !== '') {
    todos.value.push({
      id: nextTodoId++,
      text: newTodoText.value,
      done: false
    })
    newTodoText.value = ''
  }
}

// 2. 修改 removeTodo 函式，現在它接收的是 id
function handleRemoveTodo(todoId) {
  todos.value = todos.value.filter(todo => todo.id !== todoId)
}

// 3. 新增一個函式來處理狀態切換
function handleToggleDone(todoId) {
  // 找到對應 id 的 todo
  const todo = todos.value.find(t => t.id === todoId)
  if (todo) {
    // 修改它的 done 狀態
    todo.done = !todo.done
  }
}
</script>

<style scoped>
/* 這裡的樣式幾乎不變，但我們移除了之前 li 相關的樣式，因為它們已經被搬到 TodoItem.vue 裡了 */
.add-todo-form {
  display: flex;
  margin-bottom: 1.5rem;
}

.add-todo-form input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-todo-form button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.empty-message {
  color: #777;
  text-align: center;
  margin-top: 2rem;
}
</style>
