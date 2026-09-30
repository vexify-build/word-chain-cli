#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const usedWords = new Set();
let lastChar = null;

console.log('🎮 欢迎来到接龙游戏！');
console.log('规则：下一个单词必须以当前单词的最后一个字母开头');
console.log('输入 "pass" 跳过，"quit" 退出\n');

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function start() {
  while (true) {
    const input = await ask('请输入一个单词开始: ');
    const word = input.trim().toLowerCase();

    if (word === 'quit') {
      console.log('👋 再见！');
      break;
    }

    if (word.length === 0) {
      console.log('⚠️  请输入有效单词\n');
      continue;
    }

    if (usedWords.has(word)) {
      console.log('⚠️  这个单词已经用过了！\n');
      continue;
    }

    usedWords.add(word);
    lastChar = word[word.length - 1];
    console.log(`✅  单词 "${word}" 已记录，当前尾字母: "${lastChar.toUpperCase()}"\n`);

    while (true) {
      const input = await ask(`以 "${lastChar.toUpperCase()}" 开头的单词: `);
      const word = input.trim().toLowerCase();

      if (word === 'quit') {
        console.log(`\n👋 共使用了 ${usedWords.size} 个单词，再见！`);
        rl.close();
        process.exit(0);
      }

      if (word === 'pass') {
        console.log(`⏭️  跳过。当前尾字母 "${lastChar.toUpperCase()}" 保持不变\n`);
        break;
      }

      if (word.length === 0) {
        console.log('⚠️  请输入有效单词\n');
        continue;
      }

      if (word[0] !== lastChar) {
        console.log(`⚠️  单词必须以 "${lastChar.toUpperCase()}" 开头！\n`);
        continue;
      }

      if (usedWords.has(word)) {
        console.log('⚠️  这个单词已经用过了！\n');
        continue;
      }

      usedWords.add(word);
      lastChar = word[word.length - 1];
      console.log(`✅  单词 "${word}" 已记录，当前尾字母: "${lastChar.toUpperCase()}" (共 ${usedWords.size} 个)\n`);
    }
  }

  rl.close();
}

start();
