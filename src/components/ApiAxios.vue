<template>
  <div>
    <h2>API 資料串接</h2>
    <div v-if="userName">
      <p>隨機用戶：{{ userName }}</p>
    </div>
    <button @click="fetchUser">取得新用戶</button>

    <div v-if="stockInfo">
      <p>證券代號：{{ stockInfo['證券代號'] }}</p>
      <p>交割金融機構：{{ stockInfo['券商(證券IB)簡稱'] }}</p>
    </div>
    
    <button @click="fetchStock">取得證券</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'About',
  setup() {
    const userName = ref('');
    const stockInfo = ref(null);

    onMounted(() => { // 元件掛載到畫面後執行特定程式碼
      //fetchUser(userName);
      //fetchStock(stockInfo);
    });

    return {
      userName,
      stockInfo, // ← 加上這行回傳
      fetchUser: () => fetchUser(userName),
      fetchStock: () => fetchStock(stockInfo),
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
async function fetchStock(stockInfo) {
  try {
    const res = await fetch('/twseapi/v1/opendata/t187ap18');
    const data = await res.json();
    stockInfo.value = data?.[0] || null;
  } catch (error) {
    console.error('Error fetching opendata:', error);
  }
}

</script>