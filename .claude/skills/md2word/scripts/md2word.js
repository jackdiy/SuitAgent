#!/usr/bin/env node
/**
 * md2word-skill - 基于成功运行的JS脚本
 * 接收参数并进行可复用的转换
 */

const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, Footer, PageNumber } = require('docx');
const fs = require('fs');
const path = require('path');

// 解析参数
function parseArgs() {
    const args = process.argv.slice(2);
    return {
        input: args[0],
        output: args[1] || (args[0] ? args[0].replace(/\.md$/i, '.docx') : null),
        template: args[2] || null
    };
}

// 读取Markdown文件
function readMarkdownFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`❌ 读取文件失败: ${error.message}`);
        process.exit(1);
    }
}

// 解析Markdown内容
function parseMarkdown(content) {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = { type: 'paragraph', content: [] };

    for (let line of lines) {
        line = line.trim();

        if (line.startsWith('# ')) {
            // 一级标题
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'heading1',
                content: line.substring(2).trim()
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line.startsWith('## ')) {
            // 二级标题
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'heading2',
                content: line.substring(3).trim()
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line.startsWith('### ')) {
            // 三级标题
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'heading3',
                content: line.substring(4).trim()
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line.match(/^\d+\./)) {
            // 有序列表
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'numbered_list',
                content: line
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line.includes('|') && line.includes('---')) {
            // 表格分隔线，跳过
            continue;
        } else if (line.includes('|')) {
            // 表格行
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'table_row',
                content: line
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line.startsWith('>')) {
            // 引用
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            sections.push({
                type: 'quote',
                content: line.substring(1).trim()
            });
            currentSection = { type: 'paragraph', content: [] };
        } else if (line === '') {
            // 空行
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
                currentSection = { type: 'paragraph', content: [] };
            }
        } else if (line) {
            // 普通段落
            currentSection.content.push(line);
        }
    }

    if (currentSection.content.length > 0) {
        sections.push(currentSection);
    }

    return sections;
}

