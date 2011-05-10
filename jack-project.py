#!/usr/bin/env python
#-*- coding:utf-8 -*-

import os,sys,urllib2,argparse

class JackProject:
    def __init__(self,project_name):
        self.project_name = project_name
        
    def init(self,obj,file_name):
        self.obj = obj
        self.file_name = file_name
        if obj == "model":
            self._download = urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/model.js").read()
            self.download = self._download.replace("@PROJECT@",self.project_name).replace("@MODEL@",self.file_name)
            self.download_to = "Model"
        if obj == "controller":
            self._download = urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/controller.js").read()
            self.download = self._download.replace("@PROJECT@",self.project_name).replace("@CONTROLLER@",self.file_name)
            self.download_to = "Controller"
        if obj == "view":
            self.download = urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/view.html").read()  
            self.download_to = "View"
        if obj == "jquery-plugin":
            self._download = urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/jquery-plugin.js").read()
            self.download = self._download.replace("@PLUGIN@",self.file_name)
            self.download_to = "Plugins"
        if obj == "underscore-plugin":
            self.download = urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/underscore-plugin.js").read()
            self.download = self._download.replace("@PLUGIN@",self.file_name)
            self.download_to = "Plugins"
            
    def download_template(self):
        if self.obj == "view":
            write_to = "%s/%s.html" %(self.download_to,self.file_name)
        else:
            write_to = "%s/%s.js" %(self.download_to,self.file_name)
        
        open(write_to,"w").write(self.download)
        

parser = argparse.ArgumentParser(description='Create models,controllers,views,plugins...')
parser.add_argument('--model',help='Create model')
parser.add_argument('--controller',help='Create controller')
parser.add_argument('--view',help='Create controller')
parser.add_argument('--jquery',help='Create jquery plugin')
parser.add_argument('--underscore',help='Create underscore plugin')
arg = parser.parse_args()

jackproject = JackProject(@PROJECTNAME@)

if arg.model:
    jackproject.init("model",arg.model)
if arg.controller:
    jackproject.init("controller",arg.controller)
if arg.view:
    jackproject.init("view",arg.view)
if arg.jquery:
    jackproject.init("jquery-plugin",arg.jquery)
if arg.underscore:
    jackproject.init("underscore-plugin",arg.underscore)
    
jackproject.download_template()



