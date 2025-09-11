<template>
  <div class="todo-page">
    <h2>功能二：列表與事件 (v-for, @submit)</h2>
    <p>一個簡單但功能齊全的待辦事項列表。</p>

    <!-- @submit.prevent 會在表單送出時呼叫 addTodo 函式 -->
    <!-- .prevent 修飾符會阻止瀏覽器的預設送出行為 (即重新整理頁面) -->
    <form @submit.prevent="addTodo" class="add-todo-form">
      <input type="text" v-model="newTodoText" placeholder="新增一個任務..." />
      <button type="submit">新增</button>
    </form>

    <ul class="todo-list">
      <!-- v-for 會遍歷 todos 陣列中的每一個項目 -->
      <!-- :key 是必要的，它幫助 Vue 識別每一個項目，以優化渲染效能 -->
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <!-- v-model="todo.done" 會將 checkbox 的打勾狀態與 todo 物件的 done 屬性綁定 -->
        <input type="checkbox" v-model="todo.done" />
        <!-- :class="{ done: todo.done }" 會在 todo.done 為 true 時，為 <span> 加上 'done' 這個 class -->
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <!-- @click 會在點擊按鈕時，呼叫 removeTodo 函式，並將當前的 todo 物件傳入 -->
        <button @click="removeTodo(todo)" class="remove-btn">移除</button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="empty-message">
      太棒了，所有任務都完成了！
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 用來追蹤下一個 todo 的唯一 ID
let nextTodoId = 0

// 綁定 input 輸入框的文字
const newTodoText = ref('')

// 存放所有 todo 項目的響應式陣列
// 每個 todo 都是一個物件，包含 id, text 和 done 狀態
const todos = ref([
  { id: nextTodoId++, text: '學習 Vue 3 基礎', done: true },
  { id: nextTodoId++, text: '建立一個待辦事項列表', done: false },
  { id: nextTodoId++, text: '休息一下', done: false }
])

const stockInfo = ref(null);

function addTodo() {
  // .trim() 可以移除文字前後的空白，確保使用者沒有輸入空內容
  if (newTodoText.value.trim() !== '') {
    // 將新的 todo 物件加入到 todos 陣列中
    todos.value.push({
      id: nextTodoId++,
      text: newTodoText.value,
      done: false
    })
    // 清空輸入框
    newTodoText.value = ''
  }
}

function removeTodo(todoToRemove) {
  // .filter() 會回傳一個新的陣列，其中不包含符合條件的項目
  // 我們用它來建立一個「不包含要被刪除的那個 todo」的新陣列，再重新賦值給 todos.value
  todos.value = todos.value.filter(todo => todo.id !== todoToRemove.id)
}

// 取得證券資料
async function fetchStock(stockInfo) {
  try {
    const res = await fetch('/twseapi/v1/opendata/t187ap18');
    const data = await res.json();
    stockInfo = data || null;
  } catch (error) {
    console.error('Error fetching opendata:', error);
  }
}
</script>


<style scoped>
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

.empty-message {
  color: #777;
  text-align: center;
  margin-top: 2rem;
}
</style>
