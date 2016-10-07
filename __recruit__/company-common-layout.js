/* --- options for jshint --- */
/*global jQuery, alert, confirm */
/*jshint -W100*/
/******************************

 ���ȸ�� ���������� ���̾ƿ�
 Date: Apr, 2016
 Author: saramin-uidev

 ******************************/
// IE9 �̸��� ��� HTML5 ������Ʈ�� ��ũ��Ʈ�� ����
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

// ���̾��˾� �ܼ�����
function lpop_position(name) {  // ������ ��ġ�� ����
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
function lpop_open_nodimm(targa) {  //�����˾� ����
    jQuery("."+targa+",#dimmed").show();
}

jQuery(document).ready(function ($) {

    /*
     ���� ���̾� ���� ó��
     */

    /**
     * href�� id�� ����ִ� ���, �� ���̵�κ��� jQuery element�� ����
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

    var layerAllMenu = $('#layer_all_menu'); // ��ü ���̾�
    var btnlayerAllMenuToogle = $('#layer_all_menu_toggle_btn'); // ��ü���̾� ���� �ݱ� ��ư

    var btnCalViewMore = $("#day_view_more");
    var btnAnswerViewMore = $("#answer_view_more");

    var btnfrmSelect = $(".frm_select");
    var btnfrmInputSelect = $(".frm_iptselect");

    //�Ʒ� ���̾���� container�� click event�� �������� �ʴ´�.
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
        visible = {//closeOpenedLayer()�� ����, ���̾ �����ų �� ���� üũ�س��´�
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

    // �����ִ� ���̾� ��Ȱ��ȭ(�ݱ�)
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

    // wmg-10571 �̿ϼ����� �ϼ��ϱ� �����ֱ�, �ݱ�
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

    // ������ ��ü ���� Ŭ���� �����ִ� ���̾� ��Ȱ��ȭ(�ݱ�)
    $("#container,.lpop_wrap").on("click", closeOpenedLayer);
    $.each(layersToStopPropagation, function(key) {
        if (layersToStopPropagation[key]) {
            layersToStopPropagation[key].on("click", function (ev) {
                ev.stopPropagation();
            });
        }
    });

    if (btnCorpService.length) {

        // '������񽺾ȳ�' ��ư Ŭ�� �̺�Ʈ
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

        // '��ܿ��� �����' ��ư Ŭ�� �̺�Ʈ
        btnCorpInfo.on("click", function (ev) {

            if (!visible.corpInfoOpened) {
                if (visible.corpServiceOpened || visible.displayRecruitOpened || visible.layerAllMenu) {
                    closeOpenedLayer();
                }

                if (layerCorpInfo.css("visibility", "hidden")) {
                    layerCorpInfo.css("visibility", "");
                }

                // ��� ���� ȣ��
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

        // '�����ڰ���(��� �߾�) ä����� ���÷���' ��ư Ŭ�� �̺�Ʈ
        btnDisplayRecruit.on("click", function (ev) {

            $('#recently_recruit_list_loading').html('<dt>��ø� ��ٷ��ּ���..</dt><dd></dd>').show();
            $('#recently_recruit_list').hide();
            $('#recently_recruit_end_list').hide();

            if (!visible.displayRecruitOpened) {
                if (visible.corpServiceOpened || visible.corpInfoOpened) {
                    closeOpenedLayer();
                }

                // ��� ���� ȣ��
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
                                recruit_list_html += '<span class="txt name">����ڸ�:' + val.manager_nm + '</span>';
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
                            recruit_end_list_html += '<span class="txt period">' + val.opening_dt + ' ~ ' + val.closing_dt + '(����)</span><span class="pipe">|</span>';
                            if (val.manager_nm) {
                                recruit_end_list_html += '<span class="txt name">����ڸ�:' + val.manager_nm + '</span>';
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
                        $('#recently_recruit_list_loading').html('<dt>���̻� ����� �����ϴ�.</dt><dd></dd>').show();
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
     ���� ����ϱ� ��ư Ŭ�� �� ���ɿ��� �Ǵ�
     */
    $('._add_new_recruit').on('click', function(e) {
        askCountAbout('can-add-recruit', function (data) {
            var msg = '';
            if (data && data.canAddRecruit === false) {
                if (data.count && data.count.standby) {
                    msg = data.count.standby + '���� ����� ���� �ֽ��ϴ�.\n';
                }
                msg += '�߰��� ���� ����� ���Ͻ� ���\n';
                msg += '���Ἥ�񽺸� �̿��ϰų�, ���� ����� ���� �������ּ���.';
                alert(msg);
                e.preventDefault();
            }
        });
    });

    /*
     ��� ���� ��ư Ŭ�� �� ���ɿ��� �Ǵ�
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
                            alert('������ ����� �����Ͽ����ϴ�.');
                            document.location.href = '/zf_user/company/recruit-manage?mode=ing';
                        } else {
                            alert('ó�� �� ������ �߻��߽��ϴ�. �ٽ� �õ��� �ּ���.');
                        }
                    });

                    e.preventDefault();
                } else if (data.canAddRecruit === false) {
                    msg = '�����ǰ�� �����Ͻø�\n';
                    msg += '������ �ٷ� ������ ����� ��ȯ�˴ϴ�.\n';
                    msg += '���� �����ǰ�� �����Ͻðڽ��ϱ�?';
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

    // agent �б�
    var deviceAgent = navigator.userAgent;
    if (deviceAgent.match(/MSIE/)) {
        if (deviceAgent.split("MSIE")[1].split(";")[0].match(/8.0/)) {
            // ���ڽ�
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
            monthNames: ['�� 1��','�� 2��','��, 3��','�� 4��','�� 5��','�� 6��','�� 7��','�� 8��','�� 9��','�� 10��','�� 11��','�� 12��'],
            dayNamesMin: ['��', '��', 'ȭ', '��', '��', '��', '��'],
            showMonthAfterYear:true,
            dateFormat: 'yy-mm-dd'
        });
    }

    // ����
    var $lpopTooltip = $(".lpop_tooltip_wrap, .lpop_filetip_wrap"),
        $btnTooltip = $(".ico_tooltip span");
    if ($btnTooltip.length) {
        // #container Ŭ���� �����ִ� ���̾� ��Ȱ��ȭ(�ݱ�)
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
    // .lpop_wrap �ݱ�
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
    // .system_alert �ݱ�
    $(".system_alert > button[type=button]").on("click",function() {
        $("#dimmed").hide();
        $(".lpop_wrap").hide();
        $(this).closest(".system_alert").hide();
    })
    // .category_area �ݱ�
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

    // tapping ������
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

    // �ݱ��ư

    ////////////////////////////////////////////////////////////////
    //������� ���� / �ݱ�
    $('.btn_condition').on('click', function(ev){

        if (!$('.request_state').hasClass("opened")) {
            $(".request_state").each(function() {
                $('.request_state').removeClass("opened");
            });
            $('.request_state, .btn_condition').addClass("opened");
            $('.btn_condition span').html('�ݱ�');
        } else {
            $('.request_state, .btn_condition').toggleClass("opened");
            $('.btn_condition span').html('����');
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
        // ����Ʈ�޴�
        var $btnIptSelectmenu = $(".frm_iptselect");
        if ($btnIptSelectmenu.length) {
            // �������� ����Ʈ�޴��� ��������Ʈ width�� ����
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
                // ���ϸ� ����
                var filename = $(this)[0].files[0].name;
            }
            else {
                // Old IE ���ϸ� ����
                var filename = $(this).val().split('/').pop().split('\\').pop();
            };
            $(this).siblings('.upload_name').val(filename);
        });
    });

});
