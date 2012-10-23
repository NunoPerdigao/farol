3M Touch Systems, Inc.
MT 7 Software for Linux

Version 7.13.6, September 21, 2011
Copyright 1991-2011 3M.
All rights reserved.

---------------------------------
PRODUCT SUMMARY
---------------------------------
MT 7 Software, a member of the MicroTouch(tm) Software Suite, provides
unified driver support for MicroTouch touch technologies over a wide
range of operating systems. This version, 7.13 for Linux, provides
support for the Linux operating system for kernels 2.4 and 2.6. This
product includes a user-space touch screen driver, an X input module,
and a calibration tool.

---------------------------------
FEATURES AND ENHANCEMENTS
---------------------------------
* Added support for older systems that do not support Xinerama or RandR.
* Addressed touch and calibration issues associated with multiple
  monitor support.
* Changed the driver to prevent multiple instances from running.
* Changed the driver's USB handling of touches when connecting to the
  touch controller.

---------------------------------
SYSTEM REQUIREMENTS
---------------------------------
Hardware Prerequisites

* The MT 7 for Linux software runs on most computers that run the Linux
  kernel 2.4 or 2.6 operating systems. The computer's processor must be
  compatible with the Intel x86 series of processors.
* One or more of the following MicroTouch touch screen controllers:
  - MicroTouch EX serial or USB controllers
  - MicroTouch RX serial or USB controllers
  - MicroTouch DX serial or USB controllers
  - MicroTouch CX USB controllers
  - MicroTouch PX serial or USB controllers
  - MicroTouch SX serial controllers
* Depending on the touch screen, either a serial port or a USB port is
  required.

Software Prerequisites

* The MT 7 for Linux software requires 32-bit or 64-bit version of the 
  Linux operating system of kernels 2.4 or 2.6.
* If using USB controllers, the Linux operating system kernel 2.6 is
  required.
* Shared memory support is required. This is absent in some early kernel
  2.4 systems.
* The calibration tool requires an X11-compliant X Windows server.

---------------------------------
INSTALLATION INSTRUCTIONS
---------------------------------
* License
  The MT 7 for Linux software is proprietary and not open source. The
  distribution is an executable program. Run this program from a command
  line. It presents a license agreement and asks you to either accept or
  decline the agreement. If you accept the agreement, the program
  produces a 'tar.gz' file. Follow the rest of these instructions to
  complete the installation process. For your convenience, the 'tar.gz'
  file contains a copy of the license in the file 'License.txt'.

* Preparation
  You must log in the Linux operating system as the root user or use
  the 'su' command to get super user access. On some systems, you may
  need to run in single user mode (run level 1 on some systems).

  The installation process requires write access to various system
  directories. By default, the directories are:
  - /etc/udev or /etc/hotplug
  - /usr/lib/xorg/modules/input or /usr/X11R6/lib/modules/input
  - /usr/lib
  - /etc/init.d or /etc/rc.d

  After installation completes, the MT 7 for Linux software no longer
  needs write access to these directories.

* General Instructions
  The MT 7 for Linux package arrives as a tar.gz file. By default, the
  expanded package resides in the subdirectory 'twscreen'. A script
  named 'Install' installs the package. Installation includes creating
  the necessary init script, creating symbolic links in /usr/lib,
  making a X input module available, enabling USB hotplug for
  MicroTouch devices, and creating a Remove script.

  Before installing the package, read below to see if any of these
  special situations apply to you. If they do, you may need to edit the
  Install script.

  If you run the Install script and then discover errors, always run
  the Remove script to undo the installation. This removes possibly
  erroneous links into your system. Then edit the Install script, make
  the necessary changes, and install again.

* Installation on 64 bit systems
  The MT 7 for Linux software requires following 32 bit libraries:
   -libncurses.so
   -libXinerama.so
   -libc.so
   -libstdc++.so
   -libXtst.so
   -libXi.so
   Install and resolve all dependencies for the libraries above before
   proceeding to normal installation. After installation use 'ldd' command
   on all executable files to confirm all necessary dependencies are
   resolved.

