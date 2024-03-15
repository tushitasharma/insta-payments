const initialState = {
  isLoading: false,
  products: [],
  paymentMethods: [],
  isError: null,
}

export function fetchProducts() {
  return async (dispatch, getState) => {
    const {isLoading, products} = getState().paymentStore;
    if (isLoading || products.length > 0) return;

    const lastFetched = localStorage.getItem('last-fetched');

    if (lastFetched && Date.now() - lastFetched < 1000 * 60 * 5) {
        const data = JSON.parse(localStorage.getItem('product-data'));
        dispatch({ type: 'UPDATE_DATA', payload: data });
        return;
    }

    dispatch({ type: 'INIT_LOAD' });
    try {
      const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
      const data = await response.json();
      localStorage.setItem('product-data', JSON.stringify(data));
      localStorage.setItem('last-fetched', Date.now());
      dispatch({ type: 'UPDATE_DATA', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  }
}

export default function paymentStore(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        paymentMethods: payload.paymentMethods,
      };
    case 'ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    case 'INIT_LOAD':
        return {
            ...state,
            isLoading: true,
        }
    default:
      return state;
  }
}