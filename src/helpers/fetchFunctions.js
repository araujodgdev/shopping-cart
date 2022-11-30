export const fetchProduct = async (id) => {
  if (id === undefined) throw new Error('ID não informado');

  const PRODUCTINFO_API = `https://api.mercadolibre.com/items/${id}`;

  const result = await fetch(PRODUCTINFO_API);
  const data = await result.json();

  return data;
};

export const fetchProductsList = async (termoDeBusca) => {
  if (termoDeBusca === undefined) throw new Error('Termo de busca não informado');
  const PRODUCTLIST_API = `https://api.mercadolibre.com/sites/MLB/search?q=${termoDeBusca}`;

  const result = await fetch(PRODUCTLIST_API);
  const data = await result.json();
  const { results } = data;
  return results;
};
