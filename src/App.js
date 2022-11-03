import { CssBaseline } from '@mui/material';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Router from './Router';

function App() {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}
export default App;
