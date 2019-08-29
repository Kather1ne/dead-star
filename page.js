var leftText = document.querySelector('.text-box.left .text');
var leftTextBG = document.querySelector('.text-box.left .stroke-text');
var rightText = document.querySelector('.text-box.right .text');
var rightTextBG = document.querySelector('.text-box.right .stroke-text');
var shadow = document.querySelector('.shadow-big');
var anamation = false;
var points = {
    x: null,
    y: null
}

// window.addEventListener('mousemove', function () {
//     this.console.log("mouse move");
// })

document.addEventListener('mousemove', move);
document.addEventListener('mouseup', stop);
document.addEventListener('mousedown', go);

function stop() {
    animation = false;
}
function go() {
    animation = true;
}

function move(e) {
    var { x, y } = 0;
    x = e.clientX - innerWidth/2;
    y = e.clientY;

    Object.assign(points, {x,y});
    // console.log(points);
}


function animationGo() {

        const {x,y} = points;

        requestAnimationFrame(animationGo);
        leftText.style.transform = `translate(${-x/10}px)`;
        leftTextBG.style.transform = `translate(${-x/40}px)`;
        leftTextBG.style.opacity = x < 0 && `${1 - Math.abs(x)/1000 + 0.3 }`;
        rightText.style.transform = `translate(${x/10}px)`;
        rightTextBG.style.transform = `translate(${x/40}px)`;
        rightTextBG.style.opacity = x < 0 && `${1 - Math.abs(x)/1000 + 0.3 }`;
        shadow.style.transform = `translateX(${x/80}px)`;
        shadow.style.opacity = x > 0 && `${1 - Math.abs(x)/1000 - 0.5  }`;
        // console.log(x, 1 - Math.abs(x/1000));
}

animationGo();

