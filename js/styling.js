$(document).ready(function(){
    console.log(`styling loaded!`);

    $(`#toggleBackground`).click(function(){
        $(".backgroundImg").toggle();
        console.log(`background button clicked`);
    });// #togglebackground


});//document.ready