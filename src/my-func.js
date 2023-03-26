import Notiflix from 'notiflix';

const ref = {
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

function fetchCountries(name) {
  return fetch(name).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      ref.ul.innerHTML = '';
      ref.div.innerHTML = '';

      throw new Error(response.status);
    }

    return response.json();
  });
}
export default { fetchCountries };
