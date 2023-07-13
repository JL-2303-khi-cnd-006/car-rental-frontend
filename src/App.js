import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarList } from './Components/CarList/CarList';
import { CarDetails } from './Components/CarDetails/CarDetails';
import { CarForm } from './Components/CarForm/CarForm';
import Thanks from './Components/Thanks/Thanks';
import { Navbar } from './Components/NavBar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<CarList/>} />
          <Route path='/details/:id' element={<CarDetails/>} />
          <Route path='/form/:id' element={<CarForm/>} />
          <Route path='/thanks' element={<Thanks/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
