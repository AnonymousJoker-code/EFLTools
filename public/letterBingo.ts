const letterList: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ]
let mixList: string[]

const startBttn = document.getElementById('startLB')
const nextBttn = document.getElementById('nextLB')

startBttn.addEventListener('click', () => main())
nextBttn.addEventListener('click', () => nextLetter())

function shuffle(arr: string[]): string[]{
    const copyArr = arr.slice()
    for(let i: number = copyArr.length - 1; i > 0; i--){
        const j: number = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }
    return copyArr
}

function isUpperOrLower(): void{
    if((<HTMLInputElement>document.getElementById('upperLB')).checked){
    mixList = shuffle(letterList).map((a) => a.toUpperCase())
  } else {
    mixList = shuffle(letterList)
  }
}

function nextLetter(): void{
  const docLeft: HTMLElement = document.getElementById('current-letterLB')
  const docRight: HTMLElement = document.getElementById('called-lettersLB')
  const remain: HTMLSpanElement = document.getElementById('remainLB')
  if(mixList.length > 0){
    docLeft.textContent = mixList.shift()
    docRight.textContent += docLeft.textContent + ' '
  }
  let temp: string = '' + mixList.length
  remain.textContent = temp
}

function main(): void{
  document.getElementById('called-lettersLB').textContent = ''
  isUpperOrLower()
  nextLetter()
}
