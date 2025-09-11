<template>
  <div class="basics-page">
    <h2>功能一：響應式基礎 (ref, computed)</h2>
    <p>這個頁面展示了 Vue 3 的核心響應式語法。</p>

    <!-- 計數器區塊 -->
    <section class="feature-section">
      <h3>1. 計數器 (ref)</h3>
      <p>
        當前計數：<strong>{{ count }}</strong>
      </p>
      <!-- 在模板中，Vue 會自動解開 ref，所以不需要 .value -->
      <button @click="increment">增加 (+)</button>
      <button @click="decrement">減少 (-)</button>
      <button @click="reset">復位</button>
      <button @click="getValue">現值(from js)</button>
    </section>

    <!-- 文字反轉區塊 -->
    <section class="feature-section">
      <h3>2. 文字反轉 (v-model, computed)</h3>
      <p>請在下方輸入文字：</p>
      <!-- v-model 會將輸入框的值與 text 變數進行雙向綁定 -->
      <!-- v-model  是一個非常方便的語法糖，它在 <input> 元素上實現了 雙向綁定 當 text 變數改變時，輸入框的內容會自動更新-->
      <input type="text" v-model="text" placeholder="請在此輸入..." />
      <p>
        反轉後的文字：<strong>{{ reversedText }}</strong>
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue';
import { useRoute } from 'vue-router';  // ← 新增這行

// --- 1. 計數器功能 ---
// 使用 ref() 來建立一個響應式變數，初始值為 0
// .value 是用來在 <script> 區塊中存取或修改 ref 值的方式
const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
function reset() {
  count.value = 0
}
function getValue() {
  alert(count.value)
}

// --- 2. 文字反轉功能 ---
// 建立一個響應式變數來綁定 input 的內容
const text = ref('')

// 使用 computed() 來建立一個計算屬性
// 它會依賴 text 的變化，並自動回傳計算後的新值
const reversedText = computed(() => {
  return text.value.split('').reverse().join('')
})

</script>

<style scoped>
.basics-page h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.feature-section {
  margin-bottom: 2rem;
  background-color: #fafafa;
  padding: 1rem;
  border-radius: 8px;
}

strong {
  color: #42b983;
  font-size: 1.2em;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #42b983;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #42b983;
  color: white;
}

input[type='text'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
}
</style>