import logo from './logo.svg';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { AuthRoute } from './AuthRoute';
import { Home } from './components/Home';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path = "/home" element ={<AuthRoute><Home/></AuthRoute>} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
