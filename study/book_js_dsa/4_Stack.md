```js
function Stack() {
    /**
     * 스택 데이터 저장
     * @type {Array}
     */
    this.dataStore = [];
    /**
     * 탑요소의 위치와 새 요소를 추가할 빈공간 탑의 위치
     * @type {Number}
     */
    this.top = 0;
    /**
     * 스택의 값을 추가한다.
     * @return {[type]} [description]
     */
    this.push = function(element) {
        this.dataStore[this.top++] = element;
    };
    /**
     * 스택의 최상위 요소를 꺼낸다.
     */
    this.pop = function() {
        return this.dataStore[--this.top];
    };
    /**
     * 스택의 탑에 있는 요소를 제거하지 않고 내용만 확인
     * @return {[type]} [description]
     */
    this.peek = function() {
        return this.dataStore[this.top -1];
    };

    this.length = function () {
        return this.top;
    };

    this.clear = function () {
        this.top = 0;
    };
}
```

4.3.1 진법변환.
어떤한 진법에서 다른 진법으로 숫자를 변환할 때 스택을 이용할 수 있다. n이라는 숫자가 있고
b라는 진법으로 변환할 때 다음과 같은 알고리즘을 이용할 수 있다.
1. n의 가장 오른쪽 숫자는 n % b 다. 이값을 스택에 추가한다.
2. n을 n / b 으로 치환한다.
3. n=0이 되고 나머지가 없을 때까지 1번, 2번 과정을 반복한다.
4. 스택에 지정된 숫자를 모두 꺼내 변환된 숫자 문자열을 만든다.

```js
function mulBase(num, base) {
    var s = new Stack();
    do {
        s.push(num % base);
        num = Math.floor(num /= base);
    } while(num > 0);
    var converted = '';
    while (s.length() > 0) {
        converted += s.pop();
    }
    return converted;
}
```

4.3.2 회문

앞으로 읽으나 뒤로 읽으나 같은 단어, 구정, 숫자를 회문이라 한다.

[스택을 이용한 회문검사]
```js
function isPalindrome(word) {
    var s = new Stack();
    for( var i = 0; i < word.length; i++ ) {
        s.push(word[i]);
    }
    var rword = "";
    while (s.length > 0)  {
        rword += s.pop();
    }
    if (word == rword) {
        return true;
    } else {
        return false;
    }

    var word = "hello";
    if (isPalindrome(word)) {
        console.log(word + " is a palindrome.");
    } else {
        console.log(word + " is not a palindrome.");
    }
}
```

4.3.3 재귀
스택을 이용한 재귀 구현. 스택을 이용해 재귀 프로세스를 흉내 낸다.
```js
//5팩토리얼 정리
 5! = 5 * 4 * 3 * 2 * 1 = 120

 //n이라는 수의 팩토리얼을 계산하는 재귀 함수.
function factorial(n) {
    if ( n === 0 ) {
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

//스택을 이용한 재귀 과정 시뮬레이션
function fact(n) {
    var s = new Stack();
    While(n > 1) {
        s.push(n--);
    }

    var product = 1;
    while ( s.length() > 0 ) {
        product *= s.pop();
    }
    return product;
}

```
