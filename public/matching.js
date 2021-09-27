"use strict";
const addRowButton = document.getElementById('addRow');
const row = document.getElementById('rowContainer');
const matchButton = document.getElementById('matching');
const resetMatchingButton = document.getElementById('reset');
let numberOfRows = 4;
addRowButton.addEventListener('click', () => addNewRow());
matchButton.addEventListener('click', () => getInputData());
resetMatchingButton.addEventListener('click', () => reset());
function reset() {
    for (let i = row.children.length - 1; i > 4; i--) {
        const id = document.getElementById(`${i}`);
        id.parentNode.removeChild(id);
    }
    for (let i = 0; i <= numberOfRows; i++) {
        let a = document.getElementById(`A${i}`);
        let b = document.getElementById(`B${i}`);
        if (a.value)
            a.value = '';
        if (b.value)
            b.value = '';
    }
}
function addNewRow() {
    numberOfRows = row.children.length || 0;
    const newRow = `<div class="textMatching" id="${numberOfRows}"><div class="sideMatching" id="A"><input class="matching-field" id='A${numberOfRows}'></div><div class="sideMatching" id="B"><input class="matching-field" id='B${numberOfRows}'></div></div>`;
    row.insertAdjacentHTML('beforeend', `${newRow}`);
}
function getInputData() {
    let columnA = [];
    let columnB = [];
    for (let i = 0; i < row.children.length; i++) {
        if (document.getElementById(`A${i}`).value != '' && document.getElementById(`B${i}`).value != '') {
            columnA.push(document.getElementById(`A${i}`).value);
            columnB.push(document.getElementById(`B${i}`).value);
        }
    }
    const answerMap = makeAnswerKey(columnA, columnB);
    columnA = shuffle(columnA);
    columnB = shuffle(columnB);
    let x = findAnswers(columnA, columnB, answerMap);
    console.log(x);
}
function makeAnswerKey(x, y) {
    let list = new Map();
    for (let i = 0; i < x.length; i++) {
        list.set(x[i], y[i]);
    }
    return list;
}
function findAnswers(ColA, ColB, answerMap) {
    let returnMap = new Map();
    for (let i = 0; i < ColA.length; i++) {
        let val = answerMap.get(ColA[i]);
        let index = ColB.indexOf(val);
        returnMap.set((i + 1), String.fromCharCode(index + 65));
    }
    return mapToString(returnMap);
}
function mapToString(x) {
    let lineReadOut = [];
    const ent = x.entries();
    for (let i = 0; i < x.size; i++) {
        lineReadOut.push(ent.next().value.join(' : '));
    }
    return lineReadOut.join('\n');
}
function shuffle(arr) {
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}
function debug() {
    let letter = ['Banana', 'Blueberry', 'Strawberry', 'Lettuce', 'Grape', 'Orange'];
    let number = ['Yellow', 'Blue', 'Red', 'Green', 'Purple', 'Orange'];
    let len = (letter.length > row.children.length) ? row.children.length : letter.length;
    for (let i = 0; i < len; i++) {
        let a = document.getElementById(`A${i}`);
        let b = document.getElementById(`B${i}`);
        a.value = letter[i];
        b.value = number[i];
    }
}
const howToMatching = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter answer pairs next to each other in the letter and number columns.<br/>
Then click the ‘Add Row’ button to add another row to the columns.<br/>
Then click the ‘Match’ button to mix your pairs to be matched.<br/>
<br/></blockquote>`;
const howMatching = document.getElementById('howTo');
howMatching.innerHTML = howToMatching;
