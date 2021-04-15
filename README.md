# 前端實作 - 購物車

## 概述

實作電商購物車界面，包含增減商品、調整商品數量與計算總價，並依照以下需求完成專案\
請執行 npm install 後，再執行 npm run dev\
接著前往 http://localhost:3000，若看到 nextjs 的歡迎訊息則代表專案啟動成功

**建議先研究以下需要的技術相關知識**

1. React hooks
1. React functional component
1. React context
1. nextjs route
1. nextjs Image
1. How to call a GraphQL API

## 功能需求

包含以下三個頁面

### 1. 商品頁

1. 以任何形式條列目前的商品（商品總數：50）
1. 提供任意方式將選取的商品加入購物車
1. 提供按鈕前往購物車頁

### 2. 購物車頁

1. 一列商品的資訊必須包含
	1. 商品圖片
	2. 商品價格
	3. 商品數量
	4. 調整數量的元件（調為 0 時等同於刪除）
	5. 刪除鈕
1. 購物車內須顯示商品金額與數量總計
1. 提供按鈕返回商品頁
1. 提供按鈕前往結帳頁

### 3. 結帳頁

1. 進入此頁顯示結帳成功
1. 清除所有購物車內容

## 實作要求

1. 使用 React 做開發框架，並整合任一套 UI Library
1. 使用 functional component 開發，並維持風格一致
1. 主要開發內容會放在 pages 資料夾底下，你可以自行規劃專案資料夾架構
1. API 說明文件請參考 `http://localhost:3000/graphql`，右側欄的 `Query` & `Mutation` 可以點擊檢視
1. 介面不考慮 RWD，以手機版面（375 x 667）為主
1. 建立 route
    1. 購物車頁：`/cart`
    2. 結帳成功頁：`/checkoutSuccess`
	3. 商品頁：`/product`
1. 以 context 儲存購物車內容
1. 切分你的 components
1. 你可以使用任何 package 來提高專案的完整度
1. 請將完成的作業上傳至你的 github，並回信通知我們並附上 github 連結
1. 請在一周完成此作業，若提早完成可提前交付

## 進階項目（選答）

1. 整併 typescript：定義各個元件的介面
1. Data 邏輯與 UI 分離：將 call API 相關的所有行為實作於 context 內
1. 使用 dynamic route：針對每一項商品設計各自的商品頁面，你可以修改原本的 route 命名