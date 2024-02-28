import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/navbar';
import './App.css';
import Auth from './pages/auth';
import { Home } from './pages/home';
import { Movie } from './pages/movie';
import { TvShow } from './pages/tvshow';
import { PrivateRoute } from './components/private-route';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tvshow/:id" element={<TvShow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
