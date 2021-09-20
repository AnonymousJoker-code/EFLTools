"use strict";
const addRowButton = document.getElementById('addRow');
const row = document.getElementById('rowContainer');
const matchButton = document.getElementById('matching');
let numberOfRows = 0;
addRowButton.addEventListener('click', () => addNewRow());
matchButton.addEventListener('click', () => getInputData());
function addNewRow() {
    numberOfRows++;
    const newRow = `<div class="text" id="${numberOfRows}"><div class="side" id="A"><input id='A${numberOfRows}'></div><div class="side" id="B"><input id='B${numberOfRows}'></div></div>`;
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
    if (columnA[0] == undefined || columnB[0] == undefined)
        return;
    columnA = shuffle(columnA);
    columnB = shuffle(columnB);
    buildList(columnA, columnB);
}
function shuffle(arr) {
    const copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    return copyArr;
}
function buildList(a, b) {
    const numList = document.getElementById('numberedList');
    numList.innerHTML = '';
    for (let i = 0; i < a.length; i++) {
        let text = `<li>${a[i]}</li>`;
        numList.insertAdjacentHTML('beforeend', text);
    }
    const letterList = document.getElementById('letteredList');
    letterList.innerHTML = '';
    for (let i = 0; i < a.length; i++) {
        let text = `<li>${b[i]}</li>`;
        letterList.insertAdjacentHTML('beforeend', text);
    }
}
const howToMatching = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter answer pairs next to each other in columns A and B.<br/>
Then click the ‘Add Row’ button to add another row to the columns.<br/>
Then click the ‘Match’ button to mix your pairs to be matched.<br/>
<br/></blockquote>`;
const howMatching = document.getElementById('howTo');
howMatching.innerHTML = howToMatching;
