import React, {Component} from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router';


class Repos extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            repositories : []
        };
    }

    componentDidMount() {
        fetch('https://api.github.com/users/pro-react/repos')
        .then( res => res.json() )
        .then( data => this.setState({repositories:data}) )
        ;
    }

    render() {
        let repos = this.state.repositories.map( repo => {

            return (
                <li key={repo.id}>
                    <Link to={"/repos/details/"+repo.name}>{repo.name}</Link>
                </li>
            );
        });
        return (
            <div>
                <h1>Repos</h1>
                <ul>{repos}</ul>
                {this.props.children}
            </div>
        );
    }
}

export default Repos;
