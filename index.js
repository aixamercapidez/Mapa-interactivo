let im
let data
let maxPob2019
let minPob2019
let maxPob1969
let minPob1969
let posx
let posy
var myFont
var italic
var bold
let xb = 160
let yb = 600
let d =0
let num = []


function preload() {

  //cargamos imagenes, json con data y las tipografias.

  im = loadImage("data/mapafondo-01.png")
  data = loadJSON("data/poblacion_paises.json")
  myFont = loadFont('data/Poppins-Medium.ttf')
  italic = loadFont('data/Poppins-ExtraLightItalic.ttf')
  bold = loadFont('data/Poppins-ExtraBold.ttf')
  

  for (let i = 0; i< 35; i++){
    num[i]= loadImage('Banderas/'+i+'.png')
  }
  
}

function setup() {
 
  //creamos canvas y asignamos maximos y minimos con la data de json.
  createCanvas(1440, 810)
  
  maxPob2019 = data.maxPob2019
  minPob2019 = data.minPob2019
  maxPob1969 = data.maxPob1969
  minPob1969 = data.minPob1969
  
  
 
}


function draw (){
  // ponemos el mapa de fondo y le asignamos tipografia a los paises.
  background(255)
  background(im)
  let paises = data.paises
  fill(87,87,87)
  textFont(bold)

  //titulo
  textSize(50)
  text("¿Cuántos en el mundo?", 410, 50)
  textFont(italic)
  
  //subtitulo
  textSize(20)
  text("Apretá en cada país para ver la diferencia", 500, 60, 430, 200)
  text("en la poblacion entre 1969 y 2019", 550, 80, 430, 200)
  
  //boton 1969, cuando pasas por arriba y se pone gris oscuro
  boton(xb, yb)
  textFont(myFont)
  if (mouseX > xb && mouseX < xb+75 && mouseY > yb && mouseY < yb+50 ){
    fill(100, 100, 100)
    textFont(myFont)
    textSize(20)
    rect(160, 600, 75, 50, 5, 0, 0, 5)
    fill(255)
    text("1969", xb + 15, yb +30)
    
    
  //boton 2019, cuando pasas por arriba y se pone gris oscuro
  }
  if (mouseX > xb+75 && mouseX < xb+150 && mouseY >yb && mouseY < yb+50 ){
    fill(100, 100, 100)
    textFont(myFont)
    textSize(20)
    rect(235, 600, 75, 50, 0, 5, 5, 0)
    fill(255)
    text("2019", xb + 90, yb +30)

  }
  //de cuando apretas BOTON ANIO
  if( d==10) {
    
    fill(100, 100, 100)
    textSize(20)
    rect(160, 600, 75, 50, 5, 0, 0, 5)
    fill(255)
    text("1969", xb + 15, yb +30)
    
    fill(100, 100, 100)

    //todo lo que esta ADENTRO DE 1969
    for (let i = 0; i < paises.length; i++) {
      
      let tam = map(paises[i].pob1969, minPob1969, maxPob1969, 20, 120)
      let posx = paises[i].ejex
      let posy = paises[i].ejey
      
      
      //cuando apretas y se pone mas oscuro
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2){
      
        fill(106,112,123, 200)
        stroke(255)
        
      }

      //cuando se pone claro
      else{
        
        noStroke()
        fill(106,112,123, 100)
        
        
      }
      //pais
      circulo (posx, posy, tam)
      
      
    }

   
    for (let i = 0; i < paises.length; i++) {
      let tam = map(paises[i].pob2019, minPob2019, maxPob2019, 40, 140)
      let posx = paises[i].ejex
      let posy = paises[i].ejey
     //cuando estas arriba que se ponga el cuadro con la informacion del 1969 (se coloca en este sector para que tome el valor del diametro del circulo mas grande como poisicion, asi no se produce un desfazamiento entre los cuadros de texto)
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2){
      
        textSize(1)
        cuadro (posx + tam/2 + 20, posy - tam/2 - 20)
        textFont(italic)
        pais(paises[i].nombre, posx + tam/2 + 39, posy - tam/2)
        image (num[i], posx + tam/2 + 165, posy - tam/2 - 12, 30, 20)
        cod(paises[i].codigo,  posx + tam/2 + 39, posy - tam/2 + 15)
        pob ("Pob. 1969", posx + tam/2 + 39, posy - tam/2 + 40)
        cantpob(paises[i].pob1969, posx + tam/2 + 125, posy - tam/2 + 40)
        noStroke()
        
      }

      //cuando se aprieta el circulo, que aparezca el otro circulo.
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2 && mouseIsPressed){
          
        fill(74,112,87, 200)
        stroke(255)
        circulo (posx, posy, tam)
      }
      //cuando se aprieta el circulo, que aparezca el otro cuadro de informacion (2019)
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2 && mouseIsPressed){
        
        textFont(italic)
        cuadro (posx + tam/2 + 20, posy - tam/2 - 20)
        image (num[i], posx + tam/2 + 165, posy - tam/2 - 12, 30, 20)
        pais(paises[i].nombre, posx + tam/2 + 39, posy - tam/2)
        cod(paises[i].codigo,  posx + tam/2 + 39, posy - tam/2 + 15)
        pob ("Pob. 2019", posx + tam/2 + 39, posy - tam/2 + 40)
        cantpob(paises[i].pob2019, posx + tam/2 + 125, posy - tam/2 + 40)
        noStroke()
        
      }
  
      
    }
    

  }
  
  //para la parte de los circulo verdes.
  else{

    fill(100, 100, 100)
    textSize(20)
    rect(235, 600, 75, 50, 0, 5, 5, 0)
    fill(255)
    text("2019", xb + 90, yb +30)

    for (let i = 0; i < paises.length; i++) {
      
      let tam = map(paises[i].pob2019, minPob2019, maxPob2019, 40, 140)
      let posx = paises[i].ejex
      let posy = paises[i].ejey
      
      //que el circulo se ponga mas opaco al tener el mouse arriba.
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2){
        
        fill(74,112,87, 200)
        stroke(255)
      }

      //que el circulo se ponga menos opaco cuando el mouse no esta sobre el.
      else{
        noStroke()
        fill (74,112,87,100)
      }

      //pais
      circulo (posx, posy, tam)
      
      
    }
   
    for (let i = 0; i < paises.length; i++) {
      let tam = map(paises[i].pob1969, minPob1969, maxPob1969, 20, 120)
      let posx = paises[i].ejex
      let posy = paises[i].ejey
      
      //cuando estas arriba que se ponga el cuadro con la informacion del 2019 (se coloca en este sector para que tome el valor del diametro del circulo mas grande como poisicion, asi no se produce un desfazamiento entre los cuadros de texto)
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2){
        
        textFont(italic)
        cuadro (posx + tam/2 + 20, posy - tam/2 - 20)
        pais(paises[i].nombre, posx + tam/2 + 39, posy - tam/2)
        image (num[i], posx + tam/2 + 165, posy - tam/2 - 12, 30, 20)
      
        cod(paises[i].codigo,  posx + tam/2 + 39, posy - tam/2 + 15)
        pob ("Pob. 2019", posx + tam/2 + 39, posy - tam/2 + 40)
        cantpob(paises[i].pob2019, posx + tam/2 + 125, posy - tam/2 + 40)
        
        noStroke()
       
        
      }
      
      //cuando se aprieta, el circulo se pone mas opaco.
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2 && mouseIsPressed){

        fill(106,112,123, 200)
        stroke(255)
        circulo (posx, posy, tam)
      }

      //cuando se aprieta, aparece la informacion del cuadro de 1969.
      if (mouseX > posx - tam/2 && mouseX < posx + tam/2 && mouseY > posy - tam/2 && mouseY < posy + tam/2 && mouseIsPressed){
        textFont(italic)
        
        
        cuadro (posx + tam/2 + 20, posy - tam/2 - 20)
        pais(paises[i].nombre, posx + tam/2 + 39, posy - tam/2)
        image (num[i], posx + tam/2 + 165, posy - tam/2 - 12, 30, 20)
        cod(paises[i].codigo,  posx + tam/2 + 39, posy - tam/2 + 15)
        pob ("Pob. 1969", posx + tam/2 + 39, posy - tam/2 + 40)
        cantpob(paises[i].pob1969, posx + tam/2 + 125, posy - tam/2 + 40)
        
        noStroke()
        
      }
  
    }
  }
  
  
   
 
}

