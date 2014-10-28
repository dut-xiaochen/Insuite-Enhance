#!/usr/local/bin/perl
###################################################
##  INSUITE(R)Enterprise Version 1.2.0.          ##
##  Copyright(C)2001,2002 DreamArts Corporation. ##
##  All rights to INSUITE routines reserved.     ##
###################################################
BEGIN {
	use DA::Init();
	use DA::Gettext;
	use DA::IS;
	use DA::Vars;
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
	
#	# ひびき
#	my $hibiki_path;
#	my $path=DA::IS::get_sys_custom({},'hibiki_path',1);
#	if ($path->{hibiki_smartdb} =~ /^\/(.*)\//) { $hibiki_path='/'.$1; }
#	
#	my $session_param={};
#   	$session_param->{name}=$session->{name};	
#   	$session_param->{user}=$session->{user};
#	my $session_json = JSON::objToJson($session_param);
#	warn $session_param->{name};
#	warn $session_param->{user};
#	warn $session_json;
	
	my $head_print = &print_head;

	my $outbuf = <<buff_end;
$head_print

<body class="popBody" style="text-align: left;">
<div id="unframed_content">
<h2>@{[t_('アクションプラン 登録')]}</h2>
<form name="editTask" id="editTask" method="POST" action="#">
<div class="DivUsual">
<form name="form1" action="#" method="POST">
<table class="task-regist">
    <tr>
        <td>
            <div align="left">
            	<input type="button" id="closeBtn" value="@{[t_('閉じる')]}">\
            	<input type="button" id="saveBtn" value="@{[t_('保存')]}">
            </div>
            <div class="detailView" id="taskDef"><div class="panel">
                <table>
                    <tbody id="taskDefTable">
                        <tr class="core">
                            <td class="titleCell">@{[t_('種別')]}</td>
                            <td class="contentCell">@{[t_('継続')]}</td>
                        </tr>
                        <tr class="core">
                            <td class="titleCell">@{[t_('施策')]}</td>
                            <td class="contentCell">@{[t_('発売プロモーション')]}</td>
                        </tr>
                        <tr class="core">
                            <td class="titleCell">@{[t_('アクション区分')]}</td>
                            <td class="contentCell">
                                <input type="radio" name="category" value="1" onClick="chkOther('1');" checked> <img src="$session->{img_rdir}/custom/TAG/parts_hd16_069.gif">@{[t_('　ヒヤリング')]}
                                <br>
                                <input type="radio" name="category" value="2" onClick="chkOther('2');"> <img src="$session->{img_rdir}/custom/TAG/parts_hd16_089.gif">@{[t_('　オリエン')]}
                                <br>
                                <input type="radio" name="category" value="3" onClick="chkOther('3');"> <img src="$session->{img_rdir}/custom/TAG/parts_hd16_087.gif">@{[t_('　スタッフMTG')]}
                                <br>
                                <input type="radio" name="category" value="4" onClick="chkOther('4');"> <img src="$session->{img_rdir}/custom/TAG/parts_hd16_018.gif">@{[t_('　実施・決定等')]}
                                <br>
                                <input type="radio" name="category" value="5" onClick="chkOther('5');"> <img src="$session->{img_rdir}/custom/TAG/parts_hd16_055.gif">@{[t_('　その他　')]}
                                <input type="text" name="other_text" value="">
                                <br>
                            </td>
                        </tr>
                        <tr class="core">
                            <td class="titleCell">@{[t_('メモ')]}</td>
                            <td class="contentCell">
                                <textarea name="task.memo"></textarea>
                            </td>
                        </tr>
                        <tr class="core" id="milestoneSettingDate" >
                            <td class="titleCell">@{[t_('期日')]}</td>
                            <td class="contentCell">
                                <div class="selectBlock" style="width:300px">
                                    <select name="milestoneSettingDate_year" id="milestoneSettingDateYear"></select> @{[t_('年')]} 
                                    <select name="milestoneSettingDate_month" id="milestoneSettingDateMonth"></select> @{[t_('月')]}
                                    <select name="milestoneSettingDate_day" id="milestoneSettingDateDay"></select> @{[t_('日')]}
                                    <img src="$session->{img_rdir}/TAG/task-regist_files/ico_hibiki_calendar.gif" class="ImgIco" align="absmiddle" title="@{[t_('日付入力')]}" border=0> &nbsp;&nbsp;
                                </div>
                            </td>
                        </tr>
                        <tr class="core" id="confidentialLevel">
                            <td class="titleCell">@{[t_('公開レベル')]}</td>
                            <td class="contentCell">
                                <div class="selectBlock" style="width:300px">
                                    <input type="radio" name="task.confidentialLevel" onclick="" value="" checked="checked">@{[t_('公開')]}
                                    <input type="radio" name="task.confidentialLevel" onclick="" value="0">@{[t_('非公開')]}</div>
                                    <div class="selectButton">
                                    <div class="BtnOperateTask">
                                        <span class="BtnM">@{[t_('閲覧可能ユーザ一覧')]}</span>
                                    </div>
                                    </div>
                            </td>
                        </tr>
                        <tr class="core" id="additionalSubscriber" style="display:none">
                            <td class="contentCell">
                                 <div class="selectBlock" id="additionalSubscriberIdList"></div>
                                 <div class="selectButton">
                                 <div class="BtnOperateTask">
                                     <span class="BtnM">
                                         <input type=button id=updateBtn value="@{[t_('設定')]}" onclick="window.open('/TAG/plan0904.html');">
                                     </span>
                                 </div>
                                 </div>
                             </td>
                        </tr>
                        <tr id="shadowLine">
                            <td class="lineCell" colspan="2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div align="left">
            	<input type=button id=close value="@{[t_('閉じる')]}" onclick="javascript:closeWindow();"><input type=button id=close value="@{[t_('保存')]}" onclick="">
            </div>
        </td>
    </tr>
</table>
<div id="container">
</div>
<script type="text/template" id="tmpl_status">
	<div>
      <input type="text" value="{{fieldCode}}" >{{fieldName}}
    </div>
</script>
<div id="binders">
</div>
</form>
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
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/detailView.css">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/layout.css">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/sdb_btn.css">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/bar.css">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/common.css">|,
		qq|<link rel="stylesheet" type="text/css" href="$DA::Vars::p->{css_rdir}/custom/TAG/task-regist_files/fontset-meiryo.css">|;
		
	my @include_js = ();
	push @include_js,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js?random=$random"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/async.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/encoding.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/task-regist-files/index.js?random=$random"></script>|;
		
my $head = <<buf_end;
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta http-equiv="Cache-Control" content="no-cache">
@include_css
@include_js
<title>@{[t_('アクション登録')]}</title>
</head>
buf_end

return ($head);
}