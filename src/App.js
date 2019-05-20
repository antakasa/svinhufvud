import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList';
import Timeline from "./components/timeline"
import Layout from "./components/layout";
import FrontPageGrid from "./components/frontPageGrid"
import "./mobilestyles.css"
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Hero from "./components/hero"
import Info from "./pages/info"
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Hero />
      <Layout>
        <Route exact path="/" component={FrontPageGrid} />
        <Route path="/info" component={Info} />
        <Route path="/uskomaton-elama" component={Timeline} />
      </Layout>
      </div>
    </Router>
    );
  }
}

export default App;
