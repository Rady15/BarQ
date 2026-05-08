const fs = require('fs');
const content = fs.readFileSync('g:/New folder (2)/SeoMaster/bark-tech/src/components/AutomationServiceDetail.jsx', 'utf8');

let braces = 0;
let parens = 0;
let curlies = 0;

for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') curlies++;
    if (content[i] === '}') curlies--;
    if (content[i] === '(') parens++;
    if (content[i] === ')') parens--;
}

console.log('Curlies:', curlies);
console.log('Parens:', parens);
