# Agent输出文档管理规范

> Last updated: 2025-11-01
> 本文档定义9个AI Agent的输出文档路径、命名规范和管理机制，确保文档智能归类和高效管理。

## 1. 概述

SuitAgent的9个AI Agent需要将输出文档保存到标准化的目录结构中。本规范定义了每个Agent的输出路径、文档类型、命名规则和管理机制，确保案件文档的智能归类和高效管理。

### 1.1 目录结构概览

```
output/
└── [案件编号]/                          # 按案件编号分类
    ├── 01_案件分析/                       # DocAnalyzer + Strategist
    ├── 02_法律研究/                       # IssueIdentifier + Researcher
    ├── 03_证据材料/                       # EvidenceAnalyzer
    ├── 04_法律文书/                       # Writer
    │   ├── 起诉状/
    │   ├── 答辩状/
    │   ├── 代理词/
    │   ├── 质证意见书/
    │   ├── 申请书/
    │   ├── 上诉状/
    │   ├── 律师函/
    │   ├── 调解协议/
    │   ├── 保全申请/
    │   ├── 执行申请/
    │   ├── 法律意见书/
    │   └── 其他文书/
    ├── 05_综合报告/                       # Summarizer + Reporter
    └── 06_日程管理/                       # Scheduler
        ├── 日程安排/
        ├── 工时统计/
        ├── 期限提醒/
        ├── [案件编号].yaml               # 数据总表
        └── [案件编号].md                 # 工作记录
```

### 1.2 Agent输出映射

| Agent | 输出目录 | 主要内容 | 文档类型 |
|-------|----------|----------|----------|
| **DocAnalyzer** | 01_案件分析/ | 案件分析、基础信息 | .md, .yaml |
| **Strategist** | 01_案件分析/ | 策略方案、风险评估 | .md, .xlsx |
| **IssueIdentifier** | 02_法律研究/ | 争议焦点分析 | .md |
| **Researcher** | 02_法律研究/ | 法律研究、判例检索 | .md |
| **EvidenceAnalyzer** | 03_证据材料/ | 证据目录、质证意见 | .xlsx, .md |
| **Writer** | 04_法律文书/[类型]/ | 各类法律文书 | .docx, .pdf |
| **Summarizer** | 05_综合报告/ | 案件摘要、风险摘要 | .md |
| **Reporter** | 05_综合报告/ | 综合报告、进展报告 | .md, .pdf |
| **Scheduler** | 06_日程管理/ | 期限管理、工时统计 | .yaml, .md |

## 2. 文档命名规范

### 2.1 标准命名格式

```
[日期]_[文档类型]_[版本].[扩展名]

示例：
20250315_案件分析报告_初稿.md
20250320_案件分析报告_修订稿.md
20250325_案件分析报告_最终稿.md
```

### 2.2 日期格式
- **格式**：YYYYMMDD
- **示例**：20250315

### 2.3 文档类型
- **案件分析报告** - DocAnalyzer输出
- **策略方案** - Strategist输出
- **争议焦点分析** - IssueIdentifier输出
- **法律研究报告** - Researcher输出
- **证据目录** - EvidenceAnalyzer输出
- **质证意见书** - EvidenceAnalyzer输出
- **起诉状/答辩状/代理词** - Writer输出
- **案件摘要** - Summarizer输出
- **综合报告** - Reporter输出
- **工时统计** - Scheduler输出

### 2.4 版本管理
- **初稿** - 初始完成版本
- **修订稿** - 根据反馈修改版本
- **最终稿** - 最终确认版本
- **v1.0, v2.0** - 版本号管理

## 3. Agent输出规范详解

### 3.1 DocAnalyzer（文档分析器）

**输出目录**：`output/[案件编号]/01_案件分析/`

**输出内容**：
- 案件基本信息提取
- 当事人信息整理
- 诉讼请求分析
- 案件要素提取
- 文档结构分析

**文档类型**：
- **主报告**：`[日期]_案件分析报告_[版本].md`
- **结构化数据**：`[日期]_案件要素提取_[版本].yaml`
- **当事人信息**：`[日期]_当事人信息_[版本].yaml`

**文件示例**：
```
20250315_案件分析报告_初稿.md
20250315_案件要素提取_初稿.yaml
20250315_当事人信息_初稿.yaml
```

**上下文更新**：
- 自动更新案件yaml文件的`案件基本信息`部分
- 更新`当事人信息`列表
- 更新`案件进展`状态

