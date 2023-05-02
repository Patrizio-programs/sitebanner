import './App.css';
import Events from './Events';
import Banner from './banner';
import { Route,  Switch } from 'wouter';

function App() {
  return (
    <div className="App">
     
      <Switch>
        <Route path="/" component={Banner} />
        <Route path="/events" component={Events} />
      </Switch>
    </div>
  );
}

export default App;
