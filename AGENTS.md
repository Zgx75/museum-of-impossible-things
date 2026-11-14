# AGENTS.md — 不存在的博物館

> 這是本專案 AI 開發者的**第一閱讀文件**。所有新增展品、新頁面、修改樣式及修正錯誤的工作，均以此文件為準。

## 1. 專案目標與範圍

- 專案名稱：不存在的博物館（The Museum of Impossible Things）。
- 用途：以策展式網站呈現原創的**虛構器物**，讓每件作品擁有一致的介紹、故事、功能與限制。
- 使用者：喜歡奇想設計、故事創作、數位展覽的一般訪客。
- 核心原則：**每次只維護一份館藏資料，所有列表、詳細頁與延伸連結都依資料自動產生。**
- 本站為靜態網站，不需後端、不需 AI API Key；AI 的任務是協助新增與維護展品內容和網頁。
- 所有展品、出土／收藏紀錄、地點、年代與相關故事都是**虛構創作**。不得寫成經證實的歷史、科學或真實博物館文物。

## 2. 技術堆疊與執行方式

- 使用原生 **HTML5 / CSS3 / JavaScript ES Modules**，無前端框架、無 npm 執行期依賴。
- `data/exhibits.js` 是展品資料的單一來源；`assets/js/app.js` 負責渲染共用導覽、頁尾、卡片、查詢與展品細節。
- 部署於 GitHub Pages，所有內部超連結、圖片、CSS、JS **一律使用相對路徑**，以便部署在 `https://<username>.github.io/<repository>/` 子路徑。
- 開發啟動：`python3 -m http.server 8080`，然後開啟 `http://localhost:8080/`。Node.js 可用時，也可執行 `npm run serve`。
- 驗證：`npm run check`，或 `node scripts/validate.mjs`。修改後必須執行並確認通過。

## 3. 專案目錄與頁面責任

```text
/
├── AGENTS.md                    # 本文件：AI 開發與內容規範
├── README.md                    # 專案說明與部署方式
├── index.html                   # 首頁：策展主視覺與本月特展
├── collection.html              # 全部館藏：搜尋、分類篩選
├── exhibit.html                 # 動態詳細頁：?slug=<exhibit-slug>
├── about.html                   # 虛構聲明、館藏理念與延伸方式
├── data/
│   └── exhibits.js              # 全部展品資料與分類陣列
├── assets/
│   ├── css/style.css            # 共用樣式、頁面樣式與 RWD
│   ├── js/app.js                # 共用 UI 與頁面渲染
│   └── img/<exhibit-slug>.svg   # 展品原創插畫與 favicon.svg
├── scripts/
│   ├── validate.mjs             # 館藏資料、圖片與連結驗證
│   └── make_art.py              # 初始插畫產生腳本（非必需執行）
└── .github/workflows/
    ├── check.yml               # PR / push 自動檢查
    └── deploy.yml              # main 分支的 GitHub Pages 自動發布
```

- `index.html` 只負責首頁版型；首頁精選 3 件館藏由 `app.js` 從資料取得。
- `collection.html` 由 `app.js` 讀取全部展品，提供搜尋及分類篩選。
- `exhibit.html?slug=...` 依 `slug` 顯示一件展品；**不得為每件展品複製新 HTML**。
- `about.html` 陳述網站內容純屬虛構，也說明共用內容系統。
- 各 HTML 的 `data-page` 依序為 `home`、`collection`、`exhibit`、`about`。

## 4. 視覺規範

- 品牌氣質：**神祕、安靜、有考據感的虛構博物館**；不要做成商店、一般部落格或遊戲商城。
- 色彩：深藍黑 `#111820`、羊皮紙色 `#f2f0e9`、銅金 `#b49563`；同類色可作為輔助色。
- 中文正文：系統無襯線字體；標題可混用襯線斜體，以呈現展覽館氛圍。
- 統一元件：站點導覽、頁尾、`exhibit-card`、分類按鈕、kicker 英文字樣、展品標籤。
- 圖片優先使用本地 SVG；每件插畫建議 `viewBox="0 0 640 760"`、主題置中、附 `aria-label`，避免依賴外部素材或版權來源。
- 每個頁面必須有一個 `h1`、可讀的主要內容、合理的 `alt`，並支援手機寬度 375px。
- 保持鍵盤可操作、焦點可見；用互動按鈕的 `aria-pressed` 表示目前篩選狀態。
- 每頁至少保留一處清楚的虛構聲明；目前共用頁尾已提供全站聲明。

## 5. 館藏資料格式（不可任意變更）

在 `data/exhibits.js` 的 `exhibits` 陣列尾端加入以下形狀的物件：

```js
{
  id: "IM-007",                       // 唯一、遞增、三位數
  slug: "example-object",             // 唯一的小寫英文 kebab-case，用於網址與圖片檔名
  name: "範例器物",                    // 繁體中文，具體且好記
  englishName: "The Example Object",  // 英文展品名
  category: "感知機械",                // 必須是 categories 陣列中既有分類
  subtitle: "一句能引發好奇的短句。",
  description: "約 45–95 字的展品介紹，含它能做什麼。",
  year: "虛構年代或時間標記",
  location: "虛構館內位置",
  material: "想像中的材質，使用頓號分隔",
  function: "說明此物在世界觀中的具體用途。",
  limitation: "它做不到什麼、代價或使用條件。",
  story: ["背景故事第一段。", "背景故事第二段。"],
  curatorNote: "帶有提問或觀察的館長短註。",
  tags: ["標籤一", "標籤二"],
  image: "assets/img/example-object.svg",  // 圖片實際存在
  related: ["dream-pillow", "shadow-collector"] // 兩個已存在、與自己不同的 slug
}
```

