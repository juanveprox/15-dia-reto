const monedaUno = document.getElementById("moneda__uno")
const monedaDos = document.getElementById("moneda__dos");
const cantidaUno = document.getElementById("cantidad__uno");
const cantidaDos = document.getElementById("cantidad__dos");
const tazaBtn = document.getElementById("taza");
const cambioEl = document.getElementById("cambio");


function calcular (){
    const valorMonedaUno = monedaUno.value;
    const valorMonedaDos = monedaDos.value;

    fetch(`https://v6.exchangerate-api.com/v6/9691e059a3211a7e77b928f6/latest/${valorMonedaUno}`)
    .then(res => res.json())
    .then(data => {
        const taza = data.conversion_rates[valorMonedaDos];
        
        cambioEl.innerHTML = `1 ${valorMonedaUno} = ${taza} ${valorMonedaDos}`

        cantidaDos.value = (cantidaUno.value * taza).toFixed(2);
    })
}


monedaUno.addEventListener("change",calcular);
cantidaUno.addEventListener("input",calcular);
monedaDos.addEventListener("change",calcular);
cantidaUno.addEventListener("input",calcular);


tazaBtn.addEventListener("click",()=>{
    const arb = monedaUno.value;
    monedaUno.value = monedaDos.value;
    monedaDos.value = arb;
    calcular()
})

calcular()