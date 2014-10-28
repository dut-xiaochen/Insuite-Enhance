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

sub open_pop {
	my ($session) = @_;
	my $f_param={};
    $f_param->{proc}="user_group_test";#title
    $f_param->{f_option}= 38;
    $f_param->{cgi}="custom/user_group_test.cgi";
    $f_param->{save_param}="num=38";
    $f_param->{target}="USERSEL";
	$f_param->{mode}=4;
    $f_param->{multi}=0; 
    $f_param->{sort}=1;
    $f_param->{owner}=0;
    $f_param->{rest}=2;
    $f_param->{func_mode}='regist';
    $f_param->{u_rest}=1;

    my $proc_no = DA::IS::init_fav_usersel($session,$f_param);
	my $popup_tag = DA::IS::get_fav_popup($session, $proc_no);
	return $popup_tag;
}

sub main {

my ($params) = @_;
my $session = {};
DA::Session::get_dir( $session, $params );
my $query = Apache::Request->new( $params, TEMP_DIR => "$session->{temp_dir}" );
DA::Valid::check_param_all( $session, $query );

my $conf_file = DA::IS::get_sys_custom($session,"addon/TAG/tag_addon");
warn Data::Dumper->Dump(["conf_file",$conf_file]);
my $groups_script = DA::Addon::TAG::TPermission::get_group($session,$conf_file);

my $popup_tag = open_pop($session);

my $sc = DA::IS::get_data_parse($session,"user_group_test",38);

warn Data::Dumper->Dump(["sc --> ", $sc->{USERSEL}]);

my $outbuf = <<buff_end;
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html"; charset=UTF-8">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">
	
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/jquery/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore-1.5.1.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/underscore/underscore.string-2.3.2.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/common/tagCommon.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/user_group_test/index.js?v=1"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/common/popup.js"></script>
	
	<title>user_group_test</title>
	
</head>
	<p>name : $session->{name}</p>
	<p>primary : $session->{primary} --> $session->{join_group}->{$session->{primary}}->{owner}</p>
	<div id="level2_group"></div>
	<div id="level3_group"></div>
	<div id="level4_group"></div>
	<div id="level5_group"></div>
	<br/>
	<button onclick="$popup_tag">OpenUserSelectWindow</button>
	<button onclick="postdata();">postdata</button>
	<script type=\"text/javascript\">$groups_script</script>
	<script language="JavaScript">
		var DApopupParams = {
			chkKey: '',
			cgiRdir: '/cgi-bin'
		};
	</script>
<body>
</body>

</html>

buff_end


DA::IS::print_data( $session, $outbuf );
$session->{dbh}->disconnect();

}


