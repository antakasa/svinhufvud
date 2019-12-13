import React, {Component, useEffect} from 'react';
import './App.css';
import Timeline from './components/timeline';
import Layout from './components/layout';
import FrontPageGrid from './components/frontPageGrid';
import './mobilestyles.css';
import {
  BrowserRouter as Router,
  useLocation,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Hero from './components/hero';
import Info from './pages/info';
import Feature from './pages/feature';
import {Helmet} from 'react-helmet';
import HeaderImage from './images/header.jpg';
const NoMatchPage = () => {
  return <h3>404 - Sivua ei löydy</h3>;
};

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [pathname],
  );

  return null;
};

class App extends Component {
  render() {
    return (
      <>
        <Router basename={'/v-2'}>
          <div className="App">
            <Helmet>
              <meta property="og:image" content={HeaderImage} />
            </Helmet>
            <Hero />
            <Layout>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={({location}) => <FrontPageGrid frontPage />}
                />
                <Route
                  exact
                  path="/feature"
                  render={({location}) => (
                    <FrontPageGrid featurePage location={location} />
                  )}
                />

                <Route path="/feature/:id" component={Feature} />
                <Route path="/info" component={Info} />
                <Route path="/uskomaton-elama" component={Timeline} />
                <Route component={NoMatchPage} />
              </Switch>
            </Layout>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
