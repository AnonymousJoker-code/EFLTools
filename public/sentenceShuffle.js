"use strict";
const shuffleButton = document.getElementById('shuffle');
const userInputTextArea = document.getElementById('userInput');
const outputTextArea = document.getElementById('output');
const resetButtonSentence = document.getElementById('reset');
const copyButton = document.getElementById('copyToClipboard');
shuffleButton.addEventListener('click', () => resetAndPrepUserInput());
resetButtonSentence.addEventListener('click', () => resetTextArea());
copyButton.addEventListener('click', () => copyToClipboardSentence());
function resetAndPrepUserInput() {
    outputTextArea.value = '';
    if (userInputTextArea.value == '')
        return;
    let userArr = userInputTextArea.value.split('\n');
    userArr = userArr.filter((a) => { if (a != ' ')
        return a; });
    splitInput(userArr);
}
function splitInput(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i] != '') {
            inputArr[i] = inputArr[i].trim();
            printShuffledString(buildOutputStr(inputArr[i]));
        }
    }
}
function buildOutputStr(inputStr) {
    let strToShuffle = inputStr.replace(/\s+/g, ' ').split(' ');
    return `[ ${shuffleStringArray(strToShuffle).join(' / ')} ]`;
}
function shuffleStringArray(arr) {
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}
function printShuffledString(output) {
    outputTextArea.value += output + '\n';
}
function resetTextArea() {
    outputTextArea.value = '';
    userInputTextArea.value = '';
}
function copyToClipboardSentence() {
    output.select();
    document.execCommand('copy');
}
const howToSentence = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter text into the 'Input Text' area.<br/>
Then click the ‘Shuffle’ button to shuffle your sentences.<br/>
<br/></blockquote>
<strong>Example:</strong><br/>
<blockquote>This is a sentence. <strong>==></strong> [ sentence. / This / a / is ]</blockquote>
<br/>
<strong>Note:</strong><br/>
<blockquote>All capitalization and punctuation will still be present in the output.</blockquote>
`;
const howSentence = document.getElementById('howTo');
howSentence.innerHTML = howToSentence;
