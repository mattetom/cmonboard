//var app = {
//    // Application Constructor
//    initialize: function() {
//        alert('initialize');
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        alert('bind events');
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener('load', this.onLoad, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        alert('ondeviceready');
//        app.receivedEvent('deviceready');
//        startup();
//    },
//    onDeviceReady: function() {
//        alert('onload');
//        app.receivedEvent('deviceready');
//        startup();
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        alert('receivedEvents');
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);      
//    }
//};
