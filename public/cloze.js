"use strict";
const articles = ['a', 'the', 'an'];
const questionWords = ['who', 'whose', 'what', 'when', 'which', 'why', 'where', 'how'];
const demonstratives = ['this', 'that', 'these', 'those'];
const beVerbs = ['is', 'was', 'are', 'were', 'am', 'be', 'been', 'being'];
const pronouns = ['he', 'she', 'it', 'his', 'him', 'her', 'hers', 'i', 'my', 'me', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'himself', 'herself', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'yourselves', 'they', 'them', 'their', 'theirs', 'themselves'];
let custom = [];
const nthNum = document.getElementById('nthNumber');
const clozeBttn = document.getElementById('cloze');
const resetButton = document.getElementById('reset');
const copy = document.getElementById('copyToClipboard');
const output = document.getElementById('output');
const userInput = document.getElementById('text');
clozeBttn.addEventListener('click', () => getCustomInput());
nthNum.addEventListener('change', (e) => enforceMinMax(e));
resetButton.addEventListener('click', () => resetForms());
copy.addEventListener('click', () => copyToClipboard());
function getCustomInput() {
    custom = document.getElementById('customInput').value.split(',');
    for (let i = 0; i < custom.length; i++) {
        custom[i] = custom[i].trim();
    }
    let inputStr = userInput.value;
    if (inputStr == '')
        return;
    setOutputText(paragraphs(inputStr));
}
function isDocumentChecked(id) {
    return document.getElementById(id).checked;
}
function trimAndSplit(item) {
    return item.trim().split(' ');
}
function paragraphs(input) {
    let paraArr = input.split('\n');
    for (let i = 0; i < paraArr.length; i++) {
        if (paraArr[i] != '') {
            if (isDocumentChecked('whWords'))
                paraArr[i] = blankOut(questionWords, trimAndSplit(paraArr[i]));
            if (isDocumentChecked('artWords'))
                paraArr[i] = blankOut(articles, trimAndSplit(paraArr[i]));
            if (isDocumentChecked('demons'))
                paraArr[i] = blankOut(demonstratives, trimAndSplit(paraArr[i]));
            if (isDocumentChecked('beVerbs'))
                paraArr[i] = blankOut(beVerbs, trimAndSplit(paraArr[i]));
            if (isDocumentChecked('proN'))
                paraArr[i] = blankOut(pronouns, trimAndSplit(paraArr[i]));
            if (isDocumentChecked('nth'))
                paraArr[i] = everyNthWord(trimAndSplit(paraArr[i]));
            if (isDocumentChecked('custom'))
                paraArr[i] = blankOut(custom, trimAndSplit(paraArr[i]));
        }
    }
    return paraArr;
}
function blankOut(arrToBlank, input) {
    let result = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i].trim() === '')
            continue;
        for (let j = 0; j < arrToBlank.length; j++) {
            result[i] = !document.getElementById('firstLetter').checked ?
                input[i].replace(toReg(arrToBlank[j]), toBlank(arrToBlank[j])) :
                toReg(arrToBlank[j]).test(input[i]) ?
                    firstLetter(input[i]) :
                    input[i];
            if (toReg(arrToBlank[j]).test(input[i]))
                break;
        }
    }
    return result.join(' ');
}
function everyNthWord(inputStr) {
    let n = +document.getElementById('nthNumber').value;
    for (let i = -1 + n; i < inputStr.length; i += n) {
        document.getElementById('firstLetter').checked ?
            inputStr[i] = firstLetter(inputStr[i]) :
            inputStr[i] = inputStr[i].replace(/\w/gi, '_');
    }
    return inputStr.join(' ');
}
function firstLetter(str, reg = /\w/gi) {
    const strArr = str.split('');
    const letterRegex = /\w/;
    let i = strArr.length === 1 ? 0 : 1;
    i = reg.test(strArr[0]) ? i : i++;
    for (i; i < strArr.length; i++) {
        if (letterRegex.test(strArr[i])) {
            strArr[i] = '_';
        }
    }
    return strArr.join('');
}
function enforceMinMax(e) {
    let nthNum = e.target;
    let currentVal = +nthNum.value;
    if (isNaN(currentVal))
        nthNum.valueAsNumber = 1;
    if (currentVal < 1)
        nthNum.valueAsNumber = 1;
    if (currentVal > 99)
        nthNum.valueAsNumber = 99;
}
function setOutputText(result) {
    const output = document.getElementById('output');
    output.value = '';
    const lineBreak = "\n";
    for (let i = 0; i < result.length; i++) {
        if (result[i] != '')
            output.value += result[i] + lineBreak;
        if (result[i] == '')
            output.value += lineBreak;
    }
}
function toReg(str) {
    return new RegExp(`\\b${str}\\b`, 'gi');
}
function toBlank(str) {
    return str.replace(/\w/gi, '_');
}
function resetForms() {
    output.value = '';
    userInput.value = '';
}
function copyToClipboard() {
    output.select();
    document.execCommand('copy');
}
const howToCloze = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter text into the input text area.<br/>
Select which type of words you would like to turn into blanks.<br/>
Then click the ‘Add Blanks’ button to turn your selected words to blanks.<br/>
<br/>
You can leave the first letter of words to be blanked out by selecting the ‘First Letter Hint’ option.<br/>
All blanks are based on the length of the word.<br/>
All Keys are case-insensitive.</blockquote><br/>
<br/>
<strong>Keys:</strong><br/>
<blockquote>Question words: who, whose, what, when, which, why, where, how<br/>
Articles: a, an, the<br/>
Demonstratives: this, that, these, those<br/>
Be-Verbs: be, am, is, are, was, were, been, being<br/>
Pronouns: he, she, it, his, him, her, hers, I, my, me, mine, myself, you, your, yours, yourself, himself, herself, its, itself, we, us, our, ours, ourselves, yourselves, they, them, their, theirs, themselves<br/>
Custom: Whatever you would like.</blockquote><br/>
<br/>
<strong>Custom Keys:</strong><br/>
<blockquote>To create custom keys simply check the ‘Make Your Own’ box and list words in the box separated by a comma.<br/>
	Example:  apple, banana, peach, lemon, etc.</blockquote><br/>
`;
const howCloze = document.getElementById('howTo');
howCloze.innerHTML = howToCloze;
