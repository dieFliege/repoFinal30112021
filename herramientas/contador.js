function contarCuantos(menu, menues){
    let veces = 0;
    for(let i = 0; i < menues.length; i++){
        if(menues[i] === menu) veces++;
    }
    return veces;
}