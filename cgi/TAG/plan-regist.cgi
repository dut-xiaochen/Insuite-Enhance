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
	use DA::Ajax;
	use Data::Dumper;
}

use strict;
my $r = shift;
&main($r);
Apache::exit();

sub get_params {
	my ($query) = @_;
	my $info = "";
	
	my $code = $query->param('strategy_code');
	if($code){
		$info = $info . "var strategy_code = $code;";
	}
	else{
		$info = $info . "var strategy_code = -1;";
	}
	
	#change to judge tmp file update time will better
	my $retrieve = $query->param('retrieve');
	if($retrieve){
		$info = $info . "var retrieve = 1;";
	}
	else{
		$info = $info . "var retrieve = 0;";
	}
	
	my $mode = $query->param('mode');
	if($mode){
		$info = $info . "var mode = \"$mode\";";	
	}
	else{
		$info = $info . "var mode = \"edit\";";	
	}
	
	my $customer_name = $query->param('customer_name');
	if($customer_name){
		$info = $info . "var customer_name = \"$customer_name\";";	
	}
	else{
		$info = $info . "var customer_name = \"\";";	
	}
	
	my $record_id = $query->param('record_id');
	if($record_id){
		$info = $info . "var record_id = \"$record_id\";";	
	}
	else{
		$info = $info . "var record_id = \"\";";	
	}
	
	my $charge_group = $query->param('charge_group');
	if($charge_group){
		$info = $info . "var charge_group = \"$charge_group\";";
	}
	else{
		$info = $info . "var charge_group = \"\";";
	}
	
	my $customer_code = $query->param('customer_code');
	if($customer_code){
		$info = $info . "var customer_code = \"$customer_code\";";
	}
	else{
		$info = $info . "var customer_code = \"\";";
	}
	
	my $year = $query->param('year');
	if($year){
		$info = $info . "var year = \"$year\";";
	}
	else{
		$info = $info . "var year = \"\";";
	}
	
	$info = $info . 'var main_charger = "";';
	return $info;
}

sub get_open_select_user_win_script {
	my ($session,$query) = @_;
	my $code = $query->param('strategy_code');
	if(!$code){
		$code = -1;
	}
	
	my $f_param={};
    $f_param->{proc}="@{[t_('クライアント施策 登録')]}";#title
    $f_param->{f_option}= $code;
    $f_param->{cgi}="custom/TAG/plan-regist.cgi";
    $f_param->{save_param}="strategy_code=$code&&retrieve=1";
    $f_param->{target}="USERSEL";
	$f_param->{mode}=4;
    $f_param->{multi}=1;
    $f_param->{sort}=1;
    $f_param->{owner}=0;
    $f_param->{rest}=2;
    $f_param->{func_mode}='regist';
    $f_param->{u_rest}=1;

    my $proc_no = DA::IS::init_fav_usersel($session,$f_param);
	my $popup_tag = DA::IS::get_fav_popup($session, $proc_no);
	
	return $popup_tag;
}

sub get_selected_user{
	my ($session,$query) = @_;
	my $code = $query->param("strategy_code");
	
#	if($query->param("backup_tmp") == "1"){			
#		my $sc = DA::IS::get_data_parse($session,"@{[t_('クライアント施策 登録')]}",$code);
#		DA::IS::set_data_parse($session,$sc,"@{[t_('クライアント施策 登録')]}---backup",$code);
#warn Data::Dumper->Dump(["tmp_backed_up",$sc->{USERSEL}]);
#	}
	
	if($query->param("retrieve") == "1"){
		my $code = $query->param("strategy_code");
		unless($code){
			$code = 1;
		}
		
		my $sc = DA::IS::get_data_parse($session,"@{[t_('クライアント施策 登録')]}",$code);
		
		my $user_sel = $sc->{USERSEL};
		my $key;
		my $result = {};
		while( ($key, $_) = each %$user_sel ){
			if(/:\d:(.*)\s/g){
				$result->{$key} = $1;
			}
		}
		$result = DA::Ajax::make_json($session,$result,"");
		$result = "var sel_user = ". $result;
		$result = $result . ";";
		return $result;
	}
	else{
#		my $sc = DA::IS::get_data_parse($session,"@{[t_('クライアント施策 登録')]}---backup",$code);
#		DA::IS::set_data_parse($session,$sc,"@{[t_('クライアント施策 登録')]}",$code);
#warn Data::Dumper->Dump(["tmp_restore",$sc->{USERSEL}]);		
		return "var sel_user = {};";
	}
}

