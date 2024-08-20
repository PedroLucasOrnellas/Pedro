// https://pokeapi.co/api/v2/pokemon-species/{id or name}/ DESCRICAO
let botao = document.getElementById('buscar');
mostrarPokemons(10);

function abrePagina(){
    let maisInfo = document.getElementById('info');
    maisInfo.addEventListener('click', () => {

        setTimeout(() => exibe(10), 3000);  

    });
}

botao.addEventListener('click', () => {
    let qtdPokemons = document.getElementById('qtdPokemons').valueAsNumber;
    mostrarPokemons(qtdPokemons);

});

async function mostrarPokemons(qtd){
    let div = document.getElementById('prateleiraPokemons');
    div.innerHTML = '';
    let pokemons = await consumirPokeapi(qtd); 
    console.log(pokemons);
    // pokemons = consumirPokeapi(10)
//  console.log(pokemons);
    pokemons.forEach( pokemon => {
        let nome = pokemon.name;
        let descricao = 'PADRÃO';
        let imagem = pokemon.sprites.front_default;
        let idP = pokemon.id;

        div.innerHTML += `<div class="card">
                            <div class="foto">
                                <img src="${imagem}" alt="">
                            </div>
                            <div class="info">
                                <div class="titulo">
                                    <h2>${nome}</h2>
                                </div>
                                <div class="caracteristicas">
                                    <p>${descricao}</p>

                                    <a href='/pokemon.html?id=${idP}' target='_blank'>
                                        <button id="maisInfo">
                                            Mais Informações
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>`
    });
    
}

sessionStorage.setItem('teste', 1) ;