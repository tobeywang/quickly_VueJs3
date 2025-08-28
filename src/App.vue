<template>
  <header>
    <div class="wrapper">
      <h1>Vue 3 教學</h1>
      <nav class="tab-nav">
        <ul class="tab-list">
          <li 
            v-for="tab in tabs" 
            :key="tab.path || tab.name"
            :class="{ 
              active: isActiveTab(tab),
              'has-dropdown': tab.children,
              'dropdown-open': tab.children && openDropdown === tab.name
            }"
           
          >
            <!-- 一般連結 -->
            <RouterLink 
              v-if="!tab.children" 
              :to="tab.path"
            >
              {{ tab.name }}
            </RouterLink>
            
            <!-- 下拉選單觸發器 - 只用點擊 -->
            <div 
              v-else 
              class="dropdown-trigger"
              @click="toggleDropdown(tab.name)"
            >
              {{ tab.name }}
              <span class="dropdown-arrow">▼</span>
            </div>
            
            <!-- 下拉選單內容 -->
            <ul 
              v-if="tab.children" 
              class="dropdown-menu"
              :class="{ show: openDropdown === tab.name }"
            >
              <li 
                v-for="child in tab.children" 
                :key="child.path"
                :class="{ active: $route.path === child.path }"
              >
                <RouterLink :to="child.path">{{ child.name }}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
     <router-view />
  </main>
</template>

<script>
import HelloWorld from './views/HelloWorld.vue'
//  Options API
export default {
  name: 'App',
  data() {
    return {
      openDropdown: null, // 追蹤當前開啟的下拉選單
      tabs : [
        { name: '回首頁', path: '/' },
        { name: '基礎語法', path: '/basics' },
        { name: '列表與事件', path: '/todo' },
        { name: '組件通訊', path: '/component-comm' },
        { name: 'API 請求', children:[{name: 'API 請求 (onMounted, fetch)' ,path: '/apiDataPage' }, 
                                      {name: 'API 請求 (fetch)' ,path: '/api'} ] },
        // 新增進階項目，包含子選單
        { 
          name: '進階', 
          children: [
            { name: '最新股價', path: '/gridform' },
          ]
        }
      ]
    }
  },

  methods: {
    isActiveTab(tab) {
      if (tab.path) {
        if (tab.path === '/') {
          return this.$route.path === '/'
        }
        return this.$route.path === tab.path || this.$route.path.startsWith(tab.path + '/')
      }
      
      // 檢查子選單是否有活躍項目
      if (tab.children) {
        return tab.children.some(child => 
          this.$route.path === child.path || this.$route.path.startsWith(child.path + '/')
        )
      }
      
      return false
    },
    // 點擊切換下拉選單顯示/隱藏
    toggleDropdown(tabName) {
      this.openDropdown = this.openDropdown === tabName ? null : tabName
    },
    
    // 點擊子選單項目後關閉下拉選單
    closeDropdown() {
      this.openDropdown = null
    },
    
    // 點擊外部區域關閉下拉選單
    closeDropdownOnClickOutside(event) {
      if (!event.target.closest('.has-dropdown')) {
        this.openDropdown = null
      }
    }
  },
  
  mounted() {
    // 監聽點擊外部事件
    document.addEventListener('click', this.closeDropdownOnClickOutside)
  },
  
  beforeUnmount() {
    // 清理事件監聽器
    document.removeEventListener('click', this.closeDropdownOnClickOutside)
  }
}
</script>

<!-- 只有這個頁面有效 -->
<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  margin: 20px 0 10px 0;
  color: #2c3e50;
  font-size: 1.8rem;
}

.tab-nav {
  margin-bottom: 0;
}

.tab-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap;
}

.tab-list li {
  position: relative;
  flex: 1;
  min-width: 0;
}

.tab-list a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: #666;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 下拉選單觸發器樣式 */
.dropdown-trigger {
  display: block;
  padding: 12px 16px;
  color: #666;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.dropdown-arrow {
  margin-left: 8px;
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.dropdown-open .dropdown-arrow {
  transform: rotate(180deg);
}

/* Hover 效果 */
.tab-list a:hover,
.dropdown-trigger:hover {
  color: #42b883;
  background-color: #f8f9fa;
  transform: translateY(-1px);
}

/* 活躍狀態 */
.tab-list .router-link-active,
.tab-list .active > a,
.tab-list .active .dropdown-trigger {
  color: #42b883;
  background-color: #fff;
  border-color: #ddd;
  border-bottom-color: #fff;
  position: relative;
  z-index: 1;
  font-weight: bold;
}

/* 下拉選單樣式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  min-width: 200px;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  flex: none;
}

.dropdown-menu a {
  padding: 10px 16px;
  border: none;
  border-radius: 0;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-menu li:last-child a {
  border-bottom: none;
  border-radius: 0 0 4px 4px;
}

.dropdown-menu a:hover {
  background-color: #f8f9fa;
  transform: none;
}

.dropdown-menu .active a {
  background-color: #e8f5e8;
  color: #42b883;
  font-weight: bold;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 120px);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .wrapper {
    padding: 0 10px;
  }
  
  h1 {
    font-size: 1.4rem;
    margin: 15px 0 8px 0;
  }
  
  .tab-list {
    flex-direction: column;
  }
  
  .tab-list li {
    flex: none;
    width: 100%;
  }
  
  .tab-list a,
  .dropdown-trigger {
    text-align: left;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    min-width: auto;
  }
  
  .dropdown-menu a {
    padding-left: 32px;
    background-color: #f8f9fa;
  }
  
  main {
    padding: 15px 10px;
  }
}

@media (max-width: 480px) {
  .tab-list a,
  .dropdown-trigger {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
  
  .dropdown-menu a {
    font-size: 0.85rem;
    padding: 8px 28px;
  }
}
</style>