module.exports = {
  devServer: {
    proxy: { //只有在開發環境 (npm run serve) 才會生效
      '/twseapi': {
        target: 'https://openapi.twse.com.tw',
        // 允許跨域
        changeOrigin: true,
        // 重寫路徑：將請求中的 '/api' 替換成空字串
        // 例如，前端請求 /api/users，代理後會變成 https://openapi.twse.com.tw/users
        pathRewrite: { '^/twseapi': '' }
      }
    }
  }
}