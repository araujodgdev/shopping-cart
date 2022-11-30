import './style.css';
import {
  createCartProductElement,
  createProductElement,
} from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';

const prodSection = document.querySelector('.products');
const cartSection = document.querySelector('.cart__products');

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
    const productElts = document.querySelectorAll('.products > *');
    productElts.forEach((elemnt) => {
      const id = elemnt.querySelector('.product__id').innerHTML;
      const btn = elemnt.querySelector('.product__add');
      btn.addEventListener('click', async () => {
        await saveCartID(id);
        const productInfo = await fetchProduct(id);
        cartSection.appendChild(await createCartProductElement(productInfo));
      });
    });
  } catch (error) {
    rmvLoadingEl();
    createErrorEl();
  }
}

generateProductList();

document
  .querySelector('.cep-button')
  .addEventListener('click', () => console.log('ok'));
