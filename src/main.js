import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const prodSection = document.querySelector('.products');

function addLoadingEl() {
  const loadingEl = document.createElement('p');
  loadingEl.classList.add('loading');
  loadingEl.innerHTML = 'carregando...';
  prodSection.appendChild(loadingEl);
}

function rmvLoadingEl() {
  const loadingEl = document.querySelector('.loading');
  prodSection.removeChild(loadingEl);
}

async function generateProductList() {
  addLoadingEl();
  const productList = await fetchProductsList('computador');
  rmvLoadingEl();
  productList.forEach((prod) => prodSection.appendChild(createProductElement(prod)));
}

generateProductList();

document.querySelector('.cep-button').addEventListener('click', searchCep);
