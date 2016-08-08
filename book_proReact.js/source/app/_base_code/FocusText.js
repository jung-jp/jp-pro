/**
 * ref를 이용해  실제 DOM 마크업의 접근할경우
 * ( react는 컴포넌트를 렌더링할 때 항상 가상 DOM을 대상으로 작업한다. 개발자가 실제 DOM을 조작하지 않는다.)
 * 사용자가 클릭하면 텍스트 입력으로 포커스를 전환하는 텍스트와 버튼으로 구성된 컴포넌트
 */

import React, {Component} from 'react';

class FocusText extends Component {
    handleClick() {
        // 원시 DOM API를 이용해 텍스트 입력으로 포커스 전환
        this.refs.myTextInput.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)} />
            </div>
        )
    }
}
