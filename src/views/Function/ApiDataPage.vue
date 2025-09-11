<template>
  <div class="api-data-page">
    <h2>功能四：API 請求 (onMounted, fetch)</h2>
    <p>這個頁面展示了如何在元件載入時，從遠端 API 獲取資料並顯示出來。</p>

    <!-- 1. 正在載入時，顯示載入訊息 -->
    <div v-if="isLoading" class="loading">載入中，請稍候...</div>

    <!-- 2. 如果發生錯誤，顯示錯誤訊息 -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- 3. 資料成功載入後，使用 v-for 顯示列表 -->
    <ul v-else class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 建立一個響應式變數來存放從 API 獲取的文章列表
const posts = ref([])
// 建立一個布林值來追蹤是否正在載入資料
const isLoading = ref(true)
// 建立一個變數來存放可能發生的錯誤訊息
const error = ref(null)

// onMounted 是一個生命週期鉤子，它裡面的函式會在元件被掛載到 DOM 後執行
onMounted(async () => {
  try {
    // 使用瀏覽器內建的 fetch 函式向指定的 URL 發送請求
    // await 會暫停函式的執行，直到 fetch 完成並回傳一個 response
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

    // 檢查 response 的狀態是否為成功 (HTTP 狀態碼 200-299)
    if (!response.ok) {
      throw new Error('無法獲取資料')
    }

    // .json() 會讀取 response 的主體並將其解析為 JavaScript 物件
    // 這也是一個非同步操作，所以我們也需要 await
    const data = await response.json()

    // 將獲取到的資料存入我們的響應式變數中
    posts.value = data
  } catch (err) {
    // 如果在 try 區塊中發生任何錯誤 (例如網路中斷、URL 錯誤)，就會被 catch 捕獲
    console.error('API 請求失敗:', err)
    error.value = '資料載入失敗，請稍後再試。'
  } finally {
    // finally 區塊中的程式碼不論成功或失敗，最後一定會執行
    // 我們在這裡將 isLoading 設為 false，以隱藏載入提示
    isLoading.value = false
  }
})
</script>


<style scoped>
.loading,
.error {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #777;
}

.error {
  color: #e53935;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

.post-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.post-item h3 {
  margin: 0 0 0.5rem 0;
  color: #42b983;
  /* 首字母大寫 */
  text-transform: capitalize;
}

.post-item p {
  margin: 0;
  color: #333;
}
</style>
