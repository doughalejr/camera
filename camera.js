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
    cameraCanvas.width = imageView.width;
    cameraCanvas.height = imageView.height;
	cameraCanvas.getContext("2d").drawImage(imageView, 0, 0); //added by deh
	//-------------------
    cameraOutput.src = cameraCanvas.toDataURL("image/webp");
    cameraOutput.classList.add("taken");

    var container = document.getElementById("camera--output"); //specific element on page
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
window.addEventListener("load", cameraStart, false);

//Adding GPS properties to file in Javascript
//http://rz.scale-it.pl/2012/01/02/how_to_add_gps__geolocation__tags_to_photos.html
//https://stackoverflow.com/questions/31628534/get-coordinates-from-photo-with-javascript
//https://github.com/exif-js/exif-js
//https://stackoverflow.com/questions/20279620/is-there-any-javascript-library-to-modify-exif-information-of-image
//1) https://github.com/blueimp/JavaScript-Load-Image
//2) 
//https://stackoverflow.com/questions/41318487/adding-metadata-to-html5-file-upload
//
//C#
//https://www.codeproject.com/Questions/815338/Inserting-GPS-tags-into-jpeg-EXIF-metadata-using-n
//1) https://searchcode.com/codesearch/view/8739374/
//2) https://blogs.msdn.microsoft.com/kamalds/2012/04/08/working-with-exif-metadata/
//GeoTagging
//http://geotag.sourceforge.net/Requirements/
//https://codeflow.org/tags/geotagging.html
//https://www.paintshoppro.com/en/pages/geotag-photos/
//JavaScript
//https://www.javascripture.com/File
//
//Maybe I can hand the Lat - Lng as QueryStrings on the upload, and if present, just use them instead of parsing the file's properties
//
//Good basci camera article:
//https://www.webcodegeeks.com/html5/html5-web-camera-example/

