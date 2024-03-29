import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import HeaderMenu from './components/Menu/Menu';

// import Home from './components/Home/Home';
import Discover from './components/Discover/Discover';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Genre from './components/Genre/Genre';
import ActorProfile from './components/ActorProfile/ActorProfile';
import * as CONFIG from './config/config';

import "antd/dist/antd.css";
import './App.css';

const {
  Footer, Content,
} = Layout;

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout className="layout" id="layout">
            <HeaderMenu />
            <Content xs={24} className="mainContent-outer">
              <ScrollToTop>
                <Switch>
                  <Route path="/" exact component={Discover} />
                  {/* <Route path="/" component={Discover}/> */}
                  { /*TODO : Add page for company movies */}
                  <Route path={CONFIG.ROUTES.MOVIE + ":id/:name"} component={MovieDetails} />
                  <Route path={CONFIG.ROUTES.GENRE + ":id/:name"} component={Genre} />
                  <Route path={CONFIG.ROUTES.PERSON + ":id/:name"} component={ActorProfile} />
                  <Route component={Discover} />
                </Switch>
              </ScrollToTop>
            </Content>
            <Footer>
              TMDB React Movies App ©{new Date().getFullYear()}
            </Footer>
            <BackTop />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
