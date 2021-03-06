// ==UserScript==
// @name           Size and color of rating according to it, no Zero
// @namespace      leprosorium++commentsratings
// @description    Увеличивает размер и меняет цвет шрифта оценки в зависимости от рейтинга. Делает оценку O белой.
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// @require        jquery-1.9.1.min.js
// ==/UserScript==

function main() {


    function d2h(d) {
        d = Math.abs(d);
        d = d % good_limit;
        d = good_limit / 4 + 3 * d / 4;
        d = Math.round(256 * d / good_limit);
        var str = d.toString(16);
        if (str.length == 2) return str;
        else return "0" + str;
    }

    var vote_results = jQuery('#js-commentsHolder .vote_result');
    var good_limit = 300;

    jQuery.each(vote_results, function(k, v) {
        var rating = parseInt(jQuery(v).text(), 10);

        var style = {};

        if ((rating > good_limit * 2)) {
            style["color"] = "#0000" + d2h(rating);
            style["padding-right"] = "10px";
        } else if ((rating > good_limit) && (rating < good_limit * 2)) {
            style["color"] = "#00" + d2h(good_limit * 2 - rating - 1) + d2h(rating);
        } else if (rating > 0 && rating <= good_limit) {
            style["color"] = "#00" + d2h(rating) + "00";
        } else if (rating == 0) {
            style["color"] = "#ffffff";
        } else if (rating < 0) {
            rating = 0;
        } else if (rating < 0 && rating >= -good_limit) {
            style["color"] = "#" + d2h(rating) + "0000";
        } else if (rating < -good_limit) {
            style["color"] = "#ff0000";
        }

        style["font-size"] = Math.min(16, 9 + 2 * Math.log(Math.abs(rating) + 1)) + "px"

        jQuery(v).css(style);

    });
}
kango.invokeAsync('kango.storage.getItem', 'plugins', function(value){

    var name = 'commentsratings';

    if( value !== null && value.hasOwnProperty( name ) && value[ name ] == 1 )
    {
        main();
    }
});
