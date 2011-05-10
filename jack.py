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
        jack_project = urllib2.urlopen(self.jack_url).read().replace("@PROJECTNAME@","'%s'" % self.project_name)
        download_to = "%s/jack-project.py" % self.project_name
        j = open(download_to,"w").write(jack_project)
        
    def create_project(self):
        os.mkdir(self.project_name)
        os.mkdir("%s/Controller" % self.project_name) 
        os.mkdir("%s/Model" % self.project_name) 
        os.mkdir("%s/View" % self.project_name) 
        os.mkdir("%s/Plugins" % self.project_name)
        open("%s/Bootstrap.js" % self.project_name,"w").write(urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/project/js/PROJECT/Bootstrap.js").read().replace("@PROJECT@",self.project_name))
        open("%s/Controller/Error.js" % self.project_name,"w").write(urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/project/js/PROJECT/Controller/Error.js").read().replace("@PROJECT@",self.project_name))
        open("%s/Controller/Index.js" % self.project_name,"w").write(urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/project/js/PROJECT/Controller/Index.js").read().replace("@PROJECT@",self.project_name))
        open("%s/View/error.html" % self.project_name,"w").write(urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/project/js/PROJECT/View/error.html").read())
        open("%s/View/index.html" % self.project_name,"w").write(urllib2.urlopen("https://github.com/fkadeveloper/jackpack/raw/master/templates/project/js/PROJECT/View/index.html").read())
        self.download_jack()
        self.download_jack_project()    
 
    
a = JackPack("https://github.com/fkadeveloper/jackpack/raw/template/js/Jack.tar","https://github.com/fkadeveloper/jackpack/raw/master/jack-project.py","Deneme_Project")
a.create_project()
