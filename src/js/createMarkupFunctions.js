export function createCountryListMarkup(countries) {
  let markup = '';

  for (const country of countries) {
    markup += `<li class="country-list-item"><img src="${country.flags.svg}" alt="flag" width="30px" height="auto"><span class="country-list-name">${country.name.official}</span></li>`;
  }

  return markup;
}

export function createCountryProfileMarkup({
  name,
  capital,
  population,
  languages,
  flags,
}) {
  return (countryProfileMarkup = `<div class="country-title">
  <img src="${flags.svg}" alt="flag" height="24px">
      <h1 class="country-name">${name.official}</h1>
      </div>
      <ul class="country-profile">
        <li class="contry-feature">Capital: <span id="#capital">${capital}</span></li>
        <li class="contry-feature">Population: <span id="#population">${population}</span></li>
        <li class="contry-feature">Languages: <span id="#languages">${Object.values(
          languages
        )
          .map(lang => lang)
          .join(', ')}</span></li>
      </ul>`);
}
