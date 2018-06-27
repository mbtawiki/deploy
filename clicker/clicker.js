let total = 0, totalString="";
let circleX, circleY, circleR;
let inCircle = false, clicking = false;
let lvl1 = 0, lvl2 = 0, lvl3 = 0, lvl4 = 0;
let lvl5 = 0, lvl6 = 0, lvl7 = 0, lvl8 = 0;
let inLvl1 = 0, inLvl2 = 0, inLvl3 = 0, inLvl4 = 0;
let inLvl5 = 0, inLvl6 = 0, inLvl7 = 0, inLvl8 = 0;
let priceLvl1 = 0, priceLvl2 = 0, priceLvl3 = 0, priceLvl4 = 0;
let priceLvl5 = 0, priceLvl6 = 0, priceLvl7 = 0, priceLvl8 = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  priceLvl1 = 10;
  priceLvl2 = 100;
  priceLvl3 = 1000;
  priceLvl4 = 10000;
  priceLvl5 = 1000000;
  priceLvl6 = 100000000;
  priceLvl7 = 1000000000;
  priceLvl8 = 100000000000;
}

function draw(){
  background(51);
  clicking = false;
  fill(255);
  textSize(30);
  totalToString();
  text("Total: " + totalString, 20, 40);
  clicker();
  inCircle = checkForClick();
  checkForLevels();
  showExtras();
  addExtrasCount();
}

function totalToString(){
  if((total >= 0) && (total < 1000)){
    totalString = str(round(total*10)/10);
  } else if((total >= 1000) && (total < 1000000)){
    totalString = str(floor(total/100)/10) + " thousand";
  } else if((total >= 1000000) && (total < 1000000000)){
    totalString = str(floor(total/100000)/10) + " million";
  } else if((total >= 1000000000) && (total < 1000000000000)){
    totalString = str(floor(total/100000000)/10) + " billion";
  } else if((total >= 1000000000000) && (total < 1000000000000000)){
    totalString = str(floor(total/100000000000)/10) + " trillion";
  }
}

function addExtrasCount(){
  total += lvl1*0.001;
  total += lvl2*0.01;
  total += lvl3*0.1;
  total += lvl4*1;
  total += lvl5*10;
  total += lvl6*100;
  total += lvl7*1000;
  total += lvl8*10000;
}

function clicker(){
  ellipseMode(CENTER);
  ellipse(width/4, height/2, width/4, width/4);
  circleX = width/4;
  circleY = height/2;
  circleR = width/8;
}

