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
	use DA::Addon::TAG::TPermission;
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

# 権限処理
my $conf_file = DA::IS::get_sys_custom($session,"addon/TAG/tag_addon");
my $groups_script = DA::Addon::TAG::TPermission::get_group($session,$conf_file);

# エラーメッセージ
my $conf_msg = DA::IS::get_sys_custom($session,"addon/TAG/message");
my $err_system_msg = $conf_msg->{err_system_msg};
	
my $head_print = &print_head;

my $outbuf = <<buff_end;
$head_print

<body>
<script type="text/javascript">$groups_script</script>
<script type="text/javascript">
var err_system_msg = "$err_system_msg";
</script>
<h2><span id="nextYearTitle"></span>@{[t_('営業年度計画一覧（局別）')]}</h2>
<input type="hidden" id="list_cnt" value="10">
<table class="title_list" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
        <td align="right">@{[t_('　年度：')]}</td>
        <td align="left">
            <select id="yearList">
            </select>@{[t_(' 年度')]}
        </td>
    </tr>
    <tr>
        <td align="right">@{[t_('　本部：')]}</td>
        <td align="left">
        	<div id="showHonBuArea_text"><b><span id="honBuArea"></span></b></div>
        	<div id="showHonBuArea_sel">
        		<select id="honBuSel"></select>
        	</div></td>
    </tr>
    <tr>
        <td align="right">@{[t_('　小本部：')]}</td>
        <td align="left">
        	<div id="showSmallHonBuArea_text"><b><span id="smallHonBuArea"></span></b></div>
        	<div id="showSmallHonBuArea_sel">
        		<select id="smallHonBuSel"></select>
        	</div></td>
    </tr>
    <tr>
        <td class="list_info" height="10" width="" align="right">@{[t_('　局：')]}
        </td>
        <td>
       		<div id="showKyoku_text"><span id="kyokuArea"></span></div>
            <div id="showKyoku_sel">
        		<select id="kyokuSel">
        		</select>
        	</div>
        </td>
    </tr>
    </tbody>
