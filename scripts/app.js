import {loadState,saveState,today} from "./state.js"
import {addTask,toggleTask,complete} from "./tasks.js"
import {generateCharacter} from "./characters.js"
import {reveal} from "./reveal.js"

const state=loadState()

const date=today()

if(!state.days[date]){

state.days[date]={

tasks:[],
seed:Math.floor(Math.random()*10000),
completed:false

}

}

const day=state.days[date]

document.getElementById("date").innerText=date

const list=document.getElementById("taskList")
const input=document.getElementById("taskInput")
const btn=document.getElementById("addBtn")
const character=document.getElementById("characterArea")

function render(){

list.innerHTML=""

day.tasks.forEach((t,i)=>{

const li=document.createElement("li")

li.innerHTML=`<input type="checkbox" ${t.done?"checked":""}> ${t.text}`

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

day.completed=complete(day)

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

const result=reveal(state)

if(result){

const modal=document.getElementById("revealModal")

modal.classList.remove("hidden")

if(result.type==="success"){

modal.innerHTML=`
✨ Your secret character appeared! ✨
<br><br>
${generateCharacter(result.seed,result.count)}
`

}else{

modal.innerHTML="💔 You missed yesterday's character"

}

setTimeout(()=>{

modal.classList.add("hidden")

},3500)

}