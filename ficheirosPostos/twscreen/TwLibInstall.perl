#!/usr/bin/perl
#
# This is a perl program that manages symbolic links for files
#

# The input parameters are
# 1) the keyword "install" or "remove"
# 2) the system library directory (usually /usr/lib)
# 3) the file name to link (i.e., libTw*.so)

# For example
# ./TwLibInstall.perl install /usr/lib libTw*.so
# will produce symbolic links in /usr/lib for all files libTw*.so in the
# current directory.

if (@ARGV < 3)
{
   die "Not enough arguments, <install|remove> <targetdir> <filename>\n";
}

my ($cmd, $targetdir, @files) = @ARGV;

if (! ($cmd eq "install") && ! ($cmd eq "remove"))
{
   die "first argument must be 'install' or 'remove'\n";
}

if (! (-d $targetdir))
{
   die "$targetdir is not a directory\n";
}

# Always remove files
foreach $file (@files)
{
   @partials = split /\//,$file;
   $link = "$targetdir/$partials[$#partials]";
   if (-e $link)
   {
      unlink $link;
   }
   elsif (-l $link)
   {
      unlink $link;
   }
}

# Optionally install files
if ($cmd eq "install")
{
   foreach $file (@files)
   {
      @partials = split /\//,$file;
      $link = "$targetdir/$partials[$#partials]";
      symlink ($file, $link);
   }
}
