/**
 * 사용자 상호작용이 주로 수행되는 컴포넌트다.
 */

import React, {Component} from 'react';
import CheckList from './CheckList';

class Card extends Component
{

    constructor() {
        super(...arguments);
        this.state = {
            showDetails : false
        }
    }

    render() {
        let cardDetails;
        if ( this.state.showdatails ) {
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        }
        return (
            <div className="card">
                <div className="card__title" onClick={
                    _ => this.setState( {showDatails : !this.state.showDetails} )
                    }>{this.props.title}</div>
                {cardDetails}
            </div>
        )
    };
}
