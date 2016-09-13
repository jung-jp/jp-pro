/**
 * 페이지 내 store 필요없이 이벤트 핸들링만 하는 경우
 */
define([
    'require', 'jquery', 'LayerHandler'
// ], function (require) {
], function () {
    var layerHandler = require('LayerHandler');

    //전역 이벤트 핸들러
    layerHandler.bindRootClickEvent();

    //이전 채용정보 불러오기
    var $existing_recruits_layer = $('#existing_recruits_layer');
    function getExistingRecruitList(page) {
        $.ajax({
            url: '/zf_user/memcom/recruit/existing-recruit-list',
            data: {
                page: page || 1
            },
            type: 'POST',
            dataType: 'json'
        }).done(function(ret) {
            if (ret.result === 'success') {
                $existing_recruits_layer.find('._list_contents').html(ret.html);
            } else {
                alert('불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        });
    }

    $('#existing_recruit').on('click', function (e) {

        $(this).blur();
        e.preventDefault();
        e.stopPropagation();

        layerHandler.showLayerOnDimmed($existing_recruits_layer);
        if ($existing_recruits_layer.find('table').length === 0) {
            getExistingRecruitList();
        }
    });
    $existing_recruits_layer.on('click', 'button', function (e) {
        var page = $(this).val();
        if (page && $(this).parent().hasClass('_paging')) {
            getExistingRecruitList(page);
        }
        e.preventDefault();
    });
});
