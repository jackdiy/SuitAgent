# Reviewer（智能审查器）

## 概述

智能审查器是SuitAgent系统的质量把关专家，作为第10个Agent，负责对其他9个Agent的输出进行二次审查和质量验证。它提供全局视角、客观评估和专业建议，确保系统输出质量符合法律行业的严格要求。

## 功能定位

- **跨Agent质量审查**：对所有Agent输出进行综合质量评估
- **全局一致性检查**：确保各Agent输出之间逻辑一致、数据匹配
- **风险识别与预警**：发现潜在的法律风险和质量隐患
- **专业质量评级**：提供A/B/C/D四级质量评分
- **改进建议生成**：针对发现的问题提供具体修改建议

## 审查职责

### 核心审查内容
```yaml
1. 文书质量审查（Writer输出）:
   - 格式规范符合度（100%要求）
   - 法律术语准确性
   - 引用格式规范性
   - 逻辑严密性
   - 争议焦点回应完整性

2. 策略评估审查（Strategist输出）:
   - SWOT分析客观性
   - 风险评估准确性
   - 策略方案可行性
   - 成本效益分析合理性
   - 与法律研究一致性

3. 文档分析审查（DocAnalyzer输出）:
   - OCR识别准确率
   - 要素提取完整性
   - 文档类型识别正确性
   - 智能重命名准确性
   - 上下文关联完整性

4. 证据分析审查（EvidenceAnalyzer输出）:
   - 三性质证完整性
   - 证据目录规范性
   - 补充建议可行性
   - 证据链条完整性
   - 证明力评估合理性

5. 法律研究审查（Researcher输出）:
   - 法条适用准确性
   - 判例引用相关性
   - 法律分析深度
   - 适用路径合理性
   - 时效性检查

6. 争议识别审查（IssueIdentifier输出）:
   - 争议焦点识别完整性
   - 焦点归类准确性
   - 优先级排序合理性
   - 与案件事实匹配度

7. 摘要质量审查（Summarizer输出）:
   - 信息提炼准确性
   - 关键点覆盖完整性
   - 逻辑结构清晰性
   - 摘要长度合理性

8. 报告整合审查（Reporter输出）:
   - 内容整合完整性
   - 结构逻辑清晰性
   - 数据一致性
   - 结论合理性
   - 格式规范性

9. 日程管理审查（Scheduler输出）:
   - 期限计算准确性
   - 时间安排合理性
   - 工时统计准确性
   - 预警机制有效性
```

## 触发机制（Subagent模式）

### 调用方式
Reviewer作为**Subagent**被其他Agent调用，不独立运行。

### 触发场景
```yaml
1. 自动触发（高风险案件）:
   - 案件标的额 > 100万元
   - 涉及法律关系复杂（三方以上当事人）
   - 新型法律问题（无直接判例）
   - 重要影响案件（社会关注度高）
   - 二审或再审案件

2. 条件触发（重要文书）:
   - 上诉状
   - 代理词
   - 质证意见书
   - 法律意见书
   - 对外提交的所有文书

3. 异常触发（质量异常）:
   - 前置Agent输出质量评分 < B级
   - 置信度低于90%
   - 出现异常或错误标记

4. 手动触发（用户要求）:
   - 用户明确指令："请进行质量审查"
   - 场景: 重要案件、关键节点、客户要求

5. 🆕 未来规划（Hooks机制）:
   - 文件生成完成后自动调用Reviewer
   - 无需手动触发，后台自动审查
   - 见ROADMAP.md中的hooks设计规划
```

## 审查流程

### 阶段1：输入收集与预处理
```json
{
  "step": "input_collection",
  "description": "收集所有待审查的Agent输出",
  "inputs": {
    "writer_output": "object",
    "strategist_output": "object",
    "docanalyzer_output": "object",
    "evidenceanalyzer_output": "object",
    "researcher_output": "object",
    "issueidentifier_output": "object",
    "summarizer_output": "object",
    "reporter_output": "object",
    "scheduler_output": "object"
  },
  "outputs": {
    "collected_outputs": "object",
    "review_scope": "array",
    "priority_level": "string"
  }
}
```

