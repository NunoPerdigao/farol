#!/usr/bin/perl
#
# This is a perl program that patches a configuration file
#

# The input parameters are
# 1) the configuration file name (like TwFactory.cfg)
# 2) the database section (like 'Touch')
# 3) the parameter name
# 4) the parameter value

# For example
# ./TwConfigPatch.perl TwFactory.cfg Touch USBDisableSupport 1
# will put the line "USBDisableSupport=1" into the <Touch> section of the
# TwFactory.cfg file.

if (@ARGV < 4)
{
   die "Not enough arguments, <file> <section> <parameter> <value>\n";
}

my ($file, $section, $parameter, $value) = @ARGV;

# Try to read the configuration file
open (FILE,'<',$file) or die "Cannot open $file\n";
@lines = <FILE>;
close FILE;

# Try to find the appropriate section
$token = 0;
open (FILE,'>',$file) or die "Cannot write $file\n";
for ($i = 0; $i <= $#lines; $i++)
{
   $test = "</".$section.">";
   if ($token == 0 && $lines[$i] =~ $test)
   {
      print FILE "\t$parameter=$value\n";
      $token = 1;
   }
   print FILE $lines[$i];
}

# The section was not found, add it
if ($token == 0)
{
   print FILE "<$section>\n";
   print FILE "\t$parameter=$value\n";
   print FILE "</$section>\n";
}

close FILE;
