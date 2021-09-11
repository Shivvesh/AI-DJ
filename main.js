song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rigthWristY = 0;

function preload()
{
    song = loadSound("music.mp3")
}

function setup()
{
    canvas = createCanvas(600, 650);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.lenght > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rigthWristY = results[0].pose.rigthWrist.y;
        console.log("rigthWristX = "+ rigthWristX +"rigthWristY = "+ rigthWristY);


    }
}

function draw()
{
    image(video, 0, 0, 600, 650);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}