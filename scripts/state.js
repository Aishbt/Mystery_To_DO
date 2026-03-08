const KEY = "planner_state"

export function loadState(){

const raw = localStorage.getItem(KEY)

if(!raw){
return {days:{}}
}

return JSON.parse(raw)

}

export function saveState(state){

localStorage.setItem(KEY,JSON.stringify(state))

}

export function today(){

return new Date().toISOString().slice(0,10)

}