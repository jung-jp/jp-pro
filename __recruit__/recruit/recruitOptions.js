/**
 * Created by PhpStorm.
 * User: user
 * Date: 2016-09-13
 * Time: 오전 9:36
 */
var recruitOptions = {
    education: ["학력무관", "고등학교졸업", "대학졸업(2,3년)", "대학교졸업(4년)", "석사졸업", "박사졸업", "고등학교졸업이상", "대학졸업(2,3년)이상", "대학교졸업(4년)이상", "석사졸업이상"],
    collect : {
        '1': '0명',
        '2': '00명',
        '3': '1명',
        '4': '2명',
        '5': '3명',
        '' : '직접입력'
    }
};

define && define(function () {
    return recruitOptions;
});