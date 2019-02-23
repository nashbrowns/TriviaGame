//Global variables
var answer;
var chosen;
var qNum = 0;
var Correct = 0;
var Incorrect = 0;

//Question Object
var Question = [
     
  {
    Text: 'This is Question 1', 
    Answer: 'C', 
    A: 'False', B: 'False', C: 'True', D: 'False'
  },
  {
    Text: 'This is Question 2', 
    Answer: 'C', 
    A: 'False', B: 'False', C: 'True', D: 'False'
  },
  {
    Text: 'This is Question 3', 
    Answer: 'C', 
    A: 'False', B: 'False', C: 'True', D: 'False'
  },
  {
    Text: 'This is Question 4', 
    Answer: 'C', 
    A: 'False', B: 'False', C: 'True', D: 'False'
  },
  {
    Text: 'This is Question 5', 
    Answer: 'C', 
    A: 'False', B: 'False', C: 'True', D: 'False'
  },

];

function CheckAnswer(){
  if(chosen==answer){
    Correct++;
    alert('Correct');
  }
  else{
    Incorrect++;
    alert('Incorect');
  }

  console.log("Correct = "+Correct);
  console.log("Incorrect = "+Incorrect);
}

function Submit(){

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

  $('.removeable').remove(); //used to clear page for new question

  var qElem = $('<div>').attr('class','removeable').html(Q_Prop.Text);
  $('#Question').prepend(qElem);

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

//Begin Code Execution
$(document).ready(function() {
  genQuestion(Question[qNum]);
  
});