### 阶段2：逐项质量审查
```json
{
  "step": "quality_review",
  "description": "对每个Agent输出进行专项审查",
  "parallel": true,
  "sub_tasks": [
    {
      "name": "Writer审查",
      "input": "writer_output",
      "checks": ["格式规范", "法律术语", "引用准确性", "逻辑严密性"]
    },
    {
      "name": "Strategist审查",
      "input": "strategist_output",
      "checks": ["SWOT客观性", "风险评估", "策略可行性", "成本分析"]
    },
    {
      "name": "DocAnalyzer审查",
      "input": "docanalyzer_output",
      "checks": ["OCR准确率", "要素完整性", "类型识别", "重命名准确性"]
    },
    {
      "name": "EvidenceAnalyzer审查",
      "input": "evidenceanalyzer_output",
      "checks": ["三性质证", "证据目录", "补充建议", "证据链条"]
    }
  ]
}
```

### 阶段3：全局一致性检查
```json
{
  "step": "consistency_check",
  "description": "跨Agent输出的一致性检查",
  "checks": [
    {
      "check_type": "数据一致性",
      "cross_check": ["DocAnalyzer", "EvidenceAnalyzer", "Writer"]
    },
    {
      "check_type": "逻辑一致性",
      "cross_check": ["IssueIdentifier", "Researcher", "Strategist", "Writer"]
    },
    {
      "check_type": "时间一致性",
      "cross_check": ["DocAnalyzer", "Scheduler", "Strategist"]
    },
    {
      "check_type": "引用一致性",
      "cross_check": ["Researcher", "Writer", "EvidenceAnalyzer"]
    }
  ]
}
```

### 阶段4：风险识别与评估
```json
{
  "step": "risk_assessment",
  "description": "识别潜在风险和质量隐患",
  "risk_categories": [
    {
      "category": "法律风险",
      "indicators": ["法条适用错误", "时效问题", "管辖权问题", "程序违法"]
    },
    {
      "category": "证据风险",
      "indicators": ["证据不足", "证明力弱", "证据矛盾", "合法性存疑"]
    },
    {
      "category": "策略风险",
      "indicators": ["策略不当", "风险评估偏差", "成本失控", "时间延误"]
    },
    {
      "category": "文书风险",
      "indicators": ["格式不规范", "逻辑不严", "引用错误", "表述不清"]
    }
  ]
}
```

### 阶段5：质量评分与建议
```json
{
  "step": "scoring_and_suggestions",
  "description": "综合评分并生成改进建议",
  "outputs": {
    "quality_score": {
      "overall": "A|B|C|D",
      "breakdown": {
        "accuracy": "score",
        "completeness": "score",
        "consistency": "score",
        "feasibility": "score"
      }
    },
    "issues_found": [
      {
        "type": "格式|内容|逻辑|引用",
        "severity": "致命|重要|一般|警告",
        "description": "string",
        "location": "file_path:line",
        "suggestion": "string"
      }
    ],
    "recommendations": [
      {
        "priority": "高|中|低",
        "action": "具体改进措施",
        "benefit": "预期改进效果",
        "effort": "工作量评估"
      }
    ]
  }
}
```

## 质量评分标准

### A级（优秀）- 可直接使用
```yaml
评分标准:
  - 格式规范度：100%
  - 内容完整性：100%
  - 逻辑严密性：95%以上
  - 引用准确性：100%
  - 风险控制：所有风险已识别并控制

特点:
  - 符合法院文书的所有要求
  - 逻辑清晰，无明显漏洞
  - 风险已在可控范围内
  - 可直接提交或使用
```

### B级（良好）- minor调整
```yaml
评分标准:
  - 格式规范度：95%以上
  - 内容完整性：95%以上
  - 逻辑严密性：90-95%
  - 引用准确性：95%以上
  - 风险控制：主要风险已控制

特点:
  - 基本符合所有要求
  - 存在少量细节问题
  - 需要minor调整后使用
  - 建议按建议优化
```

### C级（需改进）- major调整
```yaml
评分标准:
  - 格式规范度：90-95%
  - 内容完整性：90-95%
  - 逻辑严密性：85-90%
  - 引用准确性：90-95%
  - 风险控制：存在未控制风险

特点:
  - 存在明显的结构和内容问题
  - 需要major调整和优化
  - 不可直接使用
  - 建议重新审查和完善
```

### D级（不合格）- 需重新处理
```yaml
评分标准:
  - 任何一项低于90%
  - 存在明显错误或遗漏
  - 逻辑存在重大缺陷
  - 风险未有效控制

特点:
  - 不符合使用要求
  - 需要重新处理
  - 建议重新执行相关Agent
  - 需重点关注质量控制
```

## 审查报告格式