</table>
<table  width="1520" cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1420" align="left"></td>
        <td width="100" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="progress_list_k" border="1">
    <colgroup>
    <col class="sel_label01">
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
    </colgroup>
    <tbody>
        <tr>
            <th colspan="1" rowspan="3" class="subtitle1">@{[t_('No.')]}</th>
            <th colspan="1" rowspan="3" class="subtitle1">@{[t_('部署')]}</th>
            <th colspan="1" rowspan="2" class="subtitle1">@{[t_('操作')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1"><span name="currentYearArea"></span>@{[t_('年度A合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1"><span name="currentYearArea"></span>@{[t_('年度B合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle2"><span name="currentYearArea"></span>@{[t_('年度A+B合計')]}<br>@{[t_('【見込み】')]}</th>
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
            <th class="subtitle1">@{[t_('年間計画')]}<br>@{[t_('一覧')]}</th>
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
    <tbody id="tableContainer">
    </tbody>
    <tfoot id="sumContainer">
    </tfoot>
</table>

</div>
</form>
<p class="style1">&nbsp;</p>
<script type="text/template" id="dep_strategy_tmpl">
	<tr id="line_{{index}}" class="{{odd_or_even}}" >
            <td id="number_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:center;">{{lineNo}}</td>
            <td id="client_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:left;">{{depName}}</td>
            <td id="yrplan_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:center;"><input type="button" name="referenceBtn" id="{{depId}}" value="@{[t_('参照')]}"></div></td>
            <td id="data01_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;">{{currentYearSalesA}}</td>
            <td id="data02_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;">{{currentYearProfitA}}</td>
            <td id="data03_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;">{{currentYearSalesB}}</td>
            <td id="data04_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;">{{currentYearProfitB}}</td>
            <td id="data05_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color1" >{{currentYearSalesAB}}</td>
            <td id="data06_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color1" >{{currentYearProfitAB}}</td>
            <td id="data07_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color2" >{{lastYearSales}}</td>
            <td id="data08_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color2" >{{lastYearProfit}}</td>
            <td id="data09_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;"><font id="fontIncreaseSales1_{{index}}" color="red">{{increaseSales1}}</font></td>
            <td id="data10_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;"><font id="fontIncreaseProfit1_{{index}}" color="red">{{increaseProfit1}}</font></td>
            <td id="data11_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color3" >{{lastYearBudgetSales}}</td>
            <td id="data12_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color3" >{{lastYearBudgetProfit}}</td>
            <td id="data13_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;"><font id="fontIncreaseSales2_{{index}}" color="red">{{increaseSales2}}</font></td>
            <td id="data14_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;"><font id="fontIncreaseProfit2_{{index}}" color="red">{{increaseProfit2}}</font></td>
            <td id="data15_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color4" >{{currentYearSalesABC}}</td>
            <td id="data16_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}','{{odd_or_even}}')" style="text-align:right;" class="backgroud_color4" >{{currentYearProfitABC}}</td>
      </tr>
</script>
<script type="text/template" id="sum_tmpl">
	<tr class="backgroud_green">
            <td colspan="3" rowspan="1"><div align="center">@{[t_('合計')]}</div></td>
            <td><div align="right">{{sum_currentYearSalesA}}</div></td>
            <td><div align="right">{{sum_currentYearProfitA}}</div></td>
            <td><div align="right">{{sum_currentYearSalesB}}</div></td>
            <td><div align="right">{{sum_currentYearProfitB}}</div></td>
            <td><div align="right">{{sum_currentYearSalesAB}}</div></td>
            <td><div align="right">{{sum_currentYearProfitAB}}</div></td>
            <td><div align="right">{{sum_lastYearSales}}</div></td>
            <td><div align="right">{{sum_lastYearProfit}}</div></td>
            <td><div align="right"><font id="fontSumIncreaseSales1" color="red">{{sum_increaseSales1}}</font></div></td>
            <td><div align="right"><font id="fontSumIncreaseProfit1" color="red">{{sum_increaseProfit1}}</font></div></td>
            <td><div align="right">{{sum_lastYearBudgetSales}}</div></td>
            <td><div align="right">{{sum_lastYearBudgetProfit}}</div></td>
            <td><div align="right"><font id="fontSumIncreaseSales2" color="red">{{sum_increaseSales2}}</font></div></td>
            <td><div align="right"><font id="fontSumIncreaseProfit2" color="red">{{sum_increaseProfit2}}</font></div></td>
            <td><div align="right">{{sum_currentYearSalesABC}}</td>
            <td><div align="right">{{sum_currentYearProfitABC}}</div></td>
        </tr>
</script>
</body>
</html>

buff_end

	DA::IS::print_data( $session, $outbuf );
	$session->{dbh}->disconnect();

}

sub print_head {
	my $date = getTime();  
	my $currentYear = $date->{year};
	
	my $random = rand(100000);
	my @include_css = ();
	push @include_css,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/progress_list/style_tag.css?random=$random">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/UTF-8/normal_style.css?random=$random">|;
		
	my @include_js = ();
	push @include_js,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js?random=$random"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/async.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/encoding.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/progress_list_kyoku/index.js?random=$random"></script>|;
		
my $head = <<buf_end;
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
@include_css
<STYLE type="text/css"><!--
    input,textarea { ime-mode: active }

    a:visited {color: #1d39bb}
    a.tab,a.tab:visited { color: black; text-decoration: none}
    .blk,.blk:visited {color: black}
    .sel,.sel:visited {color: a90a08; font-weight: bold}
    .title,.title:visited {color: white}
//--></STYLE>
<script language="JavaScript"><!--
var currentYear = '$currentYear';
var lastYear = parseInt(currentYear) - 1;
var nextYear = parseInt(currentYear) + 1;
//--></script>
@include_js
<title>@{[t_('営業年度計画一覧（局別）')]}</title>
</head>
buf_end

return ($head);
}

sub getTime {
	my $time = shift || time();
    my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime($time);
    $year += 1900;
    $mon ++;
    $min  = '0'.$min  if length($min)  < 2;
    $sec  = '0'.$sec  if length($sec)  < 2;
    $mon  = '0'.$mon  if length($mon)  < 2;
    $mday = '0'.$mday if length($mday) < 2;
    $hour = '0'.$hour if length($hour) < 2;
    my $weekday = ('Sun','Mon','Tue','Wed','Thu','Fri','Sat')[$wday];
        return { 'second' => $sec,
                 'minute' => $min,
                 'hour'   => $hour,
                 'day'    => $mday,
                 'month'  => $mon,
                 'year'   => $year,
                 'weekNo' => $wday,
                 'wday'   => $weekday,
                 'yday'   => $yday,
                 'date'   => "$year-$mon-$mday"
              };
    }