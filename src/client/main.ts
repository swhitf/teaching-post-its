import { App } from './App';


let userText = document.getElementById('user') as HTMLInputElement;
let boardText = document.getElementById('board') as HTMLInputElement;
let connBtn = document.getElementById('connect');
connBtn.addEventListener('click', () => {

    document.body.innerHTML = '<span>Online as: ' + userText.value + '</span>';

    let app = new App(userText.value, parseInt(boardText.value));
    app.run();
});