import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Forumulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  //guarda un objeto (lo que devuelve la api)
  const [resultado, guardarResultado] = useState({});
  //por si da error la api
  const [error,guardarError] = useState(false);
  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      
      if(consultar){
        
        const appId = 'f2dd9bc2c7c91acc3db0bcb8db6bb9e6';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //por si fallo la api
        if(resultado.cod === "404"){
          guardarError(true);
        }
        else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line

  }, [consultar]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado}/> 
  }


  return (
    <Fragment>
      <Header titulo="Clima" />

      <div className="contenedor-form">
        <div className="coontainer">
          <div className="row">
            <div className="col m6 s12">
              <Forumulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}/>
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
