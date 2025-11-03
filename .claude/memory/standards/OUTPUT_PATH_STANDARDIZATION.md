# Agent输出路径标准化实施指南

> Last updated: 2025-11-01
> 本文档提供Agent输出路径标准化的实施细节和技术规范

## 1. 实施状态

✅ **已完成**：
- [x] 创建标准目录结构（output/cases/[案件编号]/）
- [x] 建立6大功能目录（01-06）
- [x] 创建Writer的12个法律文书子目录
- [x] 创建YAML和MD模板文件
- [x] 建立工作记录模板

📋 **进行中**：
- [ ] 更新Agent配置文件路径规范
- [ ] 创建示例文档
- [ ] 验证路径分配机制

## 2. 目录结构验证

```bash
output/[案件编号]/
├── 01_案件分析/                    # DocAnalyzer + Strategist
├── 02_法律研究/                    # IssueIdentifier + Researcher
├── 03_证据材料/                    # EvidenceAnalyzer
├── 04_法律文书/                    # Writer
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
├── 05_综合报告/                    # Summarizer + Reporter
└── 06_日程管理/                    # Scheduler
    ├── 日程安排/
    ├── 工时统计/
    ├── 期限提醒/
    ├── [案件编号].yaml            # 案件数据总表
    ├── [案件编号].md              # 工作记录
    └── 工作记录模板.md            # 记录模板
```

## 3. Agent配置路径映射

### 3.1 DocAnalyzer配置更新

**路径配置**：
```yaml
输出规范:
  基础路径: "output/{案件编号}/01_案件分析/"
  文件命名: "{日期}_案件分析报告_{版本}.md"
  数据文件: "{日期}_案件要素提取_{版本}.yaml"
  当事人信息: "{日期}_当事人信息_{版本}.yaml"
```

**示例代码**：
```python
def save_doc_analysis(case_id, analysis_result):
    base_path = f"output/{case_id}/01_案件分析/"
    date = get_current_date()
    
    # 保存主报告
    report_path = f"{base_path}{date}_案件分析报告_初稿.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(analysis_result['report'])
    
    # 保存结构化数据
    data_path = f"{base_path}{date}_案件要素提取_初稿.yaml"
    with open(data_path, 'w', encoding='utf-8') as f:
        yaml.dump(analysis_result['data'], f)
    
    return [report_path, data_path]
```

### 3.2 Writer配置更新

**路径配置**：
```yaml
输出规范:
  基础路径: "output/{案件编号}/04_法律文书/{文书类型}/"
  文件命名: "{日期}_{文书名称}_{版本}.{扩展名}"
  支持格式: [".docx", ".md", ".pdf"]

文书类型映射:
  起诉状: "起诉状"
  答辩状: "答辩状"
  代理词: "代理词"
  质证意见书: "质证意见书"
  申请书: "申请书"
  上诉状: "上诉状"
  律师函: "律师函"
  调解协议: "调解协议"
  保全申请: "保全申请"
  执行申请: "执行申请"
  法律意见书: "法律意见书"
  其他: "其他文书"
```

**示例代码**：
```python
def save_legal_brief(case_id, brief_type, content, version="初稿"):
    # 确定子目录
    subdir_mapping = {
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
    
    subdir = subdir_mapping.get(brief_type, "其他文书")
    base_path = f"output/{case_id}/04_法律文书/{subdir}/"
    date = get_current_date()
    
    # 保存docx主文档
    docx_path = f"{base_path}{date}_{brief_type}_{version}.docx"
    
    # 保存md说明文档
    md_path = f"{base_path}{date}_{brief_type}_{version}.md"
    
    return docx_path, md_path
```

### 3.3 Scheduler配置更新

**路径配置**：
```yaml
输出规范:
  基础路径: "output/{案件编号}/06_日程管理/"
  核心文件:
    - "{案件编号}.yaml"        # 数据总表
    - "{案件编号}.md"          # 工作记录
  子目录:
    - "日程安排/"
    - "工时统计/"
    - "期限提醒/"
```

## 4. 路径分配工具函数

### 4.1 通用路径获取函数

```python
import os
from pathlib import Path
from datetime import datetime

def get_agent_output_path(agent_name, case_id, document_type=None):
    """
    根据Agent类型和案件编号获取标准输出路径
    
    Args:
        agent_name: Agent名称 (DocAnalyzer, Writer, 等)
        case_id: 案件编号
        document_type: 文档类型 (仅Writer需要)
    
    Returns:
        str: 标准输出路径
    """
    
    # Agent到目录的映射
    agent_dir_mapping = {
        "DocAnalyzer": "01_案件分析",
        "Strategist": "01_案件分析",
        "IssueIdentifier": "02_法律研究",
        "Researcher": "02_法律研究",
        "EvidenceAnalyzer": "03_证据材料",
        "Summarizer": "05_综合报告",
        "Reporter": "05_综合报告",
        "Scheduler": "06_日程管理"
    }
    
    # Writer特殊处理
    if agent_name == "Writer":
        subdir = determine_writer_subdir(document_type)
        return f"output/{case_id}/04_法律文书/{subdir}"
    
    # 其他Agent直接映射
    subdir = agent_dir_mapping.get(agent_name, "05_综合报告")
    return f"output/{case_id}/{subdir}"

def determine_writer_subdir(document_type):
    """确定Writer的子目录"""
    mapping = {
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
    return mapping.get(document_type, "其他文书")

def get_current_date():
    """获取当前日期，格式：YYYYMMDD"""
    return datetime.now().strftime("%Y%m%d")

def ensure_directory_exists(directory):
    """确保目录存在"""
    Path(directory).mkdir(parents=True, exist_ok=True)
```

