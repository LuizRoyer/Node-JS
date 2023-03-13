
let count = 0

let position = [50, 77, 6677, 33, -55.22, 11, 1, 5]

// pegar menor numero
console.log(Math.min(...position))

// pegar o maior numero
console.log(Math.max(...position))

// pegar o elemento no html 
let countPeople = document.getElementById("countPeople")

let math = document.getElementById("saveMath")

function increment() {
   countPeople.innerText =++count
}

function save(){
   
    let str = count +' - '

    math.textContent += str
    count =0
    countPeople.textContent =0
   
}
// stop at 1:12:25 
// https://www.youtube.com/watch?v=jS4aFq5-91M&t=4345s