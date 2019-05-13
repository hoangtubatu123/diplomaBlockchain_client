import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Issue from '../Issue';
import NodeInfo from '../NodeInfo';
import Permission from '../Permissions';
import Verification from '../Verification';

export default class Container extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={NodeInfo} />
          <Route path="/permissions" component={Permission} />
          <Route path="/issue" component={Issue} />
          <Route path="/verification" component={Verification} />
        </Switch>
      </div>
    );
  }
}
