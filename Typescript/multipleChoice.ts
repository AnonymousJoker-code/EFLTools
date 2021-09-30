const MCbutton = <HTMLInputElement>document.getElementById('MCbutton')!
const userInputMC = <HTMLInputElement>document.getElementById('input')
const userOutputMC = <HTMLInputElement>document.getElementById('output')
let answerListMC: number[] = []
MCbutton.addEventListener('click', (e) => {
    (e).preventDefault()

	main()
})

function main() {
	answerListMC = []
	userOutputMC.value = ''
	getInput()
}

function getInput() {
	const answers = userInputMC.value.split('\n')
    const labelType = getLabel()
	
	for(let i = 0; i < answers.length; i++) {
		let ans!: string[]
		if(answers[i].includes(','))
			ans = answers[i].split(',').map(x => x.trim())
		if(answers[i].includes('、'))
			ans = answers[i].split('、').map(x => x.trim())
		if(!answers[i].includes('、') && !answers[i].includes(',')) return
		
		const correctAnswer = ans[0]
		
		ans = shuffleMC(ans)
		userOutputMC.value += buildOutput(ans, labelType) + '\n'
		answerListMC.push(ans.indexOf(correctAnswer))
	}
	makeAnswerSheet(labelType)
}

function getLabel(): number {
    const upper = <HTMLInputElement>document.getElementById('uppercase')
    if(upper.checked) return +upper.value
    const lower = <HTMLInputElement>document.getElementById('lowercase')
    if(lower.checked) return +lower.value
    const hiragana = <HTMLInputElement>document.getElementById('hiragana')
    if(hiragana.checked) return +hiragana.value
    const katakana = <HTMLInputElement>document.getElementById('katakana')
    if(katakana.checked) return +katakana.value
    return 0
}

function makeAnswerSheet(label: number) {
	let result = 'Answer Key:\n'
	for(let i = 0; i < answerListMC.length; i++) {
		result += `${i + 1}. ${choiceEncoding(answerListMC[i], label)}\n`
	}
	userOutputMC.value += `\n\n${result}`
}

function buildOutput(value: string[], label: number) {
	let result = ''
	for(let i = 0; i < value.length; i++) {
		const labelValue = choiceEncoding(i, label)
		result += `${labelValue}. ${value[i]}   `
	}
	return result.trim()
}

function shuffleMC(arr: string[]): string[]{
    const copyArr = arr.slice()
    for(let i: number = copyArr.length - 1; i > 0; i--){
        const j: number = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }
    return copyArr
}

function choiceEncoding(currentVal: number, offset: number | string) {
    const EnStart = 64
    const EnEnd = 123
    const JpStart = 12353
    const JpEnd = 12496
    console.log(offset, currentVal)

    if(typeof offset == 'string') offset = +offset
    if(offset > EnStart && offset < EnEnd) {
        return englishLabeling(offset, currentVal)
    }
    if(offset > JpStart && offset < JpEnd) {
        return japaneseLabeling(offset, currentVal)
    }
}

function englishLabeling(offset: number, currentVal: number) {
    return String.fromCharCode(offset + currentVal)
}

function japaneseLabeling(offset: number, currentVal: number) {
    let letter: string
    if(currentVal < 5 || currentVal >= 17 && currentVal < 20) {
		letter = String.fromCharCode((currentVal * 2) + offset)
	} else if(currentVal < 17) {
		letter = String.fromCharCode((currentVal * 2) + offset - 1)
	} else {
		letter = String.fromCharCode(offset + 20 + currentVal)
	}

    return letter
}

const howToMC = `<br/><br/><strong>How to use this tool:</strong><br/>
<blockquote>Enter the option for the test in the input text box.<br/>
Option should be separated with either a ',' or '、'.<br/>
The first option should be the answer to the quetion as it will be used to make the answer key.<br/>
The number in the output is based on the line that the answers where input on.<br/>
This tool has a maximum for upto 26 choices per input. Behavior is of this tool is undefined after that point.<br/>
</blockquote><br/>
<br/>
<strong>Keys:</strong><br/>
<blockquote>
Uppercase: A B C D<br/>
Lowercase: a b c d<br/>
Hiragana: あ　い　う　え<br/>
Katakana: ア　イ　ウ　エ</blockquote><br/><br/>
<strong>Example(with Uppercase selected):</strong><br/>
<blockquote><strong>Input:</strong><br/><blockquote>Dogs, Cats, Dragons, Owls<br/>
Apples, Oranges, Bananas, Strawberries<br/>
Blue, Purple, Green, Brown<br/>
Japan, The US, Germany, Korea<br/>
English, Japanese, Math, P.E.<br/></blockquote>
<br/>
<strong>Output:</strong><br/><blockquote>A. Owls   B. Cats   C. Dogs   D. Dragons<br/>
A. Bananas   B. Oranges   C. Strawberries   D. Apples<br/>
A. Blue   B. Green   C. Purple   D. Brown<br/>
A. Korea   B. The US   C. Germany   D. Japan<br/>
A. P.E.   B. Japanese   C. English   D. Math<br/></blockquote>
<br/>
<strong>Answer Key:</strong><br/><blockquote>1. C<br/>
2. D<br/>
3. A<br/>
4. D<br/>
5. C<br/></blockquote></blockquote>`
const howMC = document.getElementById('howTo')!
howMC.innerHTML = howToMC