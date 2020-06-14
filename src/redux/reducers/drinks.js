import { 
  LOAD_FILTERS,
  SELECTED_FILTERS,
  CHANGE_CHECKED,
  LOAD_DRINKS, 
  LOADING, 
  HAS_ERROR,
  ADD_PAGE
} from '../types';

const initialState = {
  filtersList: [],
  selectedFiltersList: [],
  drinksData: [],
  isLoading: false,
  hasError: false,
  page: 0
};

const handlers = {
  [LOAD_FILTERS]: (state, action) => ({
    ...state,
    filtersList: action.payload,
    selectedFiltersList: action.payload,
    isLoading: false,
    hasError: false
  }),
  [SELECTED_FILTERS]: state => ({
    ...state,
    drinksData: [],
    page: 0
  }),
  [CHANGE_CHECKED]: (state, action) => {
    const newList = state.filtersList.map(
      item => item.id === action.payload ? {...item, checked: !item.checked} : item
    );

    return {
      ...state,
      filtersList: newList,
      selectedFiltersList: newList.filter(item => item.checked)
    }
  },
  [ADD_PAGE]: state => ({
    ...state,
    page: state.page + 1
  }),
  [LOAD_DRINKS]: (state, action) => ({
    ...state,
    drinksData: [...state.drinksData, action.payload],
    isLoading: false
  }),
  [LOADING]: state => ({
    ...state,
    isLoading: true
  }),
  [HAS_ERROR]: state => ({
    ...state,
    hasError: true,
    isLoading: false
  }),
  DEFAULT: state => state
};

export const drinksReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};
