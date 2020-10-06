const vision = require('@google-cloud/vision');

// Creates a client
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs text detection on the local file


async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    

    const [result] = await client.textDetection("kkid.jpg");
    const detections = result.textAnnotations;
        
    console.log('Text:');
    detections.forEach(text => console.log(text));
}
quickstart();