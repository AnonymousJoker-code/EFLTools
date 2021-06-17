var letterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
var mixList;
var startBttn = document.getElementById('startLB');
var nextBttn = document.getElementById('nextLB');
startBttn.addEventListener('click', function () { return main(); });
nextBttn.addEventListener('click', function () { return nextLetter(); });
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
        mixList = shuffle(letterList).map(function (a) { return a.toUpperCase(); });
    }
    else {
        mixList = shuffle(letterList);
    }
}
function nextLetter() {
    var docLeft = document.getElementById('current-letterLB');
    var docRight = document.getElementById('called-lettersLB');
    var remain = document.getElementById('remainLB');
    if (mixList.length > 0) {
        docLeft.textContent = mixList.shift();
        docRight.textContent += docLeft.textContent + ' ';
    }
    var temp = '' + mixList.length;
    remain.textContent = temp;
}
function main() {
    document.getElementById('called-lettersLB').textContent = '';
    isUpperOrLower();
    nextLetter();
}
