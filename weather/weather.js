//GLOBAL VARIABLE DECLARATION
var weather, data, locationData;
var temperature=0, temp_a, temp_c;
var wind=0, wind_a, wind_c;
var wind_max=0, wind_m_a, wind_m_c;
var direction=0, dir_a, dir_c, wind_dir;
var humidity=0, hum_a, hum_c;
var clouds=0, cld_a, cld_c;
var visibility=0, vis_a, vis_c;
var fl=0, fl_a, fl_c;
var scale, h, w, rotated;
var lat, long;
var areaName      = "";
var brokenAPI     = true;
var firstLocation = true;
var isDesktop     = true;
var hasLocation   = false;
var cloudCheck, tempCheck, feelsCheck, windCheck, directionCheck, humidityCheck, visibilityCheck;
var bluesTick, rainbowTick, warmsTick, greyTick;
var condition_text = "";

function setup(){
  //WIDTH & HEIGHT
  // w = windowWidth-200;
  // h = w + 200;

  h = windowHeight;
  w = windowHeight+140;

  cloudCheck = document.getElementById("cloud");
  tempCheck = document.getElementById("temp");
  feelsCheck = document.getElementById("feels-like");
  windCheck = document.getElementById("wind");
  directionCheck = document.getElementById("direction");
  humidityCheck = document.getElementById("humidity");
  visibilityCheck = document.getElementById("visibility");

  bluesTick = document.getElementById("blues");
  rainbowTick = document.getElementById("rainbow");
  warmsTick = document.getElementById("warms");
  greyTick = document.getElementById("greyscale");

  //CHECKBOXES
  //cloudCheck       = createCheckbox('Cloud Cover', false);
  // tempCheck        = createCheckbox('Temperature', true);
  // feelsCheck       = createCheckbox('Feels-Like', false);
  // windCheck        = createCheckbox('Wind Speed', true);
  // directionCheck   = createCheckbox('Wind Direction', false);
  // humidityCheck    = createCheckbox('Humiditiy', true);
  // visibilityCheck  = createCheckbox('Visibility', false);

  //CANVAS
  var cvs = createCanvas(w, h);
  cvs.position(200, 0);
  cvs.class("canvas-weather");

  //SCALE
  scale = width/250;
  rotated = 0;

  //COLORS
  var desat = 0;

  updateColors();

  wind_m_c  = color(0  , 140, 200); //NOT BEING USED

  //FIRST LOCATION CHECK
  getLocation();
}

//UPDATES COLORS
function updateColors(){
  if(bluesTick.checked){
    cld_c     = color(0, 120, 220);
    temp_c    = color(0, 140, 210);
    fl_c      = color(0, 150, 205);
    wind_c    = color(0, 160, 200);
    dir_c     = color(0, 180, 190);
    hum_c     = color(0, 200, 180);
    vis_c     = color(0, 220, 170);
  } else if(rainbowTick.checked){
    cld_c     = color(255,   0,   0);
    temp_c    = color(255, 127,   0);
    fl_c      = color(220, 107, 0);
    wind_c    = color(255, 255,   0);
    dir_c     = color(  0, 255,   0);
    hum_c     = color(  0,   0, 255);
    vis_c     = color(148,   0, 211);
  } else if(warmsTick.checked){
    cld_c     = color(255,   0, 0);
    temp_c    = color(255,  40, 0);
    fl_c      = color(255,  60, 0);
    wind_c    = color(255,  80, 0);
    dir_c     = color(255, 100, 0);
    hum_c     = color(255, 140, 0);
    vis_c     = color(255, 180, 0);
  } else if(greyTick.checked){
    cld_c     = color(200, 200, 200);
    temp_c    = color(180, 180, 180);
    fl_c      = color(170, 170, 170);
    wind_c    = color(160, 160, 160);
    dir_c     = color(140, 140, 140);
    hum_c     = color(120, 120, 120);
    vis_c     = color(100, 100, 100);
  }
}

//CHECKS IF WINDOW IS RESIZED
function windowResized(){
  //ADJUSTS WIDTH & HEIGHT
  h = windowHeight;
  w = windowHeight+140;

  //RESIZES
  resizeCanvas(w, h);

  //ADJUSTS SCALE
  scale = width/250;
}

//GETS LOCATION
function getLocation(){
  //CHECKS IF BROWSER SUPPORTED
  if(navigator.geolocation){
    //IF SO, GO TO convertPos()
    navigator.geolocation.getCurrentPosition(convertPos);
  }
}

//FINDS LATITUDE & LATITUDE
function convertPos(position){
  lat = position.coords.latitude;
  long = position.coords.longitude;

  //FINDS ACTUAL DATA
  findData(lat, long);
}

//GETS DATA FROM API
function findData(t, l){
  //API
  locationData=loadJSON("https://api.apixu.com/v1/current.json?key=d0e4f5cf25a6414b91f141902180803&q="+t+","+l,haveData,errorData);
}

