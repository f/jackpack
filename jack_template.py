#!/usr/bin/env python
#-*- coding:utf-8 -*-

def getTemplate(template,p,a=""):
    t = {"controller_template" : "(function($) {\n\n\tJack.use(\n\t\t\t'Jack.Controller',\n\t\t\t'Jack.View',\n\t\t\t'{{App}}.Model.{{First}}Model'\n\t\t\t);\n\n\t{{App}}.Controller.{{First}}Controller = function() {\n\t\tthis.view = new Jack.View();\n\t\tthis.layout = Jack.Registry.get('{{App}}.Layout');\n\t};\n\t{{App}}.Controller.{{First}}Controller.prototype = Jack.extend(Jack.Controller, {\n\n\t\tindexAction : function(params) {\n\n\t\t\tvar self = this;\n\t\t\tvar commits = Jack.newInstance('{{App}}.Model.{{First}}Model');\n\t\t\tvar commitArray = [];\n\n\t\t\tcommits.Mapper.onComplete(function() {\n\t\t\t\tself.view.assign({commits: commitArray});\n\t\t\t\tself.view.render('{{First}}View', function(data) {\n\t\t\t\t\tself.layout.html(data);\n\t\t\t\t});\n\t\t\t});\n\n\t\t\tcommits.Mapper.getAll(function(i, data){\n\t\t\t\tcommitArray.push(data);\n\t\t\t});\n\n\t\t}\n\n\t});\n\n})(jQuery);\n",
 
 "model_template" : "(function($) {\n\n\tJack.use(\n\t\t'Jack.Model'\n\t);\n\n\t{{App}}.Model.{{First}}Model = function(){\n\t\tthis.committer = null;\n\t\tthis.url = null;\n\t\tthis.message = null;\n\t\tthis.committed_date = null;\n\t};\n\t{{App}}.Model.{{First}}Model.prototype = Jack.extend(Jack.Model, {\n\n\t\tMapper : {\n\n\t\t\tresult : [],\n\n\t\t\tgetAll : function(callback)\n\t\t\t{\n\t\t\t\tvar self = this;\n\t\t\t\tif (this.result.length > 0)\n\t\t\t\t{\n\t\t\t\t\tfor (var index in this.result) {\n\t\t\t\t\t\tcallback(index, this.result[index]);\n\t\t\t\t\t}\n\t\t\t\t\tself.oncomplete();\n\t\t\t\t\return;\n\t\t\t\t}\n\n\n\t\t\t\t$.getJSON('http://github.com/api/v2/json/commits/list/fkadeveloper/jackpack/master?page=1&callback=?', function(response) {\n\n\t\t\t\t\tresponse = response||{commits:[]};\n\n\t\t\t\t\tvar _commit;\n\t\t\t\t\tfor (var index in response.commits)\n\t\t\t\t\t{\n\t\t\t\t\t\tvar commit = response.commits[index];\n\t\t\t\t\t\t_commit = Jack.newInstance('{{App}}.Model.{{First}}Model');\n\t\t\t\t\t\t_commit.committer = commit.committer.name;\n\t\t\t\t\t\t_commit.url = commit.url;\n\t\t\t\t\t\t_commit.message = commit.message;\n\t\t\t\t\t\t_commit.committed_date = commit.committed_date;\n\t\t\t\t\t\tcallback(index, _commit);\n\t\t\t\t\t\tself.result.push(_commit);\n\t\t\t\t\t}\n\t\t\t\t\tself.oncomplete();\n\n\t\t\t\t});\n\t\t\t},\n\n\t\t\tonComplete : function(callback)\n\t\t\t{\n\t\t\t\tthis.oncomplete = callback;\n\t\t\t}\n\t\t}\n\n\t});\n\n})(jQuery);",

    "view_template" : '<h1>Latest Git Commits</h1>\n<div>\n\t<ul class="git_commits">\n\t<% _(commits).each(function(commit){ %>\n\t\t<li>\n\t\t\t<b><q><span class="message"><%= commit.message %></span></q></b> by\n\t\t\t<span class="committer"><%= commit.committer %></span> on\n\t\t\t<span class="date"><%= commit.committed_date %></span>\n\t\t\t<a class="url" href="http://github.com<%= commit.url %>">[Go to details.]</a>\n\t\t</li>\n\t<% }); %>\n\t</ul>\n</div>',

    "plugin_template" : "(function($){\n\n\tJack.use('Jack.Plugin');\n\n\tJack.Plugin.register.jQuery('{{First}}Plugin', function(elements) {\n\n\t\talert(this.length);\n\n\t});\n\n})(jQuery);",

    "bootstrap_template" : "(function($){\n\n\t/**\n\t * Loading required classes.\n\t */\n\tJack.use(\n\t\t'Jack.Bootstrap',\n\t\t'Jack.View',\n\t\t'Jack.Router',\n\t\t'Jack.Util.Ajax'\n\t);\n\n\t/**\n\t * Bootstrap class\n\t *\n\t * Singleton\n\t */\n\t{{App}}.Bootstrap = Jack.extend(Jack.Bootstrap, {\n\n\t\t/**\n\t\t * Initializing...\n\t\t */\n\t\tinit: function()\n\t\t{\n\t\t\tthis._init();\n\t\t\tthis.setupRoutes();\n\t\t\tthis.setupView();\n\t\t\tthis.setupLayout();\n\n\t\t\t//when everything is ready, lets route.\n\t\t\tthis.router.listen();\n\t\t},\n\n\t\t/**\n\t\t * Creating routes using XRegExp\n\t\t */\n\t\tsetupRoutes: function()\n\t\t{\n\t\t\tthis.router = new Jack.Router;\n\t\t\tthis.router.addRoute('/(index|home)?', '{{App}}.Controller.Index.index');\n\t\t\tthis.router.addRoute('/live', '{{App}}.Controller.{{First}}Controller.index');\n\t\t\tthis.router.addRoute(Jack.Router.DEFAULT, '{{App}}.Controller.Index.index');\n\t\t\tthis.router.addRoute(Jack.Router.ERROR, '{{App}}.Controller.Error.index');\n\t\t},\n\n\t\tsetupView : function()\n\t\t{\n\t\t\tJack.View.setBasePath(Jack.getBasePath() + '{{App}}/View');\n\t\t},\n\n\t\tsetupLayout: function()\n\t\t{\n\t\t\tvar layout = $('div.content');\n\t\t\t/*layout.ajaxStart(function() {\n\t\t\t\t$(this).html('Loading...');\n\t\t\t});*/\n\n\t\t\t//handle document.write\n\t\t\tJack.Util.Ajax.overloadDocumentWrite();\n\t\t\t//set default container as layout.\n\t\t\tJack.Util.Ajax.setDocumentWriteContainer(layout);\n\n\n\t\t\tJack.Registry.set('{{App}}.Layout', layout);\n\t\t}\n\t});\n\n})(jQuery);\n"}
    if not a:
        return str(t[template]).replace("{{App}}",p).replace("{{First}}",p)
    else:
        return str(t[template]).replace("{{App}}",p).replace("{{First}}",a)