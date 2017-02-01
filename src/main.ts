//Get hold of the buttons and post-its into a variable

var postItArea:HTMLElement = document.getElementById('post-it-area');    
var body:HTMLElement = document.getElementById('body');    
var goodPostIts:HTMLElement = document.getElementById('good-post-its');
var startPostIts:HTMLElement = document.getElementById('start-post-its');
var badPostIts:HTMLElement = document.getElementById('bad-post-its');
var stopPostIts:HTMLElement = document.getElementById('stop-post-its');

//post it starting position parameters
var startX:number;
var startY:number;
var posX:number
var posY:number
var offsetX:number;
var offsetY: number;


//area
var whichQuad:string;

//PostIt class
class PostIt {
     p:HTMLElement = document.createElement('div');
     msgTxt:string;
     constructor (x:number, y:number) {
         postItArea.appendChild(this.p);
         this.p.className = 'post-it';
         this.p.draggable = true;
         this.p.style.position = 'absolute';
         this.p.style.transform = 'rotate(4deg)';
         this.p.style.backgroundColor = 'lightgreen';
         this.p.style.left = x + 'px';
         this.p.style.top = y + 'px';
         this.msgTxt = '';

     }

}


//create the first object

var p1:PostIt = new PostIt(100,100);

//On double clicking on the postit call onEdit
postItArea.addEventListener('dblclick',onEdit);


//On double clicking on the post-it area create a new post-it
goodPostIts.addEventListener('dblclick', function(event:any)
{
    if (event.target.className !='post-it') {
        var x, y:number;
        x = event.clientX-200;
        y = event.clientY-200;
        let postIt = new PostIt(x,y);
        postIt.p.style.backgroundColor = 'lightgreen';
    }
});

badPostIts.addEventListener('dblclick', function(event:any)
{
    if (event.target.className !='post-it') {
        var x, y:number;
        x = event.clientX-200;
        y = event.clientY-200;
        let postIt = new PostIt(x,y);
        postIt.p.style.backgroundColor = 'lightcoral';
    }
});

startPostIts.addEventListener('dblclick', function(event:any)
{
    if (event.target.className !='post-it') {
        var x, y:number;
        x = event.clientX-200;
        y = event.clientY-200;
        let postIt = new PostIt(x,y);
        postIt.p.style.backgroundColor = 'lightblue';
    }
});

stopPostIts.addEventListener('dblclick', function(event:any)
{
    if (event.target.className !='post-it') {
        var x, y:number;
        x = event.clientX-200;
        y = event.clientY-200;
        let postIt = new PostIt(x,y);
        postIt.p.style.backgroundColor = 'orange';
    }
});

//define event listeners on 'draggable post-it
postItArea.addEventListener('dragstart',onDragStart);
postItArea.addEventListener('drag',onDrag);
postItArea.addEventListener('dragend',dragStop);

//define event listeners for 'drop' area (post-it-area)
goodPostIts.addEventListener('drop', onDrop);
goodPostIts.addEventListener('dragover', dragOver);
startPostIts.addEventListener('drop', onDrop);
startPostIts.addEventListener('dragover', dragOver);
badPostIts.addEventListener('drop', onDrop);
badPostIts.addEventListener('dragover', dragOver);
stopPostIts.addEventListener('drop', onDrop);
stopPostIts.addEventListener('dragover', dragOver);


//changeColor function definition
function changeColor(e: Event):void {
    if (e.srcElement.id == 'redBtn') {
        p1.p.style.backgroundColor = 'lightcoral';
    }
    else if (e.srcElement.id == 'orangeBtn') {
        p1.p.style.backgroundColor = 'orange';
    }
    else if (e.srcElement.id == 'blueBtn') {
        p1.p.style.backgroundColor = 'lightblue';
    }
    else {
        p1.p.style.backgroundColor = 'lightgreen';
    }
}


//onDragStart function definition
function onDragStart(event:any):void {
    if (event.target.className == 'post-it') {
        console.log(event.target);
        startX= event.clientX;
        startY= event.clientY;
        offsetX = extractNumber(event.target.style.left);
        offsetY = extractNumber(event.target.style.top);
    }
}


