function bracketValidate(str) {
    var stack = [];
    var open = str+''.replace(/[^\(])/, '$1');
    var close = str+''.replace(/[^\)])/, '$2');

    if( open.length == close.length) {
        console.log('올바른 수식!');
        return;
    }





}

//validate('2.3 + 23 / 12 + (3.14159 * .24)');


'111(s'.replace(/(\()/, '$1');
