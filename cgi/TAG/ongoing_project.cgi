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
my $r = shift;
&main($r);
Apache::exit();

sub main {
	
my ($r) = @_;
my $session = {};
DA::Session::get_dir( $session, $r );
my $query	= Apache::Request->new($r);
my $year = $query->param('year');
my $customer_code = $query->param('customer_code');
my $customer_name = $query->param('customer_name');
my $depId = $query->param('depId');
my $depName = $query->param('depName');

# エラーメッセージ
my $conf_msg = DA::IS::get_sys_custom($session,"addon/TAG/message");
my $err_system_msg = $conf_msg->{err_system_msg};
my $err_double_click_msg = $conf_msg->{err_double_click_msg};

my $head_print = &print_head;

my $outbuf = <<buff_end;
$head_print

<body class="bodyBgColor">

<script type="text/javascript">
var year = "$year";
var depId = "$depId"
var depName = "$depName";
var customer_code = "$customer_code";
var customer_name = "$customer_name";
var allDataList = [];
var continueDataList = [];
var lock = false;
var err_system_msg = "$err_system_msg";
var err_double_click_msg = "$err_double_click_msg";
var date = new Date().getTime();
</script>

<h2>@{[t_('継続施策登録')]}</h2>
<form id="ongoing_form" action="plan.cgi" method="POST">
<input type="hidden" id="list_cnt">

<input type="hidden" id="year" name="year">
<input type="hidden" id="customer_code" name="customer_code">
<input type="hidden" id="customer_name" name="customer_name">
<input type="hidden" id="depId" name="depId">
<input type="hidden" id="depName" name="depName">

<table class="title_list" cellpadding="0" cellspacing="0">
    <tr>
        <td style="text-align:right;">@{[t_('年度：')]}</td>
        <td style="text-align:left;"><b><span><script>document.write(year);</script></span>@{[t_('年度分')]}</b></td>
    </tr>
    <tr>
        <td style="text-align:right;">@{[t_('クライアント：')]}</td>
        <td style="text-align:left;"><b><span><script>document.write(customer_name);</script></span></b></td>
    </tr>
</table>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="160" style="text-align:left;"></td>
        <td width="720" style="text-align:right;">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="ongoing_project" border="1">
    <colgroup>
    <col class="sel_label01">
    <col class="sel_label02">
    <col class="sel_label03">
    <col class="sel_label04">
    <col class="sel_label05">
    <col class="sel_label06">
    <col class="sel_label07">
    <col class="sel_label08">
    </colgroup>
    <tbody id="container">
        <tr>
            <th colspan="2" width="40" class="subtitle"><input type=checkbox id="allCheck" onclick="allchangeCheckBox();"></th>
            <th class="subtitle">@{[t_('クライアント')]}</th>
            <th class="subtitle">@{[t_('項目')]}</th>
            <th class="subtitle">@{[t_('内容')]}</th>
            <th class="subtitle">@{[t_('売上')]}</th>
            <th class="subtitle">@{[t_('利益')]}</th>
            <th class="subtitle">@{[t_('時期')]}</th>
        </tr>
    </tbody>
</table>
<br>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td height="10" width="" align="left">
                <font color="red">@{[t_('※明らかに次年度見込みがないものはチェックをして下さい。')]}</font>
            </td>
        </tr>
        <tr>
            <td height="10" width="" align="left">
                <input type=button id="goBtn" value="@{[t_('継続施策をコピーして営業計画を作成')]}">
            </td>
        </tr>
    </tbody>
</table>
</form>
<script type="text/template" id="list_tmpl">
        <tr id="line_{{index}}" class="{{odd_or_even}}" data-value="{{strategy_code}}">
            <td id="number_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:center;">{{lineNo}}</td>
            <td id="cpychk_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:center;"><input type=checkbox name="chkbox" id="chkbox_{{index}}" onclick="changeCheckBox('{{index}}');" data-value="{{strategy_code}}" data-index="{{index}}"></td>
            <td id="client_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:left;">{{customer_name}}</td>
            <td id="column_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:left;">{{project}}</td>
            <td id="detail_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:left;">{{strategy_name}}</td>
            <td id="uriage_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:right;">{{sales}}</td>
            <td id="profit_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:right;">{{profit}}</td>
            <td id="period_{{index}}" onmouseover="lineOver('{{index}}')" onmouseout="lineOut('{{index}}')" style="text-align:left;">{{period}}</td>
        </tr>
</script>
</body>
</html>

buff_end

	DA::IS::print_data( $session, $outbuf );
	$session->{dbh}->disconnect();

}

sub print_head {	
	my $random = rand(100000);
	my @include_css = ();
	push @include_css,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/progress_list/style_tag.css?random=$random"">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/UTF-8/normal_style.css?random=$random">|;
		
	my @include_js = ();
	push @include_js,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js?random=$random"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/async.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/encoding.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/ongoing_project/index.js?random=$random"></script>|;
		
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
//--></script>
@include_js
<title>@{[t_('継続施策登録')]}</title>
</head>
buf_end

return ($head);
}