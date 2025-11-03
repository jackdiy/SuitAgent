# Claude Code官方Skills使用指南

> Last updated: 2025-10-31
> 本文档记录SuitAgent项目可利用的Claude Code官方Skills，用于增强文档处理能力。

## 📋 目录

- [文档处理技能](#文档处理技能)
- [数据处理技能](#数据处理技能)
- [开发工具技能](#开发工具技能)
- [Agent集成建议](#agent集成建议)

---

## 文档处理技能

### xlsx技能
**GitHub**: `github.com/anthropics/skills/tree/main/document-skills/xlsx`

**功能**：
- 读取和解析Excel表格
- 提取表格数据为结构化格式
- 支持多工作表处理

**对SuitAgent的价值**：
- ✅ 处理证据清单（Excel格式）
- ✅ 分析案件统计数据
- ✅ 管理费用计算表
- ✅ 处理批量证据目录

**使用示例**：
```markdown
文档：证据清单.xlsx
处理：提取证据名称、证明目的、来源等字段
输出：结构化的证据数据库
```

---

### pdf技能
**GitHub**: `github.com/anthropics/skills/tree/main/document-skills/pdf`

**功能**：
- 解析PDF文档
- 提取文本和表格
- 保持原始格式信息

**对SuitAgent的价值**：
- ✅ 处理起诉状PDF版本
- ✅ 分析判决书PDF
- ✅ 提取庭审笔录PDF内容
- ✅ 处理证据材料PDF

**使用示例**：
```markdown
文档：法院判决书.pdf
处理：提取当事人信息、判决内容、法院意见
输出：结构化的判决要素
```

---

### docx技能
**GitHub**: `github.com/anthropics/skills/tree/main/document-skills/docx`

**功能**：
- 解析Word文档
- 提取文本、表格、格式
- 保持文档结构

**对SuitAgent的价值**：
- ✅ 标准法律文书格式（.docx）
- ✅ 处理合同和协议
- ✅ 分析法律意见书
- ✅ 提取文档中的结构化数据

**使用示例**：
```markdown
文档：法律服务合同.docx
处理：提取当事人、服务内容、费用条款
输出：合同要素清单
```

---

## 数据处理技能

### csv技能
**GitHub**: `github.com/anthropics/skills/tree/main/data-skills/csv`

**功能**：
- CSV文件读写
- 数据转换和清洗
- 多文件合并

**对SuitAgent的价值**：
- ✅ 批量案件数据导入
- ✅ 案件统计和分析
- ✅ 证据编号管理

---

### json技能
**GitHub**: `github.com/anthropics/skills/tree/main/data-skills/json`

**功能**：
- JSON数据处理
- 结构化数据转换
- 配置文件管理

**对SuitAgent的价值**：
- ✅ Agent输入输出格式标准化
- ✅ 案件数据存储和交换
- ✅ 配置管理和状态追踪

---

## 开发工具技能

### git技能
**GitHub**: `github.com/anthropics/skills/tree/main/dev-skills/git`

**功能**：
- 版本控制操作
- 代码协作管理
- 项目历史追踪

**对SuitAgent的价值**：
- ✅ 项目文档版本管理
- ✅ 案件文件版本控制
- ✅ 协作流程追踪

---

### bash技能
**GitHub**: `github.com/anthropics/skills/tree/main/dev-skills/bash`

**功能**：
- 命令行操作
- 脚本执行
- 系统集成

**对SuitAgent的价值**：
- ✅ 批量文档处理
- ✅ 自动化工作流
- ✅ 系统集成操作

---

## Agent集成建议

### DocAnalyzer增强
**利用技能**: pdf + docx + xlsx

**整合方式**：
```
DocAnalyzer输入：
- .docx起诉状 → 使用docx技能
- .pdf判决书 → 使用pdf技能
- .xlsx证据清单 → 使用xlsx技能

DocAnalyzer输出：
- 统一JSON格式 → 使用json技能
```

### EvidenceAnalyzer增强
**利用技能**: xlsx + csv

**整合方式**：
```
EvidenceAnalyzer输入：
- Excel证据目录 → 使用xlsx技能
- CSV证据清单 → 使用csv技能

EvidenceAnalyzer输出：
- 证据数据库 → 标准JSON格式
```

### 通用工作流增强
**利用技能**: json

**整合方式**：
```
所有Agent工作流：
- 输入标准化 → JSON格式
- 输出结构化 → JSON格式
- 状态管理 → JSON配置
```

---

## 最佳实践

### 1. 技能选择原则
- **优先使用官方技能** - 稳定可靠
- **补充自定义功能** - 针对诉讼场景
- **保持输出格式一致** - JSON标准化

### 2. 文档处理流程
```
输入文档 → 官方技能解析 → 结构化数据 → Agent处理 → 标准输出
```

### 3. 数据流转设计
```
多格式输入 → 统一技能处理 → 结构化数据 → Agent协作 → 标准化输出
```

### 4. 质量保证
- **格式验证** - 确保输入符合要求
- **结构校验** - 验证输出结构完整
- **内容检查** - 保证信息提取准确

---

## 总结

Claude Code官方Skills为SuitAgent提供了强大的**基础能力**：

- ✅ **文档处理增强** - 处理复杂格式文档
- ✅ **数据标准化** - 统一输入输出格式
- ✅ **工作流优化** - 提高处理效率
- ✅ **质量提升** - 确保输出准确性

通过合理利用这些官方技能，SuitAgent可以专注于**诉讼专业场景**的处理，将通用能力交给官方Skills完成。

---

> 注意：使用官方Skills时，请确保版本兼容性，并根据实际需求调整配置参数。
