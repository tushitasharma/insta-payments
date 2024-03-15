const initialState = {
    isLoading: false,
    merchantName: 'Groww',
    merchantLogo: 'https://groww.in/groww-logo-270.png',
    background: '#7D33FF',
    foreground: '#FFFFFF',
}

export function fetchTheme() {
    return async (dispatch, getState) => {
        const {isLoading} = getState().theme;
        if (isLoading) return;
    
        dispatch({ type: 'THEME_INIT_LOAD' });
        try {
        const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata');
        const data = await response.json();
        dispatch({ type: 'UPDATE_THEME_DATA', payload: data });
        } catch (error) {
        dispatch({ type: 'THEME_ERROR', payload: error });
        }
    }
}

export default function theme(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_THEME_DATA':
      return {
        ...state,
        isLoading: false,
        merchantName: payload.merchantName,
        merchantLogo: payload.merchantLogo,
        background: payload.theme['--background'],
        foreground: payload.theme['--foreground'],
      };
    case 'THEME_ERROR':
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    case 'THEME_INIT_LOAD':
        return {
            ...state,
            isLoading: true,
        }
    default:
      return state;
  }
}