const addRowButton = document.getElementById('addRow')!
const rowContainer = document.getElementById('rowContainer')!
const matchButton = document.getElementById('matching')!
const resetMatchingButton = document.getElementById('reset')!
const answerContainer = document.getElementById('answerContainer')!

let numberOfRows = 4

addRowButton.addEventListener('click', () => addNewRow())
matchButton.addEventListener('click', () => getInputData())
resetMatchingButton.addEventListener('click', () => reset())

function reset():void {
	const startingRows = 4
	hiddenReset()
	let j = rowContainer.children.length - 1
	while(rowContainer.children.length > 5) {
		const id = document.getElementById(`${j}`)!
		id.parentNode!.removeChild(id)
		j--
	}

	for(let i = 0; i < startingRows + 1; i++) {
		let a = <HTMLInputElement>document.getElementById(`A${i}`)
		let b = <HTMLInputElement>document.getElementById(`B${i}`)
		if(a.value) a.value = ''
		if(b.value) b.value = ''
	}
}

function hiddenReset(): void {
	if(rowContainer.classList.contains('hidden')) {
		rowContainer.classList.remove('hidden')
	}
	if(!answerContainer.classList.contains('hidden')) {
		answerContainer.classList.add('hidden')
	}
}

function hide() {
	if(!rowContainer.classList.contains('hidden')) {
		rowContainer.classList.add('hidden')
	}
	if(answerContainer.classList.contains('hidden')) {
		answerContainer.classList.remove('hidden')
	}
}

function addNewRow(): void {
	numberOfRows = rowContainer.children.length || 0
	const newRow = `<div class="textMatching" id="${numberOfRows}"><div class="sideMatching" id="A"><input class="matching-field" id='A${numberOfRows}'></div><div class="sideMatching" id="B"><input class="matching-field" id='B${numberOfRows}'></div></div>`
	
	rowContainer.insertAdjacentHTML('beforeend', `${newRow}`)
}

function getInputData(): void {
	let columnA: string[] = []
	let columnB: string[] = []

	for(let i = 0; i < rowContainer.children.length; i++) {
		let A = (<HTMLInputElement>document.getElementById(`A${i}`))
		let B = (<HTMLInputElement>document.getElementById(`B${i}`))
		if(A.value != '' && B.value != '') {
			columnA.push(A.value)
			columnB.push(B.value)
		}
	}
	if(!columnA.length || !columnB.length) return
	hide()
	const answerMap = makeAnswerKey(columnA, columnB)

	columnA = shuffle(columnA)
	columnB = shuffle(columnB)
	let answerList = findAnswers(columnA, columnB, answerMap)

	fillList(columnA, columnB, answerList)
}

function fillList(number: string[], letter: string[], answers: string) {
	const letters = <HTMLInputElement>document.getElementById('letters')
	const numbers = <HTMLInputElement>document.getElementById('numbers')
	const keys = <HTMLInputElement>document.getElementById('keys')

	letters.value = ''
	numbers.value = ''
	keys.value = ''

	for(let i = 0; i < letter.length; i++) {
		letters.value += `${String.fromCharCode(i + 65)}. ${letter[i]}\n`
	}

	for(let i = 0; i < number.length; i++) {
		numbers.value += `${i + 1}. ${number[i]}\n`
	}

	keys.value = answers
}

function makeAnswerKey(x: string[], y: string[]) {
	let list = new Map()

	for(let i = 0; i < x.length; i++) {
		list.set(x[i], y[i])
	}
	return list
}

function findAnswers(ColA: string[], ColB: string[], answerMap: Map<string, string>) {
	let returnMap = new Map()
	for(let i = 0; i < ColA.length; i++) {
		let val = answerMap.get(ColA[i])!
		let index = ColB.indexOf(val)
		returnMap.set((i + 1), String.fromCharCode(index + 65))
	}
	return mapToString(returnMap)
}

function mapToString(x: Map<string, string>) {
	let lineReadOut = []
	const ent = x.entries()
	for(let i = 0; i < x.size; i++) {
		lineReadOut.push(ent.next().value.join(' : '))
	}
	return lineReadOut.join('\n')
}

function shuffle(arr: string[]): string[]{
    const copyArr = arr.slice()
    for(let i: number = copyArr.length - 1; i > 0; i--){
        const j: number = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }
	return copyArr
}

function debug(){
	let letter = ['Banana', 'Blueberry', 'Strawberry', 'Lettuce', 'Grape', 'Orange']
	let number = ['Yellow', 'Blue', 'Red', 'Green', 'Purple', 'Orange']
	let len = (letter.length > rowContainer.children.length) ? rowContainer.children.length : letter.length
	for(let i = 0; i < len; i++) {
		let a = <HTMLInputElement>document.getElementById(`A${i}`)
		let b = <HTMLInputElement>document.getElementById(`B${i}`)
		a.value = letter[i]
		b.value = number[i]
	}
}


const howToMatching = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter answer pairs next to each other in the letter and number columns.<br/>
If you need more rows, click the ‘Add Row’ button to add another row.<br/>
When you are ready, click the ‘Match’ button to create an shuffled matching list with an answer sheet as well.<br/>
You can keep pressing 'Match' until the list are shuffled to your liking.<br/>
The 'Reset' button will take you back to the starting inputs. Everything is deleted and reset to before any inputs.<br/>
Please make sure that you are ready to match so you won't have to start over.</blockquote>`

const howMatching = document.getElementById('howTo')!
howMatching.innerHTML = howToMatching