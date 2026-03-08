export function generateCharacter(seed,count){

const size = 80 + count * 10

return `
<svg width="${size}" height="${size}" viewBox="0 0 100 100">

<circle cx="50" cy="50" r="40" fill="#f7c6c7"/>

<circle cx="35" cy="45" r="6"/>
<circle cx="65" cy="45" r="6"/>

<circle cx="35" cy="60" r="6" fill="#ffb6b6"/>
<circle cx="65" cy="60" r="6" fill="#ffb6b6"/>

</svg>
`

}