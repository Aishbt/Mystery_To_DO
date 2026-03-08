import {loadState,saveState,today} from "./state.js"
import {addTask,toggleTask,isComplete} from "./tasks.js"
import {generateCharacter} from "./characters.js"

const state = loadState()

const date = today()

if(!state.days[date]){

state.days[date] = {

tasks:[],
seed:Math.floor(Math.random()*10000),
completed:false

}

}

const day = state.days[date]

document.getElementById("date").innerText = date

const input = document.getElementById("taskInput")
const btn = document.getElementById("addBtn")
const list = document.getElementById("taskList")
const character = document.getElementById("characterArea")

function render(){

list.innerHTML=""

day.tasks.forEach((task,i)=>{

const li = document.createElement("li")

li.innerHTML =
`<input type="checkbox" ${task.done?"checked":""}> ${task.text}`

li.querySelector("input").onclick = ()=>{

toggleTask(day,i)
update()

}

list.appendChild(li)

})

character.innerHTML =
generateCharacter(day.seed,day.tasks.length)

}

function update(){

day.completed = isComplete(day)

saveState(state)

render()

}

btn.onclick = ()=>{

if(!input.value) return

addTask(day,input.value)

input.value=""

update()

}

render()