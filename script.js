const getAllPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  return data.results;
};

document.addEventListener('DOMContentLoaded', async () => {
  const planetsExists = localStorage.getItem('planets') ? true : false;
  if (!planetsExists) {
    const planets = await getAllPlanets();
    localStorage.setItem('planets', JSON.stringify(planets));
  }
});