---

### 3.2 Strategist（策略制定器）

**输出目录**：`output/[案件编号]/01_案件分析/`

**输出内容**：
- SWOT分析
- 策略方案
- 风险评估
- 成功概率分析
- 备选方案

**文档类型**：
- **策略方案**：`[日期]_策略方案_[版本].md`
- **风险评估**：`[日期]_风险评估报告_[版本].md`
- **数据分析**：`[日期]_策略数据分析_[版本].xlsx`

**文件示例**：
```
20250318_策略方案_初稿.md
20250318_风险评估报告_初稿.md
20250318_策略数据分析_初稿.xlsx
```

**上下文更新**：
- 更新案件yaml文件的`风险预警`部分
- 更新`案件进展`中的策略建议
- 添加策略里程碑到`项目管理`部分

---

### 3.3 IssueIdentifier（争议焦点识别器）

**输出目录**：`output/[案件编号]/02_法律研究/`

**输出内容**：
- 争议焦点列表
- 焦点详细分析
- 法律关系梳理
- 争议优先级排序

**文档类型**：
- **争议焦点分析**：`[日期]_争议焦点分析_[版本].md`
- **争议焦点列表**：`[日期]_争议焦点列表_[版本].yaml`

**文件示例**：
```
20250320_争议焦点分析_初稿.md
20250320_争议焦点列表_初稿.yaml
```

**上下文更新**：
- 更新案件yaml文件的`案件基本信息`部分
- 添加争议焦点到`案件时间线`

---

### 3.4 Researcher（法律研究者）

**输出目录**：`output/[案件编号]/02_法律研究/`

**输出内容**：
- 法条检索结果
- 判例分析
- 法律适用路径
- 学术观点整理

**文档类型**：
- **法律研究报告**：`[日期]_法律研究_[专题]_[版本].md`
- **法条检索结果**：`[日期]_法条检索_[专题]_[版本].yaml`
- **判例分析**：`[日期]_判例分析_[专题]_[版本].md`

**文件示例**：
```
20250322_法律研究_合同效力_初稿.md
20250322_法条检索_合同效力_初稿.yaml
20250322_判例分析_合同效力_初稿.md
```

**上下文更新**：
- 更新案件yaml文件的`法律适用`部分
- 添加法条引用到相关文档

---

### 3.5 EvidenceAnalyzer（证据分析器）

**输出目录**：`output/[案件编号]/03_证据材料/`

**输出内容**：
- 证据目录
- 质证意见
- 证据关联性分析
- 补充证据建议

**文档类型**：
- **证据目录**：`[日期]_证据目录_[版本].xlsx`
- **质证意见书**：`[日期]_质证意见书_[版本].md`
- **证据分析报告**：`[日期]_证据分析报告_[版本].md`

**文件示例**：
```
20250325_证据目录_初稿.xlsx
20250325_质证意见书_初稿.md
20250325_证据分析报告_初稿.md
```

**上下文更新**：
- 更新案件yaml文件的`案件文档状态`部分
- 添加证据统计到`数据分析`部分

---

### 3.6 Writer（文书起草器）

**输出目录**：`output/[案件编号]/04_法律文书/[文书类型]/`

**文书类型分类**：

#### 3.6.1 起诉状
**目录**：`04_法律文书/起诉状/`
**文档类型**：起诉状、民事起诉状、行政起诉状
**文件示例**：`20250330_起诉状_初稿.docx`

#### 3.6.2 答辩状
**目录**：`04_法律文书/答辩状/`
**文档类型**：答辩状、民事答辩状、行政答辩状
**文件示例**：`20250330_答辩状_初稿.docx`

#### 3.6.3 代理词
**目录**：`04_法律文书/代理词/`
**文档类型**：代理词、庭审代理词、上诉代理词
**文件示例**：`20250405_代理词_初稿.docx`

#### 3.6.4 质证意见书
**目录**：`04_法律文书/质证意见书/`
**文档类型**：质证意见书、证据质证意见
**文件示例**：`20250410_质证意见书_初稿.docx`

#### 3.6.5 申请书
**目录**：`04_法律文书/申请书/`
**文档类型**：申请书、财产保全申请书、证据保全申请书
**文件示例**：`20250415_财产保全申请书_初稿.docx`

#### 3.6.6 上诉状
**目录**：`04_法律文书/上诉状/`
**文档类型**：上诉状、二审上诉状
**文件示例**：`20250420_上诉状_初稿.docx`

