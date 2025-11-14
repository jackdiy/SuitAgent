#!/usr/bin/env node
/**
 * md2word-skill 主入口脚本
 * 处理Markdown转Word的Skill调用
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 解析命令行参数或传入参数
function parseArgs() {
    const args = process.argv.slice(2);
    const params = {};

    // 直接解析位置参数（简化处理）
    if (args.length >= 1) {
        params.input = args[0];
    }
    if (args.length >= 2) {
        params.output = args[1];
    }
    if (args.length >= 3) {
        params.template = args[2];
    }

    return params;
}

/**
 * 执行Python转换脚本
 */
function runPythonScript(scriptName, inputPath, outputPath, templatePath) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, 'scripts', scriptName);

        if (!fs.existsSync(scriptPath)) {
            reject(new Error(`脚本文件不存在: ${scriptPath}`));
            return;
        }

        console.log(`🔄 正在执行: ${scriptName}`);

        const pythonProcess = spawn('python3', [scriptPath, inputPath, outputPath, templatePath].filter(Boolean), {
            stdio: 'inherit',
            cwd: __dirname
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`脚本执行失败，退出码: ${code}`));
            }
        });

        pythonProcess.on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * 主函数
 */
async function main() {
    console.log('='.repeat(50));
    console.log('📝 Markdown转Word文档 Skill v1.0');
    console.log('='.repeat(50));

    const params = parseArgs();

    // 验证必需参数
    if (!params.input) {
        console.error('❌ 错误: 缺少必需参数 - input（输入文件路径）');
        console.log('\n使用方法:');
        console.log('  skill: "md2word-skill" with {"input": "document.md"}');
        console.log('  skill: "md2word-skill" with {"input": "document.md", "output": "output.docx"}');
        process.exit(1);
    }

    const inputPath = params.input;
    const outputPath = params.output || inputPath.replace(/\.md$/i, '.docx');
    const templatePath = params.template;

    // 验证输入文件
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ 错误: 输入文件不存在: ${inputPath}`);
        process.exit(1);
    }

    console.log(`📄 输入文件: ${inputPath}`);
    console.log(`📄 输出文件: ${outputPath}`);

    if (templatePath) {
        if (!fs.existsSync(templatePath)) {
            console.warn(`⚠️  警告: 模板文件不存在: ${templatePath}，将使用默认格式`);
        } else {
            console.log(`📄 模板文件: ${templatePath}`);
        }
    }

    try {
        // 尝试使用完美版本
        console.log('\n🎯 使用完美版本进行转换...');
        await runPythonScript('md2word-perfect.py', inputPath, outputPath, templatePath);

        console.log('\n✅ 转换完成！');
        console.log(`📁 输出文件: ${outputPath}`);

        // 验证输出文件
        if (fs.existsSync(outputPath)) {
            const stats = fs.statSync(outputPath);
            console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        }

    } catch (error) {
        console.error(`\n❌ 转换失败: ${error.message}`);

        // 尝试降级到简化版本
        console.log('\n🔄 尝试使用简化版本...');
        try {
            await runPythonScript('md2word-simple.py', inputPath, outputPath, templatePath);
            console.log('\n✅ 转换完成（使用简化版本）！');
            console.log(`📁 输出文件: ${outputPath}`);
        } catch (simpleError) {
            console.error(`\n❌ 简化版本也失败: ${simpleError.message}`);
            process.exit(1);
        }
    }
}

// 执行主函数
main().catch(error => {
    console.error('❌ 未处理的错误:', error);
    process.exit(1);
});
