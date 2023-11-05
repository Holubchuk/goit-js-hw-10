import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

window.addEventListener('DOMContentLoaded', () => {
  fetchBreeds()
    .then(breeds => {
      loader.style.display = 'none';
      select.style.display = 'block';
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    });
});

select.addEventListener('change', (e) => {
  const selectedBreedId = e.target.value;

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      loader.style.display = 'none';
      // catInfo.innerHTML = createMarkup(data.breeds);
      console.log(data);
    })
    .catch(error => {
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    });
});

function createMarkup(catData) {
  return catData
    .map(
      ({ name, temperament, description }) => `
    <img style='margin-right: 20px' src=${url} width='400px'>
    <div >
      <h2>${name}</h2>
      <p>${description}</p>
      <h3 style="display: inline">Temperament: </h3>
      <p style="display: inline">${temperament}</p>
    </div>`
    )
    .join('');
}
