#!/usr/bin/env python
#-*- coding:utf-8 -*-

import os,urllib2

class JackPack:
    def __init__(self,base_url,jack_url,project_name):
        self.base_url = base_url
        self.project_name = project_name
        self.jack_url = jack_url
    def download_jack(self):
        jack_file = urllib2.urlopen(self.base_url).read()
        j = open("Jack.tar","w").write(jack_file)
        os.system("tar xf Jack.tar")
         
    def download_jack_project(self):
        jack_project = urllib2.urlopen(self.jack_url).read().replace("@PROJECTNAME@",self.project_name)
        download_to = "%s/jack-project.py" % self.project_name
        j = open(download_to,"w").write(jack_project)
        
    def create_project(self):
        if os.mkdir(self.project_name) == None:
            os.mkdir("%s/Controller") % self.project_name
            os.mkdir("%s/Model") % self.project_name
            os.mkdir("%s/View") % self.project_name
            os.mkdir("%s/Plugins") % self.project_name
            self.download_jack()
            self.download_jack_project()    
        
    
a = JackPack("https://github.com/fkadeveloper/jackpack/raw/template/js/Jack.tar","Deneme_Project")
a.create_project()
