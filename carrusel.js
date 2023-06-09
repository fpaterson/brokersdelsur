const pista = document.querySelector('.carrusel__pista');
const diapositivas = Array.from(pista.children);
const botonAdelante = document.querySelector('.carrusel__boton--derecha');
const botonAtras = document.querySelector('.carrusel__boton--izquierda');
const puntosNav = document.querySelector('.carrusel__nav');
const puntos = Array.from(puntosNav.children);

const anchoDiapos = diapositivas[0].getBoundingClientRect().width;


//pone a las diapositivas una junto a la otra
const fijarPosicionDiapo = (diapo, index) => {
    diapo.style.left = anchoDiapos * index + 'px';
};

diapositivas.forEach(fijarPosicionDiapo);


//misma función para el botón adelante y atrás, sólo cambia el target
const moverADiapo = (pista, diapoActual, targetDiapo) => {
    pista.style.transform = 'translateX(-' + targetDiapo.style.left + ')';
    diapoActual.classList.remove('diapo-actual');
    targetDiapo.classList.add('diapo-actual');
}

const actualizarPuntos = (puntoActual, targetPunto) => {
    puntoActual.classList.remove('diapo-actual');
    targetPunto.classList.add('diapo-actual');
}

const controlarFlechas = (diapositivas, botonAtras, botonAdelante, targetIndice) =>{
    if (targetIndice === 0) {
        botonAtras.classList.add('is-hidden');
        botonAdelante.classList.remove('is-hidden');
    }
    else if (targetIndice === diapositivas.length -1) {//porque es un array hay que -1
        botonAtras.classList.remove('is-hidden');
        botonAdelante.classList.add('is-hidden');    
    }
    else {
        botonAdelante.classList.remove('is-hidden');
        botonAtras.classList.remove('is-hidden');
    }
}

//cuando clickeo hacia la izquierda se mueve la diapositiva hacia allá
botonAtras.addEventListener('click', e => {
    const diapoActual = pista.querySelector('.diapo-actual');
    const anteriorDiapo = diapoActual.previousElementSibling;
    const puntoActual = puntosNav.querySelector('.diapo-actual');
    const previoBoton = puntoActual.previousElementSibling;
    const anteriorIndice = diapositivas.findIndex(diapositiva => diapositiva === anteriorDiapo);
    
    
    moverADiapo(pista, diapoActual, anteriorDiapo);
    actualizarPuntos(puntoActual, previoBoton);
    controlarFlechas(diapositivas, botonAtras, botonAdelante, anteriorIndice);
})


//cuando clickeo hacia la derecha se mueve la diapositiva hacia allá
botonAdelante.addEventListener('click', e => {
    const diapoActual = pista.querySelector('.diapo-actual');
    const proximaDiapo = diapoActual.nextElementSibling;
    const puntoActual = puntosNav.querySelector('.diapo-actual');
    const proximoBoton = puntoActual.nextElementSibling;
    const proximoIndice = diapositivas.findIndex(diapositiva => diapositiva === proximaDiapo);

    //moverse a la proxima diapo
    moverADiapo(pista, diapoActual, proximaDiapo);
    actualizarPuntos(puntoActual, proximoBoton);
    controlarFlechas(diapositivas, botonAtras, botonAdelante, proximoIndice);
})

//cuando se clickea en un punto del nav, se mueve a esa diapo
puntosNav.addEventListener('click', e => {
    //qué punto fue clickeado
    const targetPunto = e.target.closest('button');

    if (!targetPunto) return;
 
    const diapoActual = pista.querySelector('.diapo-actual');
    const puntoActual = puntosNav.querySelector('.diapo-actual');
    const targetIndice = puntos.findIndex(dot => dot === targetPunto);
    const targetDiapo = diapositivas[targetIndice];

    moverADiapo(pista, diapoActual, targetDiapo);
    actualizarPuntos(puntoActual, targetPunto);
    controlarFlechas(diapositivas, botonAtras, botonAdelante, targetIndice);

})

    








