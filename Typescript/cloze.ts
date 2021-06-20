const articles: string[] = ['a', 'the', 'an']
const questionWords: string[] = ['who', 'whose', 'what', 'when', 'which', 'why', 'where', 'how']
const demonstratives: string[] = ['this', 'that', 'these', 'those']
const beVerbs: string[] = ['is', 'was', 'are', 'were', 'am', 'be', 'been', 'being']
const pronouns: string[] = ['he', 'she', 'it', 'his', 'him', 'her', 'hers', 'i', 'my', 'me', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'himself', 'herself', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'yourselves', 'they', 'them', 'their', 'theirs', 'themselves']
let custom: string[] = []

const nthNum = document.getElementById('nthNumber')!
const clozeBttn = document.getElementById('cloze')!
const resetButton = document.getElementById('reset')!
const copy = document.getElementById('copyToClipboard')!
const output = document.getElementById('output') as HTMLFormElement
const userInput = <HTMLFormElement>document.getElementById('text')


clozeBttn.addEventListener('click', () => getCustomInput())
nthNum.addEventListener('change', (e) => enforceMinMax(e))
resetButton.addEventListener('click', () => resetForms())
copy.addEventListener('click', () => copyToClipboard())

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

function getCustomInput(): void {
  custom = (<HTMLInputElement>document.getElementById('customInput')).value.split(',')
  for(let i = 0; i < custom.length; i++){
    custom[i] = custom[i].trim()
  }
  
  let inputStr: string = userInput.value
  if(inputStr == '') return
  setOutputText(paragraphs(inputStr))
}

function isDocumentChecked(id: string): boolean {
	return (<HTMLInputElement>document.getElementById(id)).checked
}

function trimAndSplit(item: string): string[]{
  return item.trim().split(' ')
}

function paragraphs(input: string): string[] {
  let paraArr: string[] = input.split('\n')

  for(let i = 0; i < paraArr.length; i++){
    if(paraArr[i] != ''){
      if(isDocumentChecked('whWords')) paraArr[i] = blankOut(questionWords, trimAndSplit(paraArr[i]))
      if(isDocumentChecked('artWords')) paraArr[i] = blankOut(articles, trimAndSplit(paraArr[i]))
      if(isDocumentChecked('demons')) paraArr[i] = blankOut(demonstratives, trimAndSplit(paraArr[i]))
      if(isDocumentChecked('beVerbs')) paraArr[i] = blankOut(beVerbs, trimAndSplit(paraArr[i]))
			if(isDocumentChecked('proN')) paraArr[i] = blankOut(pronouns, trimAndSplit(paraArr[i]))
      if(isDocumentChecked('nth')) paraArr[i] = everyNthWord(trimAndSplit(paraArr[i]))
      if(isDocumentChecked('custom')) paraArr[i] = blankOut(custom, trimAndSplit(paraArr[i]))
			
    }
  }
  return paraArr
}

function blankOut(arrToBlank: string[], input: string[]): string {
  let result: string[] = []
  for(let i = 0; i < input.length; i++){
    if(input[i].trim() === '') continue
    for(let j = 0; j < arrToBlank.length; j++){
      // If firstLetter is not checked run the normal replacement
      result[i] = !(<HTMLInputElement>document.getElementById('firstLetter')).checked ?
        input[i].replace(toReg(arrToBlank[j]), toBlank(arrToBlank[j])) :
        // If it is checked and the current index matches what we need to blank call firstLetter.
        toReg(arrToBlank[j]).test(input[i]) ?
           firstLetter(input[i]) :
           input[i]
      if(toReg(arrToBlank[j]).test(input[i])) break
    }
  }
  return result.join(' ')
}

function everyNthWord(inputStr: string[]): string {
  let n: number = +(<HTMLInputElement>document.getElementById('nthNumber')).value
  
    for(let i = -1 + n; i < inputStr.length; i += n){
      (<HTMLInputElement>document.getElementById('firstLetter')).checked ?
        inputStr[i] = firstLetter(inputStr[i]) : 
        inputStr[i] = inputStr[i].replace(/\w/gi, '_')
  }
  return inputStr.join(' ')
}

function firstLetter(str: string, reg = /\w/gi): string {
  const strArr = str.split('')
  const letterRegex = /\w/
  // Handles the the case when the word being blanked is only a single letter.
  let i = strArr.length === 1 ? 0 : 1
	// Testing for punctuation e.g. "I'm"
	i = reg.test(strArr[0]) ? i : i++
	for(i; i < strArr.length; i++){
    if(letterRegex.test(strArr[i])) {
      strArr[i] = '_'
    }
	
	}
  return strArr.join('')
}

function enforceMinMax(e: Event): void {
  let nthNum: EventTarget = e.target!
  let currentVal: number = +(<HTMLInputElement>nthNum).value
  if(isNaN(currentVal)) (<HTMLInputElement>nthNum).valueAsNumber = 1
  if(currentVal < 1) (<HTMLInputElement>nthNum).valueAsNumber = 1
  if(currentVal > 99) (<HTMLInputElement>nthNum).valueAsNumber = 99
}

function setOutputText(result: string[]): void {
  const output = document.getElementById('output') as HTMLTextAreaElement
  output.value = ''
  const lineBreak = "\n"

  for(let i = 0; i < result.length; i++){
      if(result[i] != '') output.value += result[i] + lineBreak
      if(result[i] == '') output.value += lineBreak
  }
}

function toReg(str: string): RegExp {
  return new RegExp(`\\b${str}\\b`, 'gi')
}

function toBlank(str: string): string {
  return str.replace(/\w/gi, '_')
}

function resetForms() {
  output.value = ''
  userInput.value = ''
  // uncheckOptions('whWords')
  // uncheckOptions('artWords')
  // uncheckOptions('demons')
  // uncheckOptions('beVerbs')
  // uncheckOptions('proN')
  // uncheckOptions('nth')
  // uncheckOptions('custom')
}
// Currently unsure if this should be implemented
// function uncheckOptions(id: string): void {
//   const element = <HTMLInputElement>document.getElementById(id)
//   if(element.checked) element.checked = false
// }

function copyToClipboard() {
	output.select()
	document.execCommand('copy')
}

const howToCloze = `<strong>How to use this tool:</strong><br/>
<blockquote>Enter text into the input text area.<br/>
Select which type of words you would like to turn into blanks.<br/>
Then click the ‘Add Blanks’ button to turn your selected words to blanks.<br/>
<br/>
You can leave the first letter of words to be blanked out by selecting the ‘First Letter Hint’ option.<br/>
All blanks are based on the length of the word.<br/>
All Keys are case-insensitive.</blockquote><br/>
<br/>
<strong>Keys:</strong><br/>
<blockquote>Question words: who, whose, what, when, which, why, where, how<br/>
Articles: a, an, the<br/>
Demonstratives: this, that, these, those<br/>
Be-Verbs: be, am, is, are, was, were, been, being<br/>
Pronouns: he, she, it, his, him, her, hers, I, my, me, mine, myself, you, your, yours, yourself, himself, herself, its, itself, we, us, our, ours, ourselves, yourselves, they, them, their, theirs, themselves<br/>
Custom: Whatever you would like.</blockquote><br/>
<br/>
<strong>Custom Keys:</strong><br/>
<blockquote>To create custom keys simply check the ‘Make Your Own’ box and list words in the box separated by a comma.<br/>
	Example:  apple, banana, peach, lemon, etc.</blockquote><br/>
`
const howCloze = document.getElementById('howTo')!
howCloze.innerHTML = howToCloze