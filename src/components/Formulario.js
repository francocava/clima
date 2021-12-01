import React, {useState} from "react";
import Error from "./Error";

const Forumulario = ({busqueda,guardarBusqueda, guardarConsultar}) => {


  
  const {ciudad, pais} = busqueda;
  const [error, guardarError] = useState(false);

  const handleChange = e => {
      guardarBusqueda({
          ...busqueda,
          [e.target.name] : e.target.value
      });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(ciudad.trim() ==='' || pais.trim() === '' ) {
      guardarError(true);
      return;
    }

    guardarError(false);

    guardarConsultar(true);

  }


  return (
    <form
      onSubmit={handleSubmit}
    >
      {error ? <Error mensaje="Completar"/> : null}
      <div className="input-field col s12">
        <input type="text" 
            name="ciudad" 
            id="ciudad" 
            value={ciudad}
            onChange={handleChange} 
            />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <select 
            name="pais" 
            id="pais" 
            value={pais}
            onChange={handleChange}
            >
          <option value="">Elegir</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">Pais: </label>
      </div>
      <div className="input-field col s12">
        <input type="submit" value="Buscar Clima" className="waves-effect waves-light btn-large btn-block yellow accent-4">
        </input>
      </div>
    </form>
  );
};

export default Forumulario;
