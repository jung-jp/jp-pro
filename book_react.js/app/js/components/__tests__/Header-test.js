jest.dontMock('react');
jest.dontMock('react-dom');
jest.dontMock('react-addons-test-utils');
jest.dontMock('../Header.react');

describe('Header component', function () {
  it('renders provided header text', function () {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var TestUtils = require('react-addons-test-utils');
    var Header = require('../Header.react');

    // DOM 랜더링
    var header = TestUtils.renderIntoDocument(
      React.createElement(Header, {text: "Testing..."})
    );
    //랜더링된 header 컴포넌트의 text를 찾느다.
    var actualHeaderText = ReactDOM.findDOMNode(header).textContent;

    // 예상된 값과 실제 랜더된 값 비교
    expect(actualHeaderText).toBe('Testing...');

    var defaultHeader = TestUtils.renderIntoDocument(
      React.createElement(Header, null)
    );
    var actualDefaultHeaderText = ReactDOM.findDOMNode(defaultHeader).textContent;

    expect(actualDefaultHeaderText).toBe('Default Header');
  });
});
