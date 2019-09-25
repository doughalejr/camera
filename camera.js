var imported = document.createElement('script');
imported.src = 'html2canvas.js';
document.head.appendChild(imported);
// https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf
// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view");
const imageView = document.querySelector("#image--view"); //added by deh
const cameraOutput = document.querySelector("#camera--output");
const cameraOutput2 = document.querySelector("#camera--outputtofile");
const cameraCanvas = document.querySelector("#camera--canvas");
const cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    //cameraCanvas.width = cameraView.videoWidth;
    //cameraCanvas.height = cameraView.videoHeight;
    //cameraCanvas.getContext("2d").drawImage(cameraView, 0, 0);
	//-------------------
    cameraCanvas.width = imageView.width;//added by deh
    cameraCanvas.height = imageView.height;//added by deh
	cameraCanvas.getContext("2d").drawImage(imageView, 0, 0); //added by deh
	//-------------------
    cameraOutput.src = cameraCanvas.toDataURL("image/jpg");
    cameraOutput2.src = cameraCanvas.toDataURL("image/jpg");
    cameraOutput.classList.add("taken");

    var container = document.getElementById("camera--outputtofile"); //specific element on page
    //var container = document.body; // full page 
    try {
        html2canvas(container).then(function (canvas) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            var d = new Date();
            var datetimeInMillis = d.getFullYear() + "_" + d.getMonth() + "_" + d.getDay() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + "_" + d.getMilliseconds(); 
            //link.download = "C:\Users\stuart.rivenbark\source\repos\CameraWebApp\CameraWebApp\Camera\RipPatrol_Image_" + datetimeInMillis + ".jpg";
            link.download = "RipPatrol_Image_" + datetimeInMillis + ".jpg";
            link.href = canvas.toDataURL("image/jpg");
            link.target = '_blank';
            link.click();

            setTimeout(function () {
                document.body.removeChild(link);
                //window.URL.revokeObjectURL(url);
            }, 100); 

        });
    } catch (e) {
        console.log(e.message);
    }

    //window.location.href('../Upload.aspx');
};
// Start the video stream when the window loads
//window.addEventListener("load", cameraStart, false); commented out temporarily by deh
