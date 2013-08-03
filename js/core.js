// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

/*
 *	CSSrefresh v1.0.1

(function(){var a={array_filter:function(a,b){var c={};for(var d in a){if(b(a[d])){c[d]=a[d]}}return c},filemtime:function(a){var b=this.get_headers(a,1);return b&&b["Last-Modified"]&&Date.parse(b["Last-Modified"])/1e3||false},get_headers:function(a,b){var c=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;if(!c){throw new Error("XMLHttpRequest not supported.")}var d,e,f,g,h=0;try{c.open("HEAD",a,false);c.send(null);if(c.readyState<3){return false}d=c.getAllResponseHeaders();d=d.split("\n");d=this.array_filter(d,function(a){return a.toString().substring(1)!==""});e=b?{}:[];for(g in d){if(b){f=d[g].toString().split(":");e[f.splice(0,1)]=f.join(":").substring(1)}else{e[h++]=d[g]}}return e}catch(i){return false}}};var b=function(){this.reloadFile=function(b){for(var c=0,d=b.length;c<d;c++){var e=b[c],f=a.filemtime(this.getRandom(e.href));if(e.last){if(e.last!=f){e.elem.setAttribute("href",this.getRandom(this.getHref(e.elem)))}}e.last=f}setTimeout(function(){this.reloadFile(b)},1e3)};this.getHref=function(a){return a.getAttribute("href").split("?")[0]};this.getRandom=function(a){return a+"?x="+Math.random()};var b=document.getElementsByTagName("link"),c=[];for(var d=0,e=b.length;d<e;d++){var f=b[d],g=f.rel;if(typeof g!="string"||g.length==0||g=="stylesheet"){c.push({elem:f,href:this.getHref(f),last:false})}}this.reloadFile(c)};b()})()
 */
/*some layout magic*/
$(window).load(function(){
    var paddingForLeftColumn = $('.b-crumbs').height() + 46;
    var paddingForRightColumn = $('.b-pageTitle').height() + paddingForLeftColumn;
    var paddingForRightColumn = $('.b-pageTitle').height() + paddingForLeftColumn;

    $('.l-content__aside--left').css('paddingTop', paddingForLeftColumn);
    $('.l-content__aside--right').css('paddingTop', paddingForRightColumn);

    function equalizeLayoutColumnsHeights(height){
        var $mainColumn = $('.l-content__mainColumn--2ColumnedLayout, .l-content__mainColumn--3ColumnedLayout');
        $mainColumn.css('height', height);
    }
    var mainAreaHeight = $('.l-content--innerPages').height() + paddingForLeftColumn;
    equalizeLayoutColumnsHeights(mainAreaHeight);

    $(window).resize(function(){
        if( $(window).width() > 1300 ){
            mainAreaHeight = 'auto';
            equalizeLayoutColumnsHeights(mainAreaHeight);
            equalize(mainAreaHeight);
        }
    });



    /*set color to all inputs*/
    $('input').parent().addClass('placeholder-colors-base');
    /*columns equalize*/
    function equalize(height){
        $node.children().css('height',height);
    }
    equalize($('.js-equalize').height());
    /*hide half of news on 1024*/
    function calcNeedHeight(){
        return $('.b-index__news__list__unit:nth-child(1)').height() + $('.b-index__news__list__unit:nth-child(2)').height() + $('.b-index__news__list__unit:nth-child(3)').height();
    }
    function setNewsListHeight(){
        if(window.innerWidth <= 1360){
            $('.b-index__news__list').height(calcNeedHeight());
        }
    }
    setNewsListHeight();
    $(window).resize(function(){
        setNewsListHeight();
    });

    /*css-calc fallback*/
    function cssCalc($obj, operator, value){
        if( window.opera ){
            $obj.css('width', '100%').css('width', ''+operator+'='+value);
        }
    }
    cssCalc($('.l-content__mainColumn--2ColumnedLayout'), '-', '200px');
    cssCalc($('.l-content__mainColumn--3ColumnedLayout'), '-', '383px');
    cssCalc($('.l-indexTemplate__mainColumn'), '-', '480px');
    cssCalc($('.b-services__all__searchResults th:first-child, b-services__all__searchResults td:first-child'), '-', '480px');

    /*
     flexbox full width jquery emulator for
     non-supporting flexbox browsers
     */
    if(!(Modernizr.flexbox) || ($.browser.msie && $.browser.version == 10)){
        $('.l-fLine-full').horizontalNav();
    }
});

$(function(){

    /*slider init*/
    $('#index-slider').camera({
        height: '415',
        loader: 'none',
        pagination: true,
        thumbnails: false,
        hover: true,
        opacityOnGrid: false,
        imagePath: '../images/'
    });

    /*tabs init*/
    $(".b-tabs__nav").tabs(".b-tabs__unit");

    /*gallery init*/
    $('.fancybox').fancybox({
        prevEffect		: 'none',
        nextEffect		: 'none',
        helpers: {
            buttons:{}
        }
    });

    /*selectbox init*/
    $('select').selectBox();



//    AJAX
/*    function ajaxRequest(url, dataObject){
        $.ajax({
            url: url,
            data: dataObject,
            success:function(dataObject){

            }
        });
    }
    $('.ajax-organisation').click(function(){
        ajaxRequest();
    });
    $('.ajax-blanksAll').click(function(){
        ajaxRequest();
    });
    $('.ajax-gallery').click(function(){
        ajaxRequest();
    });*/




    /*yandex map*/
    ymaps.ready(mapInit);

    function mapInit(){
        var mapCoords = [59.958448,30.309691];
        var map = new ymaps.Map('map',{
            center: mapCoords,
            zoom: 10
        });
        var placemark = new ymaps.Placemark(mapCoords);
        map.geoObjects.add(placemark);
    }
});

