#!/usr/bin/perl
#
# Copyright 2003-2009 3M. All rights reserved.
#
# This script finds the X server configuration file and processes it
# according to the arguments. If there are no arguments, then an MT 7
# touch screen section is added to the configuration file if one is
# not already present.
#
# Command line options include:
#
# -find     determines if a configuration file exists or not. If one exists,
#           the exit status is 1. If one does not exist, the exit status is 0.
# -remove   removes the MT 7 touch screen section from the configuration file.
#

$savedfileext = "TWdrvSaved";
$Xfree86logfile = "/var/log/XFree86.0.log";
$Xorglogfile = "/var/log/Xorg.0.log";
@configfiles = qw
{
   /etc/X11/XF86Config
   /etc/X11/XF86Config-4
   /etc/X11/$XF86CONFIG
   /usr/X11R6/etc/X11/$XF86CONFIG
   /etc/XF86Config
   /usr/X11R6/etc/X11/XF86Config-4
   /usr/X11R6/etc/X11/XF86Config
   /usr/X11R6/lib/X11/XF86Config-4
   /usr/X11R6/lib/X11/XF86Config
   /etc/X11/$XORGCONFIG
   /tmp/Xorg-KEM/etc/X11/$XORGCONFIG
   /etc/X11/xorg.conf-4
   /etc/X11/xorg.conf
   /etc/xorg.conf
   /tmp/Xorg-KEM/etc/X11/xorg.conf-4
   /tmp/Xorg-KEM/etc/X11/xorg.conf
   /tmp/Xorg-KEM/lib/X11/xorg.conf-4
   /tmp/Xorg-KEM/lib/X11/xorg.conf
};

$defIdentifier = "MT7TouchScreen";
$defTouchSection =
'Section "InputDevice"
        Identifier  "'.$defIdentifier.'"
        Driver      "twxinput"
        Option      "Device" "0"
        Option      "ConvertAtRead" "false"
EndSection';

#
# Process the command line arguments
#
$Find = 0;
$Remove = 0;
foreach $argument (@ARGV)
{
   if ($argument eq "-find")
   {
      $Find = 1;
      last;
   }
   if ($argument eq "-remove")
   {
      $Remove = 1;
      last;
   }
}

#
# Try and find the conf file by inspecting an existing log file.
# If found, we replace the list of known conf files with just
# this entry.
#
if (open LOGFILE, "<$Xfree86logfile")
{
   foreach (<LOGFILE>)
   {
      if (m/Using config file: ".*XF86Config.*"/i)
      {
         if (m/"(.*XF86Config.*)"/si)
         {
            @configfiles = $1;
         }
         last;
      }
   }
   close LOGFILE;
}
elsif (open LOGFILE, "<$Xorglogfile")
{
   foreach (<LOGFILE>)
   {
      if (m/Using config file: ".*xorg.conf.*"/i)
      {
         if (m/"(.*xorg.conf.*)"/si)
         {
            @configfiles = $1;
         }
         last;
      }
   }
   close LOGFILE;
}

#
# Loop through the conf file candidates
#
foreach $configfile (@configfiles)
{
   #
   # Skip the file if it is not there or is empty. If this is a find, then
   # we can stop if the file is present.
   #
   next unless -s $configfile;
   if ($Find) { exit 0; }

   #
   # Grab a copy of the file's contents
   #
   unless (open CONFIG, $configfile)
   {
      die "Failed to open config file $!";
   }
   @olddata = <CONFIG>;
   close CONFIG;

   #
   # Create the save file
   #
   $savedconfigfile = "$configfile.$savedfileext";
   unless (open SAVECONFIG, ">$savedconfigfile")
   {
      warn "Failed to save old configuration $!";
      $savedconfigfile = undef;
   }
   else
   {
      print SAVECONFIG @olddata;
      close SAVECONFIG;
   }

   #
   # Loop through the config file. We make a copy of it in @newdata.
   #
   $TouchSectionFound = 0;
   while (my $line = shift @olddata)
   {

      #
      # Test for an InputDevice section, possibly adjusting old touch
      # screen sections.
      #
      if ($line =~ m/^Section\s+"InputDevice"/i)
      {
         @copy = &process_section ($line);
      }

      #
      # Copy the ServerLayout section, possibly adding or removing our entry
      #
      elsif ($line =~ m/^Section\s+"ServerLayout"/i)
      {
         @copy = &process_serverlayout ($line);
      }

      #
      # Otherwise just copy the line
      #
      else { @copy = ($line); }

      #
      # Copy the possibly adjusted fragment to the output data
      #
      push @newdata,@copy;
   }

   #
   # If we did not find our input section, add the default section to the end
   #
   if ($Remove == 0 && $TouchSectionFound == 0)
   {
      push @newdata, "\n", $defTouchSection, "\n";
   }

   #
   # Rewrite the config file. If interrupted, restore the original file.
   #
   $SIG{'INT'} = 'interrupt_handler';
   open NEWCONFIG, ">$configfile";
   print NEWCONFIG @newdata;
   close NEWCONFIG;
   $SIG{'INT'} = '';
}

