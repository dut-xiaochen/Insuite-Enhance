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
	
	my $code = $query->param('strategy_code');
	if($code){
		$info = $info . "tag.strategy_code = $code;";
	}
	else{
		$info = $info . "tag.strategy_code = -1;";
	}
	
	#change to judge tmp file update time will more better
	my $retrieve = $query->param('retrieve');
	if($retrieve){
		$info = $info . "tag.retrieve = 1";
	}
	else{
		$info = $info . "tag.retrieve = 0";
	}
	return $info;
}

sub get_open_select_user_win_script {
	my ($session,$query) = @_;
	my $code = $query->param('strategy_code');
	my $f_param={};
    $f_param->{proc}="@{[t_('���饤����Ȼܺ� ��Ͽ')]}";#title
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
	
#	my $sc = DA::IS::get_data_parse($session,"@{[t_('���饤����Ȼܺ� ��Ͽ')]}",$code);
#warn Data::Dumper->Dump([$sc]);	
#	DA::IS::set_data_parse($session,"plan-regist",38);
	return $popup_tag;
}

sub get_select_user{
	my ($session,$query) = @_;
	
	if($query->param("retrieve") == "1"){
		my $code = $query->param("strategy_code");
		unless($code){
			$code = 1;
		}
		my $sc = DA::IS::get_data_parse($session,"@{[t_('���饤����Ȼܺ� ��Ͽ')]}",$query->param("strategy_code"));
		
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

my $outbuf = <<buff_end;
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">

<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/UTF-8/normal_style.css">
<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/plan-regist/plan-regist.css">

<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/common/popup.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js"></script>
<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/plan-regist/index.js"></script>

<title>@{[t_('���饤����Ȼܺ� ��Ͽ')]}</title>
</head>
<body>
<h3>@{[t_('���饤����Ȼܺ� ��Ͽ')]}</h3>

<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('�Ĥ���')]}" onclick="javascript:closeWindow();"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('��Ͽ')]}" onclick="insertOrUpdateStrategy()"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('���')]}" onclick=""></td>
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
            <td style="text-align:right;">@{[t_('�ܺ�������')]}</td>
            <td colspan="2" id="strategy_code">1412345</td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('���饤�����')]}</td>
            <td colspan="2" id="client_name"></td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('���饤����ȥ����ޥ�')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_client_key" value="" size="15">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('��ʬ')]}</td>
            <td colspan="2" id="strategy_property"></td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('����')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_project" value="" size="15">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('���μ���')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_type" value="" size="15">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;"><font color=red>* </font>@{[t_('�ܺ�')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_name" value="" size="50">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('ô����')]}</td>
            <td id="strategy_charger">
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('����')]}" onclick="onSelectUser()">
            </td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align:right;">@{[t_('��師��')]}</td>
            <td>
                <input type="text" name="strategy_sales" value="" size="10">@{[t_(' ����ߡ�')]}
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('����')]}" onclick="detailAmount('uri_day')">
            </td>
        </tr>
        <tr>
            <td colspan="2" id="uri_day" style="display:none">
                @{[t_('��ס�')]}75,000<br>
                  @{[t_('4��')]}<input type="text" name="strategy_sales_m4" value="" size="5">  @{[t_('7��')]}<input type="text" name="strategy_sales_m7" value="" size="5">  @{[t_('10��')]}<input type="text" name="strategy_sales_m10" value="" size="5">  @{[t_('1��')]}<input type="text" name="strategy_sales_m1" value="" size="5"><br>
                  @{[t_('5��')]}<input type="text" name="strategy_sales_m5" value="" size="5">  @{[t_('8��')]}<input type="text" name="strategy_sales_m8" value="" size="5">  @{[t_('11��')]}<input type="text" name="strategy_sales_m11" value="" size="5">  @{[t_('2��')]}<input type="text" name="strategy_sales_m2" value="" size="5"><br>
                  @{[t_('6��')]}<input type="text" name="strategy_sales_m6" value="" size="5">  @{[t_('9��')]}<input type="text" name="strategy_sales_m9" value="" size="5">  @{[t_('12��')]}<input type="text" name="strategy_sales_m12" value="" size="5">  @{[t_('3��')]}<input type="text" name="strategy_sales_m3" value="" size="5">
            </td>
        </tr>
        <tr>
            <td rowspan="2" style="text-align:right;">@{[t_('���׸���')]}</td>
            <td>
                <input type="text" name="strategy_profit" value="" size="10">@{[t_(' ����ߡ�')]}
            </td>
            <td align="right">
                <input type="button" name="" value="@{[t_('����')]}" onclick="detailAmount('rieki_day')">
            </td>
        </tr>
        <tr>
            <td colspan="2" id="rieki_day" style="display:none">
                @{[t_('��ס�')]}75,000<br>
                  @{[t_('4��')]}<input type="text" name="strategy_profit_m4" value="" size="5">  @{[t_('7��')]}<input type="text" name="strategy_profit_m7" value="" size="5">  @{[t_('10��')]}<input type="text" name="strategy_profit_m10" value="" size="5">  @{[t_('1��')]}<input type="text" name="strategy_profit_m1" value="" size="5"><br>
                  @{[t_('5��')]}<input type="text" name="strategy_profit_m5" value="" size="5">  @{[t_('8��')]}<input type="text" name="strategy_profit_m8" value="" size="5">  @{[t_('11��')]}<input type="text" name="strategy_profit_m11" value="" size="5">  @{[t_('2��')]}<input type="text" name="strategy_profit_m2" value="" size="5"><br>
                  @{[t_('6��')]}<input type="text" name="strategy_profit_m6" value="" size="5">  @{[t_('9��')]}<input type="text" name="strategy_profit_m9" value="" size="5">  @{[t_('12��')]}<input type="text" name="strategy_profit_m12" value="" size="5">  @{[t_('3��')]}<input type="text" name="strategy_profit_m3" value="" size="5">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('��ƻ���')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_period2" value="" size="10">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('�׾����')]}</td>
            <td colspan="2">
                <input type="text" name="strategy_period3" value="" size="10">
 					@{[t_('���ǯ�١�')]}
                <select id="strategy_period4">
                    <option value="1">2014</option>
                    <option value="2">2015</option>
            	</select> @{[t_('ǯ��')]}
            </td>
        </tr>
        <tr>
            <td style="text-align:right;"><font color=red>* </font> @{[t_('����')]}</td>
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
            <td style="text-align:right;">@{[t_('��­����')]}</td>
            <td colspan="2">
                <textarea name="strategy_memo" cols="60" rows="4"></textarea>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('������')]}</td>
            <td colspan="2" id="created_date">
            </td>
        </tr>
        <tr>
            <td style="text-align:right;">@{[t_('������')]}</td>
            <td colspan="2" id="updated_date">
            </td>
        </tr>
    </tbody>
</table>

<table cellpadding="0" cellspacing="0" class="title_list">
    <tbody>
        <tr>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('�Ĥ���')]}" onclick="javascript:closeWindow();"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('��Ͽ')]}" onclick="insertOrUpdateStrategy()"></td>
            <td style="text-align:center;"><input type=button id=close value="@{[t_('���')]}" onclick=""></td>
        </tr>
    </tbody>
</table>
<script language="javascript">
	var DApopupParams = {
		chkKey: '',
		cgiRdir: '/cgi-bin'
	};
	$params
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
#<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('���̥桼��')]}" align="absmiddle" /><a href="./ten-days_files/ten-days.htm" onclick="">@{[t_('����� ��Ϻ')]}</a><br>
#<img src="$session->{img_rdir}/custom/TAG/ico_fc_user.png" title="@{[t_('���̥桼��')]}" align="absmiddle" /><a href="./ten-days_files/ten-days.htm" onclick="">@{[t_('��ƣ ��Ϻ')]}</a>
 
