import React, { Component } from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, Link, browserHistory   } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

import About from './RouterAbout';
import Home from './RouterHome';
import Repos from './RouterRepos';
import RepoDetails from './RouterRepoDetails';
import ServerError from './RouterServerError';

/**
 history 객체
 pushState : 새로운 URL로 이동하는 기본 히스토리 탐색 메서드이며 옵션 매개변수 객체를 지정할 수 있다.
    예) history.pushState(null, '/users/123');
       history.pushState({showGrades:ture}, '/users/123');
replaceState : pushState와 동일한 구문을 사용, 현재 URL을 새로운 URL로 대체한다. 히스토리의 길이에 영향을 주지 않고 URL을 대체한다.(리디렉션과 비슷)
goBack : 탐색 히스토리에서 한 항목 뒤로 이동.
goForward : 한 항목 앞으로 이동.
go : n 또는 -n 만큼 앞으로 또는 뒤로 이동
createHref : 라우터의 구성을 이용해 URL을 만든다.
 */

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
  <Router history={browserHistory }>
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="about" component={About} title="About Us"/>
        <Route path="repos" component={Repos} >
            {/* UI를 중첩하려는 위치에 라우트를 중첩해 추가한다.*/}
            <Route path="/repos/:repo_name" component={RepoDetails} />
        </Route>
        <Route path="error" component={ServerError} />
    </Route>
  </Router>
), document.getElementById('root'));
