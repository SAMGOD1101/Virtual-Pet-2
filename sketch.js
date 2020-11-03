//Create variables here
var dog;
var dogImg,dogImg1;
var database;
var foodS;
var foodStock;
var feedDog,addFood;
var fedTime ,lastFed;
var foodObj;
var feed;



function preload()
{
 
  
  dogImg=loadImage("images/Dog.png");
  dogImg1=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  var canvas = createCanvas(1000,400);
  foodObj=new Food();
  

  foodStock=database.ref("Food")
  foodStock.on("value",readStock);

  dog=createSprite(800,250,10,10);
  dog.addImage(dogImg1);
  dog.scale=0.5
  
  

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

 
}


function draw() {  

  background(46,139,87);
 
  
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){

    lastFed=data.val();
  })

  
  
  drawSprites();

 // stroke("black");
  //text("Food Remaining"+foods,170,200)

  

  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed :" + lastFed%12 + "PM" ,350,30 )
  }else if(lastFed===0){
text("Last Feed : 12 AM" ,350,30);
 } else{

    text("Last Feed :" + lastFed + "AM" ,350,30);

 }


}



function readStock(data){

  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){

  dog.addImage(dogImg);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({

      Food:foodObj.getFoodStock(),
      FeedTime:hour()

  })
}

function addFoods(){

    foodS++;
    database.ref('/').update({

    Food:foodS


})

}