#
# We are finished.
#
exit $Find;

#
# This subroutine processes a Section in the conf file. It is responsible
# for detecting and rehabilitating any touch screen section found.
#
sub process_section
{
   my @section = @_;
   my $touch = 0;
   my @touchlines;
   my $line;
   while ($line = shift @olddata)
   {
      #
      # If this is our identifier, start processing the touchscreen
      # section by determining what lines from the default entry
      # are needed.
      #
      if ($line =~ m/Identifier\s+"$defIdentifier"/)
      {
         $touch = 1;
         @touchlines = split /\n/, $defTouchSection;
         for (my $i = 0; $i <= $#touchlines; $i++)
         {
            if ($touchlines [$i] =~ m/^Section/ ||
                $touchlines [$i] =~ m/^\s+Identifier\s+/ ||
                $touchlines [$i] =~ m/^EndSection/)
            {
               $touchlines [$i] = undef;
            }
            else
            {
               $touchlines [$i] .= "\n";
            }
         }
      }

      #
      # If this is the end section, copy all unspecified entries
      # from the default entry
      #
      elsif ($line =~ m/^EndSection/)
      {
         if ($touch)
         {
            for (my $i = 0; $i <= $#touchlines; $i++)
            {
               if ($touchlines [$i] =~ m/\n/)
               {
                  push @section, $touchlines [$i];
               }
            }
            $TouchSectionFound = 1;
         }
         push @section,$line;
         last;
      }

      #
      # This is a normal line. If it matches a line in the pending
      # touch list, remove the line from the touch list.
      #
      elsif ($touch)
      {
         $line =~ m/^\s*([a-zA-Z]+)\s+("[^"]+")/;
         my $keyword = $1;
         my $option = $2;
         for (my $i = 0; $i <= $#touchlines; $i++)
         {
            if ($touchlines [$i] =~ m/\n/)
            {
               $touchlines [$i] =~ m/^\s+([a-zA-Z]+)\s+("[^"]+")/;
               my $keyword2 = $1;
               my $option2 = $2;
               if ($keyword2 ne $keyword) { next; }
               if ($keyword eq "Option" && $option2 ne $option) { next; }
               $touchlines [$i] = undef;
               last;
            }
         }
      }

      #
      # Copy the line into the section buffer
      #
      push @section,$line;
   }

   #
   # If we are removing the touch screen, empty the section and consume
   # any trailing blank lines. Leave only one preceding blank line.
   #
   if ($touch and $Remove)
   {
      while ($olddata [0] eq "\n")
      {
         shift @olddata;
      }
      my $newline = 0;
      for (;;)
      {
         $line = pop @newdata;
         if ($line ne "\n") { last; }
         $newline = 1;
      }
      @section = ($line);
      if ($newline) { push @section,"\n"; }
   }
   return @section;
}

#
# This subroutine takes the beginning of a ServerLayout section and either
# adds or removes the touch screen device.
#
sub process_serverlayout
{
   my @section = @_;
   my $NewTouch = "";
   my $haveTouch = $Remove;
   my $line;

   #
   # Loop, reading the original conf file data, until the EndSection is found.
   #
   while ($line = shift @olddata)
   {

      #
      # Stop if we get to the EndSection line
      #
      if ($line =~ m%^EndSection%) { last; }

      #
      # Test if this is a touch screen line. Do not copy it if we are
      # removing the line. Otherwise note its presence so we don't duplicate
      # it.
      #
      if ($line =~ m/^\s+InputDevice\s+"$defIdentifier"/)
      {
         if ($Remove) { next; }
         $haveTouch = 1;
      }

      #
      # Copy the line into the buffer
      #
      push @section,$line;

      #
      # Build a new touch screen line using the last InputDevice line
      # as a template.
      #
      if ($line =~ m/(^\s+InputDevice\s+")[^"]+("\s+")/i)
      {
         $NewTouch = $1 . $defIdentifier . $2 . "SendCoreEvents\"\n";
      }
   }

   #
   # At this point, $line is the EndSection line. If we did not find a
   # touch screen entry, add it now.
   #
   if ($haveTouch == 0)
   {
      if ($NewTouch eq "")
      {
         $NewTouch =
            "\tInputDevice\t\"" .
            $defIdentifier .
            "\"\t\"SendCoreEvents\"\n";
      }
      push @section,$NewTouch;
   }

   #
   # Finally, add the EndSection line
   #
   push @section,$line;
   return @section;
}

#
# This subroutine is called when there is an error creating a new file. It
# tries to copy the save file back over the target file.
#
sub interrupt_handler
{
   if (-e $savedconfigfile && rename $savedconfigfile, $configfile)
   {
      die "Old configuration restored\n";
   }
   else
   {
      die "Failed to restore old configuration $!";
   }
}
