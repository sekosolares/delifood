// index js
function showPage() {
    $("#saludo").fadeOut(300);
    window.setTimeout(() => {
        $(".hideable").fadeIn(300);
        $("#menu_open").fadeIn(300);
    }, 500);
}
var Timeout;
function Cargar() {
    Timeout = setTimeout(showPage, 2000);
}
function iframeMenu(){
    if($("#menu-frame").css("display") == "none"){
        document.menuFrame.location = 'menu.html';
        $(".hideable").fadeOut(500);
        $("#menu-button").val(".CERRAR MENU.");
        $("#menu-button").addClass("stage2");
        $("#menu_open").css("margin-top", "0px");
        $("#menu_open").css("margin-bottom", "10px");
        window.setTimeout(() => {
            $('#menu-frame').fadeIn(500);
        }, 800);
    }else{
        $("#menu-frame").fadeOut(500);
        $("#menu-button").val(".ABRIR MENU.");
        $("#menu-button").removeClass("stage2");
        $("#menu_open").css("margin-top", "60px");
        $("#menu_open").css("margin-bottom", "0px");
        window.setTimeout(() => {
            $(".hideable").fadeIn(500);
            
        }, 800);
    }
}
$(document).ready(function(){
    Cargar();
    $("#menu-frame").hide();
    $("#bar-pref").hide();
    $("#pref").click(function(){
        if($("#bar-pref").css("display") == "none"){
            $("#bar-pref").slideDown(500);
        }else{
            $("#bar-pref").slideUp(500);
        }
    });
    $("#help").click(function(){
        alert("Esta pagina, al ser una demostracion, no tiene absolutamente nada relevante para mostrar en esta seccion.");
    });
    $("#pwd").click(function(){
        alert("Esta opcion no funciona. ");
    });
});