* Normal Installation
  Copy the tar.gz file into the directory where you want the package to
  reside, such as /etc. Issue the command
  'tar xzf twscreen.<version>.tar.gz' where <version> is a version
  number string of the tar.gz file. This creates the directory
  'twscreen' in the current directory.

  From there, go into the twscreen directory and issue the command
  './Install'. This script installs links in the Linux and X Windows
  system for your touch screen to work with your system.

* Installing on Write-Protected Systems
  The MT 7 for Linux software requires access to a writeable directory
  for runtime and configuration data. By default, it uses a 'data'
  directory in the twscreen directory.

  If you need to have the package in a read-only directory, then decide
  on a writeable directory for the package to use. Edit the Install
  script and search for the line 'DataDir=""'. Change the definition of
  DataDir to the writeable directory. Save the changes and run the
  script. This creates the data directory where desired and creates a
  link in the package directory to the data directory.

* Other Options
  The MT 7 for Linux software should install without other changes on
  most Linux systems. However, if you have a customized directory
  structure or the installation script fails, you may need to edit the
  Install script and change one or more of the following script
  variables.

  - ConvertAtRead
    The MT 7 for Linux X input module translates raw touch data from the
    touch driver into the X Windows server screen locations. Normally,
    the X server does this in two steps, first reading the raw input
    data from the input module and then having the module convert the
    coordinates as a second step. Some versions of the X.Org server code
    require that the input module return only converted coordinates in
    the single read step. This seems to apply only to early 1.4 versions
    of the server.

    If you use this server, or if touch is inaccurate after calibration,
    change the ConvertAtRead value to "true".

    To determine the version of your X server, issue the command
    "X -version".

  - HotplugDir
    See the symbol 'UdevDir' for details.

  - InitDir
    The MT 7 for Linux software uses an init script, TWDrvStartup, to
    start and stop the touch screen driver. Normally, this runs at run
    level 5. If your init scripts are located in a directory other than
    /etc/init.d or /etc/rc.d, then set InitDir to the appropriate path.

  - JavaBinDir
    Set this symbol to the path of the Java(TM) runtime environment
    (JRE).

  - LibDir
    The MT 7 for Linux software uses several shared objects. The Install
    script links these into /usr/lib. If your system's libraries are
    elsewhere, change this variable to point to the correct path. This
    directory is mandatory and the software cannot run without its
    libraries in a common library directory.

  - LSBDir
    An init script must adhere to a variety of conventions. Some
    conventions use files, such as 'function', in the script directory.
    The variable 'InitDir' handles these cases.

    Some LSB-compliant systems require access to a file 'init-functions'
    normally found in /lib/lsb. If you have an LSB system and the
    init-functions file is not in /lib/lsb, you need to change the value
    of LSBDir.

  - SEDir1 and SEDir2
    Some of the shared objects in the MT 7 for Linux software require
    access to objects secured by SELinux. If the Install script detects
    SELinux, it assigns a security type to some shared objects. The
    script inspects the directories /usr/selinux/booleans and
    /selinux/booleans to determine if SELinux is active. If your SELinux
    is in a directory other these, change the definition of one of these
    variables.

  - SEGivePermission
    If the Install script detects SELinux, it assigns the security type
    'texrel_shlib_t' to some shared objects. If this is not appropriate
    for your system, edit the script and change this variable.

  - UdevDir and HotplugDir
    The MT 7 for Linux software supports hot plugging of USB controllers
    through either the udev or the hotplug systems. Older versions of
    Linux used the hotplug system. The udev system replaced hotplug. It
    is on most current distributions.

    The Install script checks for udev support first. It assumes that
    the udev support files are in the directory /etc/udev/. If udev
    resides elsewhere, change the definition of UdevDir to the
    appropriate path.

    The Install script assumes that the hotplug support files are in the
    directory /etc/hotplug/. If hotplug resides elsewhere, change the
    definition of HotplugDir to the appropriate path.

    If you want to disable hot plugging of USB controllers, change both
    UdevDir and HotplugDir to non-existent paths.

  - XFree86Dir
    See the symbol XorgDir for details.

  - XinitDir and XinitSuffix
    The MT 7 for Linux runs some background tasks needed for full
    support of some user interface features. The Install script uses an
    X init script to launch these tasks.

    The Install script automatically places the script 50MT7-xinit into
    the /etc/X11/xinit/xinitrc.d and /etc/X11/Xsession.d directories. If
    your distribution requires the script to go into a different
    location, supply a value to the XinitDir variable in the Install
    script.

    Some distributions require a suffix for these scripts. If needed,
    change the XinitSuffix value to the needed suffix. For example, if
    your distribution requires these scripts to have a '.sh', change the
    XinitSuffix symbol to be ".sh".

  - XorgConf
    This symbol contains that path for xorg.conf file, normally
    /etc/X11/xorg.conf. MT 7 for Linux must modify this file to register
    its drivers. If you use a different file, change the value of this
    symbol. If you do not use a configuration file, see the topic
    'Cannot find /etc/X11/xorg.conf' in the section 'Error Messages
    During Installation'.

  - XorgDir and XFree86Dir
    The MT 7 for Linux software uses an X input module to get touch data
    into the X Windows server. The Install script inspects the paths
    /usr/lib/xorg/modules/input and /usr/X11R6/lib/modules/input. If
    your X input modules reside elsewhere, change the appropriate
    variable to the correct path.

