#!/usr/bin/perl
# This perl script is used to determine if a file is found in any of the PATH directories

if (@ARGV < 1)
{
   die "Not enough arguments: <progname>\n";
}

my ($progname) = @ARGV;
my $path = $ENV{'PATH'};
my @dirs = split /:/, $path;
my $sbin = "/sbin";
my $flag = 1;

# we check if /sbin is included in PATH. Required for CENTOS 5.5 64bit 
foreach $dir (@dirs)
{
  if($dir eq $sbin)
  {
     $flag = 0;
     break;
  }
}
if ($flag == '1')
{
   $path = $path . ":" . $sbin;
   $ENV{'PATH'} = $path;
   open PATHAPPEND, "+>TwPathAppend.sh";
   print PATHAPPEND "PATH=".$path."\n";
   close PATHAPPEND;
   @dirs = split /:/, $path;
}

foreach $dir (@dirs)
{
   $fullfile = "$dir/$progname";
   if (-e $fullfile)
   {
      exit (0);
   }
}
exit (1);
