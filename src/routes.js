import { BrowserRouter, Route } from 'react-router-dom'
import Admin from './pages/admin'
import Developer from './pages/developer'
import DeveloperCreate from './pages/developerCreate'
import Developers from './pages/developers'
import DeveloperUpdate from './pages/developerUpdate'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Developers} />
      <Route path="/detalhes/:id" component={Developer} />
      <Route path="/novo" component={DeveloperCreate} />
      <Route path="/admin" component={Admin} />
      <Route path="/edit/:id" component={DeveloperUpdate} />
    </BrowserRouter>
  )
}

export default Routes