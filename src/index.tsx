import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import VzhukhKotleta from './components/vzhukh-kotleta/vzhukh-kotleta.tsx';
import './index.css';
import { store } from './services/store/store.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <VzhukhKotleta />
      </BrowserRouter>
    </Provider>
)
