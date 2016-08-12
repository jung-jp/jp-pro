import React,{Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import CardForm from './CardForm';
import DraftStore from '../stores/DraftStore';
import CardActionCreators from '../actions/CardActionCreators';

class NewCard extends Component {

    componentWillMount() {
        setTimeout( _ => CardActionCreators.createDraft(), 0 );
    }

    handleChange(field, value) {
        CardActionCreators.updateDraft(field, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.addCard(this.state);
        browserHistory.push('/');
    }

    handleClose(e) {
        browserHistory.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.state.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewCard.getStores = _ => ([DraftStore]);
NewCard.calculateState = prevState => ({
        draft : DraftStore.getState()
});
export default Container.create(NewCard);
