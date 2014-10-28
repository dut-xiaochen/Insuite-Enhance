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
	
my $head_print = &print_head;

my $outbuf = <<buff_end;
$head_print

<body>
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
        <td align="left"><b>@{[t_('営業統括本部')]}</b></td>
    </tr>
    <tr>
        <td class="list_info" height="10" width="" align="right">@{[t_('　局：')]}
        </td>
        <td>
            <select id="kyokuList">
            </select>
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
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('26年度A合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('26年度B合計')]}</th>
            <th colspan="2" rowspan="2" class="subtitle2">@{[t_('26年度A+B合計')]}<br>@{[t_('【見込み】')]}</th>
            <th colspan="2" rowspan="2" class="subtitle3">@{[t_('25年度見通し')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('増減')]}</th>
            <th colspan="2" rowspan="2" class="subtitle4">@{[t_('25年度予算')]}</th>
            <th colspan="2" rowspan="2" class="subtitle1">@{[t_('増減')]}</th>
            <th colspan="2" rowspan="1" class="subtitle5">@{[t_('26年度A+B+C合計')]}</th>
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
        <tr id="line_0" class="oddRow" >
            <td id="number_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:center;">1</td>
            <td id="client_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:left;">@{[t_('第１営業部')]}</td>
            <td id="yrplan_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:center;"><input type="button" id="referenceBtn" name="10012" value="@{[t_('参照')]}"></div></td>
            <td id="data01_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;">123,456,789</td>
            <td id="data02_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;">123,456,789</td>
            <td id="data03_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;">123,456,789</td>
            <td id="data04_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;">123,456,789</td>
            <td id="data05_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color1" >123,456,789</td>
            <td id="data06_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color1" >123,456,789</td>
            <td id="data07_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color2" >123,456,789</td>
            <td id="data08_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color2" >123,456,789</td>
            <td id="data09_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;"><font color="red">-23,456,789</font></td>
            <td id="data10_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;"><font color="red">-23,456,789</font></td>
            <td id="data11_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color3" >123,456,789</td>
            <td id="data12_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color3" >123,456,789</td>
            <td id="data13_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;"><font color="red">-23,456,789</font></td>
            <td id="data14_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;"><font color="red">-23,456,789</font></td>
            <td id="data15_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color4" >123,456,789</td>
            <td id="data16_0" onmouseover="lineOver('0')" onmouseout="lineOut('0','oddRow')" style="text-align:right;" class="backgroud_color4" >123,456,789</td>
      </tr>
      <tr id="line_1" class="evenRow" >
            <td id="number_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:center;">2</td>
            <td id="client_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:left;">@{[t_('第２営業部')]}</td>
            <td id="yrplan_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:center;"><input type=button id=updateBtn value="@{[t_('参照')]}"></div></td>
            <td id="data01_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">88</td>
            <td id="data02_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">15</td>
            <td id="data03_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">102</td>
            <td id="data04_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">22</td>
            <td id="data05_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color1" >190</td>
            <td id="data06_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color1" >37</td>
            <td id="data07_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color2" >175</td>
            <td id="data08_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color2" >22</td>
            <td id="data09_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">15</td>
            <td id="data10_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">15</td>
            <td id="data11_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color3" >200</td>
            <td id="data12_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color3" >40</td>
            <td id="data13_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">36</td>
            <td id="data14_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;">26</td>
            <td id="data15_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color4" >236</td>
            <td id="data16_1" onmouseover="lineOver('1')" onmouseout="lineOut('1','evenRow')" style="text-align:right;" class="backgroud_color4" >66</td>
      </tr>
    </tbody>
    <tfoot>
        <tr class="backgroud_green">
            <td colspan="3" rowspan="1"><div align="center">@{[t_('合計')]}</div></td>
            <td><div align="right">1,633</div></td>
            <td><div align="right">222</div></td>
            <td><div align="right">423</div></td>
            <td><div align="right">76</div></td>
            <td><div align="right">2,056</div></td>
            <td><div align="right">298</div></td>
            <td><div align="right">3,211</div></td>
            <td><div align="right">511</div></td>
            <td><div align="right"><font color="red">-1,155</font></div></td>
            <td><div align="right"><font color="red">-213</font></div></td>
            <td><div align="right">3,802</div></td>
            <td><div align="right">768</div></td>
            <td><div align="right"><font color="red">-1,475</font></div></td>
            <td><div align="right"><font color="red">-385</font></div></td>
            <td><div align="right">2,300</td>
            <td><div align="right">378</div></td>
        </tr>
    </tfoot>
</table>

</div>
</form>
<p class="style1">&nbsp;</p>
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
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/progress_list/style_tag.css">|;
		
	my @include_js = ();
	push @include_js,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/jquery/jquery-2.0.3.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore-1.5.1.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore.string-2.3.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/tagCommon.js?random=$random"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/async.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/encoding.js"></script>|,
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
@include_js
<title>@{[t_('営業年度計画一覧（局別）')]}</title>
</head>
buf_end

return ($head);
}