function showExtras(){
  fill(0, 110, 250);
  rect(width*2/3, height*0/8, width/3, height/8);
  fill(0, 130, 230);
  rect(width*2/3, height*1/8, width/3, height/8);
  fill(0, 150, 210);
  rect(width*2/3, height*2/8, width/3, height/8);
  fill(0, 170, 190);
  rect(width*2/3, height*3/8, width/3, height/8);
  fill(0, 190, 170);
  rect(width*2/3, height*4/8, width/3, height/8);
  fill(0, 210, 150);
  rect(width*2/3, height*5/8, width/3, height/8);
  fill(0, 230, 130);
  rect(width*2/3, height*6/8, width/3, height/8);
  fill(0, 250, 110);
  rect(width*2/3, height*7/8, width/3, height/8);
  fill(255);
  textSize(16);
  text("Level 1", width*2/3 + 10, height*0/8+height/32);
  text("Level 2", width*2/3 + 10, height*1/8+height/32);
  text("Level 3", width*2/3 + 10, height*2/8+height/32);
  text("Level 4", width*2/3 + 10, height*3/8+height/32);
  text("Level 5", width*2/3 + 10, height*4/8+height/32);
  text("Level 6", width*2/3 + 10, height*5/8+height/32);
  text("Level 7", width*2/3 + 10, height*6/8+height/32);
  text("Level 8", width*2/3 + 10, height*7/8+height/32);
  text("You have " + lvl1 + " level 1s.", width*2/3 + 10, height*0/8+height/16);
  text("You have " + lvl2 + " level 2s.", width*2/3 + 10, height*1/8+height/16);
  text("You have " + lvl3 + " level 3s.", width*2/3 + 10, height*2/8+height/16);
  text("You have " + lvl4 + " level 4s.", width*2/3 + 10, height*3/8+height/16);
  text("You have " + lvl5 + " level 5s.", width*2/3 + 10, height*4/8+height/16);
  text("You have " + lvl6 + " level 6s.", width*2/3 + 10, height*5/8+height/16);
  text("You have " + lvl7 + " level 7s.", width*2/3 + 10, height*6/8+height/16);
  text("You have " + lvl8 + " level 8s.", width*2/3 + 10, height*7/8+height/16);
  text("Price: " + round(priceLvl1*10)/10, width*2/3 + 10,           height*0/8+(height*3/32));
  text("Price: " + round(priceLvl2*10)/10, width*2/3 + 10,          height*1/8+(height*3/32));
  text("Price: " + round(priceLvl3*10)/10, width*2/3 + 10,   height*2/8+(height*3/32));
  text("Price: " + round(priceLvl4*10)/10, width*2/3 + 10,  height*3/8+(height*3/32));
  text("Price: " + round(priceLvl5*10)/10, width*2/3 + 10,    height*4/8+(height*3/32));
  text("Price: " + round(priceLvl6*10)/10, width*2/3 + 10,  height*5/8+(height*3/32));
  text("Price: " + round(priceLvl7*10)/10, width*2/3 + 10,    height*6/8+(height*3/32));
  text("Price: " + round(priceLvl8*10)/10, width*2/3 + 10,  height*7/8+(height*3/32));
}

function checkForClick(){
  let mouseDist = dist(mouseX, mouseY, circleX, circleY);
  if(mouseDist <= circleR){
    return true;
  } else{
    return false;
  }
}

function checkForLevels(){
  inLvl1 = false;
  inLvl2 = false;
  inLvl3 = false;
  inLvl4 = false;
  inLvl5 = false;
  inLvl6 = false;
  inLvl7 = false;
  inLvl8 = false;
  if((mouseX >= width*2/3) && (mouseX <= width)){
    switch(true){
      case  mouseY>height*7/8: inLvl8 = true;
            break;
      case  mouseY>height*6/8: inLvl7 = true;
            break;
      case  mouseY>height*5/8: inLvl6 = true;
            break;
      case  mouseY>height*4/8: inLvl5 = true;
            break;
      case  mouseY>height*3/8: inLvl4 = true;
            break;
      case  mouseY>height*2/8: inLvl3 = true;
            break;
      case  mouseY>height*1/8: inLvl2 = true;
            break;
      case  mouseY>height*0/8: inLvl1 = true;
    }
  }
}

function mousePressed(){
  if(inCircle){
    addOne();
  }
  if(inLvl1 && total >= priceLvl1){
    lvl1++;
    total-=priceLvl1;
    priceLvl1 *= 1.1;
  }
  if(inLvl2 && total >= priceLvl2){
    lvl2++;
    total-=priceLvl2;
    priceLvl2 *= 1.1;
  }
  if(inLvl3 && total >= priceLvl3){
    lvl3++;
    total-=priceLvl3;
    priceLvl3 *= 1.1;
  }
  if(inLvl4 && total >= priceLvl4){
    lvl4++;
    total-=priceLvl4;
    priceLvl4 *= 1.1;
  }
  if(inLvl5 && total >= priceLvl5){
    lvl5++;
    total-=priceLvl5;
    priceLvl5 *= 1.1;
  }
  if(inLvl6 && total >= priceLvl6){
    lvl6++;
    total-=priceLvl6;
    priceLvl6 *= 1.1;
  }
  if(inLvl7 && total >= priceLvl7){
    lvl7++;
    total-=priceLvl7;
    priceLvl7 *= 1.1;
  }
  if(inLvl8 && total >= priceLvl8){
    lvl8++;
    total-=priceLvl8;
    priceLvl8 *= 1.1;
  }
}

function addOne(){
  total++;
}