//cuando se aprieta el boton 1969 y 2019, se cambia de pantalla.
function mouseClicked(){
  if (mouseX > xb && mouseX < xb+75 && mouseY >yb && mouseY < yb+50 ){
    d = 10;

  }
  else if (mouseX > xb+75 && mouseX < xb+150 && mouseY >yb && mouseY < yb+50){
    d = 5;
  }
}

//dibuja los paises.
function circulo (x, y, tamaño, r, g,b ,a){
 
  fill(r,g,b,a)
  ellipse(x, y, tamaño)
  noStroke()
  fill(87,87,87)
  ellipse(x, y, 4)
  
}

//dibuja el cuadro de informacion.
function cuadro (x, y){
  
  fill(216,216,216)
  rect(x, y, 195,70, 0, 0, 0, 0)
  stroke(0)
  strokeWeight(0.08)
  line(x +20, y+40, x+175, y+40)
  noFill()
}

//tipografia del nombre de los paises.
function pais (t, x, y){
  textSize(13)
  textFont(myFont)
  stroke (0)
  strokeWeight(1)
  fill(0)  
  text(t, x, y)
  
}

//tipografia del codigo de los paises.
function cod(te, x1, y1,){
  textSize(10)
  textFont(italic)
  stroke (0)
  strokeWeight(1)
  fill(0)
  text(te, x1, y1)
}

//tipografia de la poblacion de los paises.
function cantpob(te, x1, y1,){
  textSize(13)
  textFont(myFont)
  stroke (0)
  strokeWeight(1)
  fill(0)
  text(te, x1, y1)
}

//tipografia palabra "poblacion"
function pob(te, x1, y1,){
  textSize(10)
  textFont(italic)
  stroke (0)
  strokeWeight(1)
  fill(0)
  text(te, x1, y1)
}

//boton de 1969/2019
function boton(x,y){
  fill(192, 192, 192)
  rect(x, y, 150, 50, 5, 5, 5, 5)
  textSize(20)
  fill(255)
  text("1969", x + 15, y +30)
  text("2019", x + 90, y +30)
  stroke(255)
  line(x + 75, y, x + 75, y+ 50)
  
}