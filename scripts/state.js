const KEY = "mystery_todo_state"

export function loadState(){

const raw = localStorage.getItem(KEY)

if(!raw){

return { days:{} }

}

return JSON.parse(raw)

}

export function saveState(state){

localStorage.setItem(KEY,JSON.stringify(state))

}

export function todayDate(){

return new Date().toISOString().slice(0,10)

}