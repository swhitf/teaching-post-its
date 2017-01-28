//Get hold of the buttons and post-its into a variable

var p1:HTMLElement = document.getElementById('p1');
var redBtn:HTMLElement = document.getElementById('redBtn');
var greenBtn:HTMLElement = document.getElementById('greenBtn');
var blueBtn:HTMLElement = document.getElementById('blueBtn');
var orangeBtn:HTMLElement = document.getElementById('orangeBtn');
var debug:HTMLElement = document.getElementById('debug');
var postItArea:HTMLElement = document.getElementById('post-it-area');    
var body:HTMLElement = document.getElementById('body');    

//set postIt state
var edited:boolean = false;

//post it starting position parameters
var startX:number;
var startY:number;
var posX:number
var posY:number
var offsetX:number;
var offsetY: number;

//create a paragraph element for the post-it
var msg = document.createElement('p');
p1.appendChild(msg);
msg.style.padding = '5px';

//rotate  post-it
p1.style.transform ='rotate(4deg)';

p1.style.backgroundColor = "lightgreen";

//defining the 'draggable' properties of the post-it
p1.draggable = true;
p1.style.position = 'relative';


//On double clicking on the postit call onEdit
p1.addEventListener('dblclick',onEdit);


//On clicking on the buttons call changeColor
redBtn.addEventListener('click',changeColor);
greenBtn.addEventListener('click', changeColor);
blueBtn.addEventListener('click', changeColor);
orangeBtn.addEventListener('click', changeColor);

//define event listeners on 'draggable post-it
p1.addEventListener('dragstart',onDragStart);
p1.addEventListener('drag',onDrag);
p1.addEventListener('dragend',dragStop);

//define event listeners for 'drop' area (post-it-area)
postItArea.addEventListener('drop', onDrop);
postItArea.addEventListener('dragover',dragOver);


function changeColor(e: Event):void {
    if (e.srcElement.id == 'redBtn') {
        p1.style.backgroundColor = 'lightcoral';
    }
    else if (e.srcElement.id == 'orangeBtn') {
        p1.style.backgroundColor = 'orange';
    }
    else if (e.srcElement.id == 'blueBtn') {
        p1.style.backgroundColor = 'lightblue';
    }
    else {
        p1.style.backgroundColor = 'lightgreen';
    }
}

function onDragStart(event:any):void {
    event.dataTransfer.setData("Text", event.target.id);
    console.log(event.target);
    startX= event.clientX;
    startY= event.clientY;
    offsetX = extractNumber(event.target.style.left);
    offsetY = extractNumber(event.target.style.top);
}


function onDrag(event: any):void {
    event.preventDefault();
    event.dataTransfer.setData("Text", event.target.id);
    console.log(event.target);
    
    posX= event.clientX+ offsetX - startX;
    posY= event.clientY+ offsetY - startY;


    //event.target.style.left = posX + 'px';
    //event.target.style.top = posY + 'px';


    //animate and highlight post-it
    var color:string = p1.style.backgroundColor;
    p1.style.transform ='rotate(0deg)';
        if (color == 'lightblue') {
        p1.style.border = '2px solid steelblue'
    }
    else if (color == 'lightcoral') {
        p1.style.border  = '2px solid red';
    }
    else if (color =='orange') {
        p1.style.border = '2px solid orangered';
    }
    else {
        p1.style.border = '2px solid limegreen';
    }

}

function dragStop(event:any):void {
    p1.style.transform ='rotate(4deg)';
    p1.style.border = 'none';
    event.preventDefault();
    event.dataTransfer.setData("Text", event.target.id);
    console.log(event.target);
       
    event.target.style.left = posX + 'px';
    event.target.style.top = posY + 'px';

}

function onDrop(e: Event):void {
    e.preventDefault();
    this.style.border = '';
    p1.style.transform ='rotate(4deg)';
    p1.style.border = 'none';
}

function dragOver(e: Event):void {
    e.preventDefault();
    this.style.border = '3px dotted lightgray';
}



function onEdit():void {
    //save the current color of the post-it
    var color:string = p1.style.backgroundColor;

    //change edited status and rotate post it
    edited = true;
    p1.style.transform ='rotate(0deg)';


    //make color buttons hidden
    redBtn.style.visibility = 'hidden';
    greenBtn.style.visibility = 'hidden';
    blueBtn.style.visibility = 'hidden';
    orangeBtn.style.visibility = 'hidden';

    //clear previous post-it text;
    p1.removeChild(msg);
    
    //Create the input text element and apend it to the post it
    var msgInput = document.createElement('textarea');
    msgInput.style.fontFamily = 'Segoe UI';
    msgInput.placeholder = 'Please enter your message here';
    msgInput.style.borderStyle = 'none';
    msgInput.style.background = 'none';
    p1.appendChild(msgInput);
    msgInput.style.overflow = 'hidden';
    msgInput.style.width = '160px';
    msgInput.style.height = '160px';
    msgInput.maxLength = 160;
    msgInput.style.margin = 'auto';
    msgInput.style.wordWrap= 'break-word';


    if (color == 'lightblue') {
        p1.style.border = '2px solid steelblue'
    }
    else if (color == 'lightcoral') {
        p1.style.border  = '2px solid red';
    }
    else if (color =='orange') {
        p1.style.border = '2px solid orangered';
    }
    else {
        p1.style.border = '2px solid limegreen';
    }

    msgInput.focus(); 
    msgInput.style.border = '1px solid blue';
    
    msgInput.addEventListener('keydown',keyPressed);

    document.addEventListener('click',onSave);

    function keyPressed(e: Event):void {
        var keyName = onkeypress;
        console.log(keyName)

    }

    function onSave():void {

        var msgInputText:string = msgInput.value;
        edited = false;
        if (msgInputText == '') {
            console.log('Please enter a message')
        }
        else {
            msg.innerHTML = msgInputText;
            msg.style.maxWidth = '100%';
            msg.style.margin = 'auto';
            msg.style.overflow = 'hidden';
            msg.style.wordWrap= 'break-word';
        }
        p1.removeChild(msgInput);
        p1.appendChild(msg);

        //make color buttons visible
        redBtn.style.visibility = 'visible';
        greenBtn.style.visibility = 'visible';
        blueBtn.style.visibility = 'visible';
        orangeBtn.style.visibility = 'visible';
        
        
        p1.style.backgroundColor = color;
        p1.style.border = 'none'
        msgInput.style.border = 'none'
        p1.style.transform ='rotate(4deg)';
        document.removeEventListener('click',onSave);
        
    }


}

function extractNumber(s:string):number
{
    var n = parseInt(s);
	
    return n == null || isNaN(n) ? 0 : n;
}


