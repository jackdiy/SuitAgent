# LegalIssueIdentifier

## 概述
法律争议焦点识别器，负责从案件证据中识别核心法律争议点、相关法律关系及适用法条，并为后续法律检索和策略制定提供清晰的问题框架。

## 功能描述
- 提取和识别案件中的核心争议焦点
- 分析和分类当事人之间的法律关系
- 匹配相关的法律条文和司法解释
- 评估争议问题的复杂度和优先级
- 生成结构化的问题陈述
- 识别潜在的法律盲点和难点

## 工作流程

### 步骤定义
```json
{
  "name": "LegalIssueIdentifier",
  "version": "1.0.0",
  "description": "法律争议焦点识别器",
  "steps": [
    {
      "id": "step_1",
      "name": "extract_dispute_focus",
      "description": "提取争议焦点",
      "tool": "issue_extractor",
      "input": {
        "case_elements": "object",
        "evidence_analysis": "object"
      },
      "output": {
        "raw_issues": "array"
      }
    },
    {
      "id": "step_2",
      "name": "categorize_legal_relations",
      "description": "法律关系分类",
      "tool": "legal_relation_categorizer",
      "depends_on": ["step_1"],
      "input": {
        "raw_issues": "array",
        "case_elements": "object"
      },
      "output": {
        "legal_relations": "object",
        "dispute_categories": "array"
      }
    },
    {
      "id": "step_3",
      "name": "identify_applicable_laws",
      "description": "识别适用法条",
      "tool": "law_article_matcher",
      "depends_on": ["step_2"],
      "parallel": true,
      "input": {
        "legal_relations": "object",
        "dispute_categories": "array"
      },
      "output": {
        "applicable_laws": "array",
        "law_mappings": "object"
      }
    },
    {
      "id": "step_4",
      "name": "rank_issues_by_priority",
      "description": "按优先级排序争议",
      "tool": "priority_ranker",
      "depends_on": ["step_3"],
      "input": {
        "raw_issues": "array",
        "applicable_laws": "array",
        "case_complexity": "object"
      },
      "output": {
        "prioritized_issues": "array",
        "issue_complexity_matrix": "object"
      }
    },
    {
      "id": "step_5",
      "name": "generate_issue_statements",
      "description": "生成问题陈述",
      "tool": "issue_statement_generator",
      "depends_on": ["step_4"],
      "input": {
        "prioritized_issues": "array",
        "law_mappings": "object"
      },
      "output": {
        "structured_issues": "array",
        "issue_summary": "object"
      }
    }
  ],
  "execution": {
    "mode": "sequential",
    "parallel": false,
    "retry": {
      "max_attempts": 3,
      "backoff": "exponential"
    }
  }
}
```

## 输入规范

### 必需参数
```json
{
  "case_elements": {
    "type": "object",
    "required": true,
    "description": "案件基本要素，包含当事人、事实、请求等"
  },
  "evidence_analysis": {
    "type": "object",
    "required": true,
    "description": "EvidenceAnalyzer输出的证据分析结果"
  }
}
```

### 可选参数
```json
{
  "options": {
    "type": "object",
    "required": false,
    "properties": {
      "issue_types": {
        "type": "array",
        "description": "指定关注的争议类型"
      },
      "complexity_threshold": {
        "type": "number",
        "default": 0.7,
        "description": "问题复杂度阈值"
      },
      "include_precedents": {
        "type": "boolean",
        "default": false,
        "description": "是否包含先例分析"
      },
      "jurisdiction": {
        "type": "string",
        "default": "CN",
        "description": "司法管辖区"
      }
    }
  }
}
```

## 输出规范

### 成功输出
```json
{
  "status": "success",
  "data": {
    "case_id": "string",
    "dispute_focus": [
      {
        "issue_id": "string",
        "title": "string",
        "description": "string",
        "complexity_level": "string",
        "complexity_score": "number",
        "priority_rank": "number",
        "related_articles": [
          {
            "law_name": "string",
            "article": "string",
            "clause": "string",
            "relevance_score": "number"
          }
        ],
        "legal_elements": {
          "required_elements": "array",
          "disputed_elements": "array",
          "missing_elements": "array"
        }
      }
    ],
    "legal_relations": {
      "primary_relationship": "string",
      "secondary_relationships": "array",
      "cross_issues": "array"
    },
    "priority_order": ["string"],
    "issue_complexity_matrix": {
      "high_complexity": "array",
      "medium_complexity": "array",
      "low_complexity": "array"
    },
    "recommendations": {
      "focus_areas": "array",
      "research_priorities": "array",
      "potential_challenges": "array"
    },
    "confidence": {
      "overall": "number",
      "by_issue": "object"
    }
  },
  "metadata": {
    "processing_time": "number",
    "tokens_used": "number",
    "timestamp": "string"
  }
}
```

### 错误输出
```json
{
  "status": "error",
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  },
  "metadata": {
    "processing_time": "number",
    "timestamp": "string"
  }
}
```

## 错误处理

### 常见错误类型
- `NO_ISSUES_IDENTIFIED`: 未能识别争议焦点
- `INSUFFICIENT_EVIDENCE`: 证据不足
- `INVALID_CASE_DATA`: 案件数据无效
- `COMPLEXITY_ASSESSMENT_FAILED`: 复杂度评估失败

### 重试策略
- 最大重试次数：3次
- 退避策略：指数退避
- 重试间隔：1s, 2s, 4s

## 依赖工具
- issue_extractor: 争议焦点提取
- legal_relation_categorizer: 法律关系分类
- law_article_matcher: 法条匹配
- priority_ranker: 优先级排序
- issue_statement_generator: 问题陈述生成

## 使用示例

```json
{
  "agent": "LegalIssueIdentifier",
  "input": {
    "case_elements": {
      "parties": { ... },
      "facts": { ... },
      "claims": [ ... ]
    },
    "evidence_analysis": {
      "evidence_chain": [ ... ],
      "assessment": { ... }
    }
  }
}
```

## 版本历史
- v1.0.0 (2025-10-31): 初始版本

## 相关文档
- [EvidenceAnalyzer](EvidenceAnalyzer.md) - 前置工作流
- [CaseLawSearcher](CaseLawSearcher.md) - 后续工作流
- [系统架构文档](../../docs/ARCHITECTURE.md)
