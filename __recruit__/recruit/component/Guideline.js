/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
define([
    'require', 'jquery', 'Component', 'Util', 'recruitOptions'
], function (require) {

    var util = require('Util');
    var opts = require('recruitOptions');


    return require('Component').create({

        name: 'Guideline',

        init: function () {
            console.log('init Guideline');

            var state = this.getState();
            this.setState({
                'sex': state.sex || 'irr',
                'age': state.age || 'irr',
                'age_min': state.age_min || 1999,
                'age_max': state.age_min || 1998,
                'edu': state.edu || 'irr',
                'edu_select': state.edu_select || 0,
                'collect': state.collect || 1,
                'collect_cnt': state.collect_cnt || '',
                'division' : state.division || ['','','']
                // 'division' : state.division || {
                //     'division_1' : '',
                //     'division_2' : '',
                //     'division_3' : '',
                // },
            });

            this.registerEvent();

        },

        shouldUpdate: function () {

        },

        registerEvent: function () {
            console.log('registerEvent : function ()');

            var self = this;
            var guideline = $('#guideline');

            guideline
                // 성별
                .on('click', '#sex input[type=radio]', function () {
                    self.setState({'sex': this.value});
                })
                // 연령
                .on('click', '#age input[type=radio]', function () {
                    self.setState({
                        'age': this.value,
                        'age_min': 1999,
                        'age_max': 1998
                    });

                })
                .on('click', '#age select', function () {
                    if ($('#age_irr').is(':checked')) {
                        self.setState({'age': 'limit'}, true);
                    }
                })
                .on('change', '#age select', function () {
                    self.setState({
                        'age_min': $('#age_min').val(),
                        'age_max': $('#age_max').val()
                    });
                })
                // 학력
                .on('click', '#edu input[type=radio]', function () {
                    self.setState({
                        'edu': this.value,
                        'edu_select': this.value === 'irr' ? 0 : 3
                    }, true);
                })
                .on('click', '#edu select', function () {
                    if ($('#edu_irr').is(':checked')) {
                        self.setState({'edu': 'limit'}, true);
                    }
                })
                .on('change', '#edu select', function () {
                    self.setState({'edu_select': $('#edu_select').val()});
                })
                .on('click', '#edu_graduation', function () {
                    if (!!this.checked) {
                        self.setState({'edu_graduation': this.value});
                    }
                })
                .on('keyup', '#etc_education', function () {
                    self.setState({'etc_education': this.value});
                })
                // 모집인원
                .on('click', '#collect input[type=radio]', function () {
                    self.setState({'collect': this.value});
                })
                .on('click', '#collect_cnt', function () {
                    if (!$('#collect_6').is(':checked')) {
                        self.setState({'collect': $('#collect_6').val()}, true);
                    }
                })
                .on('keyup', '#collect_cnt', function (e) {
                    e.preventDefault();
                    var val = this.value.replace(/[^0-9]/g, '');
                    if (val.length > 6) {
                        //alert('모집인원은 6자리 이내로 작성해 주십시오');
                        this.value = val.substr(0, 6);
                        return;
                    }

                    if (val !== this.value) {
                        this.value = val;
                        return;
                    }
                })
                // 모집분야 입력
                .on('keyup', '#division input[type=text]', function () {
                    var state = self.getState();
                    var division = state.division || {};
                    division[this.id.split('_')[1]] = this.value;
                    self.setState({'division': division});
                    console.log(self.getState());

                })
                // 모집분야 추가
                .on('click', '#division_item_wrap .btn_add', function() {


                    var state = self.getState() || {};
                    console.log(state);
                    var stateDivision = state.division;
                    console.log(stateDivision);
                    stateDivision.splice(-1, 0, '','','');
                    console.log(stateDivision);
                    self.setState({'division':stateDivision}, true);
                    return;
                    //
                    // var $division_item_wrap = $('#division_item_wrap'),
                    //     values = []
                    //     ;
                    //
                    // $division_item_wrap.find('iniput[type=text]').each(function() {
                    //     values.push(this.value);
                    // });
                    // for( var i=0; i<3; i++) {
                    //     values.push('');
                    // }
                    //
                    //
                    // self.setState({'division':values}, true);
                    
                    // var html = '',
                    //     span = '<span class="frm_input"><input type="text" class="frm_input02" name="division[]" id="division_{{seq}}"></span>',
                    //     btnAdd = '<button type="button" class="btn_add"><span>추가</span></button>',
                    //     btnDel = '<button type="button" class="btn_del"><span>삭제</span></button>',
                    //     $division_item_wrap = $('#division_item_wrap'),
                    //     inputCount = $division_item_wrap.find('input[name="division[]"]').size();
                    //
                    // [span, span, span].forEach(function (elt, idx) {
                    //     console.log(inputCount + idx);
                    //     html += elt.replace(/\{\{seq\}\}/g, inputCount + (idx + 1));
                    // });
                    //
                    // if (inputCount >= 3) {
                    //     $division_item_wrap.find('.btn_add').remove();
                    //     html += btnDel + btnAdd ;
                    // }
                    //
                    // $('#division_item_wrap').append('<li>' + html + '</li>');
                })
                // 모집분야 삭제
                .on('click', '#division_item_wrap .btn_del', function () {
                    var $division_item_wrap = $('#division_item_wrap'),
                        $li = $division_item_wrap.find('li')
                        ;
                    if ($li.size() <= 1) {
                        return;
                    }

                    var index = $li.index($(this).closest('li'));

                    $li.each(function() {
                        if( )
                    });



                    // var $division_item_wrap = $('#division_item_wrap'),
                    //     $li = $('#division_item_wrap').find('li'),
                    //     btnAdd = '<button type="button" class="btn_add" id="btn_add_division"><span>추가</span></button>';
                    // if ($li.size() > 1) {
                    //     $(this).closest('li').remove();
                    // }
                    // $division_item_wrap.find('.btn_add').remove();
                    // $li = $division_item_wrap.find('li');
                    // $li.eq($li.size()-1).append(btnAdd);
                    //
                    //
                    // var division =  {};
                    //
                    // $li.find('input[type=text]').each(function() {
                    //     division[this.id] = this.value;
                    // });

                    //self.setState({'division': division});
                    console.log(self.getState());
                })

            ;
        },

        render: function () {
            console.log('render guideline>>>>>>>>>>>>>>>>>>>>>>>');
            console.log(this.getState());
            var state = this.getState() || {},
            // sex = $('#sex'),
            // age = $('#age'),
            // edu = $('#edu'),
            // collect = $('#collect'),
                __z__;
            ['sex', 'age', 'edu', 'collect'].forEach(function (target) {
                $('#' + target).find('input[type=radio]').each(function () {
                    if (this.value === (state[target]) + "") {
                        this.checked = true;
                    }
                });
            });
            util.Option.age('age_min', state.age_min);
            util.Option.age('age_max', state.age_max);
            util.Option.make('edu_select', opts.education, state.edu_select);

            // 모집분야
            // 빈값이면 3개.

            var
                html = '',
                span = '<span class="frm_input"><input type="text" class="frm_input02" name="division[]" id="division_{{seq}}" value="{{value}}" placeholder="{{placeholder}}"></span> ',
                btnAdd = '<button type="button" class="btn_add" id="btn_add_division"><span>추가</span></button> ',
                btnDel = '<button type="button" class="btn_del" id="btn_del_division"><span>삭제</span></button> ',
                placeholder = ['예)웹 디자인', '예)회계재무직', '예)전산개발 및 연구'],
                $division_item_wrap = $('#division_item_wrap'),
                inputCount = $division_item_wrap.find('input[name="division[]"]').size(),
                __xx__
                ;

            // [span, span, span].forEach(function (elt, idx) {
            console.log('length:'+state.division.length);
            state.division.forEach(function (elt, seq) {
                // seq = inputCount + idx;
                html += span.replace(/\{\{seq\}\}/g, seq)
                           .replace(/\{\{placeholder\}\}/g, placeholder[seq] || '')
                           .replace(/\{\{value\}\}/g, state.division[seq] || '')
                ;
            });

            if (inputCount == 0) {
                html += btnDel + btnAdd;
            } else if (inputCount >= 3) {
                $division_item_wrap.find('.btn_add').remove();
                html += btnDel + btnAdd ;
            }

            $('#division_item_wrap').html('<li>' + html + '</li>');

            console.log(state);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<render guideline');
        }
    });
});
