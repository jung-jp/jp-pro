/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
require.config({
    baseUrl: '/js/company/recruit/component',
    paths: {
        'jquery'        : '/js/libs/jquery-1.11.1.min',
        'Store'         : '/js/libs/saramin/dataStore/Store',
        'Component'     : '/js/libs/saramin/dataStore/Component',
        'DataSet'       : '/js/libs/saramin/dataStore/DataSet',
        'LayerHandler'  : '/js/company/recruit/LayerHandler',
        'EventBinding'  : '/js/company/recruit/eventBinding',//페이지 내 store 필요없이 이벤트 핸들링만 하는 경우
        'Util'       : '/js/company/recruit/Util',
        'recruitOptions'       : '/js/company/recruit/recruitOptions'
        // 'modernizr': 'vendor/modernizr-2.8.3.min',
    }
    // shim: { // AMD방식이 아닌 라이브러리 로딩시 추가
    //     'modernizr' : {
    //         exports: 'Modernizr'
    //     }
    // },
    // urlArgs : 'ts=' + (new Date()).getTime()
});

require([
    'require', 'jquery', 'Store',
    'JobCategory', 'Career', 'Guideline', 'EventBinding'
], function (require) {
    'use strict';
    var Store = require('Store'),
        components = [
            // require('JobCategory'),
            // require('Career'),
            require('Guideline')
        ];

    window.RecruitStore = Object.assign({}, Store, {
        name: 'RecruitStore'
        /**
         * 추가함수 구현
         *  ...
         */
    }).registerComponent(components)
        .init()
    //.init(data)
    ;
});
