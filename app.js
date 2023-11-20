document.addEventListener('DOMContentLoaded', function () {
  let currentPage = 1;

  // Función para cargar los Pokémon de la página actual
  function loadPokemons() {
    const pokemonContainer = document.getElementById('pokemon-info');
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 9}&limit=9`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Limpiar el contenedor antes de agregar nuevos Pokémon
        pokemonContainer.innerHTML = '';

        // Iterar sobre los Pokémon y agregarlos al contenedor
        data.results.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              // Actualizar la interfaz con la información del Pokémon
              updatePokemonInfo(pokemonData);
            })
            .catch(error => {
              console.error('Error al obtener datos del Pokémon:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error al obtener la lista de Pokémon:', error);
      });
  }

  // Función para actualizar la interfaz con la información del Pokémon
  function updatePokemonInfo(data) {
    const pokemonContainer = document.getElementById('pokemon-info');

    // Construir el contenido con la información del Pokémon
    const content = `
            <div class="card mb-3">
                <div class="card-body">
                    <h2 class="card-title">${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3">
                    <p><strong>Altura:</strong> ${data.height}</p>
                    <p><strong>Peso:</strong> ${data.weight}</p>
                </div>
            </div>
        `;

    // Agregar el contenido al contenedor
    pokemonContainer.innerHTML += content;
  }

  // Función para manejar el cambio de página
  function handlePageChange(direction) {
    if (direction === 'prev' && currentPage > 1) {
      currentPage--;
    } else if (direction === 'next') {
      currentPage++;
    }

    // Cargar los Pokémon de la página actual
    loadPokemons();
  }

  // Cargar los Pokémon de la página inicial
  loadPokemons();

  // Agregar eventos a los botones de anterior y siguiente
  document.getElementById('prev-btn').addEventListener('click', () => handlePageChange('prev'));
  document.getElementById('next-btn').addEventListener('click', () => handlePageChange('next'));
});
