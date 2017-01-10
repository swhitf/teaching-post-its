

var editBtn:HTMLElement = document.getElementById('edit-btn');
var saveBtn:HTMLElement = document.getElementById('save-btn');
var msgInput:HTMLInputElement = document.getElementById('msg-input') as HTMLInputElement;
var p1 = document.getElementById('p1');

msgInput.style.visibility = 'hidden';
saveBtn.style.visibility = 'hidden';

editBtn.addEventListener('click', onEdit);
saveBtn.addEventListener('click', onSave);

function onEdit() {
    editBtn.style.visibility = 'hidden';
    saveBtn.style.visibility = 'visible';
    msgInput.style.visibility = 'visible';
    msgInput.value = '';
    msgInput.focus();
}

function onSave() {

    var newText = msgInput.value;
    if (newText) {
        p1.innerText = newText;
    }
    else {
        console.error('No text was entered...');
    }

    editBtn.style.visibility = 'visible';
    saveBtn.style.visibility = 'hidden';
    msgInput.style.visibility = 'hidden';
}