export function addTask(day,text){

day.tasks.push({

text,
done:false

})

}

export function toggleTask(day,index){

day.tasks[index].done = !day.tasks[index].done

}

export function isComplete(day){

if(day.tasks.length===0) return false

return day.tasks.every(t=>t.done)

}