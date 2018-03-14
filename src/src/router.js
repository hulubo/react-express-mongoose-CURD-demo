/**
 * 定义前端路由表
 * Created by ocean on 18/2/28.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 常驻组件
import Header from './components/main/header';
import Breadcrumb from './components/breadcrumb';


// 子组件
import Welcome from './pages/welcome';
import All from './pages/all';



export default () => (
  <Router>
    <div>
      <Header/>
      <div
        className='main-contains'
        style={{
          minHeight: document.body.clientHeight,
        }}
      >
          <Breadcrumb/>
          <Switch>
            {/* welcome */}
            <Route exact path="/" component={Welcome} />
            <Route exact path="/all" component={All} />
          </Switch>
      </div>
    </div>
  </Router>
);
