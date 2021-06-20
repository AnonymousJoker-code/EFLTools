"use strict";
var ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
var currentAlphabetList;
var startButton = document.getElementById('startLB');
var nextButton = document.getElementById('nextLB');
var currentLetter = document.getElementById('current-letterLB');
var letterBank = document.getElementById('called-lettersLB');
var remainingLetters = document.getElementById('remainLB');
startButton.addEventListener('click', function () { return start(); });
nextButton.addEventListener('click', function () { return getNextLetter(); });
currentLetter.textContent = "⠀";
function shuffle(arr) {
    var _a;
    var copyArr = arr.slice();
    for (var i = copyArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [copyArr[j], copyArr[i]], copyArr[i] = _a[0], copyArr[j] = _a[1];
    }
    return copyArr;
}
function isUpperOrLower() {
    if (document.getElementById('upperLB').checked) {
        currentAlphabetList = shuffle(ALPHABET).map(function (a) { return a.toUpperCase(); });
    }
    else {
        currentAlphabetList = shuffle(ALPHABET);
    }
}
function getNextLetter() {
    if (currentAlphabetList.length > 0) {
        currentLetter.textContent = currentAlphabetList.shift();
        letterBank.textContent += currentLetter.textContent + ' ';
    }
    remainingLetters.textContent = currentAlphabetList.length.toString();
}
function start() {
    letterBank.textContent = '';
    isUpperOrLower();
    getNextLetter();
}