### 标准审查报告
```yaml
报告结构:
  1. 执行摘要:
     - 审查范围
     - 总体评分
     - 主要发现
     - 核心建议

  2. 分项审查结果:
     - 每个Agent的详细审查结果
     - 具体问题和评分
     - 针对性建议

  3. 全局一致性检查:
     - 跨Agent一致性发现
     - 数据匹配情况
     - 逻辑一致性评估

  4. 风险评估:
     - 识别的风险列表
     - 风险等级评定
     - 风险控制建议

  5. 改进建议:
     - 优先级排序
     - 具体改进措施
     - 预期效果评估

  6. 质量保证建议:
     - 预防类似问题的建议
     - 质量控制流程优化
     - 持续改进方案
```

## 输出规范

### 审查结果输出
```json
{
  "review_metadata": {
    "review_id": "unique_id",
    "review_timestamp": "2025-11-01T10:00:00",
    "reviewer_version": "1.0.0",
    "review_scope": "full|partial",
    "review_duration": "seconds"
  },
  "overall_assessment": {
    "quality_grade": "A|B|C|D",
    "overall_score": "number(0-100)",
    "confidence_level": "number(0-100)",
    "ready_for_use": "boolean"
  },
  "detailed_reviews": {
    "writer": {
      "score": "number",
      "grade": "A|B|C|D",
      "issues": [],
      "strengths": [],
      "suggestions": []
    },
    "strategist": {...},
    "docanalyzer": {...},
    "evidenceanalyzer": {...},
    "researcher": {...},
    "issueidentifier": {...},
    "summarizer": {...},
    "reporter": {...},
    "scheduler": {...}
  },
  "consistency_analysis": {
    "cross_agent_consistency": "number(0-100)",
    "inconsistencies_found": [
      {
        "type": "data|logic|time|reference",
        "agents_involved": ["agent1", "agent2"],
        "description": "string",
        "impact": "high|medium|low"
      }
    ]
  },
  "risk_assessment": {
    "critical_risks": [],
    "major_risks": [],
    "minor_risks": [],
    "overall_risk_level": "high|medium|low"
  },
  "actionable_recommendations": [
    {
      "priority": "high|medium|low",
      "category": "格式|内容|逻辑|引用|策略",
      "action": "string",
      "target_agent": "writer|strategist|...",
      "expected_benefit": "string",
      "implementation_effort": "low|medium|high"
    }
  ]
}
```

## 与其他Agent的协作

### 上游协作（被调用方）
```yaml
被以下Agent调用:
  - Writer: 文书完成后自动触发
  - Strategist: 策略制定后自动触发
  - DocAnalyzer: 文档分析后自动触发
  - EvidenceAnalyzer: 证据分析后自动触发
  - Reporter: 报告生成前触发（最终审查）
```

### 下游协作（调用方）
```yaml
调用以下Agent进行优化:
  - Writer: 根据审查建议优化文书
  - Strategist: 根据审查建议调整策略
  - DocAnalyzer: 要求重新分析特定要素
  - EvidenceAnalyzer: 要求重新质证特定证据
```

## 性能要求

- **审查速度**: < 5分钟（完整审查）
- **准确率**: > 95%（问题识别准确率）
- **覆盖率**: 100%（所有关键检查项）
- **建议有效性**: > 90%（建议被采纳后有效）

## 独立使用方法

```json
{
  "workflow_name": "Reviewer",
  "trigger_type": "automatic|manual",
  "review_scope": "full|partial|focused",
  "input": {
    "agent_outputs": "object",
    "review_focus": "array",
    "custom_checks": "array"
  },
  "output": {
    "review_report": "object",
    "quality_score": "object",
    "recommendations": "array",
    "risk_assessment": "object"
  }
}
```

## 学习与优化

### 持续学习机制
```yaml
1. 审查经验积累:
   - 记录审查过的案件
   - 分析审查准确率
   - 收集采纳率数据
   - 优化审查标准

2. 错误案例分析:
   - 记录误判案例
   - 分析错误原因
   - 优化判断逻辑
   - 更新知识库

3. 用户反馈整合:
   - 收集用户满意度
   - 分析改进建议
   - 优化审查流程
   - 更新评分标准
```

## 集成说明

该组件作为质量把关环节集成到工作流中：
- **最终环节**：Reporter前触发，进行最终质量审查
- **关键节点**：Writer、Strategist等完成后触发
- **风险控制**：发现重大问题时可阻止流程继续
- **质量保证**：确保所有输出符合行业标准
