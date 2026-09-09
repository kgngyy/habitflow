import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/stats">Статистика</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
