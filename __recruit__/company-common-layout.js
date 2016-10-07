/* --- options for jshint --- */
/*global jQuery, alert, confirm */
/*jshint -W100*/
/******************************

 기업회원 마이페이지 레이아웃
 Date: Apr, 2016
 Author: saramin-uidev

 ******************************/
// IE9 미만의 경우 HTML5 엘리먼트를 스크립트로 생성
if (!document.getElementsByClassName) {
    var arrayElements = ['header', 'nav', 'section', 'article', 'aside', 'footer'];
    for (var i = 0; i < arrayElements.length; i++) {
        document.createElement(arrayElements[i]);
    }
}

/**
 *
 * @param action
 * @param callback
 * @returns {Promise}
 */
function askCountAbout(action, callback) {
    return $j.ajax({
        dataType: "json",
        async: false,
        url: "/zf_user/memcom/recruit-count/" + action
    }).done(callback);
}

/*
 CountUpdater
 */
function RecruitCountUpdater(countDefault, options) {
    this.count = countDefault || {};
    this.options = {};
    this.options.all_count_id = options.all_count_id || '';
    this.options.count_elem_id_prefix = options.count_elem_id_prefix || '';
}
RecruitCountUpdater.prototype = {
    "getOptions" : function(key) {
        return this.options[key] || null;
    },
    "updateCount" : function(data) {
        var tmpCount,
            totalCount = 0,
            all_count_id = this.getOptions('all_count_id'),
            key;

        data = data || {};

        for (key in this.count) {
            if (this.count.hasOwnProperty(key)) {
                tmpCount = (data[key] && data.hasOwnProperty(key)) ? data[key] : this.count[key];
                this.setHtml(key, '(' + tmpCount + ')');

                if (all_count_id && key !== all_count_id) {
                    totalCount += parseInt(tmpCount, 10);
                }
            }
        }
        if (all_count_id) {
            this.setHtml(all_count_id, '(' + totalCount + ')');
        }
    },
    "setHtml" : function(key, text) {
        jQuery('#' + this.getOptions('count_elem_id_prefix') + key).text(text);
    }
};

// 레이어팝업 단순오픈
function lpop_position(name) {  // 포지션 위치값 설정
    var wind_h = jQuery(window).height();
    var jQueryLayerpop = jQuery("."+name);
    var lpop_h = jQueryLayerpop.outerHeight();
    if ((wind_h-lpop_h)/2 < 85) {
        lpop_top = 85;
    } else {
        lpop_top = jQueryLayerpop.css("top");
    }
    jQueryLayerpop.css("top",lpop_top);
}
function lpop_open(targa) {
    jQuery(".lpop_wrap").hide();
    if (!jQuery(".interv_dimmed").length) {
        jQuery("."+targa+",#dimmed").show();
    } else if (jQuery(".interv_dimmed").length) {
        jQuery("."+targa+",.interv_dimmed").show();
    }
    lpop_position(targa);
}
function lpop_open_nodimm(targa) {  //이중팝업 오픈
    jQuery("."+targa+",#dimmed").show();
}

