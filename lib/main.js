var data = require("self").data;
var _ = require("l10n").get;
var tabs = require("tabs");
var pageMod = require("page-mod");
var widgets = require("widget");

var workers = [];
var toc_style = data.load('toc.css')

function findWorker() {
    for each ( var worker in workers) {
        if(worker.tab.index == tabs.activeTab.index) {
            return worker;
        }
    }
    return false;
}

function detachWorker(worker) {
  var index = workers.indexOf(worker);
  if(index != -1) {
    workers.splice(index, 1);
  }
}

mod = pageMod.PageMod(
{
    include: "*",
    contentScriptWhen: "ready",
    contentScriptFile: [data.url("jquery.min.js"), data.url('jquery.toc.min.js'), data.url("panel.js")],
    onAttach: function onAttach(worker) 
    {
        worker.port.emit('create_toc', toc_style, _('close'));
        workers.push(worker);
        worker.on('detach', function () {
            detachWorker(this);
        });
    }
});

var tocwidget = widgets.Widget({
    id: "tocWidget",
    label: _("toc"),
    contentURL: data.url("toc.png"),
    onClick: function(ev){
        var worker = findWorker();
        if(worker) {
            worker.port.emit('toggle_toc');    
        }
    }
});

