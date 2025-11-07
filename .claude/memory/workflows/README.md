# SuitAgent Agents 工作流程详细设计

> 本目录包含所有10个agents的详细设计和工作流程说明
> 标准subagent配置请查看：`.claude/agents/` 目录

## 目录说明

本目录包含的法律智能体框架的详细设计文档，每个agent都有对应的详细工作流程说明。

## Agents 列表

### 📥 输入层 (Input Layer)

#### 1. DocAnalyzer（文档分析器）
- **标准配置**: `.claude/agents/DocAnalyzer.md`
- **详细设计**: `DocAnalyzer-workflow.md`
- **职责**: 分析各类法律文档，提取结构化信息，支持OCR识别和智能重命名

#### 2. EvidenceAnalyzer（证据分析器）
- **标准配置**: `.claude/agents/EvidenceAnalyzer.md`
- **详细设计**: `EvidenceAnalyzer-workflow.md`
- **职责**: 证据分析、质证意见、补充证据建议

### 🔍 分析层 (Analysis Layer)

#### 3. IssueIdentifier（争议焦点识别器）
- **标准配置**: `.claude/agents/IssueIdentifier.md`
- **详细设计**: `IssueIdentifier-workflow.md`
- **职责**: 识别核心法律争议点和适用法条

#### 4. Researcher（法律研究检索器）
- **标准配置**: `.claude/agents/Researcher.md`
- **详细设计**: `Researcher-workflow.md`
- **职责**: 法条解读、判例检索和法律适用性评估

#### 5. Strategist（策略规划器）
- **标准配置**: `.claude/agents/Strategist.md`
- **详细设计**: `Strategist-workflow.md`
- **职责**: SWOT分析、策略制定和风险评估

### 📝 输出层 (Output Layer)

#### 6. Writer（法律文书起草器）
- **标准配置**: `.claude/agents/Writer.md`
- **详细设计**: `Writer-workflow.md`
- **职责**: 起草各类法律文书，支持12种文书模板

#### 7. Summarizer（摘要生成器）
- **标准配置**: `.claude/agents/Summarizer.md`
- **详细设计**: `Summarizer-workflow.md`
- **职责**: 生成各类法律摘要和简报，支持多层次摘要

#### 8. Reporter（报告编译器）
- **标准配置**: `.claude/agents/Reporter.md`
- **详细设计**: `Reporter-workflow.md`
- **职责**: 整合各类分析结果，生成综合性法律报告

### ⚙️ 支持层 (Support Layer)

#### 9. Scheduler（日程规划者）
- **标准配置**: `.claude/agents/Scheduler.md`
- **详细设计**: `Scheduler-workflow.md`
- **职责**: 法律期限管理、案件时间线规划和工作记录工时管理

#### 10. Reviewer（智能审查器）
- **标准配置**: `.claude/agents/Reviewer.md`
- **详细设计**: `Reviewer-workflow.md`
- **职责**: 对其他9个Agent的输出进行质量审查和专业评估

## 双层架构设计

### 使用层（`.claude/agents/`）
简洁、标准、即用即走的 subagent 配置，符合 Claude Code 官方标准。

**特点**:
- ✅ 符合 Claude Code 官方 subagent 标准
- ✅ 包含 YAML frontmatter（name, description, tools, model）
- ✅ 简洁的核心指令和职责描述
- ✅ 标准的工作流程说明
- ✅ 结构化的输出格式

**使用方法**:
```bash
# 在对话中直接使用
> 使用 DocAnalyzer 分析这个文档
> 让 Researcher 进行法律研究
> 请 Writer 起草答辩状
```

### 知识层（`.claude/memory/workflows/`）
详细、全面、便于开发优化的设计文档。

**包含内容**:
- 完整的功能定位和场景说明
- 详细的工作流程和步骤定义
- JSON配置示例和调用方式
- 完整的性能指标和质量验证
- 错误处理和修正机制
- 集成说明和协作方式

## 协作关系

### 依赖关系
```
DocAnalyzer → IssueIdentifier → Researcher → Strategist → Writer
                ↓
            EvidenceAnalyzer → Writer
                ↓
            Strategist → Scheduler
                ↓
            Reviewer → 全局质量审查
```

### 并行支持
- **DocAnalyzer** + **EvidenceAnalyzer** → 分析新证据时
- **IssueIdentifier** + **EvidenceAnalyzer** → 庭审后分析时
- **Researcher** 内部 → 法条+判例并行
- **Strategist** 内部 → SWOT+风险并行

## 质量保证

### 内嵌验证机制
每个agent都包含5层验证机制：
1. **输入验证**：检查输入数据完整性和正确性
2. **处理验证**：监控处理过程和中间结果
3. **输出验证**：检查输出格式和内容完整性
4. **逻辑验证**：验证逻辑一致性和数据匹配
5. **质量评估**：提供质量评分和改进建议

### Reviewer 协作
- **自动触发**：高风险案件、重要文书
- **条件触发**：上诉状、代理词、质证意见书
- **手动调用**：用户要求时

## 性能标准

| 指标 | 要求 |
|------|------|
| **分析速度** | < 3 分钟/文档 |
| **准确率** | > 90% |
| **OCR识别** | > 95% |
| **质量评级** | A/B/C/D 四级 |
| **成功率** | > 95% |

## 更新记录

### v2.0 - 2025-11-06
- **新增**: 创建双层架构设计（使用层+知识层）
- **完善**: 所有10个agents符合Claude Code官方subagent标准
- **优化**: 将详细工作流程分离到workflows目录
- **标准化**: 添加YAML frontmatter和标准配置

---

更多详细信息请参考各个agent的详细设计文档。
