# SuitAgent AI代理协作规范

> Last updated: 2025-11-01
> 本文档定义了 SuitAgent 项目的AI代理协作规范、配置标准和工作流程。

## 目录

- [AI代理协作架构](#ai代理协作架构)
- [Agent配置规范](#agent配置规范)
- [知识库管理](#知识库管理)
- [官方技能集成](#官方技能集成)
- [工作流编排](#工作流编排)
- [文档规范](#文档规范)
- [协作者指南](#协作者指南)

---

## AI代理协作架构

### 系统定位

SuitAgent 是基于 **Claude Code 架构** 的AI代理协作系统，通过9个专业化Agent实现法律服务的全生命周期自动化处理。

### 核心组件

- **主Agent**: 负责工作流编排和智能决策
- **Sub-Agent**: 9个专业化工作流Agent
- **Memory知识库**: 法律文书模板和法律知识
- **官方技能**: 集成Claude Code官方技能库

### 协作流程

1. **接收输入**: 用户提供文档或场景描述
2. **智能识别**: 主Agent自动识别文档类型和场景
3. **工作流规划**: 选择最优的Agent组合
4. **协作执行**: 各Agent按序协作完成任务
5. **结果整合**: 生成完整的法律分析报告

---

## 代码风格规范

### 1. Python 代码风格

#### 基础规范

- **遵循 PEP 8**: 所有 Python 代码应遵循 PEP 8 编码规范
- **行长度**: 限制在 88 字符以内 (Black 默认设置)
- **字符串**: 使用双引号 `"`
- **导入顺序**:
  1. 标准库
  2. 第三方库
  3. 本地模块
- **命名规范**:
  - **类名**: PascalCase (如 `LegalDocumentProcessor`)
  - **函数/变量**: snake_case (如 `process_document`)
  - **常量**: UPPER_SNAKE_CASE (如 `MAX_RETRIES`)
  - **私有成员**: 单下划线前缀 (如 `_private_method`)

#### 代码格式化

使用 Black 和 isort 自动格式化代码：

```bash
# 格式化所有 Python 文件
black .
isort .

# 检查格式化
black --check .
isort --check-only .
```

### 2. 类型注解

- **必须注解**: 所有公共函数的参数和返回值
- **推荐注解**: 私有函数和复杂变量
- **使用 typing 模块**: 对于复杂的类型注解

```python
from typing import List, Dict, Optional, Union

def process_documents(
    files: List[str],
    config: Optional[Dict[str, str]] = None
) -> Union[str, List[str]]:
    """处理文档列表并返回结果。

    Args:
        files: 文档文件路径列表
        config: 可选的配置字典

    Returns:
        处理结果，可以是字符串或字符串列表

    Raises:
        ValueError: 当文件列表为空时
    """
    if not files:
        raise ValueError("文件列表不能为空")

    results = []
    for file_path in files:
        result = _process_single_file(file_path, config)
        results.append(result)

    return results if len(results) > 1 else results[0]
```

### 3. 错误处理

- **使用自定义异常**: 为特定错误场景定义异常类
- **记录异常**: 使用 loguru 记录详细错误信息
- **优雅降级**: 避免程序崩溃，提供合理的默认值

```python
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class DocumentProcessingError(Exception):
    """文档处理异常"""
    pass

def process_legal_document(file_path: str) -> Optional[dict]:
    """处理法律文档"""
    try:
        # 处理逻辑
        return result
    except FileNotFoundError as e:
        logger.error(f"文件未找到: {file_path}")
        raise DocumentProcessingError(f"无法处理文件: {file_path}") from e
    except Exception as e:
        logger.exception(f"处理文档时发生未知错误: {file_path}")
        return None
```

---

## 项目结构

### 推荐的目录结构

```
suitagent/
├── .claude/              # Claude Code 配置
│   ├── agents/          # Agent 配置
│   ├── memory/          # 知识库
│   └── skills/          # 官方技能
├── docs/                # 项目文档
│   ├── api/             # API 文档
│   ├── guides/          # 用户指南
│   └── DEVELOPMENT.md   # 开发规范
├── status/              # 项目状态文档
│   ├── CHANGELOG.md     # 变更记录
│   ├── JOURNAL.md       # 工作日志
│   └── TASKS.md         # 任务清单
├── suitagent/           # 源代码目录
│   ├── __init__.py
│   ├── agents/          # Agent 模块
│   ├── core/            # 核心功能
│   ├── utils/           # 工具函数
│   ├── data/            # 数据处理
│   └── tests/           # 测试代码
├── scripts/             # 脚本文件
├── requirements.txt     # 依赖列表
├── pyproject.toml       # 项目配置
└── README.md            # 项目说明
```

### 模块职责

- **agents/**: 8个核心工作流的实现
- **core/**: 核心业务逻辑和配置
- **utils/**: 通用工具函数和辅助类
- **data/**: 数据处理和存储相关功能

---

## 文档规范

### 1. 函数文档字符串

使用 Google 风格的文档字符串：

```python
def analyze_legal_document(file_path: str) -> Dict[str, Any]:
    """分析法律文档并提取关键信息。

    该函数会解析法律文档，提取当事人信息、争议焦点、
    诉讼请求等关键信息，并返回结构化的分析结果。

    Args:
        file_path: 文档文件路径，支持 .docx 和 .pdf 格式

    Returns:
        包含分析结果的字典，包含以下键：
        - parties: 当事人信息
        - issues: 争议焦点列表
        - claims: 诉讼请求
        - timeline: 关键时间节点

    Raises:
        DocumentParsingError: 文档解析失败时抛出
        UnsupportedFormatError: 不支持的文件格式时抛出

    Example:
        >>> result = analyze_legal_document("contract.pdf")
        >>> print(result['parties'])
        [{'name': '原告', 'role': '起诉方'}, ...]
    """
    pass
```

### 2. README 规范

每个模块的 README 应包含：
- 模块功能简介
- 安装和使用方法
- API 参考
- 示例代码
- 注意事项

---

## 测试规范

### 1. 测试覆盖要求

- **最低覆盖率**: 80%
- **关键模块**: 90%+
- **测试类型**: 单元测试 + 集成测试

### 2. 测试命名

- **测试文件**: `test_<module_name>.py`
- **测试类**: `Test<ClassName>`
- **测试方法**: `test_<function_name>_<scenario>`

### 3. 测试示例

```python
import pytest
from suitagent.agents.doc_analyzer import DocAnalyzer
from suitagent.core.exceptions import DocumentParsingError

class TestDocAnalyzer:
    """DocAnalyzer 测试类"""

    def test_analyze_valid_docx(self):
        """测试分析有效的 docx 文件"""
        analyzer = DocAnalyzer()
        result = analyzer.analyze("tests/fixtures/sample.docx")
        assert result["parties"] is not None
        assert len(result["issues"]) > 0

    def test_analyze_invalid_file_raises_error(self):
        """测试分析无效文件时抛出异常"""
        analyzer = DocAnalyzer()
        with pytest.raises(DocumentParsingError):
            analyzer.analyze("tests/fixtures/invalid.txt")

    @pytest.mark.slow
    def test_analyze_large_document(self):
        """测试分析大型文档（标记为慢测试）"""
        analyzer = DocAnalyzer()
        result = analyzer.analyze("tests/fixtures/large_document.pdf")
        assert result is not None
```

### 4. 运行测试

```bash
# 运行所有测试
pytest

# 运行特定测试
pytest tests/test_doc_analyzer.py

# 生成覆盖率报告
pytest --cov=suitagent --cov-report=html

# 运行慢测试
pytest -m slow
```

---

## 提交规范

### 提交消息格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型

- **feat**: 新功能
- **fix**: 错误修复
- **docs**: 文档更新
- **style**: 代码格式调整
- **refactor**: 代码重构
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动

### 示例

```bash
feat(doc_analyzer): 添加 OCR 文字识别功能

- 集成 Tesseract OCR 引擎
- 支持扫描文档文字提取
- 添加自动重命名功能

Closes #123
```

---

## 发布流程

### 版本号规则

遵循 [语义化版本](https://semver.org/) 规范：

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

### 发布步骤

1. **更新 CHANGELOG.md**
2. **更新版本号** (pyproject.toml)
3. **运行完整测试套件**
4. **创建发布分支**
5. **合并到 main 分支**
6. **创建 Git 标签**
7. **构建发布包**

### 发布检查清单

- [ ] 所有测试通过
- [ ] 文档更新完成
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已更新
- [ ] 代码审查完成
- [ ] 安全扫描通过

---

## 性能优化指南

### 1. 代码优化

- **避免重复计算**: 缓存计算结果
- **使用生成器**: 对于大数据处理
- **异步编程**: 对于 I/O 密集型任务
- **内存管理**: 及时释放大型对象

### 2. 数据库优化

- **索引优化**: 为常用查询字段添加索引
- **连接池**: 使用连接池管理数据库连接
- **查询优化**: 避免 N+1 查询问题

### 3. 监控指标

- **响应时间**: API 接口响应时间
- **内存使用**: 监控内存泄漏
- **CPU 使用率**: 识别性能瓶颈
- **错误率**: 跟踪错误发生频率

---

## 安全规范

### 1. 输入验证

- **参数校验**: 验证所有用户输入
- **文件类型检查**: 严格限制上传文件类型
- **SQL 注入防护**: 使用参数化查询
- **XSS 防护**: 对输出内容进行转义

### 2. 敏感信息处理

- **密码加密**: 使用强哈希算法 (bcrypt, argon2)
- **API 密钥**: 使用环境变量管理
- **日志脱敏**: 避免记录敏感信息
- **数据加密**: 敏感数据传输加密

### 3. 安全审计

- **依赖扫描**: 定期检查依赖漏洞
- **代码扫描**: 使用 bandit 进行安全扫描
- **渗透测试**: 定期进行安全测试

---

## 最佳实践

### 1. 开发原则

- **单一职责**: 每个类/函数只负责一件事
- **开放封闭**: 对扩展开放，对修改封闭
- **依赖注入**: 避免硬编码依赖
- **DRY 原则**: 不要重复自己

### 2. 调试技巧

- **使用 logging**: 记录关键执行路径
- **断点调试**: 使用 IDE 调试器
- **单元测试**: 通过测试定位问题
- **代码审查**: 通过审查发现潜在问题

### 3. 性能优化

- **性能分析**: 使用 cProfile 分析性能瓶颈
- **内存分析**: 使用 memory_profiler 检查内存使用
- **并发优化**: 合理使用多线程/多进程

---

## 常见问题

### Q1: 如何处理大型文档？
A: 使用流式处理或分块读取，避免一次性加载全部内容到内存。

### Q2: 如何处理多语言文档？
A: 使用多语言 NLP 库如 spaCy 的多语言模型，或针对不同语言使用专门的处理库。

### Q3: 如何保证测试的稳定性？
A: 使用固定随机种子，模拟外部依赖，避免测试间的依赖关系。

---

## 相关资源

- [PEP 8 - Python 编码规范](https://peps.python.org/pep-0008/)
- [Google Python 风格指南](https://google.github.io/styleguide/pyguide.html)
- [Black 代码格式化工具](https://black.readthedocs.io/)
- [pytest 测试框架](https://docs.pytest.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 更新日志

- **2025-11-01**: 初始版本，定义开发规范和最佳实践
