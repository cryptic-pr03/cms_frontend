import { CssBaseline } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import CustomFooter from './pages/Footer';
import Router from './Router';

function App() {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Router />
      <CustomFooter />
    </div>
  );
}
export default App;
