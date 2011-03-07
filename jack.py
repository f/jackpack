#!/usr/bin/env python2
#-*- coding:utf-8 -*-


# TODO : Use(learn) command-line arg helper.

import os,sys
import jack_template as jt
class JackGenerator (object):

    def __init__(self,project_location="."):
        if project_location != ".":
            self.p_l = project_location
        else:
            self.p_l = str(os.getcwd().split("/")[len(os.getcwd().split("/"))-1:]).replace("['","").replace("']","")
        self.project_location = project_location
        self.controller_location = self.project_location + "/Controller"
        self.model_location = self.project_location + "/Model"
        self.view_location = self.project_location + "/View"
        self.plugin_location = self.project_location + "/Plugins"
        self.bootstrap_location = self.project_location
            
    def createBootstrap(self):  
        self.bootstrap_template = jt.getTemplate("bootstrap_template",self.p_l) 
        if os.system("touch %s/Bootstrap.js" % self.bootstrap_location) != 0:
            print "Permission denied : %s/Bootstrap.js" % self.bootstrap_location
        else:
            bootstrap_file = open("%s/Bootstrap.js" % self.bootstrap_location,"a").write(self.bootstrap_template)
            print "Bootstrap created."
    
    def createProject(self):
        try:
            print "Creating project files..."
            os.makedirs(self.controller_location)
            os.makedirs(self.model_location)
            os.makedirs(self.view_location)
            os.makedirs(self.plugin_location)
            self.createBootstrap()
            print "Created."
        except OSError:
            print "Permission denied : %s" % self.project_location
   
    def createController(self,controller):
        self.controller_template = jt.getTemplate("controller_template",self.p_l,controller)
        if os.system("touch %s/%s.js" % (self.controller_location,controller)) != 0:
            print "Permission denied : %s/%s.js" % (self.controller_location,controller)
        else:
            open("%s/%s.js" % (self.controller_location,controller),"a").write(self.controller_template)
            print "%s controller created." % controller
    
    def createModel(self,model):
        self.model_template = jt.getTemplate("model_template",self.p_l,model)
        if os.system("touch %s/%s.js" % (self.model_location,model)) != 0:
            print "Permission denied : %s/%s.js" % (self.model_location,model)
        else:
            open("%s/%s.js" % (self.model_location,model),"a").write(self.model_template)
            print "%s model created." % model

    def createView(self,view):
        self.view_template = jt.getTemplate("view_template",self.p_l,view)
        if os.system("touch %s/%s.js" % (self.view_location,view)) != 0:
            print "Permission denied : %s/%s.js" % (self.view_location,view)
        else:
            open("%s/%s.js" % (self.view_location,view),"a").write(self.view_template)
            print "%s view created." % view
            
    def createPlugin(self,plugin):
        self.plugin_template = jt.getTemplate("plugin_template",self.p_l,plugin) 
        if os.system("touch %s/%s.js" % (self.plugin_location,plugin)) != 0:
            print "Permission denied : %s/%s.js" % (self.plugin_location,plugin)
        else:
            open("%s/%s.js" % (self.plugin_location,plugin),"a").write(self.plugin_template)
            print "%s plugin created." % plugin            


if len(sys.argv) > 2:
    if sys.argv[1] == "Controller":
        o = JackGenerator()
        o.createController(sys.argv[2])
    elif sys.argv[1] == "View":
        o = JackGenerator()
        o.createView(sys.argv[2])
    elif sys.argv[1] == "Model":
        o = JackGenerator()
        o.createModel(sys.argv[2])
    elif sys.argv[1] == "Plugin":
        o = JackGenerator()
        o.createPlugin(sys.argv[2])
if len(sys.argv) == 2:
    o = JackGenerator(sys.argv[1])
    o.createProject()
    o.createModel("%s" % sys.argv[1])
    o.createView("%s" % sys.argv[1])
    o.createController("%s" % sys.argv[1])
    o.createPlugin("%s" % sys.argv[1])

if len(sys.argv) == 1:
    print "Usage: python jack.py ProjectName"
    print "       python jack.py Controller ControllerName"
    print "       python jack.py View ViewName"
    print "       python jack.py Model ViewName"
    print "       python jack.py Plugin PluginName"
    
    
    
    
    
    
    
    
    

