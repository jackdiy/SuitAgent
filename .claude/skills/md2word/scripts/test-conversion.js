#!/usr/bin/env node
/**
 * 测试md2word转换功能
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 测试函数
async function testConversion() {
    console.log('='.repeat(60));
    console.log('🧪 测试 md2word-skill 转换功能');
    console.log('='.repeat(60));
    console.log();

    // 检查示例文件是否存在
    const examplePath = path.join(__dirname, 'example.md');
    if (!fs.existsSync(examplePath)) {
        console.error('❌ 示例文件不存在:', examplePath);
        process.exit(1);
    }

    const outputPath = path.join(__dirname, 'test-output.docx');

    // 运行转换
    console.log('🔄 正在运行转换...');
    console.log('命令: node md2word.js example.md test-output.docx');
    console.log();

    return new Promise((resolve, reject) => {
        const process = spawn('node', ['md2word.js', 'example.md', 'test-output.docx'], {
            cwd: __dirname,
            stdio: 'inherit'
        });

        process.on('close', (code) => {
            if (code === 0) {
                console.log();
                console.log('✅ 转换成功！');

                // 检查输出文件
                if (fs.existsSync(outputPath)) {
                    const stats = fs.statSync(outputPath);
                    console.log(`📁 输出文件: test-output.docx`);
                    console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);

                    // 打开文件（可选）
                    if (process.platform === 'darwin') {
                        console.log('🍎 在macOS上，您可以运行以下命令打开文件：');
                        console.log(`   open "${outputPath}"`);
                    }

                    resolve();
                } else {
                    console.error('❌ 输出文件未生成');
                    reject(new Error('输出文件未生成'));
                }
            } else {
                console.error(`❌ 转换失败，退出码: ${code}`);
                reject(new Error(`转换失败，退出码: ${code}`));
            }
        });

        process.on('error', (err) => {
            console.error('❌ 执行失败:', err);
            reject(err);
        });
    });
}

// 主函数
async function main() {
    try {
        await testConversion();
        console.log();
        console.log('='.repeat(60));
        console.log('✨ 测试完成！');
        console.log('='.repeat(60));
        console.log();
        console.log('💡 您现在可以在Claude Code中这样使用：');
        console.log('   skill: "md2word" with {"input": "example.md", "output": "output.docx"}');
        console.log();
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        process.exit(1);
    }
}

// 执行测试
main();
