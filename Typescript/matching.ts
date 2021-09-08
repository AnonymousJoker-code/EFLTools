const addRowButton = document.getElementById('addRow')
const row = document.getElementById('rowContainer')
const matchButton = document.getElementById('matching')

let numberOfRows = 0

addRowButton.addEventListener('click', () => addNewRow())
matchButton.addEventListener('click', () => getInputData())

function addNewRow() {
	numberOfRows++
	const newRow = `<div class="text" id="${numberOfRows}"><div class="side" id="A"><input id='A${numberOfRows}'></div><div class="side" id="B"><input id='B${numberOfRows}'></div></div>`
	
	row.insertAdjacentHTML('beforeend', `${newRow}`)
}

function getInputData() {
	let columnA = []
	let columnB = []
	for(let i = 0; i < row.children.length; i++) {
		if(document.getElementById(`A${i}`).value != '' && document.getElementById(`B${i}`) != '') {
			columnA.push(document.getElementById(`A${i}`).value)
			columnB.push(document.getElementById(`B${i}`).value)
		}
	}
	if(columnA[0] == undefined || columnB[0] == undefined) return
	
	columnA = shuffle(make2DArray(columnA))
	columnB = shuffle(make2DArray(columnB))
	
	buildList(columnA, columnB)
	
}

function shuffle(arr: string[]): string[]{
    const copyArr = arr.slice()
    for(let i: number = copyArr.length - 1; i > 0; i--){
        const j: number = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }
  return copyArr
}

function make2DArray(arr: string[]): string[][]{
	let newArray = [[]]
	
	for(let i = 0; i < arr.length; i++){
		newArray[i] = [arr[i], i]
	}
	return newArray
}


function buildList(a, b) {
	const numList = document.getElementById('numberedList')
	numList.innerHTML = ''
	for(let i = 0; i < a.length; i++) {
		let text = `<li>${a[i][0]}</li>`
		numList.insertAdjacentHTML('beforeend', text)
	}
	
	const letterList = document.getElementById('letteredList')
	letterList.innerHTML = ''
	for(let i = 0; i < a.length; i++) {
		let text = `<li>${b[i][0]}</li>`
		letterList.insertAdjacentHTML('beforeend', text)
	}
	
	makeAnswerList(a, b)
}

function makeAnswerList(a, b) {
	const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ]
	
	for(let i = 0; i < a.length; i++){
		for(let j = 0; j < b.length; j++){
			if(a[i][1] == b[j][1]) {
				
			}
		}
	}
}

function log(x){
	return console.log(x)
}