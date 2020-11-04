let game ={
    sentences: ['ten ate neite ate nee enet ite ate inet ent eate', 
    'Too ato too nOt enot one totA not anot tOO aNot', 
    'oat itain oat tain nate eate tea anne inant nean', 
    'itant eate anot eat nato inate eat anot tain eat', 
    'nee ene ate ite tent tiet ent ine ene ete ene ate'],
    charNum: 0,
    sentenceCharList: [],
    sentenceNum: 0,
    wordCount: 0,
    mistakes: 0,
    initialTime: null,
    finalTime: null
}
$('document').ready(function() {
    
    // keyboard shift
    $('#keyboard-upper-container').hide();
    $("body").on({
        keydown: function(e) {
          if (e.originalEvent.key === "Shift")
            upperCase();
        },
        keyup: function(e) {
          if (e.originalEvent.key === "Shift")
            lowerCase();
        }
      })
    function upperCase() {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
    }
    function lowerCase() {
        $('#keyboard-lower-container').show();
        $('#keyboard-upper-container').hide();
      
    }

    // keyboard highlights
    $('.key').mouseover(function() {
        $(this).css('background-color', 'cyan');
    });
    $('.key').click(function() {
        $(this).css('background-color', 'lightgray');
        checkClick($(this).attr("id"));
    });
    $('.key').mouseout(function() {
        $(this).css('background-color', '');
    });

    function setupPromp() {
        let nT = new Date();
        game.initialTime = nT.getTime();
        game.sentenceCharList = game.sentences[game.sentenceNum].split('');
        $('#feedback').empty();
        $('#target-letter').empty().append('<p>Character up: '+game.sentenceCharList[game.charNum]+'</p>');
        $('#sentence').empty().append('<p>'+game.sentences[game.sentenceNum]+'</p>');
    }
    
    setupPromp();

    console.log(game);

    function checkClick(id) {
        if(String.fromCharCode(id) !== game.sentenceCharList[game.charNum]) { // character wrong
            $('#feedback').empty().append('<p>&#10060;</p>');
            game.mistakes++;
        } else { // character correct

            game.charNum++;
            $('#target-letter').empty().append('<p>Character up: '+game.sentenceCharList[game.charNum]+'</p>');
            $('#feedback').empty().append('<p>&#9989;</p>');
            setHighLightPx(false);
            if(String.fromCharCode(id) === " ") game.wordCount++;
            if(game.charNum === game.sentenceCharList.length) { // sentence complete & last word count++
                game.wordCount++;
                let nT = new Date();
                game.finalTime = ((nT.getTime() - game.initialTime)/1000/60);
                $('#previous-wpm').empty();
                $('<p>' + ((game.wordCount/game.finalTime)-(2*game.mistakes)).toFixed(2) + ' words per minute!</p>').appendTo('#previous-wpm');
                if(game.sentenceNum < game.sentences.length) { // more sentences to go
                    game.mistakes = 0;  
                    game.wordCount = 0;
                    game.sentenceNum++;
                    game.charNum = 0;
                    setHighLightPx(true);
                    setupPromp();
                }
            }
        }
    }

    function setHighLightPx(reset) {
        reset ? ($('#yellow-block').css('margin-left', '0px')) : ($('#yellow-block').css("margin-left", (17*game.charNum).toString()+"px"));
    }
});
