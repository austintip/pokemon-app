import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Navbar/Navbar'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Header />
      <main className="App">
        <Route exact path="/" component={Home} />
      </main>
    </Router>
  )
}

export default App;