#### 3.6.7 律师函
**目录**：`04_法律文书/律师函/`
**文档类型**：律师函、催告函、律师警告函
**文件示例**：`20250425_律师函_初稿.docx`

#### 3.6.8 调解协议
**目录**：`04_法律文书/调解协议/`
**文档类型**：调解协议、和解协议
**文件示例**：`20250430_调解协议_初稿.docx`

#### 3.6.9 保全申请
**目录**：`04_法律文书/保全申请/`
**文档类型**：保全申请书、财产保全申请、证据保全申请
**文件示例**：`20250505_保全申请_初稿.docx`

#### 3.6.10 执行申请
**目录**：`04_法律文书/执行申请/`
**文档类型**：执行申请书、强制执行申请
**文件示例**：`20250510_执行申请_初稿.docx`

#### 3.6.11 法律意见书
**目录**：`04_法律文书/法律意见书/`
**文档类型**：法律意见书、法律分析意见书
**文件示例**：`20250515_法律意见书_初稿.docx`

#### 3.6.12 其他文书
**目录**：`04_法律文书/其他文书/`
**文档类型**：其他未分类的法律文书
**文件示例**：`20250520_其他文书_初稿.docx`

**Writer输出规范**：
- **主要输出**：.docx格式的法律文书
- **辅助输出**：.md格式的文书说明
- **格式要求**：符合法律文书格式规范
- **版本管理**：初稿、修订稿、最终稿

**上下文更新**：
- 更新案件yaml文件的`案件文档状态`部分
- 添加文书完成情况到`项目管理`部分

---

### 3.7 Summarizer（摘要生成器）

**输出目录**：`output/[案件编号]/05_综合报告/`

**输出内容**：
- 案件摘要
- 风险摘要
- 策略摘要
- 客户汇报摘要

**文档类型**：
- **案件摘要**：`[日期]_案件摘要_[版本].md`
- **风险摘要**：`[日期]_风险摘要_[版本].md`
- **策略摘要**：`[日期]_策略摘要_[版本].md`

**文件示例**：
```
20250525_案件摘要_初稿.md
20250525_风险摘要_初稿.md
20250525_策略摘要_初稿.md
```

**上下文更新**：
- 更新案件yaml文件的`工作记录摘要`部分
- 添加摘要统计到`数据分析`部分

---

### 3.8 Reporter（报告整合器）

**输出目录**：`output/[案件编号]/05_综合报告/`

**输出内容**：
- 综合分析报告
- 阶段性进展报告
- 最终案件报告
- 多格式报告输出

**文档类型**：
- **综合报告**：`[日期]_综合报告_[版本].md`
- **进展报告**：`[日期]_进展报告_[版本].md`
- **最终报告**：`[日期]_最终报告_[版本].pdf`

**文件示例**：
```
20250530_综合报告_初稿.md
20250530_进展报告_初稿.md
20250530_最终报告_最终稿.pdf
```

**上下文更新**：
- 更新案件yaml文件的`案件文档状态`部分
- 更新`案件进展`状态为"已完成"

---

### 3.9 Scheduler（日程规划者）

**输出目录**：`output/[案件编号]/06_日程管理/`

**输出内容**：
- 法定期限管理
- 工时统计
- 日程安排
- 风险预警

**双版本设计**：

#### YAML版本：`[案件编号].yaml`
**用途**：案件管理看板数据
**内容**：
- 案件基本信息
- 案件时间线
- 法定期限管理
- 工时统计
- 工作记录摘要
- 风险预警
- 案件文档状态
- 数据分析
- 项目管理

**文件示例**：
```
[2025]京0105民初1234号.yaml
```

#### MD版本：`[案件编号].md`
**用途**：单个案件的工作记录
**内容**：
- 案件基本信息表格
- 当事人信息
- 案件时间线
- 法定期限管理
- 工时统计
- 工作记录详情

**文件示例**：
```
[2025]京0105民初1234号.md
```

**子目录结构**：
```
06_日程管理/
├── 日程安排/
│   └── [日期]_案件时间线_[版本].md
├── 工时统计/
│   └── [日期]_工时统计报表_[版本].xlsx
├── 期限提醒/
│   └── [日期]_期限提醒_[版本].md
├── [案件编号].yaml
└── [案件编号].md
```

