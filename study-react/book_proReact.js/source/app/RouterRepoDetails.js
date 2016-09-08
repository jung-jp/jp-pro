import React, {Component} from 'react';

import 'whatwg-fetch';


class ReposDetails extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            repository : {}
        };
    }

    // fetchData(repo_name = 'repos') {
    //     console.log('https://api.github.com/repos/pro-react/'+repo_name);
    //     fetch('https://api.github.com/repos/pro-react/'+repo_name)
    //     .then( res => res.json() )
    //     .then( data => this.setState({repository:data}) )
    //     ;
    // }
    // componentDidMount() {
    //     // 라우터가 매개변수 속성에 키 'repo_name'을 주입한다.
    //     let repo_name = this.props.params.repo_name;
    //     this.fetchData(repo_name);
    // }
    // componentWillReceiveProps(nextProps) {
    //     // 라우터가 매개변수 속성에 키 'repo_name'을 주입한다.
    //     let repo_name = nextProps.params.repo_name;
    //     this.fetchData(repo_name);
    // }

    renderRepository() {
        let repository = this.props.repositories.find( repo => {
            return repo.name == this.props.params.repo_name ;
        });
        let stars = [];
        for ( let i = 0; i < repository.stargazers_count; i++ ) {
            stars.push('★');
        }
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{stars}</span>
            </div>
        );
    }

    render() {
        if( this.props.repositories.length > 0 ) {
            return this.renderRepository();
        } else {
            return <h4>Loading...</h4>;
        }
    }
}

export default ReposDetails;
