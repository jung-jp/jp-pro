### 자주 사용 되는 5가지 배열 메소드

#### indexOf

```js
// 미사용
var isExist =false;
for( var i = 0; max = array.length; i += 1 ) {
    if ( array[i] === "value" ){
        isExist = true;
    }
}

// 사용
var isExist = (array.indexOf('value')!== -1 )
```

#### filter
JSON 오브젝트로 이루어진 배열중에 특정 값만 filter

```js
var arr = [    
    {"name":"apple", "count": 2},    
    {"name":"orange", "count": 5},    
    {"name":"pear", "count": 3},    
    {"name":"orange", "count": 16}
];    
var newArr = arr.filter(function(item){    
    return item.name === "orange";
});  
console.log("Filter results:", newArr);
```

#### forEach
for루프가 성능상 더 좋지만 일반적인 사용에는 큰차이가 없으므로 사용해도 좋다.

```js
var arr = [1, 2, 3, 4, 5];
arr.forEach( (v, i) => {
    if ( v === 3 ) {
        console.log( v, i ); //3 2
    }
});
```

#### map
map이 forEach 보다 성능이 미세하게 좋다.  
map은 루프에서 return 할 수 있다.

```js
var a = [1, 2, 3, 4, 5];
var b = a.forEach( (v, i) => v + 1 ); // undefined
var c = a.map( (v, i) => v + 1 );  // [2, 3, 4, 5, 6]
```

#### reduce
##### 구문  
    arr.reduce(callback[, initialValue])

```js
    [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
    }, 10); // 초기 prev값 지정(생략시 0번 index)
```

배열 값 더하기
```js
var total = [0, 1, 2, 3].reduce(function(a, b) {
    return a + b;
});
// total == 6
```

2차원 배열 1차원으로 만들기
```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```
