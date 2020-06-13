import { apiCall } from '../../api-call';

import { 
  LOAD_FILTERS,
  CHANGE_CHECKED,
  LOAD_DRINKS, 
  LOADING, 
  HAS_ERROR,
  ADD_PAGE
} from '../types';

export const filtersLoaded = () => async dispatch => {
  dispatch({ type: LOADING });

  try {
    const { data } = await apiCall('list.php?c=list');
    const payload = data.drinks.map((item, index) => ({...item, id: index + 1, checked: true}));

    dispatch({
      type: LOAD_FILTERS,
      payload
    });
  } catch (error) {
    dispatch({ type: HAS_ERROR });
  }
};

export const changeChecked = id => ({
  type: CHANGE_CHECKED,
  payload: id
});

export const fetchDrinksData = () => async (dispatch, getState) => {
  const { selectedFiltersList, page } = getState().drinks;

  if (selectedFiltersList.length > page) {
    try {
      dispatch({ type: LOADING });
      dispatch({ type: ADD_PAGE });

      const { data } = await apiCall(`filter.php?c=${selectedFiltersList[page].strCategory}`);

      const payload = {
        category: selectedFiltersList[page].strCategory, 
        data: data.drinks
      };

      dispatch({
        type: LOAD_DRINKS,
        payload
      });
    } catch (error) {
      dispatch({ type: HAS_ERROR });
    }
  }
};