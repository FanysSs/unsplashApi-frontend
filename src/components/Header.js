import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import './../styles/header.css';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/" className="header-logo">
          UNSPLASH
        </Link>           
        <Link to="/" className="header-link">
          NUEVO
        </Link>
        <div className="header-divider">|</div>
        <Link to="/search" className="header-link">
          BUSCAR
        </Link>
        {authToken && (
          <div className="flex">
            <div className="header-divider">|</div>
            <Link to="/create" className="header-link">
              CREAR
            </Link>
          </div>
        )}
      </div>
      <div className="header-right">
        {authToken ? (
          <div
            className="header-link pointer"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            CERRAR SESION
          </div>
        ) : (
          <Link to="/login" className="header-link">
            INICIAR SESION
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
