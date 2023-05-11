import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
  </Switch>
)

export default App
