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
	use Data::Dumper;
}
use strict;
&main();
Apache::exit();

sub main {
	
my ($params) = @_;
my $session = {};
DA::Session::get_dir( $session, $params );
my $query = Apache::Request->new( $params, TEMP_DIR => "$session->{temp_dir}" );
DA::Valid::check_param_all( $session, $query );



#	my $head_print = &print_head;

#warn Data::Dumper->Dump([$session]);

my $random = rand(100000);
my $outbuf = <<buff_end;
<html>
<head>
    <script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/jquery/jquery-2.0.3.js"></script>
    <script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore-1.5.1.js"></script>
    <script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore.string-2.3.2.js"></script>
    <script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/encoding.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/tagCommon.js"></script>
	<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/TAG/hibiki/index.js"></script>
</head>
<body>
<p id="loginId"></p>
<div id="binders"></div>

<div id="container">
<script type="text/template" id="tmpl_status">
	<div>
      "{{fieldCode}}" -> {{fieldName}}
    </div>
</script>
</div>



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
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/jquery/jquery-2.0.3.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore-1.5.1.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/underscore/underscore.string-2.3.2.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/tagCommon.js?random=$random"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/async.js"></script>|,
		qq|<script type="text/javascript" src="$DA::Vars::p->{js_rdir}/custom/common/encoding.js"></script>|,
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