//HAS DATA
function haveData(data){
  //RENAMES TITLE
  areaName = data.location.region;
  document.getElementById('title').innerHTML = "Weather in " + areaName;

  //CALLS gotData()
  gotData(data);
}

//DATA DIDN'T WORK
function errorData(){
  brokenAPI = true;
}

//GETS WEATHER PREPARED
function gotData(data){
  //SETS WEATHER TO DATA
  weather = data;
  hasLocation=true;

  //DISPLAYS DATA
  displayData();
}

//LOOP
function draw(){
  //BACKGROUND COLOR
  background(51);

  //CHECKS FOR MOBILE
  if(windowWidth < 500){
    isDesktop = false;
  } else{
    isDesktop = true;
  }

  //UPDATES COLORS
  updateColors();

  //FINDS DATA OCCASIONALLY
  if(frameCount%10000==0){
    findData(lat, long);
  }

  if(isDesktop){
    //BROKEN API CHECK
    if(!brokenAPI){
      //IF NOT, DISPLAY DATA (ONCE PER FRAME)
      displayData();
    } else{
      //IF SO, SHOW LOADING SCREEN
      loadingDisplay();
    }
  } else {
    push();
      // translate(width/2, height/2);
      textAlign(CENTER);
      fill(255);
      textSize(20);
      text("This site was designed", 100, 100);
      text("for desktop use only.", 100, 120);
    pop();
  }
}

//DISPLAY DATA
function displayData(){
  //SETS BROKENAPI TO FALSE
  brokenAPI = false;

  //INFO DOTS
  if(cloudCheck.checked)      {infoDot("Cloud Cover", "%", clouds, cld_c, 0);}
  if(tempCheck.checked){infoDot("Temperature", "˚F", temperature, temp_c, 1);}
  if(feelsCheck.checked)      {infoDot("Feels Like", "˚F", fl, fl_c, 2);}
  if(windCheck.checked)       {infoDot("Wind Speed", "mph", wind, wind_c, 3);}
  if(directionCheck.checked)  {infoDot("Wind Direction", "", wind_dir, dir_c, 4);}
  if(humidityCheck.checked)   {infoDot("Humidity", "%", humidity, hum_c, 5);}
  if(visibilityCheck.checked) {infoDot("Visibility", " miles", visibility, vis_c, 6);}
  // infoDot("Wind Gust Speed", "mph", wind_max, wind_m_c, 4);

  //SAVES TRANSLATIONS
  push();

  //ALIGNS SCREEN
  alignScreen();

  //GETS WEATHER DATA FROM VARIABLE
  checkForInput();

  //ADJSUTS TEMPERATURE COLOR FOR TEMPERATURE
  // if(temperature < 50){
  //   temp_c    = color(50, 205, 50);
  // } else {
  //   temp_c    = color(240, 38, 0);
  // }

  //MAPS NUMBERS TO ANGLES
  createAngles(temperature, wind, wind_max, direction, humidity, fl, clouds, visibility);

  //MAKING SURE YOU CAN ALWAYS SEE TEMPERATURE AND FEELS LIKE
  if(temperature<fl){
    //IF TEMPERATURE IS LESS, SHOW IT SECOND
    if(feelsCheck.checked){
      createArc(fl_a, fl_c, 150);
    }
    if(tempCheck.checked){
      createArc(temp_a, temp_c, 150);
    }
  }else{
    //IF FEELS LIKE IS LESS, SHOW IT SECOND
    if(tempCheck.checked){
      createArc(temp_a, temp_c, 150);
    }
    if(feelsCheck.checked){
      createArc(fl_a, fl_c, 150);
    }
  }

  //ARC FORMATIONS
  // createArc(wind_m_a, wind_m_c, 170);
  if(windCheck.checked)       {createArc(wind_a, wind_c, 120);}
  if(directionCheck.checked)  {createArc(dir_a, dir_c, 90);}
  if(humidityCheck.checked)   {createArc(hum_a, hum_c, 60);}
  if(cloudCheck.checked)      {createArc(cld_a, cld_c, 180);}
  if(visibilityCheck.checked) {createArc(vis_a, vis_c, 30);}

  //CENTER TEMPERATURE
  temperatureText(round(temperature), 0, 0, scale*10, 255);

  //RESET TRANSLATIONS
  pop();

  //SHOW CURRENT CONDITION
  currentConditionText();

  //SHOW PROGRESS BAR
  progressBar();
}

//SHOW PROGRESS BAR
function progressBar(){
  //MAP THE FRAME COUNT TO THE LENGTH
  var l = map(frameCount%10000, 0, 10000, 0, width);

  //FILL RED
  fill(255,0,0);

  //DRAW RECTANGLE
  rect(0, height-5, l, 5);
}