----------------------------------
ERROR MESSAGES DURING INSTALLATION
----------------------------------
This covers error messages generated by the Install script. Programs
used by the script may generate their own messages. This section does
not cover those messages.

* Cannot find needed libstdc++.so in /usb/lib
  Variations of the message may refer to other directories depending on
  the setting of the LibDir variable in the Install script.

  The installation script could not find the standard C++ shared
  objects. Confirm that the LibDir variable is set correctly. If so, you
  need to install the C++ shared objects or, if already present, create
  a symbolic link using the name libstdc++.so to the C++ shared object.

* Cannot find shared memory support
  The MT 7 for Linux software uses shared memory. Some older Linux
  systems do not provide this support and the package will not run.
  Contact 3M Touch Systems for other options.

* Cannot find /etc/X11/xorg.conf
  Variations of this error may occur if a system uses a different
  xorg.conf file.

  MT 7 for Linux uses an X input driver and requires this file so that
  the X server will load the driver. Since this file is optional, some
  systems do not have one present.

  If you use a different location for your xorg.conf file, edit the
  Install script and set the variable XorgConf.

  Otherwise you need to provide this file. There are two methods of
  doing this.

  You may run the command 'X -configure'. This produces the file
  ~/xorg.conf. Copy this file to /etc/X11/xorg.conf and restart your
  system. If the X Windows system restarts, you can proceed with the
  MT 7 installation.

  If X Windows does not start properly, get to a command prompt,
  possibly booting your system into single-user mode. Remove
  /etc/X11/xorg.conf and restart X Windows. It should start as before.
  Then copy the file /var/log/xorg.0.log to another file. Edit this file
  and look for a section where the X server says it is using a built-in
  configuration. You can save just this section of the log file as a new
  xorg.conf file. Copy this file to /etc/X11/xorg.conf and restart X
  Windows. This should work as it is the same configuration used by
  default. Proceed with the MT 7 installation.

* Cannot install the init script
  The Install script tries to detect the presence of the chkconfig and
  update-rc.d utilities and the /etc/rc.d/rc.local script. If it cannot
  find any of these, this message appears.

  If your system uses the chkcconfig or update-rc programs, make sure
  the PATH environment variable contains the path to where the programs
  reside. If rc.local is in another directory, edit the Install script
  and change the value of the InitDir variable.

  If your system uses some other system, you need to place the init
  script TWDrvStartup in the appropriate place. The Install script
  creates a copy where the MT 7 for Linux package resides. You may need
  to edit the TWDrvStartup script to work with your system.

