import axios from 'axios';

export const apiCall = (
  endUrl = '',
  method = 'GET',
  body = {}
) => {
  return new Promise((resolve, reject) => {
    axios({url: `https://www.thecocktaildb.com/api/json/v1/1/${endUrl}`, method, data: body})
      .then(responce => resolve(responce))
      .catch(err => reject(err));
  });
};