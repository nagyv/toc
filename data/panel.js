self.port.on('create_toc', function(css, close_text){
    create_toc(css, close_text);
});
self.port.on('toggle_toc', function(){
    toggle_toc();
});

function create_toc(css, close_text){
    $('body').append('<div id="bikatoc"><a class="control">' + close_text + '</a><div class="toc"></div></div>');
    toggle_toc();
    $('head').append("<link href='http://fonts.googleapis.com/css?family=Average&subset=latin,latin-ext' rel='stylesheet' type='text/css'>");
    $('head').append('<style>' + css + '</style>');
    $("#bikatoc .control").click(function(ev){
        $('#bikatoc').hide();
        ev.preventDefault();
    });
    $('#bikatoc .toc').toc();
    console.log('toc created');
}
function toggle_toc(){
    $('#bikatoc').toggle();
    console.log('toc shown');
}
