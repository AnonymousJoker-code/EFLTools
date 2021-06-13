var articles = ['a', 'the', 'an'];
var questionWords = ['who', 'whose', 'what', 'when', 'which', 'why', 'where', 'how'];
var demonstratives = ['this', 'that', 'these', 'those'];
var beVerbs = ['is', 'was', 'are', 'were', 'am', 'be', 'been', 'being'];
var pronous = ['he', 'she', 'it', 'his', 'him', 'her', 'hers', 'i', 'my', 'me', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'himself', 'herself', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'yourselves', 'they', 'them', 'their', 'theirs', 'themselfves'];
var custom = [];
var nthNum = document.getElementById('nthNumber');
var clozeBttn = document.getElementById('cloze');
clozeBttn.addEventListener('click', function () { return getInput(); });
nthNum.addEventListener('change', function (e) { return enforceMinMax(e); });
/*
An apple.
A cat.
The dog.
Whose bag?
Who is he?
What is this?
Which is the dog?
When is the party?
Why did you go there?
Where did she go last week?
How are you?
This is a cat.
That was a new book.
These are textbooks.
Those are not ducks.
*/
function getInput() {
    custom = document.getElementById('customInput').value.split(',');
    for (var i = 0; i < custom.length; i++) {
        custom[i] = custom[i].trim();
    }
    var inputStr = document.getElementById('text').value;
    if (inputStr == '')
        return;
    htmlOutput(paragraphs(inputStr));
}
function docChk(id) {
    return document.getElementById(id).checked;
}
function paragraphs(input) {
    var paraArr = input.split('\n');
    function shaved(i) {
        return paraArr[i].trim().split(' ');
    }
    for (var i = 0; i < paraArr.length; i++) {
        if (paraArr[i] != '') {
            if (docChk('whWords'))
                paraArr[i] = blankOut(questionWords, shaved(i));
            if (docChk('artWords'))
                paraArr[i] = blankOut(articles, shaved(i));
            if (docChk('demons'))
                paraArr[i] = blankOut(demonstratives, shaved(i));
            if (docChk('beVerbs'))
                paraArr[i] = blankOut(beVerbs, shaved(i));
            if (docChk('proN'))
                paraArr[i] = blankOut(pronous, shaved(i));
            if (docChk('nth'))
                paraArr[i] = everyNthWord(shaved(i));
            if (docChk('custom'))
                paraArr[i] = blankOut(custom, shaved(i));
        }
    }
    return paraArr;
}
function blankOut(arrToBlank, input) {
    var result = [];
    for (var i = 0; i < input.length; i++) {
        for (var j = 0; j < arrToBlank.length; j++) {
            // If firstLetter is not checked run the normal replacement
            result[i] = !document.getElementById('firstLetter').checked ?
                input[i].replace(toReg(arrToBlank[j]), toBlank(arrToBlank[j])) :
                // If it is checked and the current index matches what we need to blank call firstLetter.
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
    var n = +document.getElementById('nthNumber').value;
    for (var i = -1 + n; i < inputStr.length; i += n) {
        document.getElementById('firstLetter').checked ?
            inputStr[i] = firstLetter(inputStr[i]) :
            inputStr[i] = inputStr[i].replace(/\w/gi, '_');
    }
    return inputStr.join(' ');
}
function firstLetter(str, reg) {
    if (reg === void 0) { reg = /\w/gi; }
    var strArr = str.split('');
    // Handles the the case when the word being blanked is only a single letter.
    var i = strArr.length === 1 ? 0 : 1;
    // Testing for punctuation e.g. "I'm"
    i = reg.test(strArr[0]) ? i : i++;
    for (i; i < strArr.length; i++) {
        strArr[i] = '_';
    }
    return strArr.join('');
}
function enforceMinMax(e) {
    var nthNum = e.target;
    var currentVal = +nthNum.value;
    if (isNaN(currentVal))
        nthNum.value = '1';
    if (currentVal < 1)
        nthNum.value = '1';
    if (currentVal > 99)
        nthNum.value = '99';
}
function htmlOutput(result) {
    var output = document.getElementById('output');
    output.innerHTML = '';
    for (var i = 0; i < result.length; i++) {
        if (result[i] != '')
            output.insertAdjacentHTML('beforeend', "<div>" + result[i] + "</div>");
        if (result[i] == '')
            output.insertAdjacentHTML('beforeend', '<br>');
    }
}
function toReg(str) {
    return new RegExp("\\b" + str + "\\b", 'gi');
}
function toBlank(str) {
    return str.replace(/\w/gi, '_');
}
