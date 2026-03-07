export function generateCharacter(seed,taskCount){

const size = 120 + taskCount*8

const blush = 4 + (seed%4)

const colorList = [

"#FADADD",
"#E8F3EC",
"#EEE9F6",
"#FFE5EC"

]

const color = colorList[seed%colorList.length]

return `

<svg width="${size}" height="${size}" viewBox="0 0 100 100">

<circle cx="50" cy="50" r="40" fill="${color}" />

<circle cx="35" cy="45" r="5" fill="black"/>

<circle cx="65" cy="45" r="5" fill="black"/>

<circle cx="35" cy="60" r="${blush}" fill="#ff9aa2"/>

<circle cx="65" cy="60" r="${blush}" fill="#ff9aa2"/>

</svg>

`

}