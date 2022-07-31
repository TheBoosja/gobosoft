import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import App from './App'
import './index.css'
import { store, history } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)
