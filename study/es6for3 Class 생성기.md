```js
var protoInit = {};
var Class = function(){
  //상동
  var parent, prop, cstrt;
  if(typeof arguments[0] == 'function') parent = arguments[0];
  prop = arguments[parent ? 1 : 0];
  if(prop && prop['constructor']) cstrt = prop['constructor'];
  //실제 클래스
  var cls = function(v){

    //그저 상속체인을 위한 경우는 건너뛴다.
    if(v === protoInit) return;

    //일반적인 함수호출은 예외로처리함
    if(!(this instanceof cls)) throw new TypeError();

    //생성자가 있으면 Super처리후 apply한다.
    if(cstrt){
      var self = this, prev = window.Super;
      window.Super = function(){
        if(parent) parent.apply(self, arguments);
      };
      cstrt.apply(self, arguments);
      window.Super = prev;
    }
  }
  //부모가 있으면 체이닝한다.
  if(parent) cls.prototype = new parent(protoInit);

  //최종클래스 반환
  return cls;
};
```
