export const getAddress = (cep) => {
  const firstPromise = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const secondPromise = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const promiseArr = [firstPromise, secondPromise];
  return Promise.any(promiseArr)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => error);
};

export const searchCep = () => {
  const cepNumber = document.querySelector('.cep-input').value;
  const errorMessage = 'CEP não encontrado';
  const cepInfoEl = document.querySelector('.cart__address');
  const cepLength = 8;
  if (cepNumber.length === cepLength) {
    getAddress(cepNumber)
      .then((data) => {
        if (Object.keys(data).includes('address')) {
          const { address, district, city, state } = data;
          cepInfoEl.innerHTML = `${address} - ${district} - ${city} - ${state}`;
        }
        if (Object.keys(data).includes('street')) {
          const { street, neighborhood, city, state } = data;
          cepInfoEl.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
        }
      })
      .catch(cepInfoEl.innerHTML = errorMessage);
  }
};