// 创建Word文档
function createWordDocument(sections) {
    const children = [];

    for (const section of sections) {
        if (section.type === 'heading1') {
            // 一级标题 - 小三号，居中加粗
            children.push(new Paragraph({
                text: section.content,
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 240, line: 360, lineRule: 'auto' }, // 1.5倍行距
                run: {
                    font: '仿宋_GB2312',
                    size: 30, // 小三号
                    bold: true,
                },
            }));
        } else if (section.type === 'heading2') {
            // 二级标题 - 小四加粗
            children.push(new Paragraph({
                text: section.content,
                spacing: { before: 240, after: 120, line: 360, lineRule: 'auto' }, // 1.5倍行距
                indent: { firstLine: 480 },
                run: {
                    font: '仿宋_GB2312',
                    size: 24,
                    bold: true,
                },
            }));
        } else if (section.type === 'heading3') {
            // 三级标题 - 小四不加粗
            children.push(new Paragraph({
                text: section.content,
                spacing: { before: 180, after: 120, line: 360, lineRule: 'auto' }, // 1.5倍行距
                indent: { firstLine: 480 },
                run: {
                    font: '仿宋_GB2312',
                    size: 24,
                },
            }));
        } else if (section.type === 'numbered_list') {
            // 有序列表
            children.push(new Paragraph({
                text: section.content,
                spacing: { after: 60, line: 360, lineRule: 'auto' },
                indent: { firstLine: 480 },
                run: {
                    font: '仿宋_GB2312',
                    size: 24,
                },
            }));
        } else if (section.type === 'table_row') {
            // 表格行 - 简化处理
            children.push(new Paragraph({
                text: section.content,
                spacing: { after: 60, line: 360, lineRule: 'auto' },
                indent: { firstLine: 480 },
                run: {
                    font: '仿宋_GB2312',
                    size: 24,
                },
            }));
        } else if (section.type === 'quote') {
            // 引用 - 灰色背景
            children.push(new Paragraph({
                text: section.content,
                spacing: { after: 120 },
                indent: { firstLine: 480, left: 240 },
                run: {
                    font: '仿宋_GB2312',
                    size: 24,
                    color: '888888',
                },
            }));
        } else if (section.type === 'paragraph' && section.content.length > 0) {
            // 普通段落 - 首行缩进2字符
            for (const line of section.content) {
                children.push(new Paragraph({
                    text: line,
                    spacing: { after: 120, line: 360, lineRule: 'auto' },
                    indent: { firstLine: 480 },
                    run: {
                        font: '仿宋_GB2312',
                        size: 24,
                    },
                }));
            }
        }
    }

    // 添加签字部分
    children.push(new Paragraph({
        text: '',
        spacing: { after: 480, line: 360, lineRule: 'auto' },
    }));

    // 甲方签字
    children.push(new Paragraph({
        text: '甲方（盖章）：________________',
        spacing: { after: 0 },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    children.push(new Paragraph({
        text: '法定代表人（签字）：__________',
        spacing: { after: 480, line: 360, lineRule: 'auto' },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    children.push(new Paragraph({
        text: '日期：_______________________',
        spacing: { after: 960 },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    // 乙方签字
    children.push(new Paragraph({
        text: '乙方（盖章）：________________',
        spacing: { after: 0 },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    children.push(new Paragraph({
        text: '法定代表人（签字）：__________',
        spacing: { after: 480, line: 360, lineRule: 'auto' },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    children.push(new Paragraph({
        text: '日期：_______________________',
        spacing: { after: 480, line: 360, lineRule: 'auto' },
        indent: { firstLine: 480 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    children.push(new Paragraph({
        text: '【以下无正文】',
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        run: {
            font: '仿宋_GB2312',
            size: 24,
        },
    }));

    return new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 720, // 2.54cm
                        right: 906, // 3.18cm
                        bottom: 720, // 2.54cm
                        left: 906, // 3.18cm
                    },
                },
            },
            children: children,
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                PageNumber.CURRENT,
                                new TextRun(' / '),
                                PageNumber.TOTAL_PAGES,
                            ],
                            run: {
                                font: '仿宋_GB2312',
                                size: 20,
                            },
                        }),
                    ],
                }),
            },
        }],
    });
}

// 主函数
async function main() {
    console.log('='.repeat(50));
    console.log('📝 Markdown转Word文档 Skill v2.0 (基于JS脚本)');
    console.log('='.repeat(50));
    console.log();

    const params = parseArgs();

    // 验证必需参数
    if (!params.input) {
        console.error('❌ 错误: 缺少必需参数 - input（输入文件路径）');
        console.log('\n使用方法:');
        console.log('  node index-from-js.js document.md');
        console.log('  node index-from-js.js document.md output.docx');
        console.log('  node index-from-js.js document.md output.docx template.docx');
        process.exit(1);
    }

    const inputPath = params.input;
    const outputPath = params.output;

    // 验证输入文件
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ 错误: 输入文件不存在: ${inputPath}`);
        process.exit(1);
    }

    console.log(`📄 输入文件: ${inputPath}`);
    console.log(`📄 输出文件: ${outputPath}`);
    console.log();

    try {
        // 读取和解析Markdown
        console.log('🔄 正在读取Markdown文件...');
        const mdContent = readMarkdownFile(inputPath);

        console.log('🔄 正在解析Markdown内容...');
        const sections = parseMarkdown(mdContent);

        console.log(`📊 解析完成，共 ${sections.length} 个段落`);
        console.log('🔄 正在创建Word文档...');

        // 创建文档
        const doc = createWordDocument(sections);

        // 导出文档
        const { Packer } = require('docx');
        console.log('🔄 正在导出文档...');

        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, buffer);

        console.log('✅ 转换完成！');
        console.log(`📁 输出文件: ${outputPath}`);

        // 显示文件信息
        const stats = fs.statSync(outputPath);
        console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        console.log(`📅 创建时间: ${new Date(stats.birthtime).toLocaleString()}`);
        console.log();
        console.log('✨ 专业法律文书格式已应用！');
        console.log('🎯 完全无需手动调整，直接可用！');

    } catch (error) {
        console.error(`\n❌ 转换失败: ${error.message}`);
        if (error.stack) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

// 执行主函数
main().catch(error => {
    console.error('❌ 未处理的错误:', error);
    process.exit(1);
});
