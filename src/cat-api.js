import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_ZI6hgRsALSOFN7bqNc3zLPDn18HYukjTVzACbRDryi9IZ14FjT89nRxgsmdoPE9h';
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

err.style.display = 'none';
select.style.display = 'none';

export function fetchBreeds() {
    loader.style.display = 'block';
    select.style.display = 'none';
    err.style.display = 'none';
    axios.defaults.headers.common['x-api-key'] = API_KEY;
    return fetch(`${BASE_URL}/breeds`)
      .then((response) => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
      })
  }


  export function fetchCatByBreed(breedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    axios.defaults.headers.common['x-api-key'] = API_KEY;
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
      })
  }
