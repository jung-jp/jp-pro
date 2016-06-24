/**
 * 목록에 이름을 표시하고 그 안에 들어 있는 card 컴포넌트를 랜더링 한다.
 * List 컴포넌트는 속성을 통해 cards 배열을 받은 다음 제목이나 설명과 같은 개별 정보를 다시 속성을 통해 Card 컴포넌트로 전달한다.
 */

import React, {Component} from 'react';
import Card from './Card';

class List extends Component {
    render() {
        let cards = this.props.cards.map( card =>
            <Card key={card.id}
                id={card.id} title={card.title} description={card.description} color={card.color} tasks={card.tasks} />
        );
        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propType = {
    title : PropTypes.string.isRequired,
    cards : Proptypes.arrayOf(Proptype.object)
};

export default List;
