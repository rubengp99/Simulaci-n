function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    fire = false;
  }
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


var lambda = 0;
var mu = 0;
let fire = true;
const circlesXA = document.querySelectorAll('.XA')
let activeLightXA = 0;
const circlesXB = document.querySelectorAll('.XB')
let activeLightXB = 0;
const circlesYA = document.querySelectorAll('.YA')
let activeLightYA = 0;
const circlesYB = document.querySelectorAll('.YB')
let activeLightYB = 0;
let interval = 0;
let carPos = ['xaRight', 'xbLeft', 'yaTop', 'ybBot']
let xaRight = [xaRightGoLeft, xaRightGoCenter , xaRightGoRight]
let xbLeft = [ xbLeftGoRight, xbLeftGoLeft, xbLeftGoCenter]
let yaTop = [yaTopGoCenter, yaTopGoRight , yaTopGoLeft]
let ybBot = [ybBotGoLeft, ybBotGoCenter, ybBotGoRight]
let carsXA = 0;
let carsXB = 0;
let carsYA = 0;
let carsYB = 0;
let arrXA = [];
let arrXB = [];
let arrYA = [];
let arrYB = [];
let auxXA = -1;
let auxXB = -1;
let auxYA = -1;
let auxYB = -1;
var i = 0;


function func(lambda,mu, n){
  let x = Math.pow((lambda / 60) / (mu / 60),n)/Factorial(n);
  return x;
}

function Factorial(n) { 
    var ans=1;               
    for (var i = 2; i <= n; i++) 
        ans = ans * i; 
    return ans; 
} 

function Sumatoria(startIndex, endIndexInclusive, iteratorFunction,lambda, mu) {
  let accumulator = 0;
  for(let i = startIndex; i <= endIndexInclusive; ++i) {
    accumulator += iteratorFunction(lambda, mu, i);
  }
  return accumulator;
}

function showCalcs(){
  if(!isNaN((lambda / 60) * (mu / 60))){
    let n = 3;
    var lambxMu = (lambda / 60) * (mu / 60);
    var lamb_mu = (lambda / 60)  / (mu / 60);
    var SxMu = n * (mu / 60);
    var P = (lambda / 60) / (n * (mu / 60));
    var P1 = 1-P;
    var P0 = 1/Sumatoria(1,n-1,func,lambda, mu) + (1/Factorial(n)) * Math.pow(lamb_mu, n)*(1/P1);

    var Lq = (+Math.pow(lamb_mu,n)*+lambxMu)
    Lq /= (Factorial(n-1)*Math.pow(+SxMu - (+lambda / 60),2));
    Lq *= P0;
    var Ls = Lq + ((lambda / 60) / (mu / 60));
    var Wq = Lq/(lambda / 60);
    var Ws = Wq +(1 / (mu / 60));
    Swal.fire({
      title: 'Consulta de resultados.',
      icon: 'info',
      html: `
      <a>Estos son los datos de la teoría de colas.</a>
        <table id="table" border=1 style="margin:auto;display:block;position:relative;width:100%;">
          <thead>
              <tr>
                <th>P</th>
                <th>P0</th>
                      <th>Lq</th>
                      <th>Wq</th>
                      <th>Ls</th>
                      <th>Ws</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td> `+Math.round(P * 10000) / 10000+` </td>
                      <td> `+Math.round(P1 * 10000) / 10000+` </td>
                      <td> `+Math.round(Lq * 10000) / 10000+` </td>
                      <td> `+Math.round((Wq*60) * 10000) / 10000+` </td>
                      <td> `+Math.round(Ls * 10000) / 10000+` </td>
                      <td> `+Math.round( (Ws *60) * 10000) / 10000+` </td>
                  </tr>
                  
        </tbody>
        </table>
        <ul>
          <li>P - Factor de Utilización. (Porcentaje)</li>
          <li class="divider"></li>
          <li>P1 - Probabilidad de ociosidad. (Porcentaje)</li>
          <li class="divider"></li>
          <li>Lq - Promedio de autos en cola. (Cantidad)</li>
          <li class="divider"></li>
          <li>Wq - Promedio de espera en cola. (segundos)</li>
          <li class="divider"></li>
          <li>Ls - Promedio de autos en el sistema. (Cantidad)</li>
          <li class="divider"></li>
          <li>Ws - Promedo de espera en el sistema. (segundos)</li>
        </ul
        `,
        showConfirmButton: false,
        allowOutsideClick: true
    });
  }
}

