# SuitAgent 快速安装指南

SuitAgent 提供了**一键自动化安装脚本**，让您在几分钟内完成所有环境配置。

## 🚀 快速开始

### 最简单的方式

在 SuitAgent 项目根目录执行：

```bash
./install.sh
```

或通过 curl 直接下载执行：

```bash
curl -sSL https://raw.githubusercontent.com/cat-xierluo/SuitAgent/main/install.sh | bash
```

---

## 📋 安装脚本功能

`install.sh` 自动化安装脚本提供以下功能：

### ✨ 核心特性

1. **🖥️ 自动系统检测**
   - 支持 macOS、Linux、Windows WSL
   - 自动适配不同操作系统的安装方式

2. **🔧 依赖自动安装**
   - 自动检查 Node.js 版本（需要 ≥18.0.0）
   - 自动安装 Homebrew（macOS）
   - 自动安装 Node.js（根据系统选择最佳方式）
   - 自动安装 Claude Code CLI

3. **🤖 AI 模型配置**
   - 交互式选择 AI 模型供应商：
     - 智谱AI (GLM-4.6) ⭐⭐⭐⭐⭐
     - 月之暗面 (kimi-k2-turbo) ⭐⭐⭐⭐⭐
     - MiniMax (MiniMax-M2) ⭐⭐⭐⭐
     - DeepSeek (DeepSeek-V3.2) ⭐⭐⭐⭐

4. **🔐 API 密钥安全配置**
   - 引导式 API 密钥输入（密码模式，不显示）
   - 自动生成配置文件
   - 支持随时取消安装

5. **✅ 完整验证**
   - 验证所有组件安装状态
   - 验证配置文件正确性
   - 显示详细验证报告

6. **📖 启动指南**
   - 安装完成后提供快速开始指南
   - 提供常见使用示例

---

## 📝 详细安装流程

### 第一步：运行安装脚本

```bash
./install.sh
```

### 第二步：确认开始安装

安装脚本会显示欢迎界面，询问是否开始安装。

```
欢迎使用 SuitAgent 自动化安装向导！

本向导将帮助您:
  1. 检查并安装必要的依赖 (Node.js, npm)
  2. 安装 Claude Code CLI
  3. 选择并配置 AI 模型供应商
  4. 验证安装结果

是否开始安装? (Y/n):
```

**操作**：直接按回车或输入 `Y` 继续

### 第三步：系统检测

脚本会自动检测您的操作系统：

```
检测到操作系统: macos
```

支持的系统：
- ✅ macOS (自动使用 Homebrew)
- ✅ Linux (Ubuntu/Debian/CentOS)
- ✅ Windows (PowerShell/CMD/WSL)
- ✅ Windows WSL (Ubuntu/Debian)

### 第四步：Node.js 检查与安装

**如果已安装正确版本**：
```
✓ Node.js 已安装 (版本: v20.10.0)
```

**如果未安装或版本过低**：
```
⚠ 警告: Node.js 版本过低 (当前: v16.x.x, 需要: >=18.0.0)
```

然后自动安装最新 LTS 版本的 Node.js。

**macOS 用户**：
- 如果没有 Homebrew，会先自动安装
- 然后通过 Homebrew 安装 Node.js

**Linux 用户**：
- 自动选择合适的包管理器（apt/yum）
- 从 NodeSource 源安装

**Windows 用户**：
- 脚本会提供详细的安装指南，包括：
  - 方式 1：使用 Chocolatey 包管理器（推荐）
  - 方式 2：手动下载 Node.js 安装包
  - 方式 3：使用 WSL（推荐 Linux 用户）
- 脚本会引导用户先安装 Node.js，然后继续后续步骤

### 第五步：安装 Claude Code CLI

```
▸ 安装 Claude Code CLI...
✓ Claude Code CLI 安装完成 (版本: @anthropic-ai/claude-code@x.x.x)
```

### 第六步：选择 AI 模型供应商

```
▸ 选择 AI 模型供应商

可用的 AI 模型供应商:
  1. 智谱AI - GLM-4.6 (推荐 ⭐⭐⭐⭐⭐)
  2. 月之暗面 - kimi-k2-turbo (推荐 ⭐⭐⭐⭐⭐)
  3. MiniMax - MiniMax-M2 (免费 ⭐⭐⭐⭐)
  4. DeepSeek - DeepSeek-V3.2 (推荐 ⭐⭐⭐⭐)
  5. 退出安装

请选择 (1-5):
```

**操作**：输入数字 1-4 选择供应商，5 退出安装

**推荐**：
- 初次使用：选择 `1` (智谱AI) 或 `2` (月之暗面)
- 预算有限：选择 `3` (MiniMax，有免费额度)
- 追求性能：选择 `4` (DeepSeek)

### 第七步：输入 API 密钥

