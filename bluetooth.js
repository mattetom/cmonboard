function connectSuccess(success) {
    var message = "Connected succesfully with message: " + success;
    console.log(message);
    document.getElementById('messages').innerHTML = message;
    document.getElementById('controller').removeAttribute('class');
}

function connectFailure(error) {
    var message = "Error while connecting with message: " + error;
    console.log(message);
    document.getElementById('messages').innerHTML = message;
    document.getElementById('controller').setAttribute('class','disabled');
}

function writeSuccess(success) {
    var message = "Write succesfully with message: " + success;
    console.log(message);
    if(document.getElementById('messages')) {
        document.getElementById('messages').innerHTML = message;
    }
    document.getElementById('controller').removeAttribute('class');
}

function writeFailure(error) {
    var message = "Error while writing with message: " + error;
    console.log(message);
    if(document.getElementById('messages')) {
        document.getElementById('messages').innerHTML = message;
    }
    document.getElementById('controller').setAttribute('class','disabled');
}

function deviceConnected(connected) {
    console.log(connected);
    var controller = document.getElementById('controller');
    if(connected) {
        controller.removeAttribute('class');
    } else {
        controller.setAttribute('class','disabled');
    }
}

function deviceConnectedFailure(error) {
    console.log(error);
    controller.setAttribute('class','disabled');
}

function bluetoothDevicesList() {
    bluetoothSerial.list(function(devices) {
        devices.forEach(function(device) {
            console.log(device.address);
            console.log(device.name);   
        });
    }, function(e) { console.log('error'); });
}

function connectPC() {
    console.log('connecting PC');
    bluetoothSerial.connect('24:FD:52:69:FB:6C', console.log('connected succesfully'), console.log('error while connecting'));    
    // MATTEO PC 24:FD:52:69:FB:6C
    // HC-05 20:14:04:28:29:21
}

function connectHC05() {
    console.log('connecting HC-05');
    bluetoothSerial.connect('20:14:04:28:29:21', connectSuccess, connectFailure);    
    // MATTEO PC 24:FD:52:69:FB:6C
    // HC-05 20:14:04:28:29:21
}

function writeToBluetooth(value) {
    value = value + 's';
    console.log('Start writing ' + value);
    bluetoothSerial.write(value, writeSuccess, writeFailure);
}

function isDeviceConnected() {
    bluetoothSerial.isConnected(deviceConnected, deviceConnectedFailure);
}




function sendCustomValue() {
    var valueToWrite = document.getElementById('customValue').value;
    writeToBluetooth(valueToWrite);
}

