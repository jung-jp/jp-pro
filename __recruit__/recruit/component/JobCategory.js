/**
 * Created by PhpStorm.
 * User: jp
 * Date: 2016-09-08
 */
define([ // jshint ignore:line
    'require', 'jquery', 'Store', 'Component'
], function (require) {
    'use strict';
    var component = require('Component');
    var JobCategory = component.create({

        name : 'JobCategory',

        shouldUpdate : function() {

        },

        testTrigger : function(a,b,c) {
            console.log('===testTrigger==='); // jshint ignore:line
            console.log('a:'+a, 'b:'+b, 'c:'+c );
        },

        init : function () {

            console.log('JobCategory init()');

            this.watchComponent(['Career']);

            $('#existing_recruit').click(function(e) {
                this.setState(career);
            }.bind(this));

            this.addTrigger('test', function() {
                this.testTrigger(1, 2, 5);
            }.bind(this));

            var self = this;
            var storeGroupWrapper = $('#jobCategory'),
                autocompleteLayerEl = storeGroupWrapper.find('._autocomplete');

            storeGroupWrapper.on('click', '.task_input_area > div', function () {
                $(this).find('input:text').focus();
            });

            storeGroupWrapper.on('keypress keydown keyup change', '._task_list_input', function () {
                var searchWord = $(this).val();
                autocompleteLayerEl.show();

                if (searchWord === '') {
                    //초기화할 레이어가 있다면, 실행
                    layerHandler.truncate();
                } else {
                    //레이어를 노출하고, 레이어가 초기화되기 위한 일을 지정한다
                    autocompleteLayerEl.show();
                    console.log('autocompleteLayerEl.show();');
                    layerHandler.addTruncateFuntion({
                        'id' : '_autocomplete',
                        'execute' : function () {
                            storeGroupWrapper.find('input:text').val('');
                            autocompleteLayerEl.hide();
                        }
                    });
                    $.ajax({
                        url: '/js/company/recruit/mock.json',
                        data: {
                            'keyword' : encodeURIComponent(searchWord),
                            'tcode' : 24
                        },
                        type:'get',
                        dataType: 'json'
                    }).done(function(ret) {
                        var fillContentArr = [],
                            charge_job_list_el = storeGroupWrapper.find('.charge_job_list'),
                            template = '<li><label class="form_sp frm_chk02" for="chk_step01_{{id}}"><input type="checkbox" id="chk_step01_{{id}}"><span>{{keyword-name-full}}</span></label></li>',
                            mainContent = '<li>검색 결과가 없습니다.</li>',
                            contentsRows = {}, codeArr;

                        if (ret && ret.contents) {
                            contentsRows = JSON.parse(ret.contents);
                            for (var codeStr in contentsRows) {
                                if (!contentsRows.hasOwnProperty(codeStr)) {
                                    continue;
                                }
                                codeArr = codeStr.split('|');
                                fillContentArr.push(
                                    template.replace(/\{\{id}}/g, codeArr[0] + '_' + codeArr[1])
                                        .replace('{{keyword-name-full}}', contentsRows[codeStr])
                                );
                            }
                        }
                        if (fillContentArr && fillContentArr.length) {
                            mainContent = fillContentArr.join('');
                        }
                        charge_job_list_el.find('li').remove();
                        charge_job_list_el.html(mainContent);
                    });
                }
            });

            //button action
            storeGroupWrapper.on('click', 'a, button', function (e) {
                var thisEl = $(this);
                if (thisEl.hasClass('_remove_keyword')) {
                    $(thisEl).closest('li').remove();
                    var category = [];
                    $(e.delegateTarget).find('.task_list > li button').each(function() {
                        category.push({
                            "keyword" : $(this).data().keyword,
                            "keywordName": $(this).data().keywordName,
                            'codeName' : $(this).data().codeName,
                            'code' : $(this).data().code
                        });
                    });

                    self.setState(category);

                } else if (thisEl.hasClass('_toggle_all_category')) {
                    console.log('_toggle_all_category');
                    storeGroupWrapper.find('.category_area').toggle();

                } else if (thisEl.hasClass('_close_layer')) {
                    console.log('_close_layer');
                    layerHandler.truncate();
                }

                //이벤트가 task_input_area로 확산되는 걸 방지
                event.stopPropagation();
            });
            //이벤트가 밖으로 확산되는 걸 방지
            storeGroupWrapper.on('click', function (event) {
                event.stopPropagation();
            });

        },

        render : function () {

            console.log('JobCategory render()');
            // 이전 값을 가지고 있다가 비교해서 바뀐 부분만 처리 ??
            // beforData = Object.assingn({}, data);
            console.log(this.store.getState());
            var jobCategory = this.store.getState('JobCategory');
            var template, mainContent, appendHtml, fillContentArr=[];
            template = '' +
                '<li>\n' +
                '    <span class="job_name">{{keyword-name}}</span>\n' +
                '    <button type="button" class="btn_close_lpop01 _remove_keyword" data-keyword-name="{{keyword-name}}" data-code="{{code}}" data-keyword="{{keyword}}" data-code-name="{{code-name}}">닫기</button>\n' +
                '</li>\n';
            mainContent = '<li>&nbsp;</li>';
            appendHtml = '\n<li><div><input class="_task_list_input" type="text" style="width:80px;" autocomplete="off"></div></li>\n';
            var tpl;
            jobCategory.forEach(function(cate, idx) {
                tpl = template;
                fillContentArr.push(tpl.replace('{{keyword}}', cate.keyword)
                    .replace(/{{keyword-name}}/g, cate.keywordName)
                    .replace('{{code-name}}', cate.codeName)
                    .replace('{{code}}', cate.code));
            });

            if (fillContentArr && fillContentArr.length) {
                mainContent = fillContentArr.join('');
            }
            $('#jobCategory').find('.task_list').html(mainContent + appendHtml);
        }
    });

    return JobCategory;
});
