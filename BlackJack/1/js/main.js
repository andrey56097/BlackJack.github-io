var playerCardCounter, dCounter,pCounter, bet, balance, login;

function set() {
    balance=1000;
    dCounter=0;
    pCounter=0;
    playerCardCounter=0;
    bet=0;
    // disabling buttons Hit and Stay and printing current balance
    document.getElementById('stay').disabled=true;
    document.getElementById('hit').disabled=true;
  //  document.getElementById('balance').innerText=balance;
    document.getElementById('result').innerText="";
}

function reset() {
    var ar=document.getElementsByClassName('card');
    for(var i=0;i<ar.length;i++)
    {
        ar[i].style.background="";
    }

    document.getElementById('dealer-score').innerText="";
    document.getElementById('dealer-score').innerText="";
    document.getElementById('result').innerText="";
    dCounter=0;
    pCounter=0;
    playerCardCounter=0;
}
function signup_selected(){
     $('.reg-tab').addClass('selected');
     $('.log-tab').removeClass('selected');
     $('#reg-form').addClass('is-selected');
     $('#login-form').removeClass('is-selected');
}
function login_selected(){
     $('.log-tab').addClass('selected');
     $('.reg-tab').removeClass('selected');
     $('#login-form').addClass('is-selected');
     $('#reg-form').removeClass('is-selected');
}
function switch_tab(){
    $(event.target).is( $('.log-tab') ) ? login_selected() : signup_selected();
}

function validate_login_form(){
   /* if()
    $('cd-error-message:first')*/
}
function hideError(){
    $('#err1').removeClass('has-error');
     $('#err2').removeClass('has-error');
}
function auth(){
     event.preventDefault();
    var login_field = $('#login-form .your-name').val();
    var pass_field = $('#login-form .your-password').val();
    var result;
    var requestComplete=false;
    var error=false;
    if(login_field=="" || pass_field==""){
        error=true;
        $('#err1').text("Заполните все поля!");
          $('#err1').addClass('has-error');
    }
    if(!error){
        $.ajax({ // инициaлизируeм ajax зaпрoс
               type: 'POST', // oтпрaвляeм в POST фoрмaтe
               url: 'test.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
               data: {'login':login_field, 'password':pass_field}, // дaнныe для oтпрaвки
               success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
               // alert(data);
                    if(data==1){
                        $('#err1').text("Логин или пароль неверны!");
                        $('#err1').addClass('has-error');
                    }
                    result=data;
                    requestComplete=true;
                 },
                 });
        event.preventDefault();
       // alert(result);
       setTimeout(function(){
        if(result!="1" && !error){
        location.reload();
    }},1000);
        
    
    }
}

function reg(){
    var login_field = $('#reg-form .your-name').val();
    var pass_field = $('#reg-form .your-password:eq(0)').val();
    var check_pass_field = $('#reg-form .your-password:eq(1)').val();
    var requestComplete=false;
    var error=false;
    if(login_field=="" || pass_field=="" || check_pass_field==""){
        error=true;
         $('#err2').text("Заполните все поля!");
         $('#err2').addClass('has-error');
    }
    else if(pass_field!=check_pass_field){
        error=true;
         $('#err2').text("Пароли не совпадают!");
         $('#err2').addClass('has-error');
    }
    if(!error){
    $.ajax({ // инициaлизируeм ajax зaпрoс
               type: 'POST', // oтпрaвляeм в POST фoрмaтe
               url: 'reg.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
               data: {'login':login_field, 'password':pass_field}, // дaнныe для oтпрaвки
               success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
               // alert(data);
                    if(data==2){
                        $('#err2').text("Такой пользователь уже существует!");
                        $('#err2').addClass('has-error');
                    }
                    result=data;
                    requestComplete=true;
                 },
                 });
}
    event.preventDefault();
       setTimeout(function(){
        if(result=="0"){
        location.reload();
    }},1000);
}

function getHistory(){
    document.getElementById('history').style.display='block';
    document.getElementById('fade').style.display='block'
    login=document.getElementById('name').innerText;
     $.ajax({ // инициaлизируeм ajax зaпрoс
               type: 'POST', // oтпрaвляeм в POST фoрмaтe
               url: 'getHistory.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
               data: {'login':login}, // дaнныe для oтпрaвки
               success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
               // alert(data);
    
                        $('#history').html(data);
                    
                    requestComplete=true;
                 },
                 });
}
function hideHistory(){
    document.getElementById('history').style.display='none';document.getElementById('fade').style.display='none';
}
function change_balance(){
    login=document.getElementById('name').innerText;
    $.ajax({
    type: 'POST',
    url: 'change_balance.php',
    data: {'login':login, 'balance':balance},
    });
}

function record_history(result_str){
    login=document.getElementById('name').innerText;
    $.ajax({
      type: 'POST',
      url: 'record_history.php',
      data: {'login':login, 'bet':bet, 'result':result_str},
    });
}

function showPromt(promt){
    var el=$('#promt');
    el.text(promt);
    el.css('opacity','1');

    setTimeout(function(){el.css('opacity','0'); $('#bet-input').val("");},2300);
}

