
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
    bluetoothSerial.connect('20:14:04:28:29:21', console.log('connected succesfully'), console.log('error while connecting'));    
    // MATTEO PC 24:FD:52:69:FB:6C
    // HC-05 20:14:04:28:29:21
}

function writeToBluetooth(value) {
    console.log('Start writing ' + value);
    bluetoothSerial.write(value, console.log('write success'), console.log('write error'));
}