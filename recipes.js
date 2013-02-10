jQuery(document).ready(function($) {
    var ICON_PATH = 'ico/' ;

     var recipes = {
        0 : {
            result: 'PoE',
            recs: ['Выберите рецепт из списка.']
        }, 
        1 : {
                result:'Alchemy Shard x1',
                recs:[ 'item with +1 level to X gems mod',
                       'item with chaos resistance mod x1',
                       'flask with "Surgeon\'s" (recharge on crit) mod x1']
        },
        2 : {
                result:'Alchemy Shard x2',
                recs:['item with "Raiding", "Archaeology", or "Pirate\'s" (item rarity) mod x1',
                'item with "Gathering", "Hoarding" (item quantity) mod x1',
                'item with “Pirate’s”, “Dragon’s” (item rarity prefix) mod x1']
        },
        3 : {
                result:'Alchemy Shard x3',
                recs:['item with chaos resistance mod (with maxed value) x1']
        },
        4 : {
                result:'Alchemy Shard x4',
                recs:['item with "Pirate\'s" or "Dragon\'s" (item rarity prefix) mod (with maxed value) x1',
                'item with "Gathering", "Hoarding" (item quantity) mod (with maxed value) x1',
                'item with "Raiding", "Archaeology", or "Pirate\'s" (item rarity) mod (with maxed value) x1']
        }
    } ;

    // img src map for recipes
    var imgMap = {
        "Alchemy_Shard_icon.png" : [1,2,3,4],
        'Mirror_of_Kalandra_icon.png': [0]
    } ;

    // select#rec-select init
    $.each(recipes, function (index, value) {
        $('#rec-select').append('<option value='+index+'>'+value['result']+'</option>');
    });
    $('#rec-wrapper').append('<table>');

    // render html for rec
    function renderTable(recObj, iconSrc) {
        var $elemTbl = $('<table><tr>') ;
        var $elemReps = $('<ul>') ;
        $.each(recObj.recs, function(index,value){
            $('<li/>').html(value).appendTo($elemReps);
        });
        var $elemTdIcon = $('<td><h3>'+recObj.result+'</h3>'+'<img src='+ICON_PATH+iconSrc+' />') ;
        var $elemTdRec = $('<td>').append($elemReps) ;
        return $('#rec-wrapper').append( $elemTbl.append( $elemTdIcon, $elemTdRec ).hide() ).find('table');
    }
    
    $('#rec-select').change( function () {
        var table = $('#rec-wrapper table') ;
        var selected = $(this).val() ;
        var src = getSrc (selected, imgMap) ;
        table.fadeOut('slow', function(){
            $(this).detach();
            renderTable(recipes[selected], src).fadeIn('slow'); 
        });
    });

    $('#rec-select').change() ;

    function getSrc (selected, imgMap) {
        var src = '0' ;
        $.each(imgMap, function (index, value) {
            console.log(selected, index, value);
            if ( !!~$.inArray(+selected, value) ) {
                src = index ;
                return false ;
            } 
        });
        return src ;
    }
});