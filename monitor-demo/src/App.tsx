import './App.css'
import BaseLayout from './layout/BaseLayout'
import { HashRouter, Route, Switch,BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={BaseLayout}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
