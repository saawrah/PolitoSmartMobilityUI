import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import 'devextreme/dist/css/dx.light.css';
import './custom.css'
import Dashboard from './Pages/Dashboard';
import Statistics from './Pages/Statistics';
import WeekendHeatMap from './Pages/WeekendHeatMap';
import WeekHeatMap from './Pages/WeekHeatMap';
import WeekMap from './Pages/WeekMap';
import WeekendMap from './Pages/WeekendMap';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/statistics' component={Statistics} />
        <Route path='/weekendHeatMap' component={WeekendHeatMap} />
        <Route path='/weekendMap' component={WeekendMap} />
        <Route path='/weekHeatMap' component={WeekHeatMap} />
        <Route path='/weekMap' component={WeekMap} />
      </Layout>
    );
  }
}
