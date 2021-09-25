song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

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
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRight = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

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

    fill("#ADD8E6");
    stroke("#ADD8E6");

 if(scoreRightWrist > 0.2)
 {
    circle(rightWristX,rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(2.5);
    }
 }

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}
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