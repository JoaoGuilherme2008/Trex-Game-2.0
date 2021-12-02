var trex, trex_running, edges, solo;
var groundImage;
var chaoinvisivel;
var nuvem,imagemDaNuvem;
var cacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var pontuacao = 0;
var grupoNuvens, grupoObstaculos
var estado_de_jogo = "gameplay"
var trex_died
var gameOver, restart, imagemGameOver, imagemRestart
var pulo, morte, checkpoint



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  imagemGameOver = loadImage("gameOver trex.png")
  imagemDaNuvem = loadImage("cloud.png")
  imagemRestart = loadImage("restart.png")

  cacto1 = loadImage("obstacle1.png")
  cacto2 = loadImage("obstacle2.png")
  cacto3 = loadImage("obstacle3.png")
  cacto4 = loadImage("obstacle4.png")
  cacto5 = loadImage("obstacle5.png")
  cacto6 = loadImage("obstacle6.png")

  trex_died = loadImage("trex_collided.png")

  morte = loadSound("die.mp3")
  pulo = loadSound("jump.mp3")
  checkpoint = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(width /20,height -100,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  trex.addImage("trex_collided",trex_died)

  //adicione dimensão e posição ao trex
  trex.scale = 0.4;
  trex.x = 50


  solo = createSprite(200,height -20,width,20)
  solo.addImage(groundImage)
  chaoinvisivel = createSprite(200,height -10,width,15)
  chaoinvisivel.visible = false


  gameOver = createSprite(width /2,height /2)
  gameOver.addImage(imagemGameOver)
  gameOver.scale = 0.5
  gameOver.visible = false

  restart = createSprite(width /2,height /2 +50)
  restart.addImage(imagemRestart)
  restart.scale = 0.4
  restart.visible = false

  grupoNuvens = new Group()
  grupoObstaculos = new Group()

  trex.debug = true

  trex.setCollider("circle", 0,0,40);
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");

  console.log(trex.y)

  text("Pontuação: "+pontuacao,width -100,50)
  
 
  
 //impedir que o trex caia
  trex.collide(chaoinvisivel)
  drawSprites();

  if(pontuacao>0 && pontuacao%1000===0){
    checkpoint.play();
  }
  

  if(estado_de_jogo==="gameplay"){
    //pontuacao = pontuacao+Math.round(frameCount/120)
    pontuacao = pontuacao+Math.round(getFrameRate()/60)
    //pular quando tecla de espaço for pressionada
  if(touches.length>0||keyDown("space")&& trex.y>=height-100){
    trex.velocityY = -10;
    pulo.play();
    touches=[];
  }
   trex.velocityY = trex.velocityY + 0.5; 

  if (solo.x<0){
 solo.x = solo.width/2;

  }
  solo.velocityX = -(4+pontuacao/100)

  nuvens()
  cactos()
 
  if(trex.isTouching(grupoObstaculos)){
    estado_de_jogo = "gameover"
    morte.play();
    //trex.velocityY = -12
  }
  } 
  else if(estado_de_jogo==="gameover"){
  solo.velocityX = 0
  grupoObstaculos.setVelocityXEach(0);
  grupoNuvens.setVelocityXEach(0);
  trex.velocityX = 0
  trex.velocityY = 0
  trex.changeAnimation("trex_collided",trex_died);
  grupoObstaculos.setLifetimeEach(-1);
  grupoNuvens.setLifetimeEach(-1);
  gameOver.visible = true
  restart.visible = true
  if (mousePressedOver(restart)){
    console.log("reinicio")
    reset()
   }
  }
}

function nuvens(){
  if (frameCount%60===0){
    nuvem = createSprite(width,1,14,81)
    nuvem.addImage("cloud",imagemDaNuvem)
    nuvem.scale = 0.6
    nuvem.velocityX = -10
    nuvem.y = Math.round(random(1,height -150))
    nuvem.depth = trex.depth
    trex.depth = trex.depth +1
    nuvem.lifetime = width /40
    grupoNuvens.add(nuvem)
  }
}

function cactos(){
  if (frameCount%75===0){
    cacto = createSprite(width,height -30,43,98)
    cacto.velocityX = -(4+pontuacao/100)
    cacto.scale = 0.5
    cacto.lifetime = width /40
    grupoObstaculos.add(cacto)
    var teste = Math.round(random(1,6))
    switch(teste){
      case 1:cacto.addImage(cacto1);
      break;
      case 2:cacto.addImage(cacto2);
      break;
      case 3:cacto.addImage(cacto3);
      break;
      case 4:cacto.addImage(cacto4);
      break;
      case 5:cacto.addImage(cacto5);
      break;
      case 6:cacto.addImage(cacto6);
      break;
      default:break;
    }
  }
}
function reset(){
  pontuacao = 0
  estado_de_jogo = "gameplay"
  grupoNuvens.destroyEach()
  grupoObstaculos.destroyEach()
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation("running", trex_running)

}