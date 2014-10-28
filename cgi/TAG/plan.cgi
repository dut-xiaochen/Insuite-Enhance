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
my $r = shift;
&main($r);
Apache::exit();

sub get_params {
	my ($query) = @_;	
	my $info = "";
	
	my $year = $query->param('year');
	if($year){
		$info = $info . "tag.year = $year;";
	}
	
	my $dept_code = $query->param('depId');
	if($dept_code){
		$info = $info . "tag.dept_code = $dept_code;";
	}
	
	my $dept_name = $query->param('depName');
	if($dept_name){
		$info = $info . "tag.dept_name = \"$dept_name\";";
	}
	
	my $customer_code = $query->param('customer_code');
	if($customer_code){
		$info = $info . "tag.customer_code = \"$customer_code\";";
	}
	
	my $customer_name = $query->param('customer_name');
	if($customer_name){
		$info = $info . "tag.customer_name = \"$customer_name\";";
	}
	
	return $info;
}

sub main {

my ($params) = @_;
my $session = {};
DA::Session::get_dir( $session, $params );

my $query = Apache::Request->new( $params, TEMP_DIR => "$session->{temp_dir}" );
DA::Valid::check_param_all( $session, $query );

my $get_param = get_params($query);

my $outbuf = <<buff_end;
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Cache-Control" content="no-cache">

	<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/UTF-8/normal_style.css">
	<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/plan/plan.css">

	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/plan/index.js"></script>

	<title>@{[t_('営業年度計画シート')]}</title>
</head>

<body>
<div id="">
<h2 id="big_title"></h2>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1080" align="left">
			    @{[t_('部門：')]}<b id="dept_name"></b>    @{[t_('クライアント：')]}<b id="client_name"></b>
			<input type="button" id="updateBtn" value="@{[t_('印刷')]}" onclick="window.open('');" disabled>
        </td>
        <td width="110" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>

<table border="1" class="create_plan_a">
    <colgroup>
    <col class="sel_label0">
    <col class="sel_label1">
    <col class="sel_label1">
    <col class="sel_label2">
    <col class="sel_label1">
    <col class="sel_label2">
    <col class="sel_label3">
    <col class="sel_label">
    <col class="sel_label0">
    <col class="sel_label4">
    <col class="sel_label4">
    <col class="sel_label1">
    <col class="sel_label4">
    <col class="sel_label3">
    </colgroup>
    <tbody>
        <tr>
            <th class="subtitle1"></th>
            <th class="subtitle2" id="th1"></th>
            <th class="subtitle3" id="th2"></th>
            <th class="subtitle1">@{[t_('対前年')]}</th>
            <th class="subtitle4" id="th3"></th>
            <th class="subtitle1">@{[t_('対予算')]}</th>
            <th class="subtitle5" id="th4">2015</th>
            <th class="subtitle6" rowspan="3">&nbsp;</th>
            <th class="subtitle1">&nbsp;</th>
            <th class="subtitle1">@{[t_('A合計')]}</th>
            <th class="subtitle1">@{[t_('B合計')]}</th>
            <th class="subtitle2"><b>@{[t_('A+B合計')]}</b></th>
            <th class="subtitle1">@{[t_('C合計')]}</th>
            <th class="subtitle5"><b>@{[t_('A+B+C合計')]}</b></th>
        </tr>
        <tr>
            <td style="text-align:center;">@{[t_('売上')]}</td>
            <td style="text-align:right;" class="subtitle2" id="sales_data_1"></td>
            <td style="text-align:right;" class="subtitle3" id="sales_data_2"></td>
            <td style="text-align:right;"><font color="red" id="sales_data_3"></font></td>
            <td style="text-align:right;" class="subtitle4" id="sales_data_4"></td>
            <td style="text-align:right;"><font color="red" id="sales_data_5"></font></td>
            <td style="text-align:right;" class="subtitle5"><b id="sales_data_6"></b></td>
            <td style="text-align:center;">@{[t_('売上')]}</td>
            <td style="text-align:right;" id="sales_sum_a"></td>
            <td style="text-align:right;" id="sales_sum_b"></td>
            <td style="text-align:right;" class="subtitle2" ><b id="sales_sum_ab"></b></td>
            <td style="text-align:right;" id="sales_sum_c"></td>
            <td style="text-align:right;" class="subtitle5" ><b id="sales_sum_abc"></b></td>
        </tr>
        <tr>
            <td style="text-align:center;">@{[t_('利益')]}</td>
            <td style="text-align:right;" class="subtitle2" id="profit_data_1"></td>
            <td style="text-align:right;" class="subtitle3" id="profit_data_2"></td>
            <td style="text-align:right;"><font color="red" id="profit_data_3"></font></td>
            <td style="text-align:right;" class="subtitle4" id="profit_data_4"></td>
            <td style="text-align:right;"><font color="red" id="profit_data_5"></font></td>
            <td style="text-align:right;" class="subtitle5"><b id="profit_data_6"></b></td>
            <td style="text-align:center;">@{[t_('利益')]}</td>
            <td style="text-align:right;" id="profit_sum_a"></td>
            <td style="text-align:right;" id="profit_sum_b"></td>
            <td style="text-align:right;" class="subtitle2" ><b id="profit_sum_ab"></b></td>
            <td style="text-align:right;" id="profit_sum_c"></td>
            <td style="text-align:right;" class="subtitle5" ><b id="profit_sum_abc"></b></td>
        </tr>
    </tbody>
    <tfoot>
    </tfoot>
</table>
</div>

<div id="">
<br>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1460" align="left"><font size="4"><b>&lt;@{[t_(' 継続施策 ')]}&gt</b></font></td>
        <td width="90" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="create_plan_b" border="1">
    <colgroup>
    <col class="sel_label1">
    <col class="sel_label2">
    <col class="sel_label3">
    <col class="sel_label4">
    <col class="sel_label5">
    <col class="sel_label6">
    <col class="sel_label6">
    <col class="sel_label7">
    <col class="sel_label6">
    <col class="sel_label6">
    <col class="sel_label7">
    <col class="sel_label7">
    <col class="sel_label8">
    <col class="sel_label10">
    <col class="sel_label10">
    </colgroup>
    <tbody id="continue_strategy_container">
        <tr>
            <th colspan="8" class="subtitle1" id="strategy_t1"></th>
            <th colspan="7" class="subtitle2" id="strategy_t2"></th>
        </tr>
        <tr>
            <th class="subtitle3">@{[t_('操作')]}</th>
            <th class="subtitle3">@{[t_('項目')]}</th>
            <th class="subtitle3">@{[t_('媒体種別')]}</th>
            <th class="subtitle3">@{[t_('施策')]}</th>
            <th class="subtitle3">@{[t_('主担当')]}</th>
            <th class="subtitle3">@{[t_('売上見込')]}</th>
            <th class="subtitle3">@{[t_('利益見込')]}</th>
            <th class="subtitle3">@{[t_('時期')]}</th>
            <th class="subtitle4">@{[t_('売上見込')]}</th>
            <th class="subtitle4">@{[t_('利益見込')]}</th>
            <th class="subtitle4">@{[t_('提案時期')]}</th>
            <th class="subtitle4">@{[t_('計上時期')]}</th>
            <th class="subtitle4">@{[t_('確度')]}</th>
            <th class="subtitle4">@{[t_('作成日')]}</th>
            <th class="subtitle4">@{[t_('更新日')]}</th>
        </tr>
        <script type="text/template" id="continue_strategy_tmpl">
        	<tr id="a_line_{{id}}" class="{{odd_or_even}}" >
            	<td id="a_sbutton_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;"><input type="submit" name="" value="@{[t_('編集')]}" onclick="editPlan('{{strategy_code}}')"></td>
            	<td id="a_crbrand_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:left;">{{project}}</td>
            	<td id="a_meclass_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:left;">{{type}}</td>
            	<td id="a_measure_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:left;">{{strategy_name}}</td>
            	<td id="a_cradmin_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:left;">
            		<%if({{main_charger}} != ""){
                	<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('一般ユーザ')]}" align="absmiddle" /> <a href="#" onclick="">{{main_charger}}</a>
            		}%>
            	</td>
            	<td id="a_msales1_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:right;">{{pre_sales}}</td>
            	<td id="a_margin1_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:right;">{{pre_profit}}</td>
            	<td id="a_period1_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{pre_time}}</td>
            	<td id="a_msales2_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:right;">{{sales}}</td>
            	<td id="a_margin2_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:right;">{{profit}}</td>
            	<td id="a_period2_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{period2}}</td>
            	<td id="a_period3_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{period3}}</td>
            	<td id="a_accurcy_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{accurcy}}</td>
            	<td id="a_credate_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{create_date}}</td>
            	<td id="a_upddate_{{id}}" onmouseover="lineOver('{{id}}','a')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','a')" style="text-align:center;">{{update_date}}</td>
        	</tr>
		</script>
      </tbody>
      <tfoot>
          <tr>
              <td style="text-align:center;" colspan="5" rowspan="1" nowrap >@{[t_('合計')]}</td>
              <td style="text-align:right;" id="continue_strategy_sum1" ></td>
              <td style="text-align:right;" id="continue_strategy_sum2" ></td>
              <td style="text-align:center;" ></td>
              <td style="text-align:right;" id="continue_strategy_sum3" ></td>
              <td style="text-align:right;" id="continue_strategy_sum4" ></td>
              <td style="text-align:center;" colspan="5">&nbsp;</td>
          </tr>
      </tfoot>
