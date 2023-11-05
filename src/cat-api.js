import axios from "axios";

export const BASE_URL = 'https://api.thecatapi.com/v1';
export const API_KEY = 'live_ZI6hgRsALSOFN7bqNc3zLPDn18HYukjTVzACbRDryi9IZ14FjT89nRxgsmdoPE9h';
export const select = document.querySelector('.breed-select');
export const catInfo = document.querySelector('.cat-info');
export const loader = document.querySelector('.loader');
export const err = document.querySelector('.error');

err.style.display = 'none';
select.style.display = 'none';

export function fetchBreeds() {
    loader.style.display = 'block';
    select.style.display = 'none';
    err.style.display = 'none';
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
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response.json();
      })
  }
