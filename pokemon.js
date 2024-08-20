let titulo = document.querySelector('.nomePokemon');
let imagem = document.querySelector('.imagem');
let descricao = document.querySelector('.descricao');

async function exibe(id){

        let pokemons = await consumirPokeapi(+id + 5);
        let pokemon = pokemons.filter(p => p.id == id)[0];
        // let pokemon = pokemons.id;+
        console.log(pokemon);
        console.log(id)

        let nome = pokemon.name;
        let descricaoP = 'PADRÃO';
        let imagemP = pokemon.sprites.front_default;
        let idP = pokemon.id;

        titulo.innerHTML = nome
        imagem.innerHTML = `<img src="${imagemP}" alt="Imagem do Pokémon">`;
        descricao.innerHTML = descricaoP;
        // descricao.innerHTML += `<a href='/pokemon.html?id=${idP}'></a>`;


}

document.addEventListener('DOMContentLoaded', function() {
    const parametrosUrl = new URLSearchParams(window.location.search);

    const id = parametrosUrl.get('id');

    exibe(id);

    const param1 = sessionStorage.getItem('teste');
    console.log(param1);
});

