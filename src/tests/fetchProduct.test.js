import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
  });
  it('Verifica se fetch foi chamado na execução da função', async () => {
    await fetchProduct("MLB1405519561");
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se a função utiliza o endpoint correto', async () => {
    const CORRECT_ENDPOINT = "https://api.mercadolibre.com/items/MLB1405519561";
    await fetchProduct("MLB1405519561");
    expect(fetch).toHaveBeenCalledWith(CORRECT_ENDPOINT);
  });
  it('Testa se a função tem o retorno correto', async () => {
    const result = await fetchProduct("MLB1405519561");
    expect(result).toEqual(product);
  });
});
