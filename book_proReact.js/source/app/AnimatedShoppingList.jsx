/**
 * 기본 애니메이션 설정
 */

import React from 'react';
import ReactDom from 'react-dom';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends React.Component
{
    constructor() {
        super(...arguments);

        // 몇 가지 쇼핑 항목을 미리 설정한 "items" 상태를 만든다.
        this.state = {
            items : [
                {id : 1, name : 'Milk'},
                {id : 2, name : 'Yogurt'},
                {id : 3, name : 'Orange Juice'}
            ]
        }
    }

    // 사용자가 입력 필드를 변경할 때 호출된다.
    handleChange(evt) {
        if ( evt.key === 'Enter' ) {
            let newItem = {id : Date.now(), name : evt.target.value};
            let newItems = this.state.items.concat(newItem);
            evt.target.value = '';
            this.setState({items : newItems});
        }
    }

    // 사용자가 클릭하면 호출된다.
    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items:newItems});
    }

    render() {
        let shoppingItems = this.state.items.map( (item, i) => (
            <div key={item.id} className="item" onClick={this.handleRemove.bind(this, i)}>
                {item.name}
            </div>
        ));
        return (
            <div>
                <ReactCssTransitionGroup transitionName="example"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={300}
                        >
                    {shoppingItems}
                </ReactCssTransitionGroup>
                <input type="text" value={this.state.newItem}
                    onKeyDown={this.handleChange.bind(this)} />
            </div>
        )
    }
};

ReactDom.render(<AnimatedShoppingList />, document.getElementById('root'));
