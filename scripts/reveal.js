export function checkReveal(state){

const yesterday =
new Date(Date.now()-86400000)
.toISOString().slice(0,10)

const day = state.days[yesterday]

if(!day) return null

if(day.completed){

return {

type:"success",
seed:day.seed,
count:day.tasks.length

}

}

return {type:"missed"}

}