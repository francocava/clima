import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Forumulario from "./components/Formulario";
import Clima from "./components/Clima";

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);
  //guarda un objeto (lo que devuelve la api)
  const [resultado, guardarResultado] = useState({});
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
      }
    }
    consultarAPI();
  }, [consultar]);

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
              <Clima
              resultado={resultado}/>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
