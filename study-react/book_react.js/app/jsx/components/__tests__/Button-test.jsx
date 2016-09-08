jest.dontMock('../Button.react');
jest.dontMock('react');
jest.dontMock('react-addons-test-utils');
// Button 컴포넌트를 테스트, 클릭했을 때 이벤트 핸들러 함수가 트리거링되는지 체크한다.
describe('Button component', function() {
    it('calls handler function on click', function() {
        var React = require('react');
        var TestUtils = require('react-addons-test-utils');
        var Button = require('../Button.react');
        //새로 새엉된 jest 모사 함수를 반환한다.
        var handleClick = jest.genMockFunction();
        //버튼 컴포넌트의 인스턴스를 DOM에 렌더링 한다.
        var button = TestUtils.renderIntoDocument(
            <Button handleClick={handleClick} />
        );
        // Button 컴포넌트에서 랜더링된 button 태그 한 개 찾음.
        var buttonInstance = TestUtils.findRenderedDOMComponentWithTag(button, 'button');
        // DOM node에서 이벤트 디스패치 event dispatch를 시뮬레이션할 수 있다.
        // TestUtils.Simulate는 React에의해서 지원되는 모든 이벤트에 대해 click()과 같은 이벤트 메소드를 제공한다.
        TestUtils.Simulate.click(buttonInstance);
        expect(handleClick).toBeCalled();

        var numberOfCallsMadeIntoMockFunction = handleClick.mock.calls.length;
        expect(numberOfCallsMadeIntoMockFunction).toBe(1);
    });
});
