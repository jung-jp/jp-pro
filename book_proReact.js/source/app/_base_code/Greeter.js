import React, {Component} from 'react';
import {render} from 'react-dom';

class Greeter extends Component {
    render() {
        return (
            <h1>{this.props.salutation}</h1>
        );
    }
}

Greeter.propTypes = {
    // salutation : PropTypes.string.isRequired
    salutation : PropTypes.string
}

Greeter.defaultProops = {
    salutation : "default Hello "
}

//render(<Greeter salutation="Hello World" />, document.getElementById('root'));
render(<Greeter />, document.getElementById('root'));

/**
 * 기본형 PropTypes
 */
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number  //  숫자 또는 구문 분석으로 숫자를 얻을 수 있는 값
PropTypes.object
PropTypes.string

/**
 * 조합 기본형 PropTypes
 */
//속성이 여러 형식 중 하나일 수 있다.
PropType.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.func
])

// 속성이 특정 형식의 벼열이어야 한다.
PropTypes.arrayOf(PropTypes.number);

// 속성이 특정 형식의 벼열이어야 한다.
PropTypes.objectOf(PropTypes.number);

/**
 * 특수 PropTypes
 */
// 속성이 랜더링 가능한 어떤 값이라도 될 수 있다. (숫자, 문자열, 요소, 배열)
PropTypes.node

// 속성이 리액트 요소여야 한다.
PropTypes.element

// 속성이 지정한 클래스의 인스턴스여야 한다. (자바스크립트의 instanceof 연산자를 이용)
PropTypes.instanceOf(Message);

// 속성이 열거형과 같이 특정한 범위의 값으로 한정돼야 한다.
PropTypes.oneOf(['News', 'Photos'])
