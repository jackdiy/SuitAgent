# Reporter（报告编译器）

## 概述

报告编译器是一个微工作流组件，专门负责整合各类分析结果，生成最终的综合性报告。该组件可独立使用，支持多格式输出。

## 功能定位

- **内容整合**：整合多个工作流的输出
- **格式统一**：统一报告格式和样式
- **多格式输出**：支持 .md、.docx、.pdf
- **结构优化**：自动优化报告结构和逻辑

## 使用场景

### 场景 1：完整案件分析报告
- **输入**：所有工作流输出
- **输出**：综合性案件分析报告

### 场景 2：阶段性进展报告
- **输入**：特定阶段的工作成果
- **输出**：阶段性报告

### 场景 3：专项报告
- **输入**：单一工作流输出
- **输出**：专项报告

## 独立使用方法

```json
{
  "workflow_name": "ReportCompiler",
  "report_type": "comprehensive|stage|specialized",
  "input": {
    "source_outputs": "object",
    "metadata": "object"
  },
  "requirements": {
    "format": "markdown|docx|pdf",
    "structure": "standard|custom",
    "sections": "array"
  },
  "output": {
    "report_content": "string",
    "file_paths": "array",
    "metadata": "object"
  }
}
```

## 报告类型

### 1. 综合报告（comprehensive）
**适用场景**：完整案件分析
**内容结构**：
```
1. 案件基本信息
2. 案件分析
   2.1 事实认定
   2.2 争议焦点
   2.3 法律分析
3. 证据分析
4. 策略建议
5. 风险评估
6. 结论与建议
```

### 2. 阶段性报告（stage）
**适用场景**：诉讼阶段总结
**内容结构**：
```
1. 阶段概况
2. 本阶段工作成果
3. 关键发现
4. 问题与风险
5. 下阶段计划
```

### 3. 专项报告（specialized）
**适用场景**：单一主题分析
**内容结构**：
```
1. 主题概述
2. 专项分析
3. 关键发现
4. 结论与建议
```

## 输出格式

### Markdown（.md）
- 标准格式
- 易于编辑
- 支持版本控制

### Word（.docx）
- 标准文档格式
- 便于修改
- 专业排版

### PDF（.pdf）
- 最终版本
- 正式交付
- 防止篡改

## 质量标准

- **结构清晰**：逻辑层次分明
- **内容完整**：信息无遗漏
- **格式统一**：样式规范
- **引用准确**：数据可靠

## 集成说明

该组件可整合任意其他组件的输出：
- **所有组件** + **ReportCompiler** → 综合性报告
- **SummaryMaker** + **ReportCompiler** → 摘要报告
- **BriefWriter** + **ReportCompiler** → 文书汇编
- 可与任意组件单独组合使用

## 使用示例

```json
// 完整案件分析报告
{
  "report_type": "comprehensive",
  "input": {
    "doc_analysis": "...",
    "evidence_analysis": "...",
    "legal_research": "...",
    "strategy_plan": "...",
    "generated_briefs": "..."
  },
  "requirements": {
    "format": ["markdown", "docx", "pdf"],
    "include_summary": true,
    "include_attachments": true
  }
}
```
