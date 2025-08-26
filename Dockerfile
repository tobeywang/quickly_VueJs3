#使用 Node.js 環境建置專案，再將產出的靜態檔案複製到 Nginx 映像檔中。這種多階段建置（Multi-stage build）可以讓最終的映像檔更小、更安全
# --- 第一階段：建置 Vue 專案 ---
# 使用 Node.js 映像檔作為建置環境
FROM node:20 AS build-stage

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝專案依賴
RUN npm install

# 複製所有專案檔案到工作目錄
COPY . .

# 執行建置指令
RUN npm run build

# --- 第二階段：設定 Nginx 伺服器 ---
# 透過From指令，宣告建置新映像檔時所需要依賴的基礎映像檔
# 建立好此檔案與nginx.conf後，在docker build時會做拉取官方映像檔的動作
# 使用 Nginx 官方映像檔作為最終的執行環境
FROM nginx:latest

# 將第一階段建置好的靜態檔案（dist 資料夾內的內容）複製到 Nginx 的預設網站根目錄
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 複製自訂的 Nginx 設定檔
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 開放容器的 80 連接埠
EXPOSE 80

# 容器啟動時執行的指令
CMD ["nginx", "-g", "daemon off;"]
