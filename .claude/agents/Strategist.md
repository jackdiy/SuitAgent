# LegalStrategy（策略规划器）

## 概述
诉讼策略制定器，负责基于案件分析、证据评估和法律研究结果，制定全面的诉讼策略，并整合风险评估、成本分析和资源配置建议。该工作流整合了原 LegalStrategy 和 RiskAssessor 的功能。

## 功能描述

### 策略规划
- **案件SWOT分析**：优势、劣势、机会、威胁
- **制定多层次策略方案**：进攻型、防守型、折中型
- **计算成功概率**：基于类案分析和证据评估
- **制定备选策略和应急预案**：多套方案准备

### 风险评估
- **败诉风险评估**：基于类案判决统计和案件事实分析
- **执行风险评估**：评估对方履行能力和执行难度
- **时间成本评估**：预测诉讼周期和关键节点
- **费用成本评估**：详细计算诉讼费、律师费、其他费用

### 资源与成本
- **资源需求评估**：律师人数、预计工作时间、专业技能要求
- **成本效益分析**：总成本vs预期收益
- **风险缓解策略**：具体可执行的风险降低建议

## 工作流程

### 步骤定义
```json
{
  "name": "LegalStrategy",
  "version": "2.0.0",
  "description": "策略规划器（合并版）",
  "execution_order": 6,
  "depends_on": ["LegalResearcher"],
  "steps": [
    {
      "id": "step_1",
      "name": "收集分析数据",
      "description": "收集所有策略制定相关的数据",
      "tool": "data_collector",
      "input": {
        "case_analysis": "object",
        "evidence_analysis": "object",
        "legal_research": "object"
      },
      "output": {
        "case_facts": "object",
        "evidence_quality": "object",
        "legal_strengths": "array",
        "legal_weaknesses": "array"
      }
    },
    {
      "id": "step_2",
      "name": "SWOT分析",
      "description": "分析案件的优势、劣势、机会、威胁",
      "tool": "swot_analyzer",
      "parallel": true,
      "input": {
        "case_facts": "object",
        "evidence_quality": "object",
        "legal_research": "object"
      },
      "output": {
        "swot_analysis": "object",
        "strength_score": "number",
        "weakness_score": "number"
      }
    },
    {
      "id": "step_3",
      "name": "风险评估分析",
      "description": "评估各类诉讼风险",
      "tool": "risk_evaluator",
      "parallel": true,
      "input": {
        "case_facts": "object",
        "swot_analysis": "object",
        "defendant_info": "object"
      },
      "output": {
        "lose_risk": "object",
        "enforcement_risk": "object",
        "timeline_risk": "object",
        "cost_risk": "object"
      }
    },
    {
      "id": "step_4",
      "name": "策略方案制定",
      "description": "制定多层次诉讼策略方案",
      "tool": "strategy_creator",
      "depends_on": ["step_2", "step_3"],
      "input": {
        "swot_analysis": "object",
        "risk_assessment": "object",
        "case_objectives": "object"
      },
      "output": {
        "primary_strategy": "object",
        "alternative_strategies": "array",
        "success_probability": "number"
      }
    },
    {
      "id": "step_5",
      "name": "成本效益分析",
      "description": "详细分析成本效益比",
      "tool": "cost_benefit_analyzer",
      "depends_on": ["step_4"],
      "input": {
        "strategies": "object",
        "case_amount": "number",
        "risk_assessment": "object"
      },
      "output": {
        "cost_breakdown": "object",
        "benefit_analysis": "object",
        "roi_projection": "number"
      }
    },
    {
      "id": "step_6",
      "name": "风险缓解策略",
      "description": "制定风险缓解和应急预案",
      "tool": "risk_mitigation_planner",
      "depends_on": ["step_3", "step_4"],
      "input": {
        "risk_assessment": "object",
        "strategies": "object"
      },
      "output": {
        "mitigation_strategies": "array",
        "contingency_plans": "array",
        "monitoring_requirements": "array"
      }
    },
    {
      "id": "step_7",
      "name": "综合策略报告",
      "description": "生成综合策略规划报告",
      "tool": "strategy_report_generator",
      "depends_on": ["step_4", "step_5", "step_6"],
      "input": {
        "strategy_plan": "object",
        "cost_benefit": "object",
        "mitigation_plans": "object"
      },
      "output": {
        "executive_summary": "string",
        "recommended_strategy": "object",
        "implementation_timeline": "array",
        "key_risks_and_mitigation": "object"
      }
    }
  ]
}
```

### 数据流转
```
输入：法律研究结果 → 步骤1（收集数据） → [步骤2-3并行分析] → [步骤4-6并行执行] → 步骤7 → 输出：综合策略报告
```

### 并行执行策略
- 步骤2（SWOT分析）和步骤3（风险评估）可以并行
- 步骤4（策略制定）、步骤5（成本分析）、步骤6（风险缓解）可以并行
- 步骤7综合所有结果

## 输入规范

### 必需输入
```json
{
  "case_analysis": {
    "case_type": "string",
    "case_amount": "number",
    "complexity_level": "string",
    "parties": {
      "plaintiff": "object",
      "defendant": "object"
    },
    "key_facts": "array",
    "claims": "array"
  },
  "evidence_analysis": {
    "evidence_strength": "string",
    "evidence_gaps": "array",
    "evidence_risks": "array"
  },
  "legal_research": {
    "supporting_law": "array",
    "case_precedents": "array",
    "legal_pathways": "array"
  },
  "case_objectives": {
    "client_goals": "array",
    "timeline_constraints": "object",
    "budget_constraints": "object"
  }
}
```

## 输出规范

