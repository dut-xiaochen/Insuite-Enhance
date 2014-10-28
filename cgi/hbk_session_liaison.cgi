#!/usr/local/bin/perl
# ------------------------------------------------------------
#  Session Reflector for HIBIKI applications
#  $Id: hbk_session_liaison.cgi 56515 2011-01-11 09:17:44Z q_yi $
# ------------------------------------------------------------
BEGIN {
        use DA::Init();
        use DA::IsAPI;
        use DA::Gettext;
        use URI::URL;
}
use strict;
my $r = shift;
&main($r);
Apache::exit();

sub main {
	my ($r) = @_;

	my $session={};
	my $request_uri = $ENV{'REQUEST_URI'};


	$request_uri =~ s/.*\/cgi-bin\///;
	DA::Session::get_dir($session,$r,1,0,$request_uri);

	my $query=Apache::Request->new($r,TEMP_DIR=>"$session->{temp_dir}");
	DA::Valid::check_param_all($session, $query);

	my $liaisonid = $query->param('n');

	$liaisonid =~ s/\x0D\x0A|\x0D|\x0A//g;
	my $challenge = $query->param('c');
	my $liaison_url = $query->param('l');
	$liaison_url =~ s/\x0D\x0A|\x0D|\x0A//g;

	my $hibiki_path=DA::IS::get_sys_custom($session,'hibiki_path',1);
	if ($hibiki_path->{hibiki_contextPath}){
		my $url = new URI::URL $liaison_url ;
		my @array = split(/,/,$hibiki_path->{hibiki_contextPath});

		if (!$url->can('host') || !(grep $_ eq $url->host,@array)){
			DA::CGIdef::errorpage($session,t_("信用されないページ遷移です。"));
		}
	}

	my $msg = $liaisonid . ':' . $session->{user} . ':'
		. DA::CGIdef::uri_escape(Digest::MD5::md5_base64($challenge . $session->{sid}));

	print "Location: $liaison_url?lang=$session->{user_lang}&timezone=" . URI::Escape::uri_escape($session->{timezone}) . "&menu=$session->{menu_style}&style=$session->{char_style}&msg=$msg\r\n\r\n";

	$session->{dbh}->disconnect();
	Apache::exit();
};