sub get_project_html{
	my ($query) = @_;
	if($query->param('mode') eq 'edit_continue_strategy'){
		return '<p id="strategy_project"></p>';
	}else{
		return '<input type="text" name="strategy_project" value="" size="15">';
	}
}

sub get_type_html{
	my ($query) = @_;
	if($query->param('mode') eq 'edit_continue_strategy'){
		return '<p id="strategy_type"></p>';
	}else{
		return '<input type="text" name="strategy_type" value="" size="15">';
	}
}

sub get_strategy_name_html{
	my ($query) = @_;
	if($query->param('mode') eq 'edit_continue_strategy'){
		return '<p id="strategy_name"></p>';
	}else{
		return '<input type="text" name="strategy_name" value="" size="50">';
	}
}

sub main {

my ($params) = @_;
my $session = {};
DA::Session::get_dir( $session, $params );
my $query = Apache::Request->new( $params, TEMP_DIR => "$session->{temp_dir}" );
DA::Valid::check_param_all( $session, $query );
my $params = get_params($query);
my $open_select_user_func = get_open_select_user_win_script($session,$query);
my $project_html = get_project_html($query);
my $type_html = get_type_html($query);
my $strategy_name_html = get_strategy_name_html($query);
my $select_users = get_selected_user($session,$query);

my $_DEBUG = 1;
my $prefix = "";

if($_DEBUG == 1) {
	$prefix = rand(100000);
} else {
	$prefix = DA::IS::get_uri_prefix();
}

my $outbuf = <<buff_end;
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">

<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/UTF-8/normal_style.css?$prefix">
<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/plan-regist/plan-regist.css?$prefix">

<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/json2.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/common/popup.js?$prefix"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js?$prefix"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/plan-regist/index.js?$prefix"></script>

<title>@{[t_('クライアント施策 登録')]}</title>
</head>
<body>
<h3>@{[t_('クライアント施策 登録')]}</h3>

<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('閉じる')]}" onclick="javascript:closeWindow();"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('登録')]}" onclick="insertOrUpdateStrategy()"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('削除')]}" onclick=""></td>
        </tr>
    </tbody>
</table>

