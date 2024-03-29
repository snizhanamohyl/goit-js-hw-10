import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import {
  createCountryListMarkup,
  createCountryProfileMarkup,
} from './js/createMarkupFunctions';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const BASE_URL = 'https://restcountries.com/v3.1';
const parameterToSearchBy = 'name';
const filter = 'fields=name,capital,population,flags,languages';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryToSearch = refs.input.value.trim();
  const url = `${BASE_URL}/${parameterToSearchBy}/${countryToSearch}?${filter}`;

  if (!countryToSearch) {
    refs.countryInfoEl.innerHTML = '';
    refs.countryListEl.innerHTML = '';
    return;
  }

  fetchCountries(url)
    .then(countries => {
      if (countries.length === 1) {
        if (refs.countryListEl.innerHTML !== '') {
          refs.countryListEl.innerHTML = '';
        }

        refs.countryInfoEl.innerHTML = createCountryProfileMarkup(countries[0]);
      } else if (countries.length > 1 && countries.length < 10) {
        if (refs.countryInfoEl.innerHTML !== '') {
          refs.countryInfoEl.innerHTML = '';
        }

        refs.countryListEl.innerHTML = createCountryListMarkup(countries);
      } else {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}
