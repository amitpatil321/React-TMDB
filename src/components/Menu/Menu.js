import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import SearchMovies from '../SearchMovies/SearchMovies';

import './Menu.css'

const { Header } = Layout;

const HeaderMenu = (props) => {
      return (
        <div className="dummyHeader">
          <Header>
            <div className="logo" >
              <Link to="/">
                <img alt="Logo" src="/images/logo.png" />
              </Link>
            </div>
            <SearchMovies />
          </Header>
        </div>
      )
}

export default HeaderMenu;