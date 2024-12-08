import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="Logo de Kasa" className="logo" />
      <nav className="navigation">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Accueil
        </NavLink>
        <NavLink 
          to="/apropos" 
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          À propos
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;