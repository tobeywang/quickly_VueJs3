<template>
  <div >
    <div class="header-controls">
        <input 
            id="search-input"
            type="text" 
            v-model="searchText" 
            placeholder="輸入代號或名稱搜尋..."
        >
        <div>總筆數: {{ filteredStocks.length }}</div>
    </div>
    
    <div v-if="loading" class="loading-text">
        正在從 API 代理載入資料...
    </div>

    <div v-else>
        <!-- 關鍵變更 1: 標頭表格 (Header Table) -->
        <!-- 這個表格只負責顯示固定的標頭，它不會滾動 -->
        <table class="header-table">
            <colgroup>
                <col style="width: 15%;"><col style="width: 25%;"><col style="width: 15%;"><col style="width: 15%;"><col style="width: 15%;"><col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <!-- 變更1: 增加 class 和 @click 事件，並顯示排序箭頭 -->
                    <th class="sortable" :class="{ active: sortKey === 'Code' }" @click="sortBy('Code')">
                        代號 <span v-if="sortKey === 'Code'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="sortable" :class="{ active: sortKey === 'Name' }" @click="sortBy('Name')">
                        名稱 <span v-if="sortKey === 'Name'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="sortable" :class="{ active: sortKey === 'TradeVolume' }" @click="sortBy('TradeVolume')">
                        成交股數 <span v-if="sortKey === 'TradeVolume'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="sortable" :class="{ active: sortKey === 'TradeValue' }" @click="sortBy('TradeValue')">
                        成交金額 <span v-if="sortKey === 'TradeValue'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="sortable" :class="{ active: sortKey === 'OpeningPrice' }" @click="sortBy('OpeningPrice')">
                        開盤價 <span v-if="sortKey === 'OpeningPrice'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                    <th class="sortable" :class="{ active: sortKey === 'ClosingPrice' }" @click="sortBy('ClosingPrice')">
                        收盤價 <span v-if="sortKey === 'ClosingPrice'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
                    </th>
                </tr>
            </thead>
        </table>

        <!-- 關鍵變更 2: 內文滾動容器與表格 (Body Scroll Container & Table) -->
        <!-- 這個 div 負責滾動，裡面的表格只包含會變動的 tbody -->
        <div 
            ref="scrollContainer" 
            class="body-scroll-container" 
            @scroll="handleScroll"
        >
            <div :style="{ height: totalHeight + 'px', position: 'relative' }">
                <table class="body-table" :style="{ transform: `translateY(${offsetTop}px)`, position: 'absolute', top: 0, left: 0 }">
                    <!-- 必須使用和標頭完全一樣的 colgroup 才能對齊 -->
                    <colgroup>
                        <col style="width: 15%;">
                        <col style="width: 25%;">
                        <col style="width: 15%;">
                        <col style="width: 15%;">
                        <col style="width: 15%;">
                        <col style="width: 15%;">
                    </colgroup>
                    <tbody>
                        <tr v-for="stock in visibleItems" :key="stock.Code">
                            <td>{{ stock.Code }}</td>
                            <td>{{ stock.Name }}</td>
                            <td>{{ Number(stock.TradeVolume).toLocaleString() }}</td>
                            <td>{{ Number(stock.TradeValue).toLocaleString() }}</td>
                            <td>{{ stock.OpeningPrice }}</td>
                            <td>{{ stock.ClosingPrice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue';

export default {
  name: 'GridForm',
  setup() {
    // --- ref() 用來建立一個響應式狀態定義 ---
    // 當它的值改變時，畫面 (HTML) 會自動更新。
    const allStocks = ref([]);// 存放從 API 獲取的全部股票資料
    const loading = ref(true);// 控制載入提示的顯示
    const searchText = ref('');// 綁定搜尋框的輸入值

    
    // --- 虛擬滾動相關狀態 ---
    const sortKey = ref('Code'); // 預設排序欄位為 '代號'
    const sortOrder = ref('asc'); // 預設排序為 'asc' (升序)

    const scrollContainer = ref(null);
    const itemHeight = 49;
    const scrollTop = ref(0);
    const containerHeight = ref(0);
    // --- API 資料獲取 ---
    onMounted(async () => { 
        try {
            const response = await fetch('https://woker-stock-all.hebeplkj.workers.dev/');
            if (!response.ok) throw new Error('無法獲取資料，請稍後再試。');
            const data = await response.json();
            // 過濾掉沒有收盤價的資料 (例如: 認購權證)
            allStocks.value = data.filter(stock => stock.ClosingPrice !== '0.00' && /^\d{4,5}$/.test(stock.Code));
        } catch (error) {
            console.error('API 請求失敗:', error);
            alert(error.message);
        } finally {
            loading.value = false;
            // 資料載入後，更新容器高度
            nextTick(() => { if (scrollContainer.value) containerHeight.value = scrollContainer.value.clientHeight; });
        }
    });
    
    // --- 核心邏輯：計算屬性 ---
    // 1. 根據搜尋文字篩選股票 : 因為searchText.value，filteredStocks 訂閱了 searchText 的所有變更
    // 僅負責搜尋過濾
    const filteredStocks = computed(() => {
        const query = searchText.value.trim().toLowerCase();
        if (!query) return allStocks.value;
        return allStocks.value.filter(stock => 
            stock.Code.includes(query) || 
            stock.Name.toLowerCase().includes(query)
        );
    });

    // 變更3: 新增一個 computed 屬性，專門用來排序
    const sortedStocks = computed(() => {
        // 從過濾後的結果，複製一份出來排序，避免影響原始資料
        const stocksToSort = [...filteredStocks.value];
        
        if (sortKey.value) {
            stocksToSort.sort((a, b) => {
                let valA = a[sortKey.value];
                let valB = b[sortKey.value];

                // 判斷是否為數字，並進行相應的比較
                const isNumeric = !isNaN(parseFloat(valA)) && isFinite(valA) && valA !== '';
                if (isNumeric) {
                    valA = Number(valA);
                    valB = Number(valB);
                }

                // 比較邏輯
                if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return stocksToSort;
    });
    
    // 計算虛擬滾動的總高度
    const totalHeight = computed(() => sortedStocks.value.length * itemHeight);
    // 根據滾動位置，計算出目前應該顯示哪些資料
    const visibleItems = computed(() => {
        // 計算可視範圍內能容納多少個項目，上下多緩衝5個項目以提升體驗
        const bufferCount = 5;
        const visibleItemCount = Math.ceil(containerHeight.value / itemHeight) + bufferCount * 2;
        // 計算可視範圍的起始索引
        const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferCount);
        // 從「已排序」的列表中切出可視項目
        return sortedStocks.value.slice(startIndex, startIndex + visibleItemCount);
    });

    // 計算可視資料區塊的Y軸偏移量
    const offsetTop = computed(() => { /* ... 此處邏輯不變 ... */
        const bufferCount = 5;
        const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferCount);
        return startIndex * itemHeight;
    });

    // --- 事件處理 ---
    const handleScroll = () => { /* ... 此處邏輯不變 ... */
        if (scrollContainer.value) scrollTop.value = scrollContainer.value.scrollTop;
    };

    // 變更5: 新增 sortBy 函式，並從 setup return 出去
    const sortBy = (key) => {
        // 如果點擊的是同一個欄位，則切換排序方向
        if (sortKey.value === key) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            // 如果點擊的是新欄位，則設定該欄位為排序目標，並預設為升序
            sortKey.value = key;
            sortOrder.value = 'asc';
        }
    };
    // **必須** 將要給 HTML 使用的資料和方法 return 出去
    return {
        loading, searchText, scrollContainer,
        filteredStocks,
        totalHeight, visibleItems, offsetTop, handleScroll,
        sortKey, sortOrder, sortBy, sortedStocks 
    };
  }
}
// 取得隨機用戶名稱
async function fetchStock(allStocks, loading, scrollContainer, containerHeight) {
    loading.value = true;
  try {
        const response = await fetch('https://woker-stock-all.hebeplkj.workers.dev/');
        if (!response.ok) throw new Error('無法獲取資料，請稍後再試。');
        const data = await response.json();
        // 過濾掉沒有收盤價的資料 (例如: 認購權證)
        allStocks.value = data.filter(stock => stock.ClosingPrice !== '0.00' && /^\d{4,5}$/.test(stock.Code));
    } catch (error) {
        console.error('API 請求失敗:', error);
        alert(error.message);
    } finally {
        loading.value = false;
        // 資料載入後，更新容器高度
        nextTick(() => { if (scrollContainer.value) containerHeight.value = scrollContainer.value.clientHeight; });
    }
}
</script>

<style scoped>
.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.header-table, .body-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.header-table th, .body-table td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 15px;
}

.header-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.header-table th.active {
  background: #f0f8ff;
}

.sort-arrow {
  font-size: 12px;
  margin-left: 4px;
}

.body-scroll-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background: #fafafa;
}

.loading-text {
  color: #888;
  font-size: 16px;
  text-align: center;
  margin: 24px 0;
}
</style>