**上下文更新**：
- 双向同步yaml和md文件
- 自动计算期限和工时
- 生成风险预警
- 更新案件状态

## 4. 智能路径分配机制

### 4.1 案件识别算法

**案号识别**：
- 正则表达式：`\[(\d{4})\]([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][a-zA-Z0-9]*)(民初|行初|刑初|民终|行终|刑终)\d+号`
- 支持格式：`[2025]京0105民初1234号`
- 提取信息：年份、地区代码、案件类型、序号

**多案件处理**：
- 扫描所有输入文档
- 识别每个文档的案号
- 按案号分组
- 自动分配到对应案件目录

### 4.2 新案件创建流程

```
输入文档 → 案号识别 → 检查案件存在性 →

案件存在：
└── 分配到现有目录 → Agent处理 → 输出到对应位置

新案件：
└── 创建案件目录 → 创建6个子目录 → 生成yaml/md模板 → Agent处理 → 输出
```

**自动创建的内容**：
1. 案件目录：`output/[新案号]/`
2. 6个子目录：01-06
3. Writer子目录：12个文书类型
4. Scheduler文件：`[案号].yaml`和`[案号].md`
5. 工作记录模板复制

### 4.3 冲突处理机制

**重复案号检测**：
- 检查目录是否存在相同案号
- 检测文件内容是否重复
- 提示用户确认

**冲突选项**：
- **合并**：将新文档合并到现有案件
- **覆盖**：用新文档覆盖旧文档
- **创建副本**：为新文档创建版本

## 5. 数据同步机制

### 5.1 YAML数据自动更新

**更新触发条件**：
- Agent完成输出后
- 文档创建或修改后
- 手动触发同步

**更新内容**：
- 案件基本信息
- 案件时间线
- 工时统计
- 期限管理
- 文档状态
- 风险预警

### 5.2 MD工作记录同步

**同步方向**：
- YAML → MD：自动生成MD工作记录
- MD → YAML：提取工时和进度信息

**同步内容**：
- 工时数据
- 工作记录
- 案件进展
- 风险提醒

## 6. 质量保证

### 6.1 路径验证

**目录存在性检查**：
- 检查案件目录是否存在
- 检查子目录是否存在
- 自动创建缺失目录

**文件命名验证**：
- 检查文件名是否符合规范
- 检查日期格式是否正确
- 检查版本号是否规范

### 6.2 数据完整性检查

**YAML格式检查**：
- 语法正确性
- 字段完整性
- 数据类型验证

**逻辑一致性检查**：
- 日期逻辑检查
- 工时数据一致性
- 进度数据合理性

## 7. 技术实现详解

### 7.1 通用工具函数

```python
import os
import yaml
from datetime import datetime
from pathlib import Path
import re

def get_current_date():
    """获取当前日期，格式：YYYYMMDD"""
    return datetime.now().strftime("%Y%m%d")

def standardize_case_id(case_id):
    """标准化案件ID格式"""
    # 移除特殊字符，保留字母数字和短横线
    return re.sub(r'[^\w\-]', '', case_id)

def generate_filename(doc_type, version="初稿", extension=".md"):
    """生成标准文件名"""
    date = get_current_date()
    return f"{date}_{doc_type}_{version}{extension}"

def ensure_directory_exists(directory):
    """确保目录存在，不存在则创建"""
    Path(directory).mkdir(parents=True, exist_ok=True)

def read_yaml_file(yaml_path):
    """读取YAML文件"""
    if os.path.exists(yaml_path):
        with open(yaml_path, 'r', encoding='utf-8') as f:
            return yaml.load(f, Loader=yaml.FullLoader)
    return None

def write_yaml_file(yaml_path, data):
    """写入YAML文件"""
    ensure_directory_exists(os.path.dirname(yaml_path))
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True)
```

### 7.2 路径配置工具