function validate_bet(str){
    try{
    login=document.getElementById('name').innerText;
    }
    catch(e){
        showPromt("Авторизируйтесь!");
        return false;
    }
    if(str==""){
        showPromt("Введите ставку!");
        return false;
    }
    if(isNaN(str+5) || (+str<=0)){
        showPromt("Введите корректную ставку!");
        return false;
    }
    if(+str>balance){
        showPromt("Недостаточно денег!");
        return false;
    }
    return true;
}
//random value
function shuffle(maxValue) {
    return Math.floor(Math.random()*maxValue+1)
}
// suit of card
function getSuit(){
    suit=shuffle(4);
    if(suit === 1) return "Spades";
    if(suit === 2) return "Clubs";
    if(suit === 3) return "Diamonds";
    else return "Hearts";
}
// returns name of card
function getCardName(card) {
    if(card === 1) return "Ace";
    if(card === 11) return "Jack";
    if(card === 12) return "Queen";
    if(card === 13) return "King";
    return "" + card;
}

var Card={
    constructor: function () {
        this.card=shuffle(12);
        this.name=getCardName(this.card);
        this.suit=getSuit();
        return this;
        //this.cardValue=getCardValue(this.card);
    },
    getCardValue: function(who){
        if(this.card===1){
            if (who == "you" && pCounter <= 10)
                return 11;
                if(who == "dealer" && dCounter <= 10)
                    return 11;
            else return 1;
        }

        if (this.card > 10) {
            return 10;
        }
        return this.card;
    },
    draw: function (id) {
        var file="";
        if(this.suit=="Spades") file="img/spades.png";
        if(this.suit=="Hearts") file="img/hearts.png";
        if(this.suit=="Diamonds") file="img/diamonds.png";
        if(this.suit=="Clubs") file="img/clubs.png";
        var x=0, y=0;
        switch (this.card){
            case 1: x=0; y=0; break;
            case 2: x=-101.7; y=0; break;
            case 3: x=-203.4; y=0; break;
            case 4: x=-305.2; y=0; break;
            case 5: x=-407; y=0; break;
            case 6: x=-0; y=-133; break;
            case 7: x=-101.7; y=-133; break;
            case 8: x=-203.4; y=-133; break;
            case 9: x=-305.2; y=-133; break;
            case 10: x=-407; y=-133; break;
            case 11: x=0; y=-266; break;
            case 12: x=-101.7; y=-266; break;
            case 13: x=-203.4; y=-266; break;
        }
        document.getElementById(id).style.background='url('+file+')';
        document.getElementById(id).style.backgroundPosition=x+"px "+y+"px";

    }
}

// starting the game
function start() {
    reset();
    balance=+document.getElementById('balance').innerText;
    // reading bet from textbox
    bet = document.getElementById('bet-input').value;

        if(validate_bet(bet)){
        //clear settings
        //  reset();
        //generate card for dealer
        card1D = Object.create(Card).constructor();
        card1D.draw('card1D');
        dCounter = +card1D.getCardValue('dealer');
        document.getElementById('dealer-score').innerText = dCounter;
        // generate 2 cards for player
        card1P = Object.create(Card).constructor();
        card1P.draw('card1P');
        pCounter = +card1P.getCardValue('you');
        card2P = Object.create(Card).constructor();
        card2P.draw('card2P');
        pCounter += +card2P.getCardValue('you');
        document.getElementById('player-score').innerText = pCounter;
        // change balance
        balance = balance - bet;
        document.getElementById('balance').innerText = balance;

        playerCardCounter = 2;
        document.getElementById('start').disabled = true;
        document.getElementById('stay').disabled = false;
        document.getElementById('hit').disabled = false;
        document.getElementById('bet-input').setAttribute("readonly", "readonly");
    }

}

function stay() {
    var i = 2;
    // dealer draws cards while his counter is less than 17
    while (dCounter < 17) {

        card=Object.create(Card).constructor();
        card.draw('card'+i+'D');
        dCounter +=+card.getCardValue('dealer');
        document.getElementById('dealer-score').innerText = dCounter;
        i++;

    }
    // if dealer counter bigger than player counter, he won
    if (dCounter > pCounter && dCounter<=21) {
        document.getElementById('result').innerText = "Вы проиграли!";
        record_history("loss");
    }
    // if it equals - draw
    else if(pCounter===dCounter){
        document.getElementById('result').innerText = "Ничья!";
        balance+=+bet;
        document.getElementById('balance').innerText=balance;
        record_history("draw");
    }
    // or player won
    else{
        document.getElementById('result').innerText = "Вы выиграли!!!";
        record_history("win");
        if(pCounter==21) {
            balance += bet * 2.5;
        }
        else {
            balance += bet * 2;
        }
        document.getElementById('balance').innerText=balance;
    }
    // disabling buttons Stay and Hit, unlocking button Start and unlocking textbox
    document.getElementById('start').disabled = false;
    document.getElementById('stay').disabled = true;
    document.getElementById('hit').disabled = true;
    document.getElementById('bet-input').removeAttribute("readonly");
    change_balance();
}
function hit() {
    // player draws card
    playerCardCounter++;
    card = Object.create(Card).constructor();
    card.draw('card'+playerCardCounter+'P');
    pCounter+=+card.getCardValue('you');
    document.getElementById('player-score').innerText = pCounter;
    // if he busted, show message, disable buttons Hit and Stay, unlock Start and textbox
    if(pCounter>21){
        document.getElementById('result').innerText = "Перебор! Вы проиграли!";
        document.getElementById('start').disabled = false;
        document.getElementById('stay').disabled = true;
        document.getElementById('hit').disabled = true;
        document.getElementById('bet-input').removeAttribute("readonly");
      change_balance();
      record_history("loss");
    }
}