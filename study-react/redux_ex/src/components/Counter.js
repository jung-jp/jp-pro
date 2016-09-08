import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
    render() {
        return (
            <h1>VALUE : {this.props.value}</h1>
        );
    }
}

// store의 state를 props에 매필하기 위한 arrow function
let mapStateToProps = state => {
    return {
        value : state.counter.value
    };
}

// mapStateToProps을 이용하여 컴포넌트를 store에 연결.
Counter = connect(mapStateToProps)(Counter);

export default Counter;

/**
 connect는
 react-redux의 내장 API이다. 이 함수는 React Component 를 Redux Store에 `연결`해 준다.
 이 함수의 리턴값은 특정 컴포넌트 클래스의 props를 store의 데이터에 연결시켜주는 또 다른 함수를 리턴한다.
 리턴된 함수에 컴포넌트를 인수로 넣어 실행하면 , 기존 컴포넌트를 수정하는게 아니라 새로운 컴포넌트를 return 한다.

 connectAPI
 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 - mapStateToProps(state, [ownProps]) : (Function) store의 state를 컴포넌트의 props에 매핑 시켜준다.
   ownProps 인수가 명시될 경우, 이름 통행 함수 내부에서 컴포넌트의 props 값에 접근할 수 있다.
 - mapDispatchToProps(dispatch, [ownProps]) : (Function Object) 컴포넌트의 특정 함수형 props를 실행 했을 때, 개발자가 지정한 action을
   dispatch 하도록 설정한다. ownProps의 용도는 위 인수와 동일.



 */