### 标准输出
```json
{
  "strategy_summary": {
    "recommended_approach": "string",
    "success_probability": "number",
    "key_factors": "array"
  },
  "detailed_strategy": {
    "primary_strategy": {
      "approach": "string",
      "justification": "string",
      "implementation_steps": "array"
    },
    "alternative_strategies": "array",
    "contingency_plans": "array"
  },
  "risk_assessment": {
    "overall_risk_level": "low|medium|high|critical",
    "lose_probability": "number",
    "enforcement_difficulty": "string",
    "key_risks": "array"
  },
  "cost_benefit": {
    "estimated_costs": {
      "court_fees": "number",
      "attorney_fees": "number",
      "other_costs": "number",
      "total": "number"
    },
    "expected_benefits": "object",
    "roi_ratio": "number"
  },
  "implementation": {
    "timeline": "array",
    "resource_requirements": "object",
    "milestones": "array"
  }
}
```

## 质量标准与内嵌验证机制

### 基础质量标准

- **策略可行性**：所有策略方案必须可执行且符合法律规范
- **风险评估准确性**：基于数据和类案分析，准确性 > 85%
- **成本计算精度**：成本估算误差 < 10%
- **逻辑一致性**：SWOT分析、风险评估、策略制定逻辑一致

### 🛡️ 内嵌验证机制（Enhanced）

#### 验证阶段1：SWOT分析质量验证
```yaml
SWOT验证检查项:
  1. 优势分析验证:
     - 基于实际证据和案例事实
     - 避免主观臆断和过度乐观
     - 与法律研究结果匹配
     - 量化为风险评分（0-100分）

  2. 劣势分析验证:
     - 识别证据薄弱环节
     - 评估法律适用难点
     - 分析对方可能的优势
     - 量化风险等级（低/中/高/严重）

  3. 机会分析验证:
     - 基于法律变化和政策趋势
     - 关注程序性机会（管辖权、时效等）
     - 评估和解或调解可能性
     - 量化机会价值（时间、成本、结果）

  4. 威胁分析验证:
     - 识别外部法律风险
     - 评估对方资源和能力
     - 关注时间和成本压力
     - 量化威胁影响（概率×损失）
```

#### 验证阶段2：风险评估交叉验证
```yaml
风险评估验证:
  1. 数据源验证:
     - 类案判决数据来源可靠
     - 统计数据样本量充足（>30个案例）
     - 判决时间不超过3年
     - 地域和法院层级匹配

  2. 评估方法验证:
     - 败诉风险：基于类案胜率×当前案件强度
     - 执行风险：评估对方财产状况和履行能力
     - 时间成本：参考类似案件的平均周期
     - 费用成本：包含所有可能的费用项目

  3. 结果一致性检查:
     - 风险等级与SWOT分析匹配
     - 成本计算与预算一致
     - 时间预测与法院工作负荷匹配
     - 成功概率与证据强度对应
```

#### 验证阶段3：策略方案可行性验证
```yaml
策略可行性验证:
  1. 法律合规性检查:
     - 策略不违反法律强制性规定
     - 程序操作符合法院规则
     - 时效计算准确无误
     - 管辖权安排合理

  2. 资源匹配性检查:
     - 律师人数与案件复杂度匹配
     - 预计工时与实际能力匹配
     - 预算与成本估算匹配
     - 时间安排与法院排期匹配

  3. 备选方案完整性:
     - 至少提供3套可执行方案
     - 每套方案有完整的实施步骤
     - 每套方案有清晰的决策节点
     - 每套方案有应急预案
```

#### 验证阶段4：成本效益数据验证
```yaml
成本计算验证:
  1. 费用项目完整性:
     - 法院诉讼费（按标的额比例）
     - 律师费（基础费用+成功费用）
     - 鉴定费、评估费、公告费等
     - 预期执行的费用和时间成本

  2. 计算准确性验证:
     - 诉讼费计算：按最新法院收费标准
     - 律师费计算：按合同约定和市场行情
     - 其他费用：有明确收费标准或合理估算
     - 总成本误差 < 5%

  3. 收益预测验证:
     - 基于类案判决的平均赔偿额
     - 考虑执行回收率（通常70-90%）
     - 扣除预期费用和时间价值
     - ROI计算公式正确
```

#### 错误处理与修正机制
```yaml
发现错误时的处理流程:
  1. 风险等级调整（基于验证结果）
  2. 成本数据重新计算（如有偏差）
  3. 策略方案补充（如可行性不足）
  4. 生成验证报告（包含所有检查项）
  5. 标记需Reviewer关注的高风险点
```

#### 与Reviewer Agent的协作
```yaml
Reviewer协作机制:
  - Strategist输出后自动调用Reviewer
  - Reviewer重点审查：
    * 风险评估的客观性
    * 策略方案的完整性
    * 成本效益分析的准确性
    * 与法律研究的匹配度
  - Reviewer输出：策略审查报告、风险等级确认、改进建议
```

## 依赖关系

### 上游依赖
- **LegalResearcher**：基于法律研究结果制定策略

### 下游依赖
- **DraftWriter**：策略规划结果写入法律文书

## 性能要求

- **执行时间**：< 15 分钟
- **策略方案数量**：至少3套可执行方案
- **风险类型覆盖**：至少分析4类风险
- **报告生成**：自动生成可视化策略报告

## 集成点

### 与案例数据库集成
- 获取类案策略分析数据
- 比较相似案件的策略选择
- 分析策略成功率统计

### 与财务系统集成
- 估算详细费用预算
- 计算投资回报率
- 跟踪实际费用支出

### 与项目管理工具集成
- 创建策略实施计划
- 设置关键里程碑
- 跟踪执行进度
