#!/usr/bin/env python2
#-*- coding:utf-8 -*-

# TODO : model_template
#        view_template
# TODO : command line args

import os,sys

class JackGenerator (object):

    def __init__(self,project_location):
        self.project_location = project_location
        self.controller_location = self.project_location + "/Controller"
        self.model_location = self.project_location + "/Model"
        self.view_location = self.project_location + "/View"
        self.plugin_location = self.project_location + "/Plugins"
        self.bootstrap_location = self.project_location
        self.controller_template = ["(function($){\n","\n","\tJack.use(\n","\t\t'Jack.Controller',\n","\t\t'Jack.View'\n","\t);\n","\n","\tApp.Controller.Index = function()\n","\t{\n","\t\tthis.view = new Jack.View();\n","\t\tthis.layout = Jack.Registry.get('App.Layout');\n","\t};\n","\tApp.Controller.Index.prototype = Jack.extend(Jack.Controller, {\n","\n","\tindexAction : function(params)\n","\t{\n","\t\tvar self = this;\n","\t\tthis.view.render('index', function(data){\n","\t\t\tself.layout.html(data);\n","\t\t});\n","\t}\n","\n","\t});\n","\n","})(jQuery);"]
        self.model_template = []
        self.view_template = []
        self.plugin_template = ["(function($){\n","\n","\tJack.use('Jack.Plugin');\n","\n","\tJack.Plugin.register.jQuery('testPlugin', function(elements) {\n","\n","\t\talert(this.length);\n","\n","\t});\n","\n","})(jQuery);"]
        self.bootstrap_template = ["(function($){\n","\n","\t/**\n","\t * Loading required classes.\n","\t */\n","\tJack.use(\n","\t\t'Jack.Bootstrap',\n",
"\t\t'Jack.View',\n","\t\t'Jack.Router',\n","\t\t'Jack.Util.Ajax'\n","\t);\n","\n","\t/**\n","\t * Bootstrap class\n",
"\t *\n","\t * Singleton\n","\t */\n","\tApp.Bootstrap = Jack.extend(Jack.Bootstrap, {\n","\n","\t\t/**\n",
"\t\t * Initializing...\n","\t\t */\n","\t\tinit: function()\n","\t\t{\n","\t\t\tthis._init();\n",
"\t\t\tthis.setupRoutes();\n","\t\t\tthis.setupView();\n","\t\t\tthis.setupLayout();\n",
"\n","\t\t\t//when everything is ready, lets route.\n","\t\t\tthis.router.listen();\n","\t\t},\n","\n","\t\t/**\n",
"\t\t * Creating routes using XRegExp\n","\t\t */\n","\t\tsetupRoutes: function()\n","\t\t{\n",
"\t\t\tthis.router = new Jack.Router;\n","\t\t\tthis.router.addRoute('/(index|home)?', 'App.Controller.Index.index');\n",
"\t\t\tthis.router.addRoute('/demo/delete/(?<id>[0-9]+)', 'App.Controller.Demo.delete');\n",
"\t\t\tthis.router.addRoute(Jack.Router.DEFAULT, 'App.Controller.Index.index');\n",
"\t\t\tthis.router.addRoute(Jack.Router.ERROR, 'App.Controller.Error.index');\n","\t\t},\n","\n",
"\t\tsetupView : function()\n","\t\t{\n","\t\t\tJack.View.setBasePath(Jack.getBasePath() + 'App/View');\n",
"\t\t},\n","\n","\t\tsetupLayout: function()\n","\t\t{\n","\t\t\tvar layout = $('div.content');\n",
"\t\t\t/*layout.ajaxStart(function() {\n","\t\t\t\t$(this).html('Loading...');\n","\t\t\t});*/\n","\n",
"\t\t\t//handle document.write\n","\t\t\tJack.Util.Ajax.overloadDocumentWrite();\n",
"\t\t\t//set default container as layout.\n","\t\t\tJack.Util.Ajax.setDocumentWriteContainer(layout);\n","\n","\n",
"\t\t\tJack.Registry.set('App.Layout', layout);\n","\t\t}\n","\t});\n","\n","})(jQuery);\n"]
    
    def createBootstrap(self):
        if os.system("touch %s/Bootstrap.js" % self.bootstrap_location) != 0:
            print "Permission denied : %s/Bootstrap.js" % self.bootstrap_location
        else:
            bootstrap_file = open("%s/Bootstrap.js" % self.bootstrap_location,"a")
            for i in self.bootstrap_template:
                bootstrap_file.write(i)
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
        if os.system("touch %s/%s.js" % (self.controller_location,controller)) != 0:
            print "Permission denied : %s/%s.js" % (self.controller_location,controller)
        else:
            controller_file = open("%s/%s.js" % (self.controller_location,controller),"a")
            for i in self.controller_template:
                controller_file.write(i)
            print "%s controller created." % controller
    
    def createModel(self,model):
        if os.system("touch %s/%s.js" % (self.model_location,model)) != 0:
            print "Permission denied : %s/%s.js" % (self.model_location,model)
        else:
            print "%s model created." % model

    def createView(self,view):
        if os.system("touch %s/%s.js" % (self.view_location,view)) != 0:
            print "Permission denied : %s/%s.js" % (self.view_location,view)
        else:
            print "%s view created." % view
            
    def createPlugin(self,plugin):
        if os.system("touch %s/%s.js" % (self.plugin_location,plugin)) != 0:
            print "Permission denied : %s/%s.js" % (self.plugin_location,plugin)
        else:
            plugin_file = open("%s/%s.js" % (self.plugin_location,plugin),"a")
            for i in self.plugin_template:
                plugin_file.write(i)
            print "%s plugin created." % plugin            

try:            
    o = JackGenerator(sys.argv[1])
    o.createProject()
    o.createController("İlkController")
    o.createModel("İlkModel")
    o.createView("İlkView")
    o.createPlugin("İlkPlugin")
except:
    print "Error."
    
    
    
    
    
    
    
    
    
    
    
    

