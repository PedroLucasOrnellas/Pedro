// let pokemons = [];

// function consumirPokeapi(qtd){
//     const promises = []
//     for(let i = 1; i <= qtd; i++){
//         let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)
//         // faça algo com os dados retornados
//             pokemons.push(Object.entries(data));
//             console.log(data)
//             return pokemons;
//         })
//         .catch(error => {
//         // trate erros de requisição
//             console.log(`Deu o erro ${error}`)
//         });
//         promises.push(promise);
//     }
//     // console.log(pokemons);
//     if(typeof mostrarPokemons === 'function'){
//         mostrarPokemons();
//     }
// }

function consumirPokeapi(qtd) {
    const pokemons = [];
    const promises = [];

    for (let i = 1; i <= qtd; i++) {
        // Cria uma Promise para cada requisição
        let promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(response => response.json())
            .then(data => {
                // Adiciona os dados ao array de pokemons
                pokemons.push(data);
            })
            .catch(error => {
                // Trata erros de requisição
                console.log(`Deu o erro ${error}`);
            });

        promises.push(promise);
    }

    // Retorna uma Promise que resolve quando todas as Promises são resolvidas
    return Promise.all(promises).then(() => {
        return pokemons;
    });
}
