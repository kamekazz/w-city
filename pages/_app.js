import { useEffect } from 'react';
// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';
import { loadUser } from '../redux/auth';
import setAuthToken from '../utils/setAuthToken';

import Layout from '../components/Layout/layout';
import '../styles/globals.css';
//styles
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../styles/muiTheme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch({ type: 'ADD_TOKEN' });
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: 'LOGOUT' });
      } else {
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
