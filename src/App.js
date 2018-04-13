import React, { Component } from 'react';
import Left from './components/Left'
import Right from './components/Right'
import { Row, Col } from 'antd'
import { Provider } from 'mobx-react'
import stores from './stores/'

import './common/App.css';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <div className="App">
          <Row className="fill-page">
            <Col span={12} className="fill-page"><Left /></Col>
            <Col span={12} className="fill-page"><Right /></Col>
          </Row>
        </div>
      </Provider>
    );
  }
}

export default App;
