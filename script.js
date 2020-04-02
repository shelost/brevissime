var presenting  = false
var index = 0
var n = 0
var lines = []

function Id(arg){

    return document.getElementById(arg)
}

var prez = Id('presentation')
var button = Id('button')
var textarea = Id('textarea')

var bgcolor = Id('bg-color')
var textcolor = Id('text-color')
var font = Id('font')

button.onclick = Present

function keyListener(e){

    var keydown = (e.type == 'keydown')? true: false;

    if (keydown){

        switch (e.keyCode){

            case 27: // ESC
                presenting = false;
                index = 0;
                break;
            case 192: // ~
                presenting = true;
                break;
            case 39: //  Right Arrow
                handleClick(1);
                break;
             case 37: //  Left Arrow
                handleClick(0);
                break;
        }
    }   
}

window.addEventListener('keydown', keyListener)
window.addEventListener('keyup', keyListener)
window.addEventListener('click', () => { handleClick(1)} )

function handleClick(dir){

    if (presenting && !prez.classList.contains('hidden')){

        if (dir == 1){
            index += 1
        }else{
            index -= 1
        }
    }
}

function Present(){

   prez.innerHTML = ''

    presenting = true
 
    lines = textarea.value.split(/\r?\n/);

    n= lines.length

    for (let i=0; i<lines.length;i++){

        var newDiv = document.createElement('div')
        var string = lines[i]
        var newString;
        newDiv.style.setProperty('background-color', bgcolor.value)
        newDiv.style.setProperty('color', textcolor.value)
        newDiv.style.setProperty('font-family', font.value)
        console.log(font.value)

        if (lines[i][0] == '*'){

            newDiv.style.setProperty('font-weight', 900)
            newString = string.replace(/\*/g, '')
        }else{

            newString = string
        }
        var newText = document.createTextNode(newString)
 
        newDiv.appendChild(newText)
        newDiv.id = i
        newDiv.classList.add('slide')
     
        prez.appendChild(newDiv)
        
    }
}

const loop = () => {

    if (presenting){
        
        prez.classList.remove('hidden')

        Object.entries(prez.childNodes).forEach(([key, value]) => {

            if (value.nodeType == 1){
                if (key == index){

                    value.classList.remove('hidden')
                    
                }else{
                
                    value.classList.add('hidden')
                }
            }
        })

        if (index > n){

            presenting = false
        }

    }else{

        prez.classList.add('hidden')
        index = 0     
    }
}

setInterval(loop, 1000/30)