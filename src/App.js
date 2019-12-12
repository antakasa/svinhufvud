import React, {Component} from 'react';
import './App.css';
import PostList from './components/PostList';
import Timeline from './components/timeline';
import Layout from './components/layout';
import FrontPageGrid from './components/frontPageGrid';
import './mobilestyles.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Hero from './components/hero';
import Info from './pages/info';
import Feature from './pages/feature';

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

class App extends Component {
  render() {
    return (
      <Router basename={'/v2'}>
        <div className="App">
          <Hero />
          <Layout>
            <Route exact path="/" render={() => <FrontPageGrid frontPage />} />
            <Route
              exact
              path="/feature"
              render={() => <FrontPageGrid featurePage />}
            />

            <Route path="/feature/:id" component={Feature} />
            <Route path="/info" component={Info} />
            <Route path="/uskomaton-elama" component={Timeline} />
            <Route component={NoMatchPage} />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
