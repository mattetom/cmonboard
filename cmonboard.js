var maxSpeedValue = 120;
var neutralSpeedValue = 90;
var minSpeedValue = 60;


function startup() {
    var el = document.getElementById("controller");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", function() { console.log('handleCancel'); }, false);
    el.addEventListener("touchleave", function() { console.log('handleLeave'); }, false);
    el.addEventListener("touchmove", handleMove, false);
    console.log("initialized.");
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
            //console.log(touches[i]);
            document.getElementById('controller').style.top = touches[i].clientY;
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
            document.getElementById('controller').style.top = '230px';
            writeToBluetooth(90);
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
    console.log(90 + ((230 / (maxSpeedValue - neutralSpeedValue)) * (230 - touchPosition)));
}