</table>

<br>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1016" align="left"><font size="4"><b>&lt;@{[t_(' 新規施策 ')]}&gt</b></font></td>
        <td width="110" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="create_plan_b" border="1">
    <colgroup>
    <col class="sel_label1">
    <col class="sel_label2">
    <col class="sel_label3">
    <col class="sel_label4">
    <col class="sel_label5">
    <col class="sel_label6">
    <col class="sel_label6">
    <col class="sel_label7">
    <col class="sel_label7">
    <col class="sel_label8">
    <col class="sel_label10">
    <col class="sel_label10">
    </colgroup>
    <tbody id="new_strategy_container">
        <tr>
            <th colspan="12" class="subtitle2" id="strategy_t3"></th>
        </tr>
        <tr>
            <th class="subtitle4">@{[t_('操作')]}</th>
            <th class="subtitle4">@{[t_('項目')]}</th>
            <th class="subtitle4">@{[t_('媒体種別')]}</th>
            <th class="subtitle4">@{[t_('施策')]}</th>
            <th class="subtitle4">@{[t_('主担当')]}</th>
            <th class="subtitle4">@{[t_('売上見込')]}</th>
            <th class="subtitle4">@{[t_('利益見込')]}</th>
            <th class="subtitle4">@{[t_('提案時期')]}</th>
            <th class="subtitle4">@{[t_('計上時期')]}</th>
            <th class="subtitle4">@{[t_('確度')]}</th>
            <th class="subtitle4">@{[t_('作成日')]}</th>
            <th class="subtitle4">@{[t_('更新日')]}</th>
        </tr>
        <script type="text/template" id="new_strategy_tmpl">
        	<tr id="b_line_{{id}}" class="{{odd_or_even}}" >
            	<td id="b_sbutton_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;"><input type="submit" name="" value="@{[t_('編集')]}" onclick="editPlan('{{strategy_code}}')"></td>
            	<td id="b_crbrand_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:left;">{{project}}</td>
            	<td id="b_meclass_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:left;">{{type}}</td>
            	<td id="b_measure_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:left;">{{strategy_name}}</td>
            	<td id="b_cradmin_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:left;">
                	<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('一般ユーザ')]}" align="absmiddle" /> <a href="./ten-days_files/ten-days.htm" onclick="">{{main_charger}}</a>
            	</td>
            	<td id="b_msales2_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:right;">{{sales}}</td>
            	<td id="b_margin2_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:right;">{{profit}}</td>
            	<td id="b_period2_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;">{{period2}}</td>
            	<td id="b_period3_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;">{{period3}}</td>
            	<td id="b_accurcy_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;">{{accurcy}}</td>
            	<td id="b_credate_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;">{{create_date}}</td>
            	<td id="b_upddate_{{id}}" onmouseover="lineOver('{{id}}','b')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','b')" style="text-align:center;">{{update_date}}</td>
        	</tr>
        </script>
    </tbody>
    <tfoot>
        <tr>
            <td style="text-align:center;" colspan="5" rowspan="1" nowrap >@{[t_('合計')]}</td>
            <td style="text-align:right;" id="new_strategy_sum1"></td>
            <td style="text-align:right;" id="new_strategy_sum2"></td>
            <td style="text-align:center;" colspan="5">&nbsp;</td>
        </tr>
    </tfoot>
