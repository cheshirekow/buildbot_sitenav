================
Buildbot Sitenav
================

Introduction
============

A very simple buildbot UI plugin providing a menu-item with configurable
links. This plugin is intended to help integrate the buildbot master web
interface with some larger site structure. For example, you can add links to
your code review / code hosting service, bug tracker, discussion page, etc.

.. figure:: https://github.com/cheshirekow/buildbot_sitenav/raw/master/doc/screenshot.png
   :align: center

   Screenshot of the buildbot UI menu including the sitnav plugin.


Installation
============

Install the `buildbot-sitenav` package into the python environment you use
for executing the buildbot master. That probably means something like this::

    pip install buildbot-sitenav

Add the plugin to the `'www'` config section of `master.cfg` for your
buildmaster. e.g.::

    c['www'] = {
        "plugins": {
            "waterfall_view": {},
            "console_view": {},
            "grid_view": {},
            "sitenav": {
              "label" : "Navigation",
              "links" : [
                ["home", "/"],
                ["gerrit", "/gerrit"],
                ["forum", "/forum"]
              ]
            }
        },
    }

The config dictionary for the `sitenav` plugin includes two keys:

* `'label'`: *optional*, specifies the text to use for the button label in the
  menu. The default is "Site Nav".
* `'links'`: *required*, specifies a list of links to add in the submenu. Each
  item in the list is a pair (a list of two elements), composed of
  `["<label>", "<url>"]`.


Notes
=====

The author of this plugin actually knows practically nothing about angularJS so
this plugin is probably implemented in a dumb way. Hopefully you find it useful
anyway.