Swal.mixin({
  input: 'text',
  confirmButtonText: 'Siguiente &rarr;',
  showCancelButton: false,
  progressSteps: ['1', '2'],
  allowOutsideClick: false
}).queue([
  {
    title: 'Ingrese el valor de Lambda (λ) en minutos.',
    text: 'Determina el intervalo de aparición entre auto.'
  },
  {
    title: 'Ingrese el valor de Mu (μ) en minutos.',
    text: 'Intervalo entre luces del semaforo.'
  },
]).then((result) => {
  if (result.value) {
    var answers = result.value;
    answers[0] = +Math.ceil(+answers[0])
    answers[1] = +Math.ceil(+answers[1])
    answers[0] = typeof answers[0] !== 'number' || answers[0] <= 0 ? 4 : answers[0];
    answers[1] = typeof answers[1] !== 'number' || answers[1] <= 0 ? 4 : answers[1];
    setTimeout(() => {
      changeLight(answers[0] * 1000,answers[1]* 1000);
    }, +Math.ceil(+answers[1]) * 1000);
    setTimeout(()=>{
      createCar(answers[0] * 1000,answers[1]* 1000);
    },+Math.ceil(+answers[0]) * 1000)
  }
});

function createCar(lambda, mu){
    this.lambda = lambda;
    this.mu = mu;
    switch(Math.floor(Math.random() * 4)){
      case 0:
            auxXA++;
            $( ".road-x").find('.relative-container')
              .append( "<div id='"+carsXA+"XA' class='XA car"+((Math.floor(Math.random() * 6) + 1)+' xaRight'+"'></div>" ));
             arrXA.push('#'+carsXA+'XA');
             let a = 30 - 8.7 * auxXA;
             $('#'+carsXA+'XA').animate({right: a +'vw'},mu,null);
             carsXA++;
             break;
      case 1: 
            auxXB++;
            $( ".road-x").find('.relative-container')
              .append( "<div id='"+carsXB+"XB' class='XB car"+((Math.floor(Math.random() * 6) + 1)+' xbLeft'+"'></div>" ));
             arrXB.push('#'+carsXB+'XB');
             let b = 30 - 8.7 * auxXB;
             $('#'+carsXB+'XB').animate({left: b + 'vw'},mu,null);
             carsXB++;
             break;
      case 2: 
            auxYA++;
            $( ".road-y").find('.relative-container')
              .append( "<div id='"+carsYA+"YA' class='YA car"+((Math.floor(Math.random() * 6) + 1)+' yaTop'+"'></div>" ));
             arrYA.push('#'+carsYA+'YA');
             let c = 10 - 8.7 * auxYA;
             $('#'+carsYA+'YA').animate({top: c+'vw'},mu,null);
             carsYA++;
             break;
      case 3: 
            auxYB++;
            $( ".road-y").find('.relative-container')
              .append( "<div id='"+carsYB+"YB' class='YB car"+((Math.floor(Math.random() * 6) + 1)+' ybBot'+"'></div>" ));
             arrYB.push('#'+carsYB+'YB');
             let d = 10 - 8.7 * auxYB;
             $('#'+carsYB+'YB').animate({bottom: d+'vw'},mu,null);
             carsYB++;
             break;
    }
    setTimeout(()=>{
      createCar(lambda, mu);
    },lambda);
}

  

