# 📝 **WriteLoop Frontend**

WriteLoop Frontend 是一个基于 **Vue 3 + Vite + TypeScript + TipTap** 的英语写作辅助工具。
它提供一个现代化的写作界面，并通过 WebSocket 接入后端的 AI 写作补全服务。

---

# 📦 运行环境要求

在运行项目前，请确保本机满足以下环境：

* **Node.js ≥ 18**

* **NPM ≥ 9**

- **Chrome**

# 🚀 如何运行前端项目

## **1. Clone 仓库**

```bash
git clone https://github.com/Notyourbing/WriteLoop.git
cd WriteLoop
```

## **2. 安装依赖**

```bash
npm install
```

## **3. 启动开发服务器**

```bash
npm run dev
```

默认运行在：

```
http://localhost:5173
```


# 🛠 项目结构

```
WriteLoop/
├── public/               # 静态资源
├── src/
│   ├── components/
│   │   └── Editor.vue    # 基于 TipTap 的英文编辑器
│   ├── assets/
│   ├── main.ts           # 程序入口
│   └── App.vue
├── index.html
├── package.json
└── vite.config.ts
```

核心功能在 **src/components/Editor.vue** 中实现。





# 👥 团队协作流程（Fork → Pull Request 模式）

为了确保主仓库的稳定性与提交质量，本项目使用 **Fork + Pull Request（PR）** 的协作流程。
所有组员必须按照以下步骤参与开发。

---

## 🔰 1. 组员 Fork 主仓库

每位组员首先需要在 GitHub 上：

1. 打开主仓库

   ```
   https://github.com/Notyourbing/WriteLoop
   ```
2. 点击右上角 **Fork**
3. 完成后你会得到属于你自己的仓库，例如：

   ```
   https://github.com/<yourname>/WriteLoop
   ```

## 🛠 2. 在自己的 Fork 中开发 & 提交代码

```bash
git add .
git commit -m "feat: improve editor UI"
git push origin feature/editor-enhance
```

---

## 🔀 3. 提交 Pull Request 到主仓库

进入你的 Fork 仓库页面：

```
Compare & Pull Request
```

然后确保 PR 的目标是：

```
base repository: Notyourbing/WriteLoop
base: main
head repository: <yourname>/WriteLoop
compare: feature/<your-feature>
```

并填写 PR 信息：

* 本次修改内容
* 修改原因
* 是否涉及 UI / API 变化

---

## 👨‍💼 4. 由组长审核 PR

组长将：

* 检查代码质量
* 确认功能正常
* 确认不会破坏主分支

如需更改，会在 PR 中留言，组员需修改并 push 同一分支，PR 将自动更新。

---

## ✔ 5. PR 审核通过后由组长合并

组长点击：

```
Merge Pull Request
```

成功后，组员需要将主仓库更新同步到自己的 Fork。

---

## 🔄 6. 组员每次开发前同步主仓库最新代码

在本地仓库添加主仓库作为 upstream：

```bash
git remote add upstream git@github.com:Notyourbing/WriteLoop
```

每次开发前同步主仓库更新：

```bash
git pull upstream main
git push origin main
```

---

# 🚫 禁止行为!!!

为了保证主仓库的稳定性，严格禁止：

* ❌ 直接向主仓库推送代码
* ❌ 在没有 PR 审核的情况下修改主仓库
* ❌ 合并自己提交的 PR（必须由组长合并）





