"use strict";
var shuffleButton = document.getElementById('shuffle');
var userInputTextArea = document.getElementById('userInput');
var outputTextArea = document.getElementById('output');
var resetButtonSentence = document.getElementById('reset');
var copyButton = document.getElementById('copyToClipboard');
shuffleButton.addEventListener('click', function () { return resetAndPrepUserInput(); });
resetButtonSentence.addEventListener('click', function () { return resetTextArea(); });
copyButton.addEventListener('click', function () { return copyToClipboardSentence(); });
function resetAndPrepUserInput() {
    outputTextArea.value = '';
    if (userInputTextArea.value == '')
        return;
    var userArr = userInputTextArea.value.split('\n');
    userArr = userArr.filter(function (a) { if (a != ' ')
        return a; });
    splitInput(userArr);
}
function splitInput(inputArr) {
    for (var i = 0; i < inputArr.length; i++) {
        if (inputArr[i] != '') {
            inputArr[i] = inputArr[i].trim();
            printShuffledString(buildOutputStr(inputArr[i]));
        }
    }
}
function buildOutputStr(inputStr) {
    var strToShuffle = inputStr.replace(/\s+/g, ' ').split(' ');
    return "[ " + shuffleStringArray(strToShuffle).join(' / ') + " ]";
}
function shuffleStringArray(arr) {
    var _a;
    var copyArr = arr.slice();
    for (var i = copyArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [copyArr[j], copyArr[i]], copyArr[i] = _a[0], copyArr[j] = _a[1];
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
var howToSentence = "<strong>How to use this tool:</strong><br/>\n<blockquote>Enter text into the 'Input Text' area.<br/>\nSelect which type of words you would like to turn into blanks.<br/>\nThen click the \u2018Shuffle\u2019 button to shuffle your sentences.<br/>\n<br/>\nAll capitalization and punctuation will still be present in the output.<br/>\n";
var howSentence = document.getElementById('howTo');
howSentence.innerHTML = howToSentence;
