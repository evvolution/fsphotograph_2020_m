
/*
    note：总控
    anthor：zx
*/

var step = $("#step");
var commonlink = 'https://server3.foshanplus.com/';

$(document).ready(function() {
    initMainview()
    initSize();
    initFile();
    initLiteswitchp3();
    initLitestep();
    initModals();
    initZoom();

    inittype();
    getoldprjs();
});

window.onload = function() {
    
}
