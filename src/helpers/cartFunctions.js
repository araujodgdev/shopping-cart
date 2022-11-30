import { fetchProduct } from './fetchFunctions';

let totalPrice = 0;
/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const getPrevPrice = () => {
  const prevPrice = localStorage.getItem('totalPrice');
  return Number(prevPrice);
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const productPrice = await fetchProduct(id);
  totalPrice += productPrice.price;
  localStorage.setItem('totalPrice', totalPrice);
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = cartProducts.filter((product) => product !== id);
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};
