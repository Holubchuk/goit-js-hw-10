import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const selectId = document.querySelector('#select');

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
      loader.style.display = 'none';
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    });
});

select.addEventListener('change', (e) => {
  const selectedBreedId = e.target.value;

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      loader.style.display = 'none';
      catInfo.innerHTML = createMarkup(data);
      catInfo.style.display = 'block';
    })
    .catch(error => {
      loader.style.display = 'none';
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    });
});

function createMarkup(catData) {
  return catData
    .map(
      ({ breeds: [{ name, description, temperament }], url }) => `
      <div style='display: flex; margin-top: 20px' >
    <img style='margin-right: 20px' src=${url} width='300px'>
    <div>
      <h2>${name}</h2>
      <p style='width: 60%'>${description}</p>
      <p style="display: inline"><span style='font-weight: 700'>Temperament:</span> ${temperament}</p>
    </div>
    </div>`
    )
    .join('');
}

