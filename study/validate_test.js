/**
 * Created by PhpStorm.
 * User: user
 * Date: 2016-09-13
 * Time: 오후 1:29
 */

var ValidateFun = {

    required : function(str) {
        if(this.empty(str) === false || str.length === 0 ) {
            return false;
        }
        return true;
    },

    empty : function(str) {
        str = str || '';
        return str.replace(/^\s+|\s+$/g, '') === '';
    },

    min : function(str) {
        return false;
    },

    max : function(str) {
        return false;
    },

    range : function(str) {
        return false;
    },

    email : function(str) {
        return false;
    },

    number : function(value, id) {
        // var result = !isNan(value);

        return false;
    },
    alpha_num : function(str) {
        return !/[^a-z0-9]/i.test(str);
    },

    _z_:{}
}

var Validate = (function() {

    var data = {

    };
    var config = {
        'Career': {
            'career_cd': {
                required: true,
                min: 1,
                max: 3,
                range: [1, 10],
                email: true,
                focus: true,
                message: {
                    required: '경력여부를 선택해 주세요.',
                    min: '최소값은 {min}이상 입니다.',
                    max: '최대값은 {max}이상 입니다.',
                    range: '경력년은 {$1}이상 {$2}이하 입니다.',
                    email: '올바른 이메일 주소가 아닙니다.'
                },
                fnc: function () {
                }
            },
            'career_min': {
                required: true,
                min: 1,
                message: {
                    required: '경력 시작년을 선택해 주세요.',
                    min: '최소값은 {min}이상 입니다.'
                },
                fnc: function () {
                }
            }
        }
    };

    function Validate() {
        this.data = {};
        this.config = config;
        this.msg = {};
        this.vFun = ValidateFun;
        this.result = {};
    }

    Validate.prototype = {

        setData : function(data) {
            this.data = Object.assign({}, this.data, data);
            return this;
            console.log(this.data);
        },

        setConfig : function(config) {
            this.config = Object.assign({}, this.config, config);
            return this;
        },

        setMessage : function() {
            return this;
        },

        isValid : function(method, value) {
            console.log(method, value);
            if(!!this.vFun[method]) {
                return this.vFun[method](value);
            }
            return true;

        },

        just : function() {
            var _t = this,
                rule, value, result = [];

            Object.keys(_t.config).forEach(function(category) {
                //console.log('category : ', category);
                if( !!_t.config[category] ) {
                    // console.log('2: ', _t.config[category]);
                    // console.log('2: ', _t.data[category]);
                    Object.keys(_t.config[category]).forEach(function(item) {
                        // console.log('3: ',item);
                        // if(!!_t.config[category] && !!_t.config[category][item]) {
                        if(!!_t.config[category][item]) {
                            //console.log(_t.config[category][item]);
                            rule = Object.keys(_t.config[category][item]);
                            value = !!_t.data[category][item] ? _t.data[category][item] : '';

                            rule.forEach(function(method) {
                                // console.log(result);
                                if( result.length > 10 ) {
                                    console.log('aaa==================');
                                    return result;

                                }
                                //console.log(`_t.isValid(${method}, ${value})`);
                                if( _t.isValid(method, value) === false ) {
                                    console.log('result push==========');

                                    var obj = _t.config[category][item];
                                    if( !obj.message || !obj.message[method]) {
                                        return false;
                                    }
                                    result.push({
                                        target : item,
                                        focus : rule.focus || false,
                                        //message : !!rule.message ? rule.message[method].replace('{'+method+'}', '') : ''
                                        message : function() {

                                            console.log(obj);
                                            console.log('===============method::'+method);


                                            var msg = obj.message[method].replace('{'+method+'}', obj[method]);
                                            if( method === 'range') {
                                                msg.replace('{$0}', obj[method].split[0])
                                                    .replace('{$1}', obj[method].split[1]);
                                            }

                                            return msg;

                                        }()
                                    });
                                    console.log(result.slice());
                                };
                            });
                        }
                    });
                }
            });

            // console.log(result);
            //
            // Object.keys(_t.config[name]).forEach(function(objKey) {
            //
            //     if( !_t.data[name] ) {
            //         return false;
            //     }
            //
            //     if( Object.keys(objKey) > 1 ) {
            //         config.isValid(objKey);
            //     }
            // });
            //
            // this.config[name];
        },

        lazy : function() {

        }


    };
    return new Validate();
})();

define && define(function () {
    return Validate;
});
