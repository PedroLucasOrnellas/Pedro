const apiUrl = 'http://localhost:3000/Carro'; // Substitua pela URL da sua API

// Criar Carro
document.getElementById('createCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const modelo = document.getElementById('createCarModel').value;
    const marca = document.getElementById('createCarBrand').value;
    const ano = document.getElementById('createCarYear').value;
    const valor = document.getElementById('createCarValue').value;
    const caracteristicas = document.getElementById('createCarFeatures').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modelo, marca, ano, valor, caracteristicas }),
        });

        const result = await response.json();
        alert('Carro criado com sucesso!');
        console.log(result);
    } catch (error) {
        console.error('Erro ao criar carro:', error);
    }
});

// Listar Carros
document.getElementById('listCarsButton').addEventListener('click', async () => {
    try {
        const response = await fetch(apiUrl);
        const cars = await response.json();

        const carList = document.getElementById('carList');
        carList.innerHTML = '';
        cars.forEach(car => {
            carList.innerHTML += `<div>ID: ${car._id} | modelo: ${car.modelo} | Marca: ${car.marca} | Ano: ${car.ano} | Valor: ${car.valor} | Características: ${car.caracteristicas}</div>`;
        });
    } catch (error) {
        console.error('Erro ao listar carros:', error);
    }
});

// Atualizar Carro
document.getElementById('updateCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateCarId').value;
    const modelo = document.getElementById('updateCarModel').value;
    const marca = document.getElementById('updateCarBrand').value;
    const ano = document.getElementById('updateCarYear').value;
    const valor = document.getElementById('updateCarValue').value;
    const caracteristicas = document.getElementById('updateCarFeatures').value;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ modelo, marca, ano, valor, caracteristicas }),
        });

        const result = await response.json();
        alert('Carro atualizado com sucesso!');
        console.log(result);
    } catch (error) {
        console.error('Erro ao atualizar carro:', error);
    }
});

// Deletar Carro
document.getElementById('deleteCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteCarId').value;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert('Carro deletado com sucesso!');
        console.log(result);
    } catch (error) {
        console.error('Erro ao deletar carro:', error);
    }
});
