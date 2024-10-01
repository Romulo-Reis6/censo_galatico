let currentPage = 1;

const getPlanets = async (page) => {
  const currentData = JSON.parse(localStorage.getItem('planets'));
  const pageExists = currentData && currentData.some(({ page: p }) => p === page);
  if (pageExists) return;
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const { count, results: data } = await response.json();

  pageLimit = Math.ceil(count / 10);
  localStorage.setItem('pageLimit', pageLimit);

  const newPage = { page, data };
  const newData = currentData ? [...currentData, newPage] : [newPage];

  localStorage.setItem('planets', JSON.stringify(newData));
};

const createCards = (currentPage) => {
  const container = document.querySelector('#cards-container');
  container.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('planets'));
  const pageData = data.find(({ page }) => page === currentPage).data;

  pageData.forEach((planet) => {
    const card = document.createElement('li');
    const button = document.createElement('button');

    button.innerText = planet.name;
    card.appendChild(button);
    container.appendChild(card);
  })
}

const createPageButtons = () => {
  const container = document.querySelector('#buttons-container');
  container.innerHTML = '';
  const pageLimit = JSON.parse(localStorage.getItem('pageLimit'));

  for (let i = 1; i <= pageLimit; i++) {
    const button = document.createElement('button');
    button.innerText = i;

    button.addEventListener('click', async ({ target }) => {
      currentPage = Number(target.innerText);
      await getPlanets(currentPage);
      createCards(currentPage);
    });

    container.appendChild(button);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await getPlanets(currentPage);
  createCards(currentPage);
  createPageButtons();
});