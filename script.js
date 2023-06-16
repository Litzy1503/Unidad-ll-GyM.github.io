
function puntoMedioCirculo(xc, yc, r) {
    let x = 0;
    let y = r;
    let p = 1 - r;
  
    trazarSimetricos(xc, yc, x, y);
  
    while (x < y) {
      x++;
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
      trazarSimetricos(xc, yc, x, y);
    }
  }
  
  function trazarSimetricos(xc, yc, x, y) {
    point(xc + x, yc + y);
    point(xc - x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc + y, yc + x);
    point(xc - y, yc + x);
    point(xc + y, yc - x);
    point(xc - y, yc - x);
    point(xc,yc);
  }
  
  function puntoPendiente(x1,y1,x2,y2) {
    let dx = x2 - x1; 
    let dy = y2 - y1;
    let m = dy / dx;
    let b = y1 - m * x1;
    
    if(abs(dx) > abs(dy)) {
      
      for(let x = x1; x <= x2; x++) {
        let y = Math.round(m * x + b);
        point(x, y);
      }  
    } else {
      
      for(let y = y1; y <= y2; y++) {
          let x = Math.round((y - b) / m);
        point(x, y);
      }
    }
  }

  function DDA(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let m = dy / dx; 
  
    if (abs(dx) > abs(dy)) { 
      let y = y1;
      for (let x = x1; x <= x2; x++) { 
        point(x, y); 
        y += m; 
      }
    } else { 
      let x = x1;
      for (let y = y1; y <= y2; y++) { 
        point(x, y); 
        x += 1 / m; 
      }
    }
  }
  function bresenham(x0, y0, x1, y1) {
    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    
    while (x0 != x1 || y0 != y1) {
      point(x0, y0); 
      let e2 = err * 2;
      if (e2 > -dy) { 
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
    point(x0, y0); 
  }
  function boton(){
    cantidad = parseInt(document.getElementById("rebanadas").value);
    var respuesta = document.getElementById("respuesta");
    respuesta.innerHTML=cantidad;
    if(cantidad==2){
      draw();
    }
  }
  function rebanadas(rebanadasPorCortar){
    
    if(rebanadasPorCortar==0 || rebanadasPorCortar==1 || rebanadasPorCortar>=9){
      
    }else if (rebanadasPorCortar == 3) {
      //Linea horizontal
      puntoPendiente(100,200,200,200); 
      DDA(500,200,600,200);
      bresenham(900,200,1000,200);
    }

    if(rebanadasPorCortar>=2){
      //Linea vertical
      puntoPendiente(200,100,199,300);
      DDA(600,100,600,300);
      bresenham(1000,100,1000,300);
    }
    
    if(rebanadasPorCortar >= 4){
      //Linea horizontal
      puntoPendiente(100,200,300,200); 
      DDA(500,200,700,200);
      bresenham(900,200,1100,200);
    }
    if (rebanadasPorCortar % 5 === 0) {
      //Esquina superior izquierda
      puntoPendiente(130,130,200,200);
      DDA(530,130,600,200);
      bresenham(930,130,1000,200);
    }
    if(rebanadasPorCortar > 6 || rebanadasPorCortar % 6 === 0){
      //Esquina inferior izquierda
      puntoPendiente(130,130,270,270);
      DDA(530,130,670,270);
      bresenham(930,130,1070,270);

    }
    if(rebanadasPorCortar % 7 === 0){
      //Esquina superior derecha
      puntoPendiente(270,130,200,200);
      DDA(670,130,600,200);
      bresenham(1070,130,1000,200);
    }
    if(rebanadasPorCortar % 8 === 0){
      //Esquina inferior derecha
      puntoPendiente(270,130,130,270);
      DDA(670,130,530,270);
      bresenham(1070,130,930,270);
    }
    
    
  }
  function draw(){
    
    if(cantidad>=9){
      alert("Una pizza normal son solo 8 rebanadas :)");
      background(220);
      noFill();
      noStroke();
      cantidad=0;
    }

    if(cantidad >= 1 && cantidad<=8){
      background(220);
      stroke(0);
      strokeWeight(2);
      let circulo1X=200, circulo2X=600, circulo3X=1000;
      let circulo1Y=200, circulo2Y=200, circulo3Y=200;
      let radio = 100;
      
      //Recortes
      rebanadas(cantidad);
      
      //Circulo punto-pendiente
      puntoMedioCirculo(circulo1X,circulo1Y,radio);
      
      //Circulo DDA
      puntoMedioCirculo(circulo2X,circulo2Y,radio);
      
      //Circulo bresenham
      puntoMedioCirculo(circulo3X,circulo3Y,radio);

      
    }else{
      background(220);
      noFill();
      noStroke();
    }
  }
  function setup() {
    createCanvas(windowWidth, 400);
    boton();
  }