**嚴格要求：**

1. `id` 使用 `IM-001` 格式，不能重複；新的館藏應選擇下一個尚未使用的編號。
2. `slug` 使用 ASCII 小寫、數字與連字號，不包含空白、中文或底線；發布後避免任意更改，以免舊連結失效。
3. `category` 從 `categories` 選取。需要新類別時，同時考慮首頁分類卡與篩選 UI，更新陣列並測試。
4. `story` 至少 2 段，`tags` 至少 2 項，`related` 恰好 2 個不同、已存在的展品 slug。
5. `image` 為相對於網站根目錄的 `.svg` 路徑；檔名與 slug 一致。插畫必須與展品形象符合。
6. 展品要同時有「能力」與「限制」，避免沒有代價、無所不能的物件；年代與地點始終維持虛構標示。
7. 使用台灣常見的繁體中文及全形中文標點。英文名稱保留原文，句子要易讀、具體，避免空洞宣傳語。
8. 新增展品不改動現有資料的內容，不為新展品另外建立獨立頁面檔案。

## 6. AI 新增一件展品的標準流程（必須照順序）

1. 先閱讀本文件及 `data/exhibits.js`，確認已有的 id、slug、分類與關聯。
2. 訂定新展品名稱、具體用途、限制與兩段故事，確認是原創虛構設定。
3. 配置新的 `IM-xxx` 編號與唯一 `slug`，新增展品物件，所有欄位填寫完整。
4. 在 `assets/img/` 新增 `slug.svg` 插畫，保持統一的設計語言。
5. 將 `related` 指向兩個已存在的展品；讓詳細頁的延伸探索自動生效。
6. 執行 `npm run check`；若失敗，依錯誤修正 id、資料欄位、圖片或關聯。
7. 使用 HTTP 開啟 `index.html`、`collection.html`、`exhibit.html?slug=<new-slug>`、`about.html`，檢查桌機與手機版。
8. 驗證新展品可被搜尋、分類篩選、點選詳情，且延伸連結可用。完成後簡述修改了哪些檔案與測試結果。

**驗收標準：** 新增資料後不改動既有 HTML 模板，新展品就能在館藏列表及詳細頁顯示；搜尋、分類與相關展品正常，驗證腳本通過。

## 7. AI 新增一種新頁面的標準流程

1. 先確認新需求能否由現有展品詳細頁、篩選或首頁區塊完成；優先沿用現有模板。
2. 必須新增頁面時，採用 `kebab-case.html` 檔名，例如 `curator-notes.html`。
3. 複製 `about.html` 的基本 HTML 結構，設定專屬 `title`、meta description、`data-page`、主要內容 `id="main"` 與 `h1`。
4. 共用導覽與頁尾繼續使用 `app.js` 的 `renderHeader()` / `renderFooter()`，避免重複寫一套 UI。
5. 在 `app.js` 依 `data-page` 增加對應渲染函式；全站 CSS 放在 `assets/css/style.css`，沿用色彩、間距與行動版斷點。
6. 若需導覽入口，修改共用導覽設定，確保站內能到達新頁面；檢查連結都使用相對網址。
7. 新頁面通過鍵盤可達、手機 375px 無橫向溢出、內容完整、導航正常等測試，並更新 README 與本文件的目錄說明。

## 8. 修改既有內容時的界線

- **新增內容：** 以新增資料或延伸現有渲染函式為主；維持相同資料 schema。
- **文字修正：** 只修指定欄位；保留其他展品原有故事、編號與網址。
- **樣式修正：** 優先修改共用 class，檢查首頁、館藏、詳細頁、關於頁是否一起受到影響。
- **資料 schema 變更：** 先更新本文件中的範例、`scripts/validate.mjs` 和所有會用到該欄位的渲染邏輯，再更新資料。
- **安全性：** 向 DOM 寫入動態文字時使用 `escaped()`；URL 參數使用 `URLSearchParams`，網址片段使用 `encodeURIComponent()`。
- **圖片與內容：** 優先使用原創 SVG 和原創文字；使用第三方素材前檢查授權，並在 README 明示來源。

## 9. 完成定義（Definition of Done）

每一次新增或修改，在回報完成前確認：

- [ ] `npm run check` 通過，無重複 ID/slug、缺漏欄位、失效相關連結或缺圖。
- [ ] 各頁面與所有新增連結可由 HTTP 正常開啟，console 無 JavaScript 錯誤。
- [ ] 桌機與手機（至少 375px）版型合理，圖片無破版，文字與連結可操作。
- [ ] 新展品可搜尋、分類、閱讀詳細資料與延伸探索。
- [ ] 首頁、館藏、詳細頁與關於頁保持同一視覺系統，清楚標明全站虛構性質。
- [ ] 若改動目錄、資料欄位或流程，已同步更新 `AGENTS.md` 與 `README.md`。
- [ ] GitHub Pages 的路徑採相對連結，無對本機絕對路徑的依賴。

## 10. 一句話交接任務示例

> 「請先閱讀 AGENTS.md，再為不存在的博物館新增一件『會收集遺憾聲音的錄音機』。請遵守館藏 schema、產生一張原創 SVG 插畫、建立與既有展品的兩個關聯，最後執行驗證並回報檢查結果。」

依照這套規則，AI 不需要重新設計 HTML，就能反覆擴充展品與網站內容。