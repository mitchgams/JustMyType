let game ={
    sentences: ['ten ate neite ate nee enet ite ate inet ent eate', 
    'Too ato too nOt enot one totA not anot tOO aNot', 
    'oat itain oat tain nate eate tea anne inant nean', 
    'itant eate anot eat nato inate eat anot tain eat', 
    'nee ene ate ite tent tiet ent ine ene ete ene ate'],
    charNum: 0,
    wordCharList: [],
    sentenceNum: 0,
    wordCount: 0,
    mistakes: 0,
    initialTime: null,
    finalTime: null
}
$('document').ready(function() {
    
    // keyboard shift
    $('#keyboard-upper-container').css('visibility', 'hidden');
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
            $('#keyboard-lower-container').css('visibility', 'hidden');
            $('#keyboard-upper-container').css('visibility', 'visible');
    }
    function lowerCase() {
        $('#keyboard-lower-container').css('visibility', 'visible');
        $('#keyboard-upper-container').css('visibility', 'hidden');
      
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
        game.wordCharList = game.sentences[game.sentenceNum].split('');
        $('#feedback').empty();
        $('#target-letter').empty();
        $('#sentence').empty();
        $('<p>'+game.sentences[game.sentenceNum]+'</p>').appendTo('#sentence');
        $('<p>Character up: '+game.wordCharList[game.charNum]+'</p>').appendTo('#target-letter');
    }
    
    setupPromp();

    console.log(game);

    function checkClick(id) {
        if(String.fromCharCode(id) !== game.wordCharList[game.charNum]) { // character wrong
            $('#feedback').empty();
            $('<p>&#10060;</p>').appendTo('#feedback');
            game.mistakes++;
        } else { // character correct

            game.charNum++;
            $('#target-letter').empty();
            $('<p>Character up: '+game.wordCharList[game.charNum]+'</p>').appendTo('#target-letter');
            $('#feedback').empty();
            $('<p>&#9989;</p>').appendTo('#feedback');
            setHLPx(false);
            if(String.fromCharCode(id) === " ") game.wordCount++;
            if(game.charNum === game.wordCharList.length) { // sentence complete & last word count++
                game.wordCount++;
                game.sentenceNum++;
                let nT = new Date();
                game.finalTime = ((nT.getTime() - game.initialTime)/1000/60);
                $('#previous-wpm').empty();
                $('<p>' + ((game.wordCount/game.finalTime)-(2*game.mistakes)).toFixed(2) + ' words per minute!</p>').appendTo('#previous-wpm');
                if(game.sentenceNum < game.sentences.length) { // more sentences to go 
                    game.charNum = 0;
                    setHLPx(true);
                    setupPromp();
                }
            }
        }
    }

    function setHLPx(reset) {
        reset ? ($('#yellow-block').css('margin-left', '0px')) : ($('#yellow-block').css("margin-left", (17*game.charNum).toString()+"px"));
    }

    /**********************
     * LOL was too tired to think clearly below apparently
     * 
     * 
     */
    /*function checkClick(id) {
        try {
            if(game.requireSpace && String.fromCharCode(id) !== " ") {
                to
            } 
            if(String.fromCharCode(id) === game.wordCharList[game.wordCount][game.charNum] 
            && game.wordCharList[game.wordCount].length >= game.charNum) {
                game.charNum++;
                // remove word from list once complete
                // also increase word count
                if(game.wordCharList[game.wordCount].length === game.charNum) { 
                    game.wordList.shift();
                    game.wordCount++;
                    game.charNum = 0;
                    game.requireSpace = true;
                }
                console.log("correct click and word still has a character to play");
            }
            if(game.wordCharList[game.wordCount].length === game.charNum
                && game.wordList.length > 0) {
                    if(String.fromCharCode(id) === " ") {

                    }
                    console.log("word is finnished and there are more words to go");
                    console.log(game.wordCharList);
            }
            if(game.wordList.length === 0) {

            }
        } catch (e) {
            console.log("sentence is finnished");
            $('<p>complete</p>').appendTo('#previous-wpm');
            game.charNum = 0;
            game.wordCount = 0;
            game.sentences.shift();
            game.setWordList();
            game.setWordCharList();
            setupPromp();
            console.log(game);
        }
    }*/

    /*function setHLPx(reset) {
        if(reset) {
            $('#yellow-block').css('margin-left', '0px');
        } else {
            $('#yellow-block').css("margin-left", (17*game.charNum).toString()+"px");
        }
    }
    setupPromp();
    function checkClick(id) {
        console.log(game);
        $('#feedback').empty();
        if(String.fromCharCode(id) === " ") game.wordCount++;
        if(game.charList[0] !== String.fromCharCode(id)) { // wrong
            $('<p>&#10060;</p>').appendTo('#feedback');
            game.mistakes++; //add mistake
        } else { // right
            game.charNum++;
            setHLPx(false); // false default
            $('<p>&#9989;</p>').appendTo('#feedback');
            game.charList.shift();
            $('#target-letter').empty();
            $('<p>Character up: '+game.charList[0]+'</p>').appendTo('#target-letter');
            if(game.charList[0] === undefined) {
                game.sentenceNum++;
                setupPromp();
                setHLPx(true);
                game.charNum = 0;
                game.wordCount++;
            }
        }
    }
    console.log(game.charList);
*/
    

      

});
