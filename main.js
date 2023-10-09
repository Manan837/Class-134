img="";
status1="";
objects = [];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detected";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    console.log(typeof(status1));
    status1 = 1;
    console.log(typeof(status1));
    status1 = null;
    console.log(typeof(status1));
    status1 = true;
    console.log(typeof(status1));
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status1 != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);

            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: " + objects[0].length;            
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width + 15, objects[i].height + 15);
        }
    }
}