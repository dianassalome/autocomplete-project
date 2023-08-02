// VARIABLES

const inputBar = document.querySelector(".input__bar");
const list = document.querySelector(".list");


const pokedex = fetch("https://pokeapi.co/api/v2/pokemon?limit=251").then((data) =>{
    
return data.json();
}).then(data => {

console.dir(data);



for (let i = 0; i < data.results.length; i++) {
    let pokemonName = data.results[i].name;

    console.log(pokemonName)

        let string;
        
        let newBullet = document.createElement("li");
        
        inputBar.addEventListener("input", function getText(text){
            
            const inputText = text.target.value;
            let inputTextLower = inputText.toLowerCase()

            let index = pokemonName.indexOf(inputTextLower);
            
            if (pokemonName.includes(inputTextLower) && inputText.length>0 && index == 0) {
                
                    let firstLetter = pokemonName.charAt(0).toUpperCase();
                    let nameRest = pokemonName.slice(1);
                    let nameUpperCase = firstLetter+nameRest;
                    

                    string = nameUpperCase;
                    let newSlice = nameUpperCase.slice(index, index+inputText.length)
                    string = string.replace(newSlice, `<strong>${newSlice}</strong>`);                   
                    
                    
                    let pokemonData = data.results[i].url

                    // FETCH IMAGE URL
                    fetch(pokemonData).then((data) => {
                        return data.json()}).then(pokemon => {
                            let spriteURL = pokemon.sprites.other["official-artwork"].front_default
                            console.log("Success", spriteURL)
                            console.dir(pokemon)
                            newBullet.innerHTML = `<a target="_blank" href="${spriteURL}">${string}</a>`;
                            list.appendChild(newBullet);
                        })
    
            } else {
                list.appendChild(newBullet); 
                list.removeChild(newBullet);
            }  
        })    
}
});


