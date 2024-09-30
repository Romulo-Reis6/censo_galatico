const getPlanets = async (page) => {
  const response = await fetch(`https://swapi.dev/api/planets/?page${page}`);
  const { results: data } = await response.json();

  const currentData = JSON.parse(localStorage.getItem('planets'));
  const newPage = { page, data };
  const newData = currentData ? [...currentData, newPage] : [newPage];

  localStorage.setItem('planets', JSON.stringify(newData));
};

const createCards = () => {

}

document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('planets')) {
    await getPlanets(1);
  }
});