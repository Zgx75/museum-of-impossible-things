# 不存在的博物館 — The Museum of Impossible Things

一座收藏**不存在的發明與想像器物**的原創虛構數位博物館，也是生成式 AI 課程的 AGENTS.md 開發規範專案。

> 所有館藏、年代、地點與故事皆為原創虛構設定，並非真實歷史或科學事實。

## 網頁功能
- 首頁：館長選藏及主題分類入口
- 常設館藏：搜尋、分類篩選與六件原創展品
- 展品詳細頁：獨立網址、用途與限制、背景故事及延伸閱讀
- 關於本館：創作理念與虛構聲明
- 支援桌機與手機瀏覽

## 架構
網站使用原生 HTML、CSS、JavaScript ES Modules 與 SVG。**所有展品資料都放在 `data/exhibits.js`**，由 `assets/js/app.js` 統一渲染頁面。

想要新增展品：先閱讀 [AGENTS.md](AGENTS.md)，按照固定 Schema 新增資料和 SVG，執行 `npm run check`，即會自動出現在館藏列表與詳細頁，不需複製 HTML 頁面。

## 本機預覽
```bash
python3 -m http.server 8080
```
開啟 http://localhost:8080/ 。

## 驗證
```bash
npm run check
```

## GitHub Pages 部署
請在 Repository → **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。專案的 `.github/workflows/deploy.yml` 會在每次推送 `main` 時執行驗證與部署。

公開站點（部署成功後）：https://zgx75.github.io/museum-of-impossible-things/ 。
