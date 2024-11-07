import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/Loginpage';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route to="/login" element={<LoginPage />}></Route>
          <Route to="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
