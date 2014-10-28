#!/usr/local/bin/perl
###################################################
##  INSUITE(R)Enterprise Version 1.2.0.          ##
##  Copyright(C)2001,2014 DreamArts Corporation. ##
##  All rights to INSUITE routines reserved.     ##
###################################################
BEGIN {
	use DA::Init();
	use DA::IS;
	use JSON;
	use DA::Ajax;
	use Storable;
	use Data::Dumper;
}

use strict;
my $r = shift;
&main($r);
Apache::exit();

sub main {

my ($params) = @_;
my $session = {};
DA::Session::get_dir( $session, $params );
#my $query = Apache::Request->new( $params, TEMP_DIR => "$session->{temp_dir}" );
#DA::Valid::check_param_all( $session, $query );
#my $params = get_params($query);

my $result = {
	err => 0,
	data => ""
};

$ENV{'REQUEST_METHOD'} =~ tr/a-z/A-Z/;
if ($ENV{'REQUEST_METHOD'} eq "POST") {
	my $buffer;
	read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
	my $obj = JSON::jsonToObj($buffer);
	Storable::nstore($obj,"/tmp/tag-addon-cache-plan-regist");
	$result->{data} = "Data Store Success!";
}
else{
	my $store = Storable::retrieve("/tmp/tag-addon-cache-plan-regist");
	$result->{data} = $store;
}

$result = DA::Ajax::make_json($session,$result,"");
print DA::Ajax::make_json_head($session);
print $result;
$session->{dbh}->disconnect();

}