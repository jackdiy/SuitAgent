# Summarizer（摘要生成器）

## 概述

摘要生成器是一个微工作流组件，专门负责生成各类法律摘要和报告。该组件可独立使用，快速提炼关键信息，生成简洁明了的摘要。

## 功能定位

- **多类型摘要**：案件摘要、进展摘要、风险摘要、策略摘要
- **自动提炼**：自动识别和提炼关键信息
- **多层次摘要**：详细版、简洁版、要点版
- **可视化展示**：支持图表、表格等可视化元素

## 使用场景

### 场景 1：案件进展摘要
- **输入**：庭审记录、证据变化
- **输出**：案件进展报告

### 场景 2：风险提醒摘要
- **输入**：风险评估报告
- **输出**：关键风险点提醒

### 场景 3：策略要点摘要
- **输入**：策略规划方案
- **输出**：策略要点提炼

### 场景 4：客户汇报摘要
- **输入**：全案分析结果
- **输出**：客户友好的简明报告

## 独立使用方法

```json
{
  "workflow_name": "SummaryMaker",
  "summary_type": "case_progress|risk_alert|strategy_points|client_report",
  "input": {
    "source_documents": "array",
    "analysis_results": "object"
  },
  "requirements": {
    "length": "brief|standard|detailed",
    "audience": "internal|client|court",
    "focus_areas": "array"
  },
  "output": {
    "summary": "string",
    "key_points": "array",
    "recommendations": "array"
  }
}
```

## 摘要类型详解

### 1. 案件进展摘要（case_progress）
**适用场景**：庭审后、阶段总结
**内容要素**：
- 案件基本信息
- 当前进展
- 争议焦点变化
- 证据变化
- 下一步计划

### 2. 风险提醒摘要（risk_alert）
**适用场景**：风险评估后
**内容要素**：
- 高风险事项
- 潜在问题
- 应对建议
- 监控要点

### 3. 策略要点摘要（strategy_points）
**适用场景**：策略制定后
**内容要素**：
- 核心策略
- 关键行动
- 时间节点
- 资源需求

### 4. 客户汇报摘要（client_report）
**适用场景**：定期客户汇报
**内容要素**：
- 案件概况
- 关键节点
- 成果展示
- 风险提示
- 后续安排

## 输出格式

### 详细版（detailed）
- 完整结构和内容
- 包含详细分析
- 适合内部使用

### 标准版（standard）
- 平衡详细度和简洁性
- 包含核心要点
- 适合大多数场景

### 简洁版（brief）
- 高度提炼
- 关键信息
- 适合快速阅读

## 目标受众

### 内部（internal）
- 专业术语
- 详细分析
- 完整数据

### 客户（client）
- 通俗易懂
- 重点突出
- 可视化展示

### 法庭（court）
- 正式规范
- 事实准确
- 法律严谨

## 集成说明

该组件与其他组件组合：
- **任意组件输出** + **SummaryMaker** → 生成摘要
- **BriefWriter** + **SummaryMaker** → 文书摘要
- **StrategyPlanner** + **SummaryMaker** → 策略摘要
- **EvidenceHandler** + **SummaryMaker** → 证据摘要
