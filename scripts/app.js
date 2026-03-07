import {loadState,saveState,todayDate} from "./state.js"
import {addTask,toggleTask,isCompleted} from "./tasks.js"
import {generateCharacter} from "./characters.js"
import {checkReveal} from "./reveal.js"

const state = loadState()

const today = todayDate()

if(!state.days[today]){

state.days[today]={

tasks:[],
completed:false,
seed:Math.floor(Math.random()*10000)

}

}

const day = state.days[today]

const input = document.getElementById("taskInput")
const btn = document.getElementById("addBtn")
const list = document.getElementById("taskList")
const character = document.getElementById("characterArea")
const modal = document.getElementById("revealModal")
const date = document.getElementById("date")

date.innerText = today

function render(){

list.innerHTML=""

day.tasks.forEach((task,i)=>{

const li=document.createElement("li")

li.innerHTML=
`<input type="checkbox" ${task.done?"checked":""}> ${task.text}`

li.querySelector("input").onclick=()=>{

toggleTask(day,i)
update()

}

list.appendChild(li)

})

character.innerHTML=
generateCharacter(day.seed,day.tasks.length)

}

function update(){

day.completed = isCompleted(day)

saveState(state)

render()

}

btn.onclick=()=>{

if(!input.value) return

addTask(day,input.value)

input.value=""

update()

}

render()

const reveal = checkReveal(state)

if(reveal){

modal.classList.remove("hidden")

if(reveal.type==="success"){

modal.innerHTML=
`✨ Your spirit appeared! ✨
<br><br>
${generateCharacter(reveal.seed,reveal.tasks)}`

}

else{

modal.innerHTML=
"💔 Oh no… you missed yesterday's spirit."

}

setTimeout(()=>{

modal.classList.add("hidden")

},3000)

}