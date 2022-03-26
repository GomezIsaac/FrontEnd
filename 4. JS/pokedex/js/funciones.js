const pokeCard = document.querySelector('[poke-carta]');
const pokenombre = document.querySelector('[poke-nombre]');
const pokeImg = document.querySelector('[poke-img]');
const pokeImgContainer = document.querySelector('[poke-img-container]');
const pokeId = document.querySelector('[poke-id]');
const pokeTipo = document.querySelector('[poke-tipos]');
const pokeStats = document.querySelector('[poke-stats]');
const pokeMovs = document.querySelector('[poke-movs]');

const Colores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => PokemonData(response))
        //.catch(err => NoEncontrado())
}

const PokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types, moves } = data;

    pokenombre.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    CardColor(types);
    PokemonTypes(types);
    PokemonStats(stats);
    PokemonMov(moves);
}


const CardColor = types => {
    const colorOne = Colores[types[0].type.name];
    const colorTwo = types[1] ? Colores[types[1].type.name] : Colores.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const PokemonTypes = types => {
    pokeTipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = Colores[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTipo.appendChild(typeTextElement);
    });
}

const PokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const PokemonMov = moves => {
    pokeMovs.innerHTML = '';
    const moveElement = document.createElement("div");
    const moveNombre = document.createElement("div");
    let random = Math.floor(Math.random() * moves.length);
    moveNombre.textContent = moves[random].move.name;
    moveElement.appendChild(moveNombre);
    pokeMovs.appendChild(moveElement);
}

const NoEncontrado = () => {
    pokenombre.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'pokeSad.gif');
    pokeTipo.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}