function changeLight(lambda, mu) {

  i = Math.floor(Math.random() * 3);
	/* Semaforo izquierda del eje X (Calle Horizontal) */
  circlesXA[activeLightXA].className = 'circle XA';
  activeLightXA++;

  if (activeLightXA === 2) {
  	interval =  mu  - (mu * 0.25);
   // for (let car of arrXA){
      setTimeout(()=>{
        xaRight[i](arrXA[0], mu);
      },mu)
    //}
  }

  if (activeLightXA === 1) {
    interval = mu - (mu * 0.60);
  }

  if(activeLightXA > 2) {
    activeLightXA = 0;
  }

  if (true) {}
  
  const currentLightXA = circlesXA[activeLightXA]
  
  currentLightXA.classList.add(currentLightXA.getAttribute('color'));

  /* Semaforo derecho del eje X (Calle Horizontal) */


  circlesXB[activeLightXB].className = 'circle XB';
  activeLightXB++;

  if (activeLightXB === 2) {
    for (let car of arrXB){
      setTimeout(()=>{
        xbLeft[i](arrXB[0], mu);
      }, mu)
    }
  }

  if(activeLightXB > 2) {
    activeLightXB = 0;
  }

  

  if (true) {}
  
  const currentLightXB = circlesXB[activeLightXB]
  
  currentLightXB.classList.add(currentLightXB.getAttribute('color'));

  /* Semaforo inferior del eje Y (Calle Vertical) */


  circlesYA[activeLightYA].className = 'circle YA';
  activeLightYA++;

  if (activeLightYA === 2) {
    //for(let car of arrYA) {
      setTimeout(()=>{
        yaTop[i](arrYA[0], mu);
      },mu)
    //}
  }

  if(activeLightYA > 2) {
    activeLightYA = 0;
  }

  

  if (true) {}
  
  const currentLightYA = circlesYA[activeLightYA]
  
  currentLightYA.classList.add(currentLightYA.getAttribute('color'));

  /* Semaforo superior del eje Y (Calle Verical) */


  circlesYB[activeLightYB].className = 'circle YB';
  activeLightYB++;

  if (activeLightYB === 2) {
    for (let car of arrYB){
      setTimeout(()=>{
        ybBot[i](arrYB[0], mu);
      },mu)
    }
  }

  if(activeLightYB > 2) {
    activeLightYB = 0;
  }

  

  if (true) {}
  
  const currentLightYB = circlesYB[activeLightYB]
  
  currentLightYB.classList.add(currentLightYB.getAttribute('color'));


  setTimeout(() => {
    changeLight(lambda, mu);
  }, interval);

}

/* yaTop animaciones */
function yaTopGoLeft(elem,mu){
  $(elem).animate({top:'14vw',},mu * 0.35,null);

  $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(270deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({left:'-100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrYA.remove(elem);
    auxYA--  
  });
  
}

function yaTopGoCenter(elem, mu){
  $(elem).animate({top:'100vw',},mu,()=>{
  $(elem).remove();
    arrYA.remove(elem);
    auxYA--
  });
}

function yaTopGoRight(elem, mu){
  $(elem).animate({top:'58vh',},mu,null);
   $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(90deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({right:'-100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrYA.remove(elem);
    auxYA--
  });
 
}

/* ybBot animaciones */

function ybBotGoRight(elem, mu){
  $(elem).animate({bottom:'16vw',},mu * 0.35,null);

  $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(90deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({left:'100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrYB.remove(elem);
    auxYB--
  });
}


function ybBotGoCenter(elem, mu){
  $(elem).animate({bottom:'100vw',},mu,()=>{
  $(elem).remove();
    arrYB.remove(elem);
    auxYB--
  });
}


function ybBotGoLeft(elem, mu){
  $(elem).animate({bottom:'60vh',},mu * 0.35,null);
   $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(-90deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({right:'100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrYB.remove(elem);
    auxYB--
  });
 
}

/* xaRight animaciones */

function xaRightGoRight(elem, mu){
  $(elem).animate({right:'38vw',},mu * 0.35,null);

  $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(360deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({top:'-100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrXA.remove(elem);
    auxXA--
  });
}


function xaRightGoCenter(elem, mu){
  $(elem).animate({right:'120vw',},mu,()=>{
  $(elem).remove();
    arrXA.remove(elem);
    auxXA--
  });
}


function xaRightGoLeft(elem, mu){
  $(elem).animate({right:'58vw',},mu * 0.35,null);
   $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(180deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({top:'100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrXA.remove(elem);
    auxXA--
  });
 
}

/* xaRight animaciones */

function xbLeftGoLeft(elem, mu){
  $(elem).animate({left:'38vw',},mu * 0.35,null);

  $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(180deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({top:'100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrXB.remove(elem);
    auxXB--
  });
}



function xbLeftGoCenter(elem, mu){
  $(elem).animate({left:'120vw',},mu,()=>{
  $(elem).remove();
    arrXB.remove(elem);
    auxXB--
  });
}


function xbLeftGoRight(elem, mu){
  $(elem).animate({left:'58vw',},mu * 0.35,null);
   $(elem).animate({  textIndent: 0 }, {
      step: function(fx) {
        $(this).css({'transform':'rotate(0deg)','transition':'transform ' +mu * 0.20 / 1000+ 's ease'}); 
      }
  },'linear');

  $(elem).animate({top:'-100vw',},mu * 0.45,()=>{
  $(elem).remove();
    arrXB.remove(elem);
    auxXB--
  });
 
}

