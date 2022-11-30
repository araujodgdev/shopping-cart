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

function createErrorEl() {
  const errorEl = document.createElement('p');
  errorEl.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorEl.classList.add('error');
  prodSection.appendChild(errorEl);
}

async function generateProductList() {
  addLoadingEl();
  try {
    const productList = await fetchProductsList('computador');
    rmvLoadingEl();
    productList.forEach((prod) => prodSection.appendChild(createProductElement(prod)));
  } catch (error) {
    rmvLoadingEl();
    createErrorEl();
  }
}

generateProductList();

document.querySelector('.cep-button').addEventListener('click', searchCep);
