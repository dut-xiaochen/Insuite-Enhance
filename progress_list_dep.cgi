#!/usr/local/bin/perl
###################################################
##  INSUITE(R)Enterprise Version 1.2.0.          ##
##  Copyright(C)2001,2014 DreamArts Corporation. ##
##  All rights to INSUITE routines reserved.     ##
###################################################
BEGIN {
	use DA::Init();
	use DA::Gettext;
	use DA::IS;
	use DA::Vars;
	use Data::Dumper;
}
use strict;
&main();
Apache::exit();

sub main {
	
my ($r) = @_;

my $session = {};
DA::Session::get_dir( $session, $r );
my $query = Apache::Request->new( $r, TEMP_DIR => "$session->{temp_dir}" );
DA::Valid::check_param_all( $session, $query );
my $random = rand(100000);
my $head_print = &print_head;
my $conf_file = DA::IS::get_sys_custom($session,"addon/TAG/tag_addon");
my $groups_script = DA::Addon::TAG::TPermission::get_group($session,$conf_file);
my $depId = $query->param("depId");

my @include_js = ();
    push @include_js,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js?random=$random"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/async.js"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/encoding.js"></script>|,
        qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/progress_list_dep/index.js"></script>|;  
my $outbuf =<<buff_end;
$head_print
@include_js
<body>
<script type="text/javascript">
    var depIdsFromReq = "$depId";
    var global_group = tag.global_groups;
    var tmpDepName = "";
    if( depIdsFromReq ) {
        for (int i = 0 ; i < global_groups.length ; i++) {
            var global_group = global_groups[i];
            if(depIdsFromReq.indexOf(global_group[6])){
                deptName.push({"name":global_group[1]+global_group[3]+global_group[5]+global_group[7],"code":global_group[6]});
            }
        }
    } else {
        for (int i = 0 ; i < global_groups.length ; i++) {
            var global_group = global_groups[i];
            deptName.push({"name":global_group[1]+global_group[3]+global_group[5]+global_group[7],"code":global_group[6]});
        }
    }
    init();
</script>

<h2><span id="nextYearTitle"></span>@{[t_('営業年度計画一覧（部門別）')]}</h2>
<input type="hidden" id="list_cnt" value="10">
<table class="title_list" cellpadding="0" cellspacing="0">
    <tr>
        <td align="right">@{[t_('　年度：')]}</td>
        <td align="left">
            <select id = "yearList" name="">
            </select>@{[t_(' 年度')]}
        </td>
    </tr>
    <tr>
        <td align="right">@{[t_('　部門：')]}</td>
        <td align="left">
            <select id = "deptList" name="">
            </select>
        </td>
    </tr>
</table>
<table  width="1590" cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1490" align="left"></td>
        <td width="100" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="progress_list" border="1">
    <colgroup>
    <col class="sel_label01">
    <col class="sel_label02">
    <col class="sel_label03">
    <col class="sel_label04">
    <col class="sel_label05">
    <col class="sel_label06">
    <col class="sel_label07">
    <col class="sel_label08">
    <col class="sel_label09">
    <col class="sel_label10">
    <col class="sel_label11">
    <col class="sel_label12">
    <col class="sel_label13">
    <col class="sel_label14">
    <col class="sel_label15">
    <col class="sel_label16">
    <col class="sel_label17">
    <col class="sel_label18">
    <col class="sel_label19">
    <col class="sel_label20">
    <col class="sel_label21">
    </colgroup>
    <tbody id = "progress_dept_container">
        <tr>
            <th colspan="1" rowspan="3" class="subtitle1">No.</th>
            <th colspan="1" rowspan="3" class="subtitle1">@{[t_('そ<br>の<br>他')]}</th>
            <th colspan="1" rowspan="3" class="subtitle1">@{[t_('クライアント')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('操作')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1"><span name="currentYearArea"></span>@{[t_('年度A合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1"><span name="currentYearArea"></span>@{[t_('年度B合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle2"><span name="currentYearArea"></span>@{[t_('年度A+B合計<br>【見込み】')]}</th>
            <th colspan="2" rowspan="2" class="subtitle3"><span name="lastYearArea"></span>@{[t_('年度見通し')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('増減')]}</th>
            <th colspan="2" rowspan="2" class="subtitle4"><span name="currentYearArea"></span>@{[t_('年度予算')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('増減')]}</th>
            <th colspan="2" rowspan="1" class="subtitle5"><span name="currentYearArea"></span>@{[t_('年度A+B+C合計')]}</th>
        </tr>
        <tr>
            <th colspan="2" rowspan="1" class="subtitle5">@{[t_('【目標】')]}</th>
        </tr>
        <tr>
            <th class="subtitle1">@{[t_('年間<br>計画')]}</th>
            <th class="subtitle1">@{[t_('ｱｸｼｮﾝ<br>ﾌﾟﾗﾝ')]}</th>
            <th class="subtitle1">@{[t_('売上')]}</th>
            <th class="subtitle1">@{[t_('利益')]}</th>
            <th class="subtitle1">@{[t_('売上')]}</th>
            <th class="subtitle1">@{[t_('利益')]}</th>
            <th class="subtitle2">@{[t_('売上')]}</th>
            <th class="subtitle2">@{[t_('利益')]}</th>
            <th class="subtitle3">@{[t_('売上')]}</th>
            <th class="subtitle3">@{[t_('利益')]}</th>
            <th class="subtitle1">@{[t_('売上')]}</th>
            <th class="subtitle1">@{[t_('利益')]}</th>
            <th class="subtitle4">@{[t_('売上')]}</th>
            <th class="subtitle4">@{[t_('利益')]}</th>
            <th class="subtitle1">@{[t_('売上')]}</th>
            <th class="subtitle1">@{[t_('利益')]}</th>
            <th class="subtitle5">@{[t_('売上')]}</th>
            <th class="subtitle5">@{[t_('利益')]}</th>
        </tr>
    </tbody>
    <tfoot id="sumContainer">
    </tfoot>
    <script type="text/template" id="sum_tmpl">
        <tr class="backgroud_blue2">
                <td colspan="5" rowspan="1"><div align="center">@{[t_('合計')]}</div></td>
                <td><div align="right"><font color="{{sum_currentYearSalesA_color}}">{{sum_currentYearSalesA}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearProfitA_color}}">{{sum_currentYearProfitA}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearSalesB_color}}">{{sum_currentYearSalesB}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearProfitB_color}}">{{sum_currentYearProfitB}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearSalesAB_color}}">{{sum_currentYearSalesAB}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearProfitAB_color}}">{{sum_currentYearProfitAB}}</font></div></td>
                <td><div align="right"><font color="{{sum_lastYearSales_color}}">{{sum_lastYearSales}}</font></div></td>
                <td><div align="right"><font color="{{sum_lastYearProfit_color}}">{{sum_lastYearProfit}}</font></div></td>
                <td><div align="right"><font color="{{sum_increaseSales1_color}}">{{sum_increaseSales1}}</font></div></td>
                <td><div align="right"><font color="{{sum_increaseProfit1_color}}">{{sum_increaseProfit1}}</font></div></td>
                <td><div align="right"><font color="{{sum_lastYearBudgetSales_color}}">{{sum_lastYearBudgetSales}}</font></div></td>
                <td><div align="right"><font color="{{sum_lastYearBudgetProfit_color}}">{{sum_lastYearBudgetProfit}}</font></div></td>
                <td><div align="right"><font color="{{sum_increaseSales2_color}}">{{sum_increaseSales2}}</font></div></td>
                <td><div align="right"><font color="{{sum_increaseProfit2_color}}">{{sum_increaseProfit2}}</font></div></td>
                <td><div align="right"><font color="{{sum_currentYearSalesABC_color}}">{{sum_currentYearSalesABC}}</font></td>
                <td><div align="right"><font color="{{sum_currentYearProfitABC_color}}">{{sum_currentYearProfitABC}}</font></div></td>
            </tr>
    </script>
    <script type="text/template" id="progress_list_dep_tmpl">
            <tr id="c_line_{{id}}" class="{{rowStyle}}" >
                <tr id="line_{{id}}" class="{{rowStyle}}" >
                <td id="number_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:center;">{{id}}</td>
                <td id="chketc_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:center;"><input type=checkbox id="chkbox_{{id}}" disabled="true"></td>
                <td id="client_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:left;">{{deptName}}</td>
                <td id="yrplan_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:center;"><input type=button value="{{buttonTyoe}}" disabled="true" onclick=""></td>
                <td id="action_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:center;"><input type=button value="{{buttonType}}" onclick="{{buttonClick}}"></td>
                <td id="data01_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{currentYearSalesA}}</td>
                <td id="data02_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{currentYearProfitA}}</td>
                <td id="data03_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{currentYearSalesB}}</td>
                <td id="data04_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{currentYearProfitB}}</td>
                <td id="data05_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color1" >{{currentYearSalesAB}}</td>
                <td id="data06_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color1" >{{currentYearProfitAB}}</td>
                <td id="data07_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color2" >{{lastYearSales}}</td>
                <td id="data08_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color2" >{{lastYearProfit}}</td>
                <td id="data09_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{increaseSales1}}</td>
                <td id="data10_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{increaseProfit1}}</td>
                <td id="data11_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color3" >{{lastYearBudgetSales}}</td>
                <td id="data12_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color3" >{{lastYearBudgetProfit}}</td>
                <td id="data13_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{increaseSales2}}</td>
                <td id="data14_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;">{{increaseProfit2}}</td>
                <td id="data15_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color4" >{{currentYearSalesABC}}</td>
                <td id="data16_{{id}}" onmouseover="lineOver('{{id}}')" onmouseout="lineOut('{{id}}','{{rowStyle}}')" style="text-align:right;" class="backgroud_color4" >{{currentYearProfitABC}}</td>
            </tr>
        </script>
</table>
<p>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td style="text-align:center;"><input type=button disabled="true" value="@{[t_('状態保存')]}" onclick=""></td>
            <td style="text-align:center;"><input type=button disabled="true" value="@{[t_('その他を集約して印刷')]}" onclick=""></td>
            <td style="text-align:center;"><input type=button disabled="true" value="@{[t_('その他を集約しないで印刷')]}" onclick=""></td>
        </tr>
    </tbody>
</table>

<br>

</p>

<form action="ongoing_project.cgi" name="ongoing_project" method="post">
<div id="ongoing_year" name="year" type="hidden" value=""></div>
<div id="ongoing_depId" name="depId" type="hidden" value=""></div>
<div id="ongoing_depName" name="depName" type="hidden" value=""></div>
<div id="ongoing_custom_code" name="custom_code" type="hidden" value=""></div>
<div id="ongoing_custom_name" name="custom_name" type="hidden" value=""></div>
</form>
</body>
</html>


buff_end

	DA::IS::print_data( $session, $outbuf );
	$session->{dbh}->disconnect();

}

sub print_head {
my $head = <<buff_end;
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/progress_list/style_tag.css">
<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/progress_list/normal_style.css.css">

<STYLE type="text/css"><!--
    input,textarea { ime-mode: active }

    a:visited {color: #1d39bb}
    a.tab,a.tab:visited { color: black; text-decoration: none}
    .blk,.blk:visited {color: black}
    .sel,.sel:visited {color: a90a08; font-weight: bold}
    .title,.title:visited {color: white}
//--></STYLE>
<script>
</script>
</head>
<title>@{[t_('2015年度営業年度計画一覧（部門別）')]}</title>
buff_end
return ($head);
}