import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios'; 
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置
const localesDir = path.resolve(__dirname, '../src/i18n/locales');
const baseLocaleFile = 'zh-cn.json';

// 翻译API配置 - 使用DeepSeek API
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '您的DeepSeek API密钥';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // 请替换为正确的DeepSeek API端点

// 读取基准语言文件
const baseLocalePath = path.join(localesDir, baseLocaleFile);
const baseLocale = JSON.parse(fs.readFileSync(baseLocalePath, 'utf8'));

console.log(`使用 ${baseLocaleFile} 作为基准文件`);

// 自动翻译函数
async function translateText(text, targetLang, sourceLang = 'en') {
    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: `You are a translator. Translate the text from ${sourceLang} to ${targetLang}. Only respond with the translation, nothing else.`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                temperature: 0.3
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('翻译错误:', error.message);
        return text; // 失败时返回原文
    }
}

// 从文件名中提取语言代码
function getLangCodeFromFilename(filename) {
    // 文件名格式假设为: zh-cn.json, fr.json 等
    const lang = filename.replace('.json', '');
    // Google Translate API使用的语言代码通常为2字符
    // 您可能需要将某些语言代码映射为API支持的代码
    const langCodeMap = {
        'zh-cn': 'zh',
        'zh-tw': 'zh-TW',
        'en-us': 'en'
        // 添加更多映射
    };

    return langCodeMap[lang] || lang.split('-')[0];
}

// 同步并翻译函数
async function syncStructureAndTranslate(baseObj, targetObj, langCode) {
    const result = {};

    // 遍历基准对象的所有键
    for (const key of Object.keys(baseObj)) {
        if (typeof baseObj[key] === 'object' && baseObj[key] !== null) {
            // 处理嵌套对象
            if (targetObj[key]) {
                result[key] = await syncStructureAndTranslate(baseObj[key], targetObj[key], langCode);
            } else {
                // 为新对象创建结构
                const newObj = {};
                result[key] = await syncStructureAndTranslate(baseObj[key], newObj, langCode);
            }
        } else {
            // 处理叶子节点
            if (targetObj[key] !== undefined && targetObj[key] !== baseObj[key]) {
                // 如果目标已有非默认翻译，保留它
                result[key] = targetObj[key];
            } else {
                // 否则翻译基准文本
                console.log(`翻译 "${baseObj[key]}" 为 ${langCode}`);
                result[key] = await translateText(baseObj[key], langCode);
            }
        }
    }

    return result;
}

// 主函数
async function syncLocales() {
    try {
        // 获取目录中的所有语言文件
        const files = fs.readdirSync(localesDir);

        // 过滤出JSON文件并排除基准文件
        const localeFiles = files.filter(file =>
            file.endsWith('.json') && file !== baseLocaleFile
        );

        console.log(`找到 ${localeFiles.length} 个需要同步的语言文件`);

        // 处理每个语言文件
        for (const file of localeFiles) {
            const filePath = path.join(localesDir, file);
            const langCode = getLangCodeFromFilename(file);

            try {
                // 读取当前语言文件
                const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                // 同步结构并翻译缺失内容
                console.log(`正在处理: ${file} (${langCode})`);
                const syncedData = await syncStructureAndTranslate(baseLocale, localeData, langCode);

                // 写回文件
                fs.writeFileSync(filePath, JSON.stringify(syncedData, null, 2));
                console.log(`✓ 已同步并翻译: ${file}`);
            } catch (error) {
                console.error(`× 处理 ${file} 时出错:`, error);
            }
        }

        console.log('同步和翻译完成!');
    } catch (err) {
        console.error('处理失败:', err);
    }
}

// 执行主函数
syncLocales();