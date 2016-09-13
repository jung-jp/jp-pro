/**
 * Created by PhpStorm.
 * User: user
 * Date: 2016-09-13
 * Time: 오후 1:29
 */
// var data = {
//     first_name : 'super',
//     last_name : 'man',
//     age : 'unknow',
//     username : 'o_o'
// }
//
// validator.config = {
//     first_name : 'isNonEmpty',
//     age : 'isNumber',
//     username : 'isAlphaNum'
// }

//value, 'isNumber'

var Validator = (function() {
    var altMessage = {
        'id' : '땡댕댕은 필수 입력 항목 입니다.',

        '' : ''
    }
    function Validator() {

    }

    Validator.prototype = {
        isNumber : function(value, id) {
            var result = !isNan(value);

            if( altMessage[id] ) {

            }
            //altMessage[id]();
            return {
                'result' : !isNan(value),
                'msg' : ''
            };
        }
        },
        isAlphaNum : function() {
            return !/[^a-z0-9]/i.test(value);
        }

    };
    return new Validator();
})();

define && define(function () {
    return Validator;
});