jQuery(document).ready(function ($) {

    /*
     공통 레이어 관련 처리
     */

    /**
     * href에 id가 들어있는 경우, 그 아이디로부터 jQuery element를 리턴
     * @param jQueryElem
     * @returns {*}
     */
    function getLayerFromHref(jQueryElem) {
        return jQueryElem && jQueryElem.length > 0 ? $(jQueryElem.attr("href")) : null;
    }

    var btnCorpService = $("#btn_corp_service"),
        btnCorpInfo = $("#btn_corp_name"),
        btnDisplayRecruit = $("#btn_display_recruit");

    var corpServiceDepth2 = getLayerFromHref(btnCorpService),
        layerCorpInfo = getLayerFromHref(btnCorpInfo),
        layerDisplayRecruit = getLayerFromHref(btnDisplayRecruit);

    var layerAllMenu = $('#layer_all_menu'); // 전체 레이어
    var btnlayerAllMenuToogle = $('#layer_all_menu_toggle_btn'); // 전체레이어 열고 닫기 버튼

    var btnCalViewMore = $("#day_view_more");
    var btnAnswerViewMore = $("#answer_view_more");

    var btnfrmSelect = $(".frm_select");
    var btnfrmInputSelect = $(".frm_iptselect");

    //아래 레이어들은 container로 click event를 전파하지 않는다.
    var layersToStopPropagation = [
        btnCorpService,
        btnCorpInfo,
        btnDisplayRecruit,

        corpServiceDepth2,
        layerCorpInfo,
        layerDisplayRecruit,

        layerAllMenu,
        btnlayerAllMenuToogle,

        btnCalViewMore,
        btnAnswerViewMore,

        btnfrmSelect,
        btnfrmInputSelect
    ];

    var local_pay_btns = $('.local'),
        pay_btns = $('._btn_buy'),
        visible = {//closeOpenedLayer()를 위해, 레이어를 노출시킬 땐 여기 체크해놓는다
            corpServiceOpened : false,
            corpInfoOpened : false,
            displayRecruitOpened : false,
            localPayBtns : false,
            layerAllMenu : false,
            layerfrmSelect : false
        };

    function resetLocalCustomSelectBox() {
        local_pay_btns.each(function () {
            $(this).next('div.local_prd_list').hide();
        });
        visible.localPayBtns = false;
    }

    // 열려있는 레이어 비활성화(닫기)
    function closeOpenedLayer() {
        if (visible.corpServiceOpened) {
            corpServiceDepth2.hide();
            btnCorpService.parent().removeClass("opened");
            visible.corpServiceOpened = false;
        }
        if (visible.corpInfoOpened) {
            layerCorpInfo.addClass("closed").removeClass("opened");
            btnCorpInfo.parent().removeClass("opened");
            visible.corpInfoOpened = false;
        }
        if (visible.displayRecruitOpened) {
            layerDisplayRecruit.parent().addClass("closed").removeClass("opened");
            visible.displayRecruitOpened = false;
        }
        if (visible.localPayBtns) {
            resetLocalCustomSelectBox();
        }

        if (visible.layerAllMenu) {
            layerAllMenu.hide();
            visible.layerAllMenu = false;
            $('#layer_all_menu_toggle_btn').removeClass('on');
        }
        if (visible.layerfrmSelect) {
            btnfrmSelect.removeClass("opened");
            btnfrmInputSelect.removeClass("opened");
            visible.layerfrmSelect = false;
        }
    }

    // wmg-10571 미완성공고 완성하기 보여주기, 닫기
    function showLayer(layerName){
        var winH = $(window).height();
        var winW = $(window).width();
        $(layerName).css('top', winH/2-$(layerName).height()/2);
        $(layerName).css('left', winW/2-$(layerName).width()/2);
        $("#dimmed").show();
        $(layerName).show();
    }

    showLayer("#ly_notice_comp");

    $(".ly_notice_comp .close").on("click",function(e) {
        $(".ly_notice_comp").hide();
        $("#dimmed").hide();
        e.preventDefault();
    });

    // 페이지 전체 영역 클릭시 열려있는 레이어 비활성화(닫기)
    $("#container,.lpop_wrap").on("click", closeOpenedLayer);
    $.each(layersToStopPropagation, function(key) {
        if (layersToStopPropagation[key]) {
            layersToStopPropagation[key].on("click", function (ev) {
                ev.stopPropagation();
            });
        }
    });

    if (btnCorpService.length) {

        // '기업서비스안내' 버튼 클릭 이벤트
        btnCorpService.on("click", function (ev) {
            if (!visible.corpServiceOpened) {
                if (visible.corpInfoOpened || visible.displayRecruitOpened || visible.layerAllMenu) {
                    closeOpenedLayer();
                }
                corpServiceDepth2.show();
                $(this).parent().addClass("opened");
                visible.corpServiceOpened = true;
            } else {
                corpServiceDepth2.hide();
                $(this).parent().removeClass("opened");
                visible.corpServiceOpened = false;
            }
            ev.preventDefault();
        });
    }

    if (btnCorpInfo.length) {

        // '상단우측 기업명' 버튼 클릭 이벤트
        btnCorpInfo.on("click", function (ev) {

            if (!visible.corpInfoOpened) {
                if (visible.corpServiceOpened || visible.displayRecruitOpened || visible.layerAllMenu) {
                    closeOpenedLayer();
                }

                if (layerCorpInfo.css("visibility", "hidden")) {
                    layerCorpInfo.css("visibility", "");
                }

                // 기업 정보 호출
                $.ajax({
                    dataType: "json",
                    url: "/zf_user/memcom/index/get-basic-com-info"
                }).done(function (data) {
                    $('#gnb_layer_coupon_cnt').html(data.coupon_cnt);
                    $('#gnb_layer_spoint').html(data.spoint);

                    if( data.logo_html != '' ) {
                        $('#gnb_layer_logo_html').html(data.logo_html);
                    }
                });

                layerCorpInfo.addClass("opened").removeClass("closed");
                $(this).parent().addClass("opened");
                visible.corpInfoOpened = true;
            } else {
                layerCorpInfo.addClass("closed").removeClass("opened");
                $(this).parent().removeClass("opened");
                visible.corpInfoOpened = false;
            }
            ev.preventDefault();
        });
    }

    if (btnDisplayRecruit.length) {

        // '지원자관리(상단 중앙) 채용공고 디스플레이' 버튼 클릭 이벤트
        btnDisplayRecruit.on("click", function (ev) {

            $('#recently_recruit_list_loading').html('<dt>잠시만 기다려주세요..</dt><dd></dd>').show();
            $('#recently_recruit_list').hide();
            $('#recently_recruit_end_list').hide();

            if (!visible.displayRecruitOpened) {
                if (visible.corpServiceOpened || visible.corpInfoOpened) {
                    closeOpenedLayer();
                }

                // 기업 정보 호출
                $.ajax({
                    dataType: "json",
                    url: "/zf_user/company/get-recent-recruit-list",
                    data: { rec_idx : $("#now_rec_idx").text() }
                }).done(function (data) {

                    var recruit_list_html = '';
                    if (data.recruit_list) {
                        $.each(data.recruit_list, function (key, val) {
                            recruit_list_html += '<a href="/zf_user/applicant/apply-manage/index/rec_idx/' + val.rec_idx + '">';
                            recruit_list_html += '<span class="txt title">' + val.title + '</span><span class="pipe">|</span>';
                            recruit_list_html += '<span class="txt period">' + val.opening_dt + ' ~ ' + val.closing_dt + '</span><span class="pipe">|</span>';
                            if (val.manager_nm) {
                                recruit_list_html += '<span class="txt name">담당자명:' + val.manager_nm + '</span>';
                            }
                            recruit_list_html += '</a>';
                        });
                    }

                    $('#recently_recruit_list_contents').html(recruit_list_html);
                    if (recruit_list_html !== '') {
                        $('#recently_recruit_list').show();
                        $('#recently_recruit_list_loading').hide();
                    } else {
                        $('#recently_recruit_list').hide();
                    }

                    var recruit_end_list_html = '';
                    if (data.recruit_end_list) {
                        $.each(data.recruit_end_list, function (key, val) {
                            recruit_end_list_html += '<a href="/zf_user/applicant/apply-manage/index/rec_idx/' + val.rec_idx + '">';
                            recruit_end_list_html += '<span class="txt title">' + val.title + '</span><span class="pipe">|</span>';
                            recruit_end_list_html += '<span class="txt period">' + val.opening_dt + ' ~ ' + val.closing_dt + '(마감)</span><span class="pipe">|</span>';
                            if (val.manager_nm) {
                                recruit_end_list_html += '<span class="txt name">담당자명:' + val.manager_nm + '</span>';
                            }
                            recruit_end_list_html += '</a>';
                        });
                    }

                    $('#recently_recruit_end_list_contents').html(recruit_end_list_html);
                    if (recruit_end_list_html !== '') {
                        $('#recently_recruit_end_list').show();
                        $('#recently_recruit_list_loading').hide();
                    } else {
                        $('#recently_recruit_end_list').hide();
                    }

                    if (recruit_list_html === '' && recruit_end_list_html === '') {
                        $('#recently_recruit_list_loading').html('<dt>더이상 결과가 없습니다.</dt><dd></dd>').show();
                    }
                });

                if (layerDisplayRecruit.css("visibility", "hidden")) {
                    layerDisplayRecruit.css("visibility", "");
                }

                $(this).parent().addClass("opened").removeClass("closed");
                visible.displayRecruitOpened = true;

            } else {
                $(this).parent().addClass("closed").removeClass("opened");
                visible.displayRecruitOpened = false;
            }

            ev.preventDefault();
        });
    }

    if (pay_btns.length) {
        pay_btns.on('click', function () {
            var rec_idx = $(this).data('rec_idx');
            location.href = '/zf_user/recruit-manage/buy-goods-realtime?rec_idx=' + rec_idx;
        });
    }

    if (local_pay_btns.length) {

        local_pay_btns.on('click', function (ev) {
            if (local_pay_btns.length > 1) {
                resetLocalCustomSelectBox();
            }

            var local_prd_list = $(this).next('div.local_prd_list');
            if (local_prd_list.size() > 0) {
                local_prd_list.toggle();
                if (local_prd_list.is(':visible')) {
                    visible.localPayBtns = true;
                }
            } else {
                location.href = $(this).data('buyactionurl');
            }

            ev.stopPropagation();
        });
    }

    /*
     공고 등록하기 버튼 클릭 시 가능여부 판단
     */
    $('._add_new_recruit').on('click', function(e) {
        askCountAbout('can-add-recruit', function (data) {
            var msg = '';
            if (data && data.canAddRecruit === false) {
                if (data.count && data.count.standby) {
                    msg = data.count.standby + '건의 대기중 공고가 있습니다.\n';
                }
                msg += '추가로 공고 등록을 원하실 경우\n';
                msg += '유료서비스를 이용하거나, 기존 대기중 공고를 정리해주세요.';
                alert(msg);
                e.preventDefault();
            }
        });
    });

    /*
     즉시 게재 버튼 클릭 시 가능여부 판단
     */
    $('._activate_recruit_now').on('click', function(e) {
        var self = this;
        askCountAbout('can-add-ing-recruit', function (data) {
            var msg = '';

            if (data) {
                if (data.canAddRecruit === true) {

                    $j.ajax({
                        dataType: "json",
                        url: '/zf_user/recruit-manage/change-status-to-active',
                        data: 'rec_idx=' + $j(self).data('rec_idx')
                    }).done(function(ret) {
                        if (ret && ret.result === 'success') {
                            alert('진행중 공고로 게재하였습니다.');
                            document.location.href = '/zf_user/company/recruit-manage?mode=ing';
                        } else {
                            alert('처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
                        }
                    });

                    e.preventDefault();
                } else if (data.canAddRecruit === false) {
                    msg = '유료상품을 구매하시면\n';
                    msg += '대기없이 바로 진행중 공고로 전환됩니다.\n';
                    msg += '지금 유료상품을 구매하시겠습니까?';
                    if (!confirm(msg)) {
                        e.preventDefault();
                    }
                }
            }
        });
    });

    $('#layer_all_menu_toggle_btn').on('click', function(e){

        if (!visible.layerAllMenu) {
            if (visible.corpInfoOpened || visible.corpServiceOpened || visible.displayRecruitOpened) {
                closeOpenedLayer();
            }
            $('#layer_all_menu').show();
            $('#layer_all_menu_toggle_btn').addClass('on');
            visible.layerAllMenu = true;
        } else {
            $('#layer_all_menu').hide();
            $('#layer_all_menu_toggle_btn').removeClass("on");
            visible.layerAllMenu = false;
        }
        e.preventDefault();
    });

    $('#layer_all_menu_close_btn').on('click', function(e){
        $('#layer_all_menu').hide();
        $('#layer_all_menu_toggle_btn').removeClass('on');
        visible.layerAllMenu = false;
    });

    $('#all_menu_guide_nudge_close_btn').on('click', function(e){
        $('#all_menu_guide_nudge_layer').hide();
    });

    // agent 분기
    var deviceAgent = navigator.userAgent;
    if (deviceAgent.match(/MSIE/)) {
        if (deviceAgent.split("MSIE")[1].split(";")[0].match(/8.0/)) {
            // 폼박스
            var $btncheckbox = $("label.form_sp");
            if ($btncheckbox.length) {
                $btncheckbox.find("input[type=checkbox]").on("change", function() {
                    $(this).parent().toggleClass("check_on");
                });
                $btncheckbox.find("input[type=radio]").on("change", function() {
                    var radioName = $(this).attr("name");
                    $("input:radio[name='"+radioName+"']").each(function() {
                        $(this).parent().removeClass("check_on");
                    });
                    $(this).parent().toggleClass("check_on");
                });
            }
        }
    }

    // datepicker
    if ($(".calendar_reg").length) {
        $("#appl_date, #appl_date1, #appl_date2, #appl_date3, #appl_date4").datepicker({
            monthNames: ['년 1월','년 2월','년, 3월','년 4월','년 5월','년 6월','년 7월','년 8월','년 9월','년 10월','년 11월','년 12월'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            showMonthAfterYear:true,
            dateFormat: 'yy-mm-dd'
        });
    }

    // 툴팁
    var $lpopTooltip = $(".lpop_tooltip_wrap, .lpop_filetip_wrap"),
        $btnTooltip = $(".ico_tooltip span");
    if ($btnTooltip.length) {
        // #container 클릭시 열려있는 레이어 비활성화(닫기)
        $("#container").on("click", function(event) {
            if(event.target.className == "txt_tooltip" || event.target.className == "lpop_tooltip_wrap opened") {
            } else {
                $lpopTooltip.removeClass("opened");
            }
        });
        $btnTooltip.on("click", function (ev) {
            $lpopTooltip.each(function() {
                $(this).removeClass("opened");
            });
            if (!$(this).next().hasClass("opened")) {
                $(this).next().addClass("opened");
            } else {
                $(this).next().removeClass("opened");
            }
            ev.preventDefault();
        });
        $btnTooltip.parent().find(".btn_close_lpop").on("click", function (ev) {
            if (!$(this).parent().hasClass("opened")) {
                $(this).parent().addClass("opened");
            } else {
                $(this).parent().removeClass("opened");
            }
            ev.preventDefault();
        });
    }
    // .lpop_wrap 닫기
    $(".lpop_wrap .btn_close_lpop01").on("click",function(ev) {
        var $intervDimed = $(".interv_dimmed");
        if ($(this).closest(".lpop_wrap").hasClass("depth2")) {
            $(this).closest(".lpop_wrap").hide();
        } else {
            if (!$intervDimed.length) {
                $("#dimmed").hide();
            } else if ($intervDimed.length) {
                $intervDimed.hide();
            }
            $(this).closest(".lpop_wrap").hide();
        }
        ev.preventDefault();
    })
    // .system_alert 닫기
    $(".system_alert > button[type=button]").on("click",function() {
        $("#dimmed").hide();
        $(".lpop_wrap").hide();
        $(this).closest(".system_alert").hide();
    })
    // .category_area 닫기
    $(".select_btn_area .btn_typ_c1").on("click",function() {
        $(".category_area, .charge_job_select").hide();
    })

    // label input
    var $labelWrap = $(".form_nm"),
        $labelInput = $labelWrap.find(".frm_input01");
    if ($labelWrap.length) {
        $labelInput.on("focus", function(ev) {
            $(this).prev('.txt_label').addClass("on");
        });
        $labelInput.on("blur", function(ev) {
            if (!$(this).val().length) {
                $(this).prev('.txt_label').removeClass("on");
            } else {
                ev.preventDefault();
            }
        });
    }

    // tapping 컨텐츠
    var $tapping = $(".tapping");
    var $tappingPrt = $tapping.closest(".tapping_wrap");
    if ($tapping.length) {
        $tapping.find("li").on("click", function() {
            var tabindex = $tapping.find("li").index($(this));
            $tapping.find("li").removeClass("selected");
            $(this).addClass("selected");
            $tappingPrt.find(".tab_cont").hide().eq(tabindex).show();
        });
    }

    // 닫기버튼

    ////////////////////////////////////////////////////////////////
    //응답상태 열기 / 닫기
    $('.btn_condition').on('click', function(ev){

        if (!$('.request_state').hasClass("opened")) {
            $(".request_state").each(function() {
                $('.request_state').removeClass("opened");
            });
            $('.request_state, .btn_condition').addClass("opened");
            $('.btn_condition span').html('닫기');
        } else {
            $('.request_state, .btn_condition').toggleClass("opened");
            $('.btn_condition span').html('열기');
        }
        ev.preventDefault();

    });


    if (btnCalViewMore.length) {
        btnCalViewMore.on('click', function (e) {
            if (!$('.more_ly_wrap').hasClass("opened")) {
                $('.more_ly_wrap').each(function() {
                    $('.more_ly_wrap').removeClass("opened");
                });
                $('.more_ly_wrap').addClass("opened");
            }
            e.preventDefault();
        });
    }

    if (btnAnswerViewMore.length) {
        btnAnswerViewMore.on('click', function (e) {
            if (!$('.noti_ly_wrap').hasClass("opened")) {
                $('.noti_ly_wrap').each(function() {
                    $('.noti_ly_wrap').removeClass("opened");
                });
                $('.noti_ly_wrap').addClass("opened");
            }
            e.preventDefault();
        });
    }


    $('.btn_close_lpop01').on('click', function (e) {
        if ($(this.parentNode).hasClass("opened")) {
            $(this.parentNode).removeClass("opened");
        }
        e.preventDefault();

    });
    ///////////////////////////////////////////////////////////////////

    $(window).load(function () {
        // 셀렉트메뉴
        var $btnIptSelectmenu = $(".frm_iptselect");
        if ($btnIptSelectmenu.length) {
            // 가변적인 셀렉트메뉴의 하위리스트 width값 정의
            $(".select_list, .select_box").each(function() {
                $(this).outerWidth($(this).closest(".frm_iptselect").width());
            });
            $(".frm_iptselect .frm_input01").on("focus", function (ev) {
                $btnIptSelectmenu.each(function() {
                    $(this).removeClass("opened");
                });
                var $inputPrt = $(this).closest(".frm_iptselect");
                if (!$inputPrt.hasClass("opened")) {
                    $(".frm_select, .frm_iptselect").each(function() {
                        $inputPrt.removeClass("opened");
                    });
                    $inputPrt.addClass("opened");
                }
                $(this).prev('.txt_label').addClass("on");
                visible.layerfrmSelect = true;
                ev.preventDefault();
            });
            $(".frm_iptselect .frm_input01").on("blur", function (ev) {
                if (!$(this).val().length) {
                    $(this).prev('.txt_label').removeClass("on");
                } else {
                    ev.preventDefault();
                }
            });
        }
    });

    $(document).ready(function(){
        var fileTarget = $('.filebox .upload_hidden');

        fileTarget.on('change', function(){
            if(window.FileReader){
                // 파일명 추출
                var filename = $(this)[0].files[0].name;
            }
            else {
                // Old IE 파일명 추출
                var filename = $(this).val().split('/').pop().split('\\').pop();
            };
            $(this).siblings('.upload_name').val(filename);
        });
    });

});
