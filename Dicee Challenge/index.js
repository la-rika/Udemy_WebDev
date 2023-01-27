
//creating a random numer from 1 to 6
//rounding that number, we want a single digit number (1,2,3,4,5,6)
var randomNumer1 = Math.floor(Math.random() * 6) + 1;

//Uding the random number to set te src of the image
document.querySelector(".img1").setAttribute("src","images/dice"+randomNumer1+".png");

//i do the sam,e for the second dice (until line 16)
var randomNumer2 = Math.random();
randomNumer2 = (randomNumer2 * 6) + 1;
randomNumer2 = Math.floor(randomNumer2);

document.querySelector(".img2").setAttribute("src","images/dice"+randomNumer2+".png");

//Appear winner name 
if(randomNumer1>randomNumer2){
    document.querySelector("h1").innerHTML = "<img src='images/win1.png' style='width:90px;'> </img>Player 1 wins!";
}else if(randomNumer2>randomNumer1){
    document.querySelector("h1").innerHTML = "Player 2 wins! <img src='images/win2.png' style='width:90px;'></img>";
}else{
    document.querySelector("h1").innerHTML = "Draw!";
}