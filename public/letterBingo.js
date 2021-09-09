"use strict";
const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
let currentAlphabetList;
const startButton = document.getElementById('startLB');
const nextButton = document.getElementById('nextLB');
const currentLetter = document.getElementById('current-letterLB');
const letterBank = document.getElementById('called-lettersLB');
const remainingLetters = document.getElementById('remainLB');
const upperCaseButton = document.getElementById('upperLB');
startButton.addEventListener('click', () => start());
nextButton.addEventListener('click', () => getNextLetter());
currentLetter.textContent = "⠀";
function shuffleAlphabetArray(arr) {
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}
function isUpperOrLower() {
    if (upperCaseButton.checked) {
        currentAlphabetList = shuffleAlphabetArray(ALPHABET).map((a) => a.toUpperCase());
    }
    else {
        currentAlphabetList = shuffleAlphabetArray(ALPHABET);
    }
}
function getNextLetter() {
    if (currentAlphabetList.length > 0) {
        currentLetter.textContent = currentAlphabetList.pop();
        letterBank.textContent += currentLetter.textContent + ' ';
    }
    remainingLetters.textContent = currentAlphabetList.length.toString();
}
function start() {
    letterBank.textContent = '';
    isUpperOrLower();
    getNextLetter();
}
