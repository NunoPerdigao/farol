#!/usr/bin/perl
#
# This is a perl program that formats the USB device file name
#
my $result;
my ($devnode, $devnum) = @ARGV;
my @fields = split /-/,$devnode;
$result = sprintf "bus/usb/%03d/%03d", $fields[0], $devnum;
if (-e "/proc/$result") { $result = "/proc/$result"; }
elsif (-e "/dev/$result") { $result = "/dev/$result"; }
elsif (-d "/proc/bus/usb") { $result = "/proc/$result"; }
elsif (-d "/dev/bus/usb") { $result = "/dev/$result"; }
else { $result = "noop"; }
print "$result\n";