* Cannot install the X init script
  The Install script could not determine where to install the X init
  script needed by MT 7 for Linux to launch background tasks. Edit the
  Install script and set the XinitDir variable.

* Cannot install the X input module
  The Install script could not find the directory for the X input
  module. Confirm that the variable XorgDir or XFree86Dir are set
  correctly in the Install script.

* Hot plugging of USB touch screen controllers is not supported
  The Install script cannot find the udev or hotplug support files.

  If you do not need hot plugging of USB controllers, ignore this
  message. Otherwise, edit the Install script and change the UdevDir or
  Hotplug variable to an appropriate value.

* USB touch screen controllers are not supported under kernel 2.4
  The Linux operating system, kernel 2.4, did not fully support the
  methods needed by the MT 7 for Linux driver to read touch reports from
  USB touch screen controllers. The package supports only serial touch
  screen controllers under the 2.4 kernel.

---------------------------------
REMOVING MT 7 FOR LINUX
---------------------------------
In the installation directory, run the script Remove. This removes the
data directories and disengages MT 7 for Linux from the system. The
files remain. You must manually remove the files from the twscreen
directory.

---------------------------------
TROUBLESHOOTING THE INIT SCRIPT
---------------------------------
Due to the variety of methods of running init scripts, the Install
script makes a best guess as to when the TWDrvStartup script should run.
This guess is occasionally wrong.

There are three critical considerations regarding the init script
sequence.

* The USB file system must be operational before the TWDrvStartup
  script runs. If not, the driver does not service USB touch
  controllers. A symptom of this is calibration does not work.

* Any script that inspects serial ports must finish before the
  TWDrvStartup script runs. These programs can interfere with the
  driver's ability to detect and identify serial touch screen
  controllers. A symptom of this is touch or calibration not working.

* The TWDrvStartup script must complete before running the X server.
  The TWDrvStartup script modifies the X server configuration file
  (xorg.cfg or xfree86.cfg) when the system starts are restores it
  during shutdown. It also starts the touch screen driver, TwDriver.
  Scripts that launch the X server reference the programs xdm, gdm, or
  kdm. Symptoms of this are a lack of touch or possibly erratic touch
  with USB touch screen controllers.

In each case, you need to rearrange the order of the init scripts to
satisfy the requirements of the MT 7 for Linux software. The method to
do this is specific to your system's distribution.

---------------------------------
TROUBLESHOOTING TOUCH BEHAVIOR
---------------------------------
Many issues can affect touch.

If you have no touch, it is likely that the X Windows server is starting
before the MT 7 for Linux driver. First, inspect the X Windows
configuration file, usually either /etc/X11/xorg.conf or
/etc/X11/xfree86.conf, and see if there is an entry for the "twxinput"
driver. If this entry is present, inspect the X Windows server log file,
usually either /var/log/xorg.0.log or /var/log/xfree86.0.log, to see if
the driver loaded without error. If the entry is missing or there is an
error in the log file, see the section above, "Troubleshooting the Init
Script".

If the cursor reacts to a touch but does not appear under your finger,
usually a simple calibration fixes the problem. If it does not, open a
terminal window and type the command "X -version". If the first line of
the output starts with "X.Org X Server 1.4" then you may need to enable
the "ConvertAtRead" option. Review the section on "Other Options" under
"Installation" for details.

---------------------------------
RUNNING THE TOUCH APPLICATIONS
---------------------------------
There are two touch applications that you can run to customize the
touch system. These programs reside in the directory where you
installed the package.

* Calibration
  The Calibration program aligns the touch sensor to the display's
  screen. You should run this program after installation or whenever
  adding a new sensor to the system. Run the program by running the
  'TwCalib' program.

* Control Panel
  The Control Panel provides more features to customize. Run this
  program as needed by running the 'StartCP' script.

  Note that this is a Java program. This program runs with the JRE from
  Sun. If you experience problems running the Control Panel, download a
  JRE from Sun's website and install it. You also need to edit the
  StartCP script to provide the proper path to the JRE.

