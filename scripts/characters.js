export function generateCharacter(seed,count){

const size=90+count*8

const colors=[

"#f7c6c7",
"#d9ead3",
"#cfe2f3",
"#ead1dc"

]

const color=colors[seed%colors.length]

return`

<svg width="${size}" height="${size}" viewBox="0 0 100 100">

<circle cx="50" cy="50" r="40" fill="${color}"/>

<circle cx="35" cy="45" r="6" fill="#333"/>
<circle cx="65" cy="45" r="6" fill="#333"/>

<circle cx="35" cy="60" r="6" fill="#ffb6b6"/>
<circle cx="65" cy="60" r="6" fill="#ffb6b6"/>

</svg>

`

}