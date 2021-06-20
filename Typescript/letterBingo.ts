const ALPHABET: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ]
let currentAlphabetList: string[]

const startButton: HTMLElement = document.getElementById('startLB')!
const nextButton: HTMLElement = document.getElementById('nextLB')!
const currentLetter: HTMLElement = document.getElementById('current-letterLB')!
const letterBank: HTMLElement = document.getElementById('called-lettersLB')!
const remainingLetters: HTMLSpanElement = document.getElementById('remainLB')!
const upperCaseButton: HTMLElement = document.getElementById('upperLB')!

startButton.addEventListener('click', () => start())
nextButton.addEventListener('click', () => getNextLetter())

// Blank Character to make the div the correct size when "empty" janky fix TODO Fix CSS
currentLetter.textContent = "⠀"

function shuffleAlphabetArray(arr: string[]): string[]{
    const copyArr: string[] = arr.slice()
    for(let i: number = copyArr.length - 1; i > 0; i--){
        const j: number = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }
    return copyArr
}

function isUpperOrLower(): void{
    if((<HTMLInputElement>upperCaseButton).checked){
    currentAlphabetList = shuffleAlphabetArray(ALPHABET).map((a) => a.toUpperCase())
  } else {
    currentAlphabetList = shuffleAlphabetArray(ALPHABET)
  }
}

function getNextLetter(): void{
  if(currentAlphabetList.length > 0){
    currentLetter.textContent = currentAlphabetList.pop()!
    letterBank.textContent += currentLetter.textContent + ' '
  }
  remainingLetters.textContent = currentAlphabetList.length.toString()
}

function start(): void{
  letterBank.textContent = ''
  isUpperOrLower()
  getNextLetter()
}