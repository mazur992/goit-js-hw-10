import './css/styles.css';
import API from './my-func';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const FETCH_LINK_REST_COUNTRIES = 'https://restcountries.com/v3.1/name/';
const REST_COUNTRIES_FIELD = '?fields=name,capital,population,flags,languages';

const ref = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

ref.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function murkupCountries(countries) {
  let murkup = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    ref.ul.innerHTML = '';
  }
  if (countries.length === 1) {
    murkup = `<div style="display: flex; align-items: center; gap: 20px"><img weight='30px' height='30px' src='${
      countries[0].flags.svg
    }'><h1>${countries[0].name.official}</h1></div>
        <h2>Capital: <span>${countries[0].capital}</span></h2>
        <h2>Population: <span>${countries[0].population}</span></h2>
        <h2>Languages: <span>${Object.values(
          countries[0].languages
        )}</span></h2>`;
    ref.ul.innerHTML = '';
    ref.div.innerHTML = murkup;
  }

  if (countries.length > 1 && countries.length <= 10) {
    murkup = countries
      .map(country => {
        return `<li style='display:flex; align-items: center; gap: 20px '><img  weight='30px' height='30px' src='${country.flags.svg}'><p style='font-size: 18px; font-weight: 600'>${country.name.official}</p></li>`;
      })
      .join('');
    ref.div.innerHTML = '';
    ref.ul.innerHTML = murkup;
  }
}

function handleInput(event) {
  let inputValue = event.target.value.trim();
  let fullFetchLink =
    FETCH_LINK_REST_COUNTRIES + inputValue + REST_COUNTRIES_FIELD;
  if (inputValue === '') {
    ref.ul.innerHTML = '';
    ref.div.innerHTML = '';
    fullFetchLink = '';
  }
  if (fullFetchLink !== '') {
    API.fetchCountries(fullFetchLink)
      .then(countries => {
        murkupCountries(countries);
      })
      .catch(error => console.log(error));
  }
}
