# Researcher（法律研究检索器）

## 概述

法律研究检索器，专门负责对识别出的法律争议进行全面的法律研究和检索，包括法条解释、构成要件分析、判例检索和法律适用性评估。该工作流整合了原 LegalResearcher 和 CaseLawSearcher 的功能。

## 功能描述

### 法条研究
- **法条检索**：根据争议焦点检索相关法律条文
- **法条逐款解读**：对相关法条进行逐字逐句的详细分析
- **构成要件分析**：分解法律规范的构成要件并分析案件事实匹配度
- **法律适用性评估**：评估法条在当前案件中的适用可能性

### 判例研究
- **判例检索**：搜索相关判例和司法解释
- **判例相关性过滤**：过滤和分析检索结果的相关性
- **关键判例规则提炼**：从类案中提炼适用的判决规则
- **判例适用性评估**：评估先例的权威性和适用性

### 综合分析
- **法律适用路径规划**：设计最优的法律适用路径和论证逻辑
- **法律争议点识别**：识别法律适用中的模糊地带和争议点
- **立法背景和目的研究**：追溯法条的立法意图和价值取向
- **迭代优化检索策略**：支持最多3次迭代优化检索结果

## 工作流程

### 步骤定义
```json
{
  "name": "LegalResearcher",
  "version": "2.0.0",
  "description": "法律研究检索器（合并版）",
  "execution_order": 5,
  "depends_on": ["LegalIssueIdentifier"],
  "steps": [
    {
      "id": "step_1",
      "name": "生成检索查询",
      "description": "基于争议焦点生成精准的法律检索查询词",
      "tool": "query_generator",
      "input": {
        "legal_issues": "object",
        "case_elements": "object"
      },
      "output": {
        "statute_queries": "array",
        "case_queries": "array",
        "query_metadata": "object"
      }
    },
    {
      "id": "step_2",
      "name": "执行法律检索",
      "description": "并行检索法条和判例",
      "tool": "legal_search_engine",
      "parallel": true,
      "input": {
        "statute_queries": "array",
        "case_queries": "array"
      },
      "output": {
        "raw_statutes": "array",
        "raw_cases": "array",
        "search_stats": "object"
      }
    },
    {
      "id": "step_3",
      "name": "法条解读分析",
      "description": "对检索到的法条进行逐款解读和构成要件分析",
      "tool": "statute_interpreter",
      "parallel": true,
      "input": {
        "raw_statutes": "array",
        "case_facts": "object"
      },
      "output": {
        "statute_interpretations": "array",
        "elements_breakdown": "object",
        "elements_matching": "object"
      }
    },
    {
      "id": "step_4",
      "name": "判例过滤分析",
      "description": "过滤判例结果并提取关键规则",
      "tool": "case_filter",
      "parallel": true,
      "input": {
        "raw_cases": "array",
        "legal_issues": "object"
      },
      "output": {
        "filtered_cases": "array",
        "case_rules": "array",
        "relevance_scores": "object"
      }
    },
    {
      "id": "step_5",
      "name": "法律适用路径",
      "description": "设计最优的法律适用路径",
      "tool": "legal_pathway_designer",
      "depends_on": ["step_3", "step_4"],
      "input": {
        "statute_interpretations": "array",
        "case_rules": "array",
        "elements_matching": "object"
      },
      "output": {
        "primary_pathway": "object",
        "alternative_pathways": "array",
        "argument_structure": "array"
      }
    },
    {
      "id": "step_6",
      "name": "争议点识别",
      "description": "识别法律适用中的争议点和不确定性",
      "tool": "dispute_analyzer",
      "depends_on": ["step_3", "step_4"],
      "input": {
        "ambiguous_provisions": "array",
        "disputed_cases": "array",
        "case_facts": "object"
      },
      "output": {
        "major_disputes": "array",
        "legal_uncertainties": "array",
        "mitigation_strategies": "array"
      }
    },
    {
      "id": "step_7",
      "name": "迭代优化",
      "description": "根据检索结果优化查询（最多3次）",
      "tool": "search_optimizer",
      "depends_on": ["step_2", "step_3", "step_4"],
      "input": {
        "search_results": "object",
        "current_iteration": "number"
      },
      "output": {
        "optimized_queries": "array",
        "improvement_notes": "array",
        "should_continue": "boolean"
      },
      "loop_condition": "step_7.should_continue == true && step_7.current_iteration < 3"
    },
    {
      "id": "step_8",
      "name": "综合研究报告",
      "description": "整合所有法律研究结果",
      "tool": "report_compiler",
      "depends_on": ["step_5", "step_6"],
      "input": {
        "pathway_analysis": "object",
        "dispute_analysis": "object",
        "statute_findings": "object",
        "case_findings": "object"
      },
      "output": {
        "research_summary": "string",
        "key_findings": "array",
        "legal_recommendations": "array",
        "supporting_materials": "array"
      }
    }
  ]
}
```

