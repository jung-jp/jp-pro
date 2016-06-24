## Modules (import & export)
ES6에는 언어 레벨에서 모듈을 정의할 수 있다.  
import 와 export 키워드로 외부 모듈을 가져오거나 설정할 수 있으며,  
비동기 모델을 포함하고 있다.( 모듈이 로드될 때까지 실행되지 않는다.)

ES6의 모듈 시스템을 사용하려면, ES6 Module Transpiler, Babel, Traceur 등과 같은 트랜스파일러를 사용해야 한다.

#### export 문법
```js
    export name1, name2, ...
    export *;
    export default name;
```
- name : export할 속성이나 함수, 객체
- * : 파일 내의 정의도니 모든 속성, 함수, 객체
- default : 모듈의 기본값, 파일 내에서 한 번만 호출될 수 있다.

```js
// 속성을 export 하는 것은 CommonJS의 패턴과 동일.
export function foo(){};
export {
    foo : function() {},
    bar : 'bar'
}

// ES6에 추가된 객체 리터럴을 사용하면 더 간단해 진다.
var foo = function(){};
var bar = fonction(){};
export {foo, bar};

// 모듈 전체를 export 하고자 할 때 'default' 키워드 를 함께 사용할 수 있다.
export default function() {};

// export default 는 CommonJS의 패턴과 동일하다고 보면 된다.
module.exports = function(){};
```

#### import
export 한 모듈을 불러올때 import 키워드를 쓸 수 있다.

```js
import name from "module-name";

import {
    member [as alias],
    ...
} from "module-name";

import "module-name" [as name];
```
- module-name : 불러올 모듈명, 파일명
- member : 모듈에서 export 한 멤버의 이름
- alias : 불러온 멤버를 할당할 변수명

```js
// my-module 모듈을 가져와 myModule 변수에 할당
import myModule from 'my-module';

// 위 코드는 아래처럼 쓸 수도 있다.
import 'my-module' as myModule;

// CommonJS 스타일
var myModule = require('my-module');

// 모듈에서 특정 멤버만 변수로 할당
import { foo, bar } from 'my-module';

// CommonJS 스타일
var myModule = require('my-module');
var foo = myModule.foo;
var bar = myModule.bar;

// alias 사용
import {
    reallyReallyLongModuleName as foo
} from 'my-module';


// 모듈을 불러와 실행만 할때 import만 할수 있음.
import 'my-module';

```
