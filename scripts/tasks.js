export function addTask(day,text){

day.tasks.push({

text,
done:false

})

}

export function toggleTask(day,i){

day.tasks[i].done=!day.tasks[i].done

}

export function complete(day){

if(day.tasks.length===0) return false

return day.tasks.every(t=>t.done)

}