//onDrag function definition
function onDrag(event: any):void {
    if (event.target.className == 'post-it') {
        event.preventDefault();
        console.log(event.target);
        
        posX= event.clientX+ offsetX - startX;
        posY= event.clientY+ offsetY - startY;

        //animate and highlight post-it
        var color:string = event.target.style.backgroundColor;
        event.target.style.transform ='rotate(0deg)';
            if (color == 'lightblue') {
            event.target.style.border = '2px solid steelblue'
        }
        else if (color == 'lightcoral') {
            event.target.style.border  = '2px solid red';
        }
        else if (color =='orange') {
            event.target.style.border = '2px solid orangered';
        }
        else {
            event.target.style.border = '2px solid limegreen';
        }
    }
}


//dragStop function definition
function dragStop(event:any):void {
    if (event.target.className == 'post-it') {
        event.target.style.transform ='rotate(4deg)';
        event.target.style.border = 'none';
        event.preventDefault();
        console.log(event.target);
        event.target.style.left = posX + 'px';
        event.target.style.top = posY + 'px';
        if (whichQuad == 'bad-post-its') {
            event.target.style.backgroundColor = 'lightcoral';
        }
        else if (whichQuad == 'stop-post-its') {
            event.target.style.backgroundColor = 'orange';
        }
        else if (whichQuad == 'start-post-its') {
            event.target.style.backgroundColor = 'lightblue';
        }
        else {
            event.target.style.backgroundColor = 'lightgreen';
        }
    }
}


//onDrop function definition
function onDrop(event: any):void {
    event.preventDefault();
    this.style.border = '';
    event.target.style.border = 'none';
    whichQuad = event.target.id;
}


//dragOver function definition
function dragOver(event: any):void {
    event.preventDefault();
    whichQuad = event.target.id;
}


//extractNumber function definition
function extractNumber(s:string):number
{
    var n = parseInt(s);
	
    return n == null || isNaN(n) ? 0 : n;
}


function onEdit(event: any):void {
        if (event.target.className == 'post-it') {
            //save the current color of the post-it
            var color:string = event.target.style.backgroundColor;
    
            //rotate post it
            event.target.style.transform ='rotate(0deg)';

            
            //remove previous content
            if (event.target.childElementCount != 0) {
                event.target.innerHTML = '';
            }
            //Create the input text element and apend it to the post it
            var msgInput = document.createElement('textarea');
            msgInput.style.fontFamily = 'Segoe UI';
            msgInput.placeholder = 'Please enter your message here';
            if (event.target.msgText != undefined) {
                msgInput.defaultValue = event.target.msgText;
            }
            msgInput.style.borderStyle = 'none';
            msgInput.style.background = 'none';
            event.target.appendChild(msgInput);
            msgInput.style.width = '160px';
            msgInput.style.height = '160px';
            msgInput.maxLength = 160;
            msgInput.style.wordWrap= 'break-word';


            if (color == 'lightblue') {
                event.target.style.border = '2px solid steelblue'
            }
            else if (color == 'lightcoral') {
                event.target.style.border  = '2px solid red';
            }
            else if (color =='orange') {
                event.target.style.border = '2px solid orangered';
            }
            else {
                event.target.style.border = '2px solid limegreen';
            }

            msgInput.focus(); 
            msgInput.style.border = '1px solid blue';
            
            msgInput.addEventListener('keydown',keyPressed);

            document.addEventListener('click',onSave);
        }

        function onSave():void {
            var msg:HTMLElement = document.createElement('p');
            var msgInputText:string = msgInput.value;
            
            if (msgInputText == '') {
                console.log('Please enter a message')
                if (event.target.msgTxt != undefined) {
                    msg.innerHTML = event.target.msgTxt;
                }
                else {
                    msg.innerHTML = msgInputText;
                }
                msg.style.margin = 'auto';
                msg.style.overflow = 'hidden';
                msg.style.maxWidth = '100%';
                msg.style.wordWrap= 'break-word';
                
            }
            else {
                msg.innerHTML = msgInputText;
                msg.style.margin = 'auto';
                msg.style.overflow = 'hidden';
                msg.style.maxWidth = '100%';
                msg.style.wordWrap= 'break-word';
                event.target.msgTxt = msgInputText;
            }
            console.log(event.target.msgTxt)
            event.target.removeChild(msgInput);
            event.target.appendChild(msg);

            
            
            event.target.style.backgroundColor = color;
            event.target.style.border = 'none'
            msgInput.style.border = 'none'
            event.target.style.transform ='rotate(4deg)';
            document.removeEventListener('click',onSave);
            
        }

        function keyPressed(event: any):void {
            var keyName:string = event.key;
            console.log(keyName);
            switch (keyName) {
                case 'Enter':
                    onSave();
                    break;
                default:
                    //Statements executed when none of the values match the value of the expression
                break;
            }

        }

}