-----------------------------------
CALIBRATION MESSAGES ARE UNREADABLE
-----------------------------------
The Calibration program attempts to use a Helvetica font. If not found,
it uses a relatively random font. This font may be unreadable.

To override this behavior, set the symbol MT7FontSanSerif to a proper X
Windows font name. To find a suitable font, use the xlsfonts command or
other suitable utility that lists the available fonts. In a command
prompt, set the symbol, export it, and run the MT 7 calibration utility
TwCalib. Experiment with the value of MT7FontSansSerif until the
calibration text is suitable. For example, if MT 7 for Linux is in
/etc/twscreen, a test sequence may be:

> MT7FontSansSerif="-*-utopia-*"
> export MT7FontSansSerif
> /etc/twscreen/TwCalib

You can also test your font string with xlsfonts. After setting
MT7FontSansSerif, issue the command 'xlsfonts -fn $MT7FontSansSerif' to
see what font, if any, matches.

If you find a suitable font, change your system login script, such as
/etc/profile.local, to set and export MT7FontSansSerif.

---------------------------------
KNOWN ISSUES
---------------------------------
Issue 9:  The driver does not detect USB controllers plugged into a hub
          on some early 2.6 kernels.
Issue 10: Some distributions show a slow update when dragging. Tapping
          works fine on these systems.
Issue 11: Right-click does not work on X.Org server version 1.5 and
          some 1.4 versions.
Issue 13: Some xorg.conf files do not have a ServerLayout section. This
          package requires this and does not automatically add one when
          the section is missing.
Issue 15: When running the package binary file, MT7.xx.xx.bin, the
          prompt to accept the license agreement does not appear at the
          bottom of some X terminal programs. Dragging the bottom of
          the terminal window exposes the prompt.
Issue 16: When using the standalone calibration tool, TwCalib, the
          calibration completion message appears on the primary display
          instead of the calibrated display. This happens only for
          multiple display systems.
Issue 18: Many graphical displays (for example, calibration and draw
          test) do not regain keyboard input after the user changes
          application focus (such as when using ALT TAB).
Issue 28: The driver crashes when using an EX HID controller on some
          early 2.6 kernels.
Issue 29: On some systems, there is a font problem with calibration
          when launched from the control panel. The standalone
          calibration program displays the fonts correctly. One recent
          distribution exhibits this issue.
Issue 33: Static text in the control panel may appear with a white
          background instead of the expected background color of the
          rest of the control panel.
Issues 34, 35: The labels on the sliders on the Edge Adjustment tab of
          the control panel may be misleading. The positions of the
          sliders are correct as are the values displayed at the end of
          the slider.
Issue 36: With some desktop managers, using the left and right arrow
          keys to navigate the control panel's tabs does not cause the
          tabs' contents to appear. In these cases, you need to hit the
          spacebar after using the arrow keys to select a tab.
Issues 37, 38: On a single distribution with SELinux set to "enforced",
          the Install script does not set the proper security on the
          necessary files. Once you set proper security on these files,
          the desktop manager crashes. The touch software works with
          SELinux disabled. 
Issue 39: On the Edge Adjustment tab in the control panel, you can use
          the arrow keys to change the settings of the sliders. Doing
          so slows the system down for several seconds. Using touch or
          a mouse works without a delay.
Issue 216: The bottom edge adjustment may not work on some systems.
Issue 235: The Remove script may leave libTwSystem.so behind.
Issue 248: The PX controller may show a status of 'STR'. This should be
          'PWM'.
Issue 265: MT 7 does not work when there is no libXinerama.so or
          libXranar.so present.

---------------------------------
REVISION HISTORY
---------------------------------
Version 7.13.6, September 21, 2011

* Added support for additional PX controllers.

Version 7.13.5, August 10, 2011

* Improvements in handling of Xinerama and RandR
* Added '--accept-license' to the distribution package
* Prevented multiple driver instances from running
* Improved handling of USB controllers when starting

