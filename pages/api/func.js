var recOn = false;
var mediaRecorder;
var interval = 1000;

function repeat() {
    document.body.style.backgroundImage = "url(https://nationaltoday.com/wp-content/uploads/2020/07/Kitten-640x514.jpg)";
    document.body.style.backgroundSize = "cover";
    console.log('hello');

}

function toggleFunc() {
    var elem = document.getElementById('toggle-img');
    elem.srcset = "";
    if (!recOn) {
        elem.src = 'mic.svg';
        recOn = true;
        mediaRecorder.start(interval);
        console.log(mediaRecorder.state);
        console.log("recorder started");
    } else  {
        elem.src = 'mic-off.svg';
        recOn = false;
        mediaRecorder.stop();
    }
}

export default function process () {
    if (typeof window != 'undefined'){
        setTimeout(repeat, 1000);

        var elem = document.getElementById('toggle');
        elem.addEventListener("click", toggleFunc);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
           console.log('getUserMedia supported.');
           navigator.mediaDevices.getUserMedia (
              {
                 audio: true
              })

              // Success callback
              .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
                let chunks = [];

                mediaRecorder.ondataavailable = function(e) {
                    var oReq = new XMLHttpRequest();
                    oReq.open("POST", "https://147.182.202.123:80/query-example", true);

                    oReq.onload = function () {
                        if (oReq.readyState === oReq.DONE) {
                            if (oReq.status === 200) {
                                console.log(oReq.response);
                                console.log(oReq.responseText);
                            }
                        }
                    };
                    oReq.send(e.data);
                }
              })

              // Error callback
              .catch(function(err) {
                 console.log('The following getUserMedia error occurred: ' + err);
              }
           );
        } else {
           console.log('getUserMedia not supported on your browser!');
        }
    }
}
