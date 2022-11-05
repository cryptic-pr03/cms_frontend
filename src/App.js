import { CssBaseline } from '@mui/material';
import './App.css';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
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