Version 7.13.4, June 2, 2011

* The MT 7 Software now supports X server version 1.9 and 1.10.
* Added support for the PX 32" controllers.

Version 7.13.3, November 19, 2010

* The MT 7 Software now supports X server version 1.8.
* The MT 7 Software now supports 64 bit X server versions.
* Corrected an error that prohibited saving of configuration data.
* Fixed directory error in the TWDrvStartup init script.
* Eliminated a crash in the MT 7 X input module.
* Fixed the detection of monitor configurations on some XRandR systems

Version 7.13.2, April 15, 2010

* Added support for the PX series of controllers.
* Issue 8: Addressed the font issue in calbiration
* Issues 30, 97, 217, 218, 249, 263: The Control Panel now can run from
  outside its installation directory.
* Issues 40, 205, 206: Cleaned up the TWDrvStartup script.
* Issue 126: Changed to use MT7Help.pdf as the help file.
* Issue 162: Added support for X servers versions 1.6 and 1.7.
* Issue 188: Changed to properly restore calibration data on a CX
  controller.
* Issue 189: Changed to launch calibration after linearizing a CX
  controller.
* Issue 194: Fixed the /M:P and /M:F switches in TwCalib.
* Issue 203: Corrected the handling of pen and finger frequencies for
  the SX controllers.
* Issue 215: Corrected the handling of the /T switches in TwCalib.
* Issue 226: Fixed a memory leak related to loading auxiliary databases.
* Issue 238: The Monitor program is now responsible for sending 'beeps'
  to the system speaker.
* Issue 261: The Install script no longer supplies a default xorg.conf.

Version 7.12.5, July 15, 2009

* Calibration now works on systems that have XRandR 1.2 installed but
  enable Xinerama instead.

Version 7.12.4, April 17, 2009

* Added the Control Panel application. This program allows a user to
  calibrate touch screens and customize the system.
* Corrected the calibration tool so that its dialogs are centered
  properly on multiple monitor systems.
* Improved support for XRandR, Xinerama, and TwinView. This improvement
  adds a background task, TwMonitor, that detects changes in the
  system.
* Issue 7: The calibration tool now restores the prior calibration
  settings for an EX HID controller when calibration fails or is
  canceled.

Version 7.12.2, March 10, 2009

* Added support for the new MicroTouch CX series touch screen
  controller.
* Added support for the X.org X server version 1.5.
* Changed the X input module to support right-click in some early
  versions of the X server.
* Corrected the touch driver and the configuration library so that the
  driver would recognize MT 7 configuration changes, such as through
  the TwCfgUtil program.
* Changed the calibration and linearization functions to present an
  appropriate target shape when the monitor is in portrait mode.
* Improved the handling of the ESC key in the linearization and draw
  test functions.
* Corrected the error handling for the linearization function to
  provide more appropriate messages when an error occurs.
* Changed the installation script to link the X input module to the
  appropriate directory instead of copying it.
* Changed the removal of the touch screen section in the X server
  configuration file so that it no longer leaves extra blank lines.
* Corrected an error in the Install and TWDrvStartup scripts that
  incorrectly mapped a data file to the MT 7 binary path. This error
  was noticable on systems that write-protect the binary directory
  paths.
* Changed the TWDrvStartup script to install at runlevel 2 as well as
  5 to allow proper installation on systems that use runlevel 2 to
  launch X Windows.

Version 7.12.1, September 23, 2008

* Initial release

_______________________________________________________________________

3M, the 3M logo, MicroTouch, and the MicroTouch logo are either
registered trademarks or trademarks of 3M in the United States and/or
other countries.

Linux is a registered trademark of Linus Torvalds.

Sun, Sun Microsystems, the Sun Logo, Java, Java runtime environment,
and JRE are trademarks or registered trademarks of Sun Microsystems,
Inc. in the United States and other countries.

XFree86 is a registered trademark of The XFree86 Project, Inc.
_______________________________________________________________________