选择供应商后，脚本会显示对应的平台链接和指引：

**示例（选择智谱AI）**：
```
▸ 配置 API 密钥
ℹ 智谱AI开放平台: https://open.bigmodel.cn/
ℹ 请在控制台获取 API Key

❓ 请输入 API Key (输入 'q' 取消):
```

**操作**：
1. 在新窗口打开显示的链接
2. 注册/登录账户
3. 创建 API Key
4. 回到终端粘贴 API Key（输入时不会显示，放心粘贴）
5. 按回车确认

**取消**：输入 `q` 可随时取消安装

### 第八步：生成配置文件

```
▸ 生成配置文件...
✓ 配置文件已生成: .claude/settings.local.json
```

脚本会自动在 `.claude/` 目录下创建 `settings.local.json` 文件。

### 第九步：验证安装

```
▸ 验证安装...

✓ Node.js 验证通过
✓ npm 验证通过
✓ Claude Code CLI 验证通过
✓ 配置文件验证通过
```

如果所有验证项都显示 ✅，说明安装成功。

### 第十步：开始使用

```
╔══════════════════════════════════════════════════════════════╗
║                      安装完成！                       ║
╚══════════════════════════════════════════════════════════════╝

快速开始:

  1. 在当前目录启动 SuitAgent:
     claude

  2. 上传法律文档或描述需求，例如:
     • "我收到起诉状，需要应诉"
     • "有新证据需要质证"
     • "需要起草答辩状"

  3. 系统会自动执行分析并生成文书
```

---

## ❓ 常见问题

### Q1: Windows 用户如何使用 SuitAgent？

**A**: Windows 用户有以下几种使用方式：

**方式一：使用 WSL (推荐)**
1. 在 Windows 上安装 WSL (Ubuntu/Debian)
2. 在 WSL 终端中运行安装脚本
```bash
curl -sSL https://raw.githubusercontent.com/cat-xierluo/SuitAgent/main/install.sh | bash
```

**方式二：Windows PowerShell**
1. 安装 Node.js：
   - 使用 Chocolatey: `choco install nodejs`
   - 或手动下载：https://nodejs.org/
2. 安装 Claude Code CLI:
```bash
npm install -g @anthropic-ai/claude-code
```
3. 手动配置 API 密钥（参考配置文件示例）
4. 运行 SuitAgent:
```bash
claude
```

**方式三：使用 Zed 编辑器**
1. 下载并安装 Zed: https://zed.dev/download
2. 在 Zed 中打开 SuitAgent 项目
3. 按 `Ctrl + `` 打开终端运行脚本

### Q2: 安装过程中出现权限错误怎么办？

**A**: 在命令前加 `sudo`，例如：
```bash
sudo npm install -g @anthropic-ai/claude-code
```

### Q3: 提示 "claude: command not found" 怎么办？

**A**: 这是 Claude Code CLI 未正确安装。重新运行安装脚本：
```bash
./install.sh
```

### Q4: API 密钥配置错误怎么办？

**A**: 重新运行安装脚本，或手动编辑配置文件：
```bash
nano .claude/settings.local.json
```

### Q5: 可以切换到其他 AI 模型供应商吗？

**A**: 可以！运行安装脚本重新配置，或：
1. 访问对应平台获取新 API Key
2. 编辑 `.claude/settings.local.json`
3. 更新 `ANTHROPIC_AUTH_TOKEN` 和相关配置

### Q6: 忘记 API Key 怎么办？

**A**: 重新访问对应平台查看或重新生成：
- [智谱AI](https://open.bigmodel.cn/)
- [月之暗面](https://platform.moonshot.cn/)
- [MiniMax](https://www.minimaxi.com/)
- [DeepSeek](https://platform.deepseek.com/)

---

## 🔧 高级配置

### 手动配置文件示例

如果需要手动编辑配置文件，格式如下：

**智谱AI**：
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "ANTHROPIC_MODEL": "GLM-4.6",
    "ANTHROPIC_SMALL_FAST_MODEL": "GLM-4.6"
  }
}
```

**月之暗面**：
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.moonshot.cn/anthropic",
    "ANTHROPIC_MODEL": "kimi-k2-turbo-preview",
    "ANTHROPIC_SMALL_FAST_MODEL": "kimi-k2-turbo-preview"
  }
}
```

**MiniMax**：
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_MODEL": "MiniMax-M2",
    "ANTHROPIC_SMALL_FAST_MODEL": "MiniMax-M2"
  }
}
```

**DeepSeek**：
```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "DeepSeek-V3.2-Exp",
    "ANTHROPIC_SMALL_FAST_MODEL": "DeepSeek-V3.2-Exp"
  }
}
```

### 使用 cc-switch 工具

为了方便切换不同 AI 模型，推荐安装 cc-switch：

```bash
npm install -g cc-switch
```