```python
def get_agent_output_path(agent_name, case_id, document_type=None):
    """获取Agent输出路径"""

    # 基础路径映射
    base_path_mapping = {
        "DocAnalyzer": "01_案件分析",
        "Strategist": "01_案件分析",
        "IssueIdentifier": "02_法律研究",
        "Researcher": "02_法律研究",
        "EvidenceAnalyzer": "03_证据材料",
        "Summarizer": "05_综合报告",
        "Reporter": "05_综合报告",
        "Scheduler": "06_日程管理"
    }

    # Writer需要特殊处理
    if agent_name == "Writer":
        subdir = determine_writer_subdir(document_type)
        return f"output/{case_id}/04_法律文书/{subdir}"

    # 其他Agent直接映射
    subdir = base_path_mapping.get(agent_name, "05_综合报告")
    return f"output/{case_id}/{subdir}"

def determine_writer_subdir(document_type):
    """确定Writer的子目录"""

    writer_mapping = {
        "起诉状": "起诉状",
        "答辩状": "答辩状",
        "代理词": "代理词",
        "质证意见书": "质证意见书",
        "申请书": "申请书",
        "上诉状": "上诉状",
        "律师函": "律师函",
        "调解协议": "调解协议",
        "保全申请": "保全申请",
        "执行申请": "执行申请",
        "法律意见书": "法律意见书"
    }

    return writer_mapping.get(document_type, "其他文书")
```

### 7.3 YAML数据更新工具

```python
def update_yaml_for_agent(case_id, agent_name, doc_type, filename, document_data=None):
    """更新案件yaml数据（通用方法）"""

    yaml_path = f"output/{case_id}/06_日程管理/{case_id}.yaml"
    data = read_yaml_file(yaml_path)

    if data:
        # 更新文档状态
        doc_info = {
            "document_type": doc_type,
            "document_name": filename,
            "file_path": f"output/{case_id}/",
            "completion_date": get_current_date(),
            "lawyer_responsible": data.get("legal_team", {}).get("lead_lawyer", ""),
            "agent_responsible": agent_name,
            "quality_rating": "A"
        }

        if "document_status" not in data:
            data["document_status"] = {}

        if "completed_documents" not in data["document_status"]:
            data["document_status"]["completed_documents"] = []

        data["document_status"]["completed_documents"].append(doc_info)

        # 更新系统信息
        if "system_info" not in data:
            data["system_info"] = {}

        data["system_info"]["last_modified_date"] = datetime.now().strftime('%Y-%m-%d')
        data["system_info"]["last_modified_by"] = agent_name

        # 写入更新后的数据
        write_yaml_file(yaml_path, data)

def log_operation(operation_type, agent_name, case_id, details):
    """记录操作日志"""

    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "operation": operation_type,
        "agent": agent_name,
        "case_id": case_id,
        "details": details
    }

    # 写入日志文件
    log_path = f"output/{case_id}/06_日程管理/操作日志.yaml"
    logs = read_yaml_file(log_path) or []
    logs.append(log_entry)
    write_yaml_file(log_path, logs)
```

## 8. 使用指南

### 8.1 Agent开发者指南

**实现输出路径**：
1. 从输入参数获取案件编号
2. 根据Agent类型确定输出目录
3. 生成标准文件名
4. 创建完整的文件路径
5. 保存文件到指定路径

**代码示例**：
```python
def save_output(case_id, agent_type, content, doc_type, version="初稿"):
    # 确定输出目录
    output_dirs = {
        "DocAnalyzer": "01_案件分析",
        "Strategist": "01_案件分析",
        "IssueIdentifier": "02_法律研究",
        "Researcher": "02_法律研究",
        "EvidenceAnalyzer": "03_证据材料",
        "Writer": f"04_法律文书/{doc_type}",
        "Summarizer": "05_综合报告",
        "Reporter": "05_综合报告",
        "Scheduler": "06_日程管理"
    }

    # 生成文件路径
    date = datetime.now().strftime("%Y%m%d")
    filename = f"{date}_{doc_type}_{version}.md"
    filepath = f"output/{case_id}/{output_dirs[agent_type]}/{filename}"

    # 保存文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return filepath
```

### 8.2 用户操作指南

**创建新案件**：
1. 在input目录放置案件文档
2. 系统自动识别案号
3. 自动创建案件目录结构
4. Agent开始处理文档

**查看案件进展**：
1. 打开`output/[案件编号]/06_日程管理/[案件编号].yaml`
2. 查看YAML数据看板
3. 检查工时统计和期限管理

**管理文档**：
1. 按Agent类型查找文档
2. 使用标准命名规范
3. 定期更新版本号

## 9. 相关文档

- [ROADMAP_NEW.md](ROADMAP_NEW.md) - 新版项目路线图
- [TASKS_NEW.md](../status/TASKS_NEW.md) - 新版任务清单
- [案件模板](../.claude/memory/) - 案件相关模板

---

> 智能文档管理让SuitAgent更高效、更可靠，确保每个案件文档都找到正确的位置。
