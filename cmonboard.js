var maxSpeedValue = 2000;
var neutralSpeedValue = 1500;
var minSpeedValue = 1000;
var speedRange = 1000;
var speedBarTop = 0;
var bottom = 400;
var height = 400;

function startup() {
    var el = document.getElementById("controller");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", function() { console.log('handleCancel'); }, false);
    el.addEventListener("touchleave", function() { console.log('handleLeave'); }, false);
    el.addEventListener("touchmove", handleMove, false);
    console.log("initialized.");
    var speedBar = document.getElementById('speedbar');
    speedBarTop = speedbar.getBoundingClientRect().top;
    bottom = speedbar.getBoundingClientRect().bottom;
    height = speedbar.getBoundingClientRect().height;
    document.getElementById('controller').style.top = (bottom - speedBarTop - (height/2)-35) + 'px'
}

var ongoingTouches = new Array();

function handleStart(evt) {
    evt.preventDefault();
    //console.log("touchstart.");

    var touches = evt.changedTouches;

    for (var i=0; i < touches.length; i++) {
        //console.log("touchstart:"+i+"...");
        //console.log(touches[i]);
        ongoingTouches.push(copyTouch(touches[i]));
    }
}

function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i=0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if(idx >= 0) {
            //console.log("continuing touch "+idx);
            //console.log(ongoingTouches[idx]);
            console.log(touches[i]);
            console.log('bottom speedbar: ' + bottom);
            document.getElementById('controller').style.top = touches[i].clientY-130;
            var speed = calculateSpeed(touches[i].clientY);
            writeToBluetooth(speed);
        }
    }
}

function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i=0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);

        if(idx >= 0) {
            document.getElementById('controller').style.top = (bottom - speedBarTop - (height/2)-35) + 'px';
            writeToBluetooth(neutralSpeedValue);
        }
    }
}

function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function ongoingTouchIndexById(idToFind) {
    for (var i=0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1;    // not found
}

function calculateSpeed(touchPosition) {
    //var speed = neutralSpeedValue - ((touchPosition-400)*2)
    diff = bottom - touchPosition;
    // speedBarHeight : speedRange = diff : diffSpeed
    // 400 : 1000 = diff : diffSpeed
    // diffSpeed = speed - 1000
    speed = minSpeedValue + ((speedRange * diff) / height);
    if(speed > 1500 && speed < 1570) {
        speed = 1570;
    } else if(speed > 1370 && speed < 1500) {
        speed = 1370;
    }
    console.log('Speed: ' + speed);
    return speed;
}