### 4.2 标准文件名生成

```python
def generate_standard_filename(doc_type, version="初稿", extension=".md"):
    """生成标准文件名"""
    date = get_current_date()
    return f"{date}_{doc_type}_{version}{extension}"

def generate_writer_filename(brief_type, version="初稿", extension=".docx"):
    """生成Writer专用文件名"""
    date = get_current_date()
    return f"{date}_{brief_type}_{version}{extension}"
```

### 4.3 完整保存流程

```python
def save_agent_output(agent_name, case_id, content, doc_type, 
                     version="初稿", metadata=None):
    """
    通用Agent输出保存函数
    
    Args:
        agent_name: Agent名称
        case_id: 案件编号
        content: 文件内容
        doc_type: 文档类型
        version: 版本号
        metadata: 附加元数据
    
    Returns:
        dict: 保存结果，包含文件路径等信息
    """
    
    # 获取输出路径
    output_path = get_agent_output_path(agent_name, case_id, doc_type)
    ensure_directory_exists(output_path)
    
    # 生成文件名
    if agent_name == "Writer":
        filename = generate_writer_filename(doc_type, version, ".docx")
        md_filename = generate_writer_filename(doc_type, version, ".md")
        
        # 保存docx
        docx_path = os.path.join(output_path, filename)
        save_as_docx(content, docx_path)
        
        # 保存md
        md_path = os.path.join(output_path, md_filename)
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        result = {
            "docx_path": docx_path,
            "md_path": md_path,
            "agent": agent_name,
            "case_id": case_id,
            "doc_type": doc_type,
            "version": version
        }
    else:
        filename = generate_standard_filename(doc_type, version)
        file_path = os.path.join(output_path, filename)
        
        # 保存文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        result = {
            "file_path": file_path,
            "agent": agent_name,
            "case_id": case_id,
            "doc_type": doc_type,
            "version": version
        }
    
    # 更新yaml数据
    if metadata:
        update_yaml_data(case_id, agent_name, doc_type, result, metadata)
    
    return result
```

## 5. YAML数据自动更新

```python
def update_yaml_data(case_id, agent_name, doc_type, file_info, metadata):
    """自动更新案件yaml数据"""
    
    yaml_path = f"output/{case_id}/06_日程管理/{case_id}.yaml"
    
    if not os.path.exists(yaml_path):
        return
    
    # 读取现有数据
    with open(yaml_path, 'r', encoding='utf-8') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
    
    # 构建文档记录
    doc_record = {
        "document_type": doc_type,
        "agent": agent_name,
        "completion_date": get_current_date(),
        "file_info": file_info,
        "metadata": metadata
    }
    
    # 添加到已完成文档
    if "案件文档状态" not in data:
        data["案件文档状态"] = {}
    
    if "已完成文档" not in data["案件文档状态"]:
        data["案件文档状态"]["已完成文档"] = []
    
    data["案件文档状态"]["已完成文档"].append(doc_record)
    
    # 更新最后修改信息
    if "说明" not in data:
        data["说明"] = {}
    
    data["说明"]["最后更新"] = get_current_date()
    data["说明"]["最后更新者"] = agent_name
    
    # 保存更新后的数据
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True)
```

## 6. 实施检查清单

### 6.1 目录结构检查
- [ ] 确认output目录存在
- [ ] 确认6大子目录已创建
- [ ] 确认Writer的12个子目录已创建
- [ ] 确认YAML和MD模板文件存在

### 6.2 Agent配置检查
- [ ] DocAnalyzer配置更新
- [ ] Strategist配置更新
- [ ] IssueIdentifier配置更新
- [ ] Researcher配置更新
- [ ] EvidenceAnalyzer配置更新
- [ ] Writer配置更新
- [ ] Summarizer配置更新
- [ ] Reporter配置更新
- [ ] Scheduler配置更新
- [ ] Reviewer配置更新

### 6.3 工具函数验证
- [ ] get_agent_output_path函数验证
- [ ] generate_standard_filename函数验证
- [ ] ensure_directory_exists函数验证
- [ ] update_yaml_data函数验证

### 6.4 示例文档验证
- [ ] 创建示例案件分析报告
- [ ] 创建示例法律文书
- [ ] 创建示例工作记录

## 7. 质量保证

### 7.1 路径验证
每个Agent在保存文件前应执行：
1. 检查案件编号格式是否正确
2. 确认输出目录存在（不存在则创建）
3. 检查文件名是否符合规范
4. 验证文件权限

### 7.2 数据完整性验证
- YAML格式正确性
- 必填字段完整性
- 数据类型正确性
- 逻辑一致性

### 7.3 版本控制
- 自动版本号管理
- 版本历史记录
- 版本回溯机制

---

**下一步行动**：
1. 更新所有Agent配置文件
2. 创建示例文档
3. 验证工具函数
4. 更新CHANGELOG.md
5. 标记目标1.2完成