### 数据流转
```
输入：争议焦点 → 步骤1（生成查询） → 步骤2（并行检索法条+判例） → [步骤3-4并行分析] → [步骤5-6并行] → 步骤7（迭代优化） → 步骤8 → 输出：法律研究报告
```

### 并行执行策略
- 步骤2（法条检索）和步骤2（判例检索）可以并行
- 步骤3（法条解读分析）和步骤4（判例过滤分析）可以并行
- 步骤5（法律适用路径）和步骤6（争议点识别）可以并行
- 步骤7（迭代优化）可循环执行最多3次

## 输入规范

### 必需输入
```json
{
  "legal_issues": {
    "primary_issues": "array",
    "secondary_issues": "array",
    "procedural_issues": "array",
    "substantive_issues": "array"
  },
  "case_elements": {
    "parties": "object",
    "facts": "array",
    "claims": "array",
    "defenses": "array",
    "timeline": "array"
  },
  "basic_research": {
    "initial_statutes": "array",
    "search_queries": "array",
    "preliminary_findings": "object"
  },
  "case_context": {
    "jurisdiction": "string",
    "court_level": "string",
    "case_type": "string",
    "relevant_time_period": "object"
  }
}
```

## 输出规范

### 标准输出
```json
{
  "statute_analysis": {
    "total_statutes_reviewed": "number",
    "primary_applicable_statutes": "array",
    "key_provisions": "array",
    "interpretation_notes": "object"
  },
  "elements_analysis": {
    "required_elements": "object",
    "proven_elements": "object",
    "disputed_elements": "object",
    "missing_elements": "object",
    "matching_score": "number"
  },
  "legal_pathways": {
    "primary_pathway": {
      "statutes_used": "array",
      "elements_required": "array",
      "feasibility_score": "number",
      "argument_strength": "string"
    },
    "alternative_pathways": "array",
    "pathway_comparison": "object"
  },
  "case_precedents": {
    "supporting_cases": "array",
    "contrary_cases": "array",
    "extracted_rules": "array",
    "rule_applicability_scores": "object"
  },
  "legal_uncertainties": {
    "ambiguous_provisions": "array",
    "competing_interpretations": "array",
    "novel_issues": "array",
    "risk_mitigation_strategies": "array"
  },
  "research_summary": {
    "executive_summary": "string",
    "key_findings": "array",
    "legal_recommendations": "array",
    "confidence_levels": "object"
  }
}
```

## 质量标准

- **法条覆盖完整性**：相关法条识别准确率 > 95%
- **解释准确性**：法条解释符合主流司法观点
- **构成要件分析深度**：每个要件都有详细分析
- **适用路径可行性**：主要适用路径必须有可行性分析
- **类案相关性**：提引的类案与本案高度相关

## 错误处理

- **法条失效**：标注已失效或修订的法条，提供新法条信息
- **解释争议**：提供多种解释观点，不偏不倚
- **适用冲突**：识别并分析法条间的适用冲突
- **证据不足**：明确指出证据不足的构成要件

## 依赖关系

### 上游依赖
- **LegalIssueIdentifier**：必须基于识别出的争议焦点进行研究

### 下游依赖
- **CaseLawSearcher**：提供深度的法条研究基础，指导检索策略
- **LegalStrategy**：提供法律适用路径和论证框架
- **DraftWriter**：提供法条引用和法律依据

## 性能要求

- **执行时间**：< 15 分钟
- **法条处理能力**：单个案件最多处理 50 个相关法条
- **类案分析**：深度分析至少 10 个类案
- **报告生成**：自动生成结构化研究报告

## 集成点

### 与法律数据库集成
- 自动检索最新法条文本
- 获取最新司法解释
- 查询类案判决
- 订阅法条变更通知

### 与案例库集成
- 匹配相似案例
- 提取判决规则
- 分析判决趋势
- 预测判决结果

### 与知识库集成
- 积累法条解释经验
- 沉淀构成要件分析模板
- 构建法律适用路径库
- 形成争议解决策略库
