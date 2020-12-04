document.addEventListener('DOMContentLoaded', generatePalette);
document.addEventListener('keydown', (e) => { e.key === ' ' && generatePalette()});


const palette = document.getElementById('palette');

function notification(color){
    const notification = document.getElementById('notification');

    if(notification) {
        notification.remove();
    }

    const newNotification = document.createElement('div');
    newNotification.id = 'notification';
    newNotification.innerHTML = `Color <span>${color}</span> copied to your clipboard`;
    document.body.appendChild(newNotification);

    setTimeout(() => { 
        newNotification.className = 'active' 
    },1)

    setTimeout(() => {
        newNotification.innerHTML = '';
        newNotification.className = '';

    },1500);

};

function generateColor(){
    const hex = 'abcdef0123456789'
    let color = '#';
    
    for(let i = 1; i <= 6; i++){
        color += hex[Math.floor(Math.random() * hex.length)]
    }

    return color;
};

function generateColorCard(){
    const color = generateColor();

    const card = document.createElement('li');
    card.setAttribute('onclick', 'copyColor(event)')

    const divColor = document.createElement('div');
    divColor.className = 'color';
    divColor.style.setProperty('--color', color);

    const divText = document.createElement('input');
    divText.className = 'hex';
    divText.setAttribute('readonly','');
    divText.value = color;

    card.appendChild(divColor);
    card.appendChild(divText);

    return card;
};

function generatePalette(){
    palette.innerHTML = '';

    for(let i = 1; i <= 5; i++){
        palette.appendChild(generateColorCard());
    }
};

function copyColor(e){
    const targetColor = e.target.parentNode.querySelector('input');

    targetColor.select();
    document.execCommand('copy')
    notification(targetColor.value);
};