//LOADING SCREEN
function loadingDisplay(){
  //SAVE TRANSLATIONS
  push();

  //FILL WHITE
  fill(255);

  //CENTER COORDS
  translate(width/2, height/2);

  //TEXT ADJUSTMENTS
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(scale*20);

  //LOADING TEXT
  text("Loading data...", 0, 0);

  //ROTATING LOADING SYMBOL
  noFill();
  stroke(255);
  strokeWeight(16);

  //SAVE TRANSLATIONS
  push();

  //MOVES DOWN
  translate(0, 100);

  //ROTATIONS (SLOW)
  rotated+=0.2;
  rotate(rotated);

  //DRAW ARC
  arc(0, 0, 100, 100, -HALF_PI, 3*PI/4, OPEN);

  //RESTORE ALL TRANSLATIONS
  pop();
  pop();
}

//INFO DOT
function infoDot(n, un, u, c, num){
  //CENTER DOT
  ellipseMode(CENTER);

  //FILL WITH COLOR, MAKE NO STROKE
  fill(c);
  noStroke();

  //DOT
  ellipse(width-15, 20+num*30, 20, 20);

  //TEXT
  textAlign(RIGHT);
  fill(255);
  textSize(14);
  text(n + ": " + str(u)+un, width-35, num*30+25);
}

//GET WEATHER FROM API INFORMATION
function checkForInput(){
  //MAKE SURE IT WORKED BEFORE ATTEMPTING
  if(weather&&!brokenAPI){
    //DIRECTLY FROM API
    humidity         = weather.current.humidity;
    temperature      = weather.current.temp_f;
    wind             = weather.current.wind_mph;
    wind_max         = weather.current.wind_mph;
    wind_dir         = weather.current.wind_dir;
    fl               = weather.current.feelslike_f;
    clouds           = weather.current.cloud;
    visibility       = weather.current.vis_miles;
    condition_text   = weather.current.condition.text;

    //WIND DIRECTION TO NUMBER BETWEEN 0 AND 4
    switch(wind_dir){
      case "N": direction = 0.001;break;
      case "NNE": direction = 0.25;break;
      case "NE": direction = 0.5;break;
      case "ENE": direction = 0.75;break;
      case "E": direction = 1;break;
      case "ESE": direction = 1.25;break;
      case "SE": direction = 1.5;break;
      case "SSE": direction = 1.75;break;
      case "S": direction = 2;break;
      case "SSW": direction = 2.25;break;
      case "SW": direction = 2.5;break;
      case "WSW": direction = 2.75;break;
      case "W": direction = 3;break;
      case "WNW": direction = 3.25;break;
      case "NW": direction = 3.5;break;
      case "NNW": direction = 3.75;
    }
  }
}

//CENTER SCREEN
function alignScreen(){
  //CENTERING
  textAlign(CENTER);
  ellipseMode(CENTER);
  translate(width/2, width/2);
}

//MAP ANGLES
function createAngles(t, w, w_m, d, h, f, c, v){
  //MAP ALL VARIABLES USED
  temp_a    = map(t  , 0, 100, 0, TWO_PI-0.01);
  wind_a    = map(w  , 0, 50 , 0, TWO_PI-0.01);
  wind_m_a  = map(w_m, 0, 50 , 0, TWO_PI-0.01);
  dir_a     = map(d  , 0, 4  , 0, TWO_PI-0.01);
  hum_a     = map(h  , 0, 100, 0, TWO_PI-0.01);
  fl_a      = map(f  , 0, 100, 0, TWO_PI-0.01);
  cld_a     = map(c  , 0, 100, 0, TWO_PI-0.01);
  vis_a     = map(v  , 0, 20 , 0, TWO_PI-0.01);
}

//CENTER TEMPERATURE TEXT
function temperatureText(t, x, y, s, c){
  //FILLED WITH COLOR
  fill(c);

  //TEXT ADJUSTMENTS
  textSize(s-3);
  noStroke();
  // textStyle(BOLD);
  textAlign(CENTER);

  //DISPLAY TEXT
  text(t+"˚", -40, -60);
}

//CURRENT CONDITION TEXT
function currentConditionText(){
  var secToUpdate = floor((10000-(frameCount%10000))/(floor(frameRate())));

  //SAVE TRANSLATIONS
  push();

  //TEXT ADJUSTMENTS
  noStroke();
  textStyle(ITALIC);
  textSize(scale*5);
  textAlign(RIGHT);
  translate(width-10, height-30);
  fill(255);

  //TEXT
  text("Current Condition: " + condition_text, 0, 0);
  text("Loading Next Update: " + floor((frameCount%10000)/100) + "%", 0, 15);
  //RESTORE TRANSLATIONS
  pop();
}

//ARCS
function createArc(a, c, d){
  //COLORS & STYLES
  noFill();
  stroke(c);
  strokeWeight(scale*15);

  //ARC DRAWING
  arc(-40, -75, d*scale, d*scale, -HALF_PI, a-HALF_PI+0.001);
}
