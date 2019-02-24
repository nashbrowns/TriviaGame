//Global variables
var answer;
var chosen;
var qNum = 0;
var Correct = 0;
var Incorrect = 0;
var timerRst = 20;
var Sec = timerRst;
var intervalId;

//Question Object
var Question = [
     
  {
    Text: 'Eye protection must be worn: ', 
    Answer: 'B',
    qImage: 'assets/images/SafetyGlasses.jpg', 
    A: 'Only when working on a machine', B: 'At all times working in the woodshop', C: 'When a teacher reminds me', D: 'Lol who needs protection'
  },
  {
    Text: 'Proper footwear in the woodshop is:', 
    Answer: 'C',
    qImage: 'assets/images/HurtToe.jpg', 
    A: 'Sandals', B: 'Moon Shoes', C: 'Close toed shoes', D: 'I Don\'t need shoes'
  },
  {
    Text: 'People allowed to work in the shop are: ', 
    Answer: 'A',
    qImage: 'assets/images/KidTools.jpg', 
    A: 'People who have taken the appropriate safety class', B: 'People who feel confident enough', C: 'Nobody', D: 'Infants'
  },
  {
    Text: 'The first priority when working on a machine is: ', 
    Answer: 'D',
    qImage: 'assets/images/CoolDude.jpg', 
    A: 'That I don\'t make any mistakes', B: 'That I watch other people around me', C: 'That I look cool', D: 'That I am always thinking about safety'
  },
  {
    Text: 'Before turning on one of the machines', 
    Answer: 'B',
    qImage: 'assets/images/TableSaw.jpg', 
    A: 'Verbally announce you are going to use the machine', B: 'Turn on the dust collection system or make sure it\'s on', C: 'Use the restroom', D: 'Make sure you look cool'
  },

];

function CheckAnswer(){
  if(chosen==answer){
    Correct++;
  }
  else{
    Incorrect++;
  }

  console.log("Correct = "+Correct);
  console.log("Incorrect = "+Incorrect);

}

function Submit(){
/*     Sec = timerRst;
    clearInterval(intervalId);
    intervalId = setInterval(Countdown, 1000); */
    //Takes all text from buttons with class "active" eliminates white space, and puts it in chosen array
    $( ".active" ).each(function( index ) {
        console.log( index + ": " + $( this ).text() ); //logs original text from elements with class "active"
        str = $( this ).text(); //stores text from "active in variable str"
        str = str.trim();//eliminates whitespace and stores back in str

        chosen = str; //sets chosen as str;
      });

    console.log(chosen);

    //Checking if answer is correct
    CheckAnswer();

    //Checks if next answer exists
    if( qNum < (Question.length-1) ){
      qNum++; //iterating to next question
      genQuestion(Question[qNum]); //calling next question
    }
    else{
      dispScore();
    }
    

}

function genButtons(){

  //Creates div for bootstrap radio button group
  var BtnGroup = $('<div>').attr('class','btn-group btn-group-toggle removeable').attr('data-toggle','buttons').attr('id','Answers');

  //Creates button 'labels' for 4 buttons
  var LabelA = $('<label>').attr('class','btn btn-secondary').attr('id','A').text('A');
  var LabelB = $('<label>').attr('class','btn btn-secondary').attr('id','B').text('B');
  var LabelC = $('<label>').attr('class','btn btn-secondary').attr('id','C').text('C');
  var LabelD = $('<label>').attr('class','btn btn-secondary').attr('id','D').text('D');

  //creates input field for button labels
  var Btn = $('<input>').attr('type','radio').attr('name','options').attr('autocomplete','off');

  
  //appending everything to container with id BG (apparently order matters here)
  $('#BG').append(BtnGroup);
  $('#Answers').append(LabelA);
  $('#Answers').append(LabelB);
  $('#Answers').append(LabelC);
  $('#Answers').append(LabelD);
  $('.btn-secondary').append(Btn);

  //creating and appending submit button to div with id = Sub
  var Submit = $('<button>').attr('class', 'btn btn-primary removeable').attr('onclick','Submit()').text('Submit');
  $('#Sub').append(Submit);
}

//Generates div for question and appends it
function genQuestion(Q_Prop){
  Sec = timerRst;
  clearInterval(intervalId);
  intervalId = setInterval(Countdown, 1000);

  $('.removeable').remove(); //used to clear page for new question

  var qElem = $('<div>').attr('class','removeable').html(Q_Prop.Text);
  $('#Question').prepend(qElem);

  var ImageDiv = $('<img>').attr('src',Q_Prop.qImage).attr('class','removeable').attr('id','ImgSize');
  $('#QuesImage').prepend(ImageDiv);

  var ChoiceA = $('<div>').attr('class', 'removeable').html('A: '+Q_Prop.A);
  var ChoiceB = $('<div>').attr('class', 'removeable').html('B: '+Q_Prop.B);
  var ChoiceC = $('<div>').attr('class', 'removeable').html('C: '+Q_Prop.C);
  var ChoiceD = $('<div>').attr('class', 'removeable').html('D: '+Q_Prop.D);

  $('#A').append(ChoiceA);
  $('#B').append(ChoiceB);
  $('#C').append(ChoiceC);
  $('#D').append(ChoiceD);

  answer = Q_Prop.Answer;
  chosen = ''; //initializes chosen as null

  genButtons(); //creating Buttons
  console.log(Q_Prop.Answer);

}
function start(){
  Correct = 0;
  Incorrect = 0;
  qNum = 0;

  SecDisp = $('<div>').html(Sec).attr('id','Count');
  $('#Timer').html(timerRst);

  $('.removeable').remove();
  var Start = $('<button>').attr('class', 'btn btn-primary removeable').attr('onclick','genQuestion(Question[0])').text('Start');
  $('#Sub').append(Start);
}
function dispScore(){
  clearInterval(intervalId);
  $('#Timer').html('');
  $('.removeable').remove();
  var Percent;
  var PercentDiv;


  if(Correct === 0){
    Percent = 0;
  }
  else{
    Percent = (Correct/(Correct+Incorrect))*100;
  }
  
  PercentDiv = $('<div>').html('You scored '+Percent+'&#37;').attr('class','removeable');

  $('#Question').append(PercentDiv);

  var Start = $('<button>').attr('class', 'btn btn-primary removeable').attr('onclick','start()').text('Retry');
  $('#Sub').append(Start);

}

//Begin Code Execution
$(document).ready(function() {
  start();
});

//Timer Functions
function Countdown() {

    var SecDisp = $('<div>').html(Sec).attr('id','Count');
    $('#Timer').html(SecDisp);

    if(Sec === 0){
      Sec = 10;
      Submit();
    }

    Sec--;
  

}
