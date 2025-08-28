<template>
  <div>
    <h2>API 資料串接</h2>
    <div v-if="userName">
      <p>隨機用戶：{{ userName }}</p>
    </div>
    <button @click="fetchUser">取得新用戶</button>
    <button @click="fetchStock">取得證券</button>
    <ul class="post-list">
      <li v-for="stock in stockInfo" :key="stock.證券代號" >
        <p>證券代號：{{ stock['證券代號'] }}</p>
        <p>交割金融機構：{{ stock['券商(證券IB)簡稱'] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'About',
  setup() {
    const userName = ref('');
    const stockInfo = ref([]);

    onMounted(() => { // 元件掛載到畫面後執行特定程式碼
      //fetchUser(userName);
      //fetchStock(stockInfo);
    });

    return {
      userName,
      stockInfo, // ← 加上這行回傳
      fetchUser: () => fetchUser(userName),
      fetchStock: () => fetchStock(stockInfo,10),
    };
  }
}

// 取得隨機用戶名稱
async function fetchUser(userName) {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  userName.value = `${data.results[0].name.first} ${data.results[0].name.last}`;
}

// 取得證券資料
async function fetchStock(stockInfo,cnt = 1) {
  try {
    const res = await fetch('/twseapi/v1/opendata/t187ap18');
    const data = await res.json();
    const list = Array.isArray(data) ? data : []
    const sample = sampleSize(list, cnt) // 取出 10 筆
    stockInfo.value = sample.length ? sample : null
  } catch (err) {
    // 如果在 try 區塊中發生任何錯誤 (例如網路中斷、URL 錯誤)，就會被 catch 捕獲
    console.error('API 請求失敗:', err)
    error.value = '資料載入失敗，請稍後再試。'
    stockInfo.value = null
  } finally {
    // finally 區塊中的程式碼不論成功或失敗，最後一定會執行
    // 我們在這裡將 isLoading 設為 false，以隱藏載入提示
    //isLoading.value = false
  }
}
async function fetchNonUTF8JSON(url, encoding = 'big5') {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  const txt = new TextDecoder(encoding).decode(buf)
  return JSON.parse(txt)
}

// 從陣列中隨機取出 n 個元素
function sampleSize(arr, n) {
  const a = arr.slice()
  const m = Math.min(n, a.length)
  for (let i = a.length - 1; i > a.length - 1 - m; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(-m)
}

</script>