</table>
<input type="button" value="@{[t_('新規登録')]}" onclick="makePlan('new')">
<br>

<br>
<table cellpadding="0" cellspacing="0" class="title_list">
    <tr>
        <td width="1016" align="left"><font size="4"><b>&lt;@{[t_(' プロモート・チャレンジ施策')]} &gt</b></font></td>
        <td width="110" align="right">@{[t_('（単位：千円）')]}</td>
    </tr>
</table>
<table class="create_plan_b" border="1">
    <colgroup>
    <col class="sel_label1">
    <col class="sel_label2">
    <col class="sel_label3">
    <col class="sel_label4">
    <col class="sel_label5">
    <col class="sel_label6">
    <col class="sel_label6">
    <col class="sel_label7">
    <col class="sel_label7">
    <col class="sel_label8">
    <col class="sel_label10">
    <col class="sel_label10">
    </colgroup>
    <tbody id="challenge_strategy_container">
        <tr>
            <th colspan="12" class="subtitle2" id="strategy_t4"></th>
        </tr>
        <tr>
            <th class="subtitle4">@{[t_('操作')]}</th>
            <th class="subtitle4">@{[t_('項目')]}</th>
            <th class="subtitle4">@{[t_('媒体種別')]}</th>
            <th class="subtitle4">@{[t_('施策')]}</th>
            <th class="subtitle4">@{[t_('主担当')]}</th>
            <th class="subtitle4">@{[t_('売上見込')]}</th>
            <th class="subtitle4">@{[t_('利益見込')]}</th>
            <th class="subtitle4">@{[t_('提案時期')]}</th>
            <th class="subtitle4">@{[t_('計上時期')]}</th>
            <th class="subtitle4">@{[t_('確度')]}</th>
            <th class="subtitle4">@{[t_('作成日')]}</th>
            <th class="subtitle4">@{[t_('更新日')]}</th>
        </tr>
        <script type="text/template" id="challenge_strategy_tmpl">
        	<tr id="c_line_{{id}}" class="{{odd_or_even}}" >
            	<td id="c_sbutton_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;"><input type="submit" name="" value="@{[t_('編集')]}" onclick="editPlan('{{strategy_code}}')"></td>
            	<td id="c_crbrand_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:left;">{{project}}</td>
            	<td id="c_meclass_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:left;">{{type}}</td>
            	<td id="c_measure_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:left;">{{strategy_name}}</td>
            	<td id="c_cradmin_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:left;">
                	<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('一般ユーザ')]}" align="absmiddle" /> <a href="./ten-days_files/ten-days.htm" onclick="">{{main_charger}}</a>
            	</td>
            	<td id="c_msales2_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:right;">{{sales}}</td>
            	<td id="c_margin2_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:right;">{{profit}}</td>
            	<td id="c_period2_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;">{{period2}}</td>
            	<td id="c_period3_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;">{{period3}}</td>
            	<td id="c_accurcy_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;">{{accurcy}}</td>
            	<td id="c_credate_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;">{{create_date}}</td>
            	<td id="c_upddate_{{id}}" onmouseover="lineOver('{{id}}','c')" onmouseout="lineOut('{{id}}','{{odd_or_even}}','c')" style="text-align:center;">{{update_date}}</td>
        	</tr>
        </script>
    </tbody>
    <tfoot>
        <tr>
            <td style="text-align:center;" colspan="5" rowspan="1" nowrap >@{[t_('合計')]}</td>
            <td style="text-align:right;" id="challenge_strategy_sum1"></td>
            <td style="text-align:right;" id="challenge_strategy_sum2"></td>
            <td style="text-align:center;" colspan="5">&nbsp;</td>
        </tr>
    </tfoot>
</table>
<input type="button" value="@{[t_('新規登録')]}" onclick="makePlan('challenge')">
<br>
</div>
<script>$get_param</script>
</body>
</html>
buff_end

DA::IS::print_data( $session, $outbuf );
$session->{dbh}->disconnect();

}