<table class="plan-regist" border="1">
    <colgroup>
    <col class="sel_label01">
    <col class="sel_label02">
    <col class="sel_label03">
    </colgroup>
    <tbody>
        <tr>
            <td style="text-align:right;">@{[t_('施策コード')]}</td>
            <td colspan="2" id="strategy_code"></td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('クライアント')]}</td>
            <td colspan="2" id="customer_name"></td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('クライアントキーマン')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_client_key" value="" size="15">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('区分')]}</td>
            <td colspan="2" id="strategy_property"></td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('項目')]}</td>
            <td colspan="2">
                $project_html
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('媒体種別')]}</td>
            <td colspan="2">
                $type_html
            </td>
        </tr>
        <tr>
            <td style="text-align:right;"><font color=red>* </font>@{[t_('施策')]}</td>
            <td colspan="2">
                $strategy_name_html
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('担当者')]}</td>
            <td id="strategy_charger">
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('選択')]}" onclick="onSelectUser();"/>
            </td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align:right;">@{[t_('売上見込')]}</td>
            <td>
                <input type="text" name="strategy_sales" value="" size="10" onkeyup="checkNum(this)">@{[t_(' （千円）')]}
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('内訳')]}" onclick="detailAmount('uri_day')">
            </td>
        </tr>
        <tr>
            <td colspan="2" id="uri_day" style="display:none">
                @{[t_('合計：')]}<span id="sales_sum_viewer"></span><br>
                  @{[t_('4月')]}<input type="text" name="strategy_sales_m4" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('7月')]}<input type="text" name="strategy_sales_m7" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('10月')]}<input type="text" name="strategy_sales_m10" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('1月')]}<input type="text" name="strategy_sales_m1" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()"><br>
                  @{[t_('5月')]}<input type="text" name="strategy_sales_m5" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('8月')]}<input type="text" name="strategy_sales_m8" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('11月')]}<input type="text" name="strategy_sales_m11" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('2月')]}<input type="text" name="strategy_sales_m2" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()"><br>
                  @{[t_('6月')]}<input type="text" name="strategy_sales_m6" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('9月')]}<input type="text" name="strategy_sales_m9" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('12月')]}<input type="text" name="strategy_sales_m12" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">  @{[t_('3月')]}<input type="text" name="strategy_sales_m3" value="" size="5" onkeyup="checkNum(this)" onblur="setSalesSumViewer()">
            </td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align:right;">@{[t_('利益見込')]}</td>
            <td>
                <input type="text" name="strategy_profit" value="" size="10" onkeyup="checkNum(this)">@{[t_(' （千円）')]}
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('内訳')]}" onclick="detailAmount('rieki_day')">
            </td>
        </tr>
        <tr>
            <td colspan="2" id="rieki_day" style="display:none">
                @{[t_('合計：')]}<span id="profit_sum_viewer"></span><br>
                  @{[t_('4月')]}<input type="text" name="strategy_profit_m4" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('7月')]}<input type="text" name="strategy_profit_m7" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('10月')]}<input type="text" name="strategy_profit_m10" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('1月')]}<input type="text" name="strategy_profit_m1" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()"><br>
                  @{[t_('5月')]}<input type="text" name="strategy_profit_m5" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('8月')]}<input type="text" name="strategy_profit_m8" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('11月')]}<input type="text" name="strategy_profit_m11" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('2月')]}<input type="text" name="strategy_profit_m2" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()"><br>
                  @{[t_('6月')]}<input type="text" name="strategy_profit_m6" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('9月')]}<input type="text" name="strategy_profit_m9" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('12月')]}<input type="text" name="strategy_profit_m12" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">  @{[t_('3月')]}<input type="text" name="strategy_profit_m3" value="" size="5" onkeyup="checkNum(this)" onblur="setProfitSumViewer()">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('提案時期')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_period2" value="" size="10">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('計上時期')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_period3" value="" size="10">
 					@{[t_('売上年度：')]}
                <select id="strategy_period4">
                    <option value="1">2014</option>
                    <option value="2">2015</option>
            	</select> @{[t_('年度')]}
            </td>
        </tr>
        <tr>
            <td style="text-align:right;"><font color=red>* </font> @{[t_('確度')]}</td>
            <td colspan="2">
                <select id="strategy_accurcy">
                    <option value="1"> </option>
                    <option value="2">A</option>
                    <option value="3">B</option>
                    <option value="4">C</option>
                </select>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('補足説明')]}</td>
            <td colspan="2">
                <textarea name="strategy_memo" cols="60" rows="4"></textarea>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('作成日')]}</td>
            <td colspan="2" id="created_date">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('更新日')]}</td>
            <td colspan="2" id="updated_date">
            </td>
        </tr>
    </tbody>
</table>

<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('閉じる')]}" onclick="javascript:closeWindow();"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('登録')]}" onclick="insertOrUpdateStrategy()"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('削除')]}" onclick=""></td>
        </tr>
    </tbody>
</table>
<form id="plan_regist_form" method="POST">
<input type="hidden" name="mode">
<input type="hidden" name="year">
<input type="hidden" name="customer_code">
<input type="hidden" name="customer_name">
<input type="hidden" name="charge_group">
<input type="hidden" name="record_id">
<input type="hidden" name="strategy_code">
<input type="hidden" name="backup_tmp">
</form>
<script language="javascript">
	var DApopupParams = {
		chkKey: '',
		cgiRdir: '/cgi-bin'
	};
	$params
	$select_users
	function openSelectUserWin(){
		$open_select_user_func;
	}
</script>
</body>
</html>
buff_end

DA::IS::print_data( $session, $outbuf );
$session->{dbh}->disconnect();

}
#<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('一般ユーザ')]}" align="absmiddle" /><a href="./ten-days_files/ten-days.htm" onclick="">@{[t_('恵比寿 一郎')]}</a><br>
#<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('一般ユーザ')]}" align="absmiddle" /><a href="./ten-days_files/ten-days.htm" onclick="">@{[t_('伊藤 二郎')]}</a>
 
