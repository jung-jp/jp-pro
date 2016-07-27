import React, { Component } from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, Link } from 'react-router';

import About from './RouterAbout';
import Home from './RouterHome';
import Repos from './RouterRepos';
import RepoDetails from './RouterRepoDetails';

class App extends Component {
    render() {
        return (
            <div>
                <header>App</header>
                <menu>
                    <ul>
                        <li><Link to="/Home" activeClassName="active">Home</Link></li>
                        <li><Link to="/about" activeClassName="active">About</Link></li>
                        <li><Link to="/repos" activeClassName="active">Repos</Link></li>
                    </ul>
                </menu>
                {this.props.children}
            </div>
        );
    }
}

render((
  <Router>
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="about" component={About} />
        <Route path="repos" component={Repos} >
            {/* UI를 중첩하려는 위치에 라우트를 중첩해 추가한다.*/}
            <Route path="details/:repo_name" component={RepoDetails} />
        </Route>




    </Route>
  </Router>
), document.getElementById('root'));
