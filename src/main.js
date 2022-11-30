import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productList = await fetchProductsList('computador');

productList.forEach((prod) => {
  document.querySelector('.products').appendChild(createProductElement(prod));
});
