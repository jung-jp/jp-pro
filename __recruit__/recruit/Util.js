/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-12
 * Time: 오후 2:39
 */

var Util = (function() {
    function SelectOpt() {
    }

    SelectOpt.age = function (targetId, val) {
        var date = new Date(),
            baseYear = (date.getFullYear() + 1),
            start = baseYear - 18,
            end = baseYear - 70,
            target = document.getElementById(targetId),
            len = 0
            ;

        target.options[len++] = new Option('전체', '');
        for (var i = start; i > end; i--) {
            target.options[len++] = new Option((baseYear - i) + '세(' + i + ')년생', i, null, i === parseInt(val));
        }
    };

    SelectOpt.make = function (targetId, options, val) {
        var target = document.getElementById(targetId);
        for (var i = 0, len = options.length; i < len; i++) {
            target.options[i] = new Option(options[i], i, null, i === parseInt(val));
        }
    }

    function Test() {
    }

    Test.a = 'aaaa';

    return {
        'Option': SelectOpt,
        'Test': Test
    };
})();

define && define(function () {
    return Util;
});