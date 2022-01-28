const api="https://hp-api.herokuapp.com/api/characters"

console.log(api)
var resultado=document.querySelector(".searchbar")
var boton=$(".searchbarButton")
var cardsection1=document.createElement("section")
var cardsection2=document.createElement("section")
cardsection1.classList.add("resultscard")
cardsection2.classList.add("resultscard2")
var mibaraja=[]
$.get(api,function(response,status) {
    if (status==="success") {
        function busqueda(buscar) {

            document.querySelector(".harryapp").appendChild(cardsection1)
            cardsection1.innerHTML=""
            cardsection2.innerHTML=""
            let cuenta=0
            for (personaje of response) {
                if (personaje.name.toUpperCase().includes(buscar)) {
                    if (personaje.image!="") {
                        if (cuenta<=5) {
                            cardsection1.innerHTML+=`<div class=character> <img class=characterimg src=${personaje.image}></img><p class=charactername>${personaje.name}</p> <button value="${personaje.name}" class=characterbutton>Add me</button></div>` 
                            cuenta++
                        } else {
                            document.querySelector(".harryapp").appendChild(cardsection2)
                            cardsection2.innerHTML+=`<div class=character> <img class=characterimg src=${personaje.image}></img><p class=charactername>${personaje.name}</p> <button value="${personaje.name}" class=characterbutton>Add me</button></div>` 
                        }
                    }
                    else if (cuenta<=5) {
                        cardsection1.innerHTML+=`<div class=character> <img class=characterimg src="./img/desconocida.png"></img><p class=charactername>${personaje.name}</p><button value="${personaje.name}"  class=characterbutton>Add me</button></div>` 
                        cuenta++
                    } else {
                        document.querySelector(".harryapp").appendChild(cardsection2)
                        cardsection2.innerHTML+=`<div class=character> <img class=characterimg src="./img/desconocida.png"></img><p class=charactername>${personaje.name}</p><button value="${personaje.name}"  class=characterbutton>Add me</button></div>` 
                    }
                }
            }
            habilitarbotones()
         }


        function mazo(nombre) {
            alert("me apretaste")
            if (mibaraja.length>=0 && mibaraja.length<=6) {
                for (personaje of response) {
                   if (personaje.name.toUpperCase()===nombre) {
                       mibaraja.push(personaje)
                       alert("personaje agregado")
                       console.log(mibaraja)
                       break
                   }
                }
            }
        }

        //! ALGO ASI DEBERIA HACER AL SELECCIONAR GUITARRAS
        function habilitarbotones(){
            var botonmazo=document.getElementsByClassName("characterbutton")
            for (boton of botonmazo) {
                let valor=boton.value
                boton.addEventListener("click",()=> mazo(valor.toUpperCase()))
                console.log(boton.value)
            }
        }

        console.log(response)
      boton.click(()=>busqueda(resultado.value.toUpperCase()))

      /* for (i=0;i<=response.length;i++){
        if (response[i].alive==false) {
            console.log("esta vivo")
             $(".character").append(`${response[i].name}<br><img src=${response[i].image}></img>`)
          }
      } */
      }   
    })

