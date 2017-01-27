//Get hold of the buttons and post-its into a variable

var p1:HTMLElement = document.getElementById('p1');
var redBtn:HTMLElement = document.getElementById('redBtn');
var greenBtn:HTMLElement = document.getElementById('greenBtn');
var blueBtn:HTMLElement = document.getElementById('blueBtn');
var orangeBtn:HTMLElement = document.getElementById('orangeBtn');
var debug:HTMLElement = document.getElementById('debug');
var postItArea:HTMLElement = document.getElementById('post-it-area');    
    

//set postIt state
var edited:boolean = false;

//post it starting position parameters
var x_start:number = 0;
var y_start:number = 0;
var offsetX = 0;          
var offsetY = 0;

//create a paragraph element for the post-it
var msg = document.createElement('p');
p1.appendChild(msg);
msg.style.padding = '5px';

//rotate  post-it
p1.style.transform ='rotate(4deg)';

debug.innerHTML = x_start + ', ' + y_start;

p1.style.backgroundColor = "lightgreen";
p1.draggable = true;


//On double clicking on the postit call onEdit
p1.addEventListener('dblclick',onEdit);
redBtn.addEventListener('click',onClick);
greenBtn.addEventListener('click', onClick)
blueBtn.addEventListener('click', onClick);
orangeBtn.addEventListener('click', onClick);

//define event listeners on 'draggable post-it
p1.addEventListener('drag',onDrag);
p1.addEventListener('dragend',dragStop);

//define event listeners for 'drop' area (post-it-area)
postItArea.addEventListener('drop', onDrop);
postItArea.addEventListener('dragover',dragOver)

function onClick(e: Event):void {
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

function onDrag(e: Event):void {
    //trying to find out a way to record the position of the post it so that i can change it... but not succeeding at the moment
    x_start = e.srcElement.clientLeft;
    y_start = e.srcElement.clientTop;
    //animate post-it
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
    debug.innerHTML = x_start + ', ' + y_start;
}

function dragStop():void {
    p1.style.transform ='rotate(4deg)';
    p1.style.border = 'none';
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
    msgInput.maxLength = '160';
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


