import './App.css';
import {useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {
  const [nombre,setNombre] =useState("");
  const [edad,setEdad] =useState();
  const [pais,setPais] =useState("");
  const [cargo,setCargo] =useState("");
  const [anios,setAnios] =useState();
  const [id,setId] =useState();


  const [editar,setEditar] =useState(false);


  const [empleadosList,setEmpleados] = useState([]);

  const add =()=>{
    axios.post("http://localhost:3001/create", {
    nombre: nombre,
    edad: edad,
    pais: pais,
    cargo: cargo,
    anios: anios

    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Empleado registrado</strong>",
        html: "<i>EL empleado <strong>"+nombre+"</strong> fue registrado exitosamente</i>",
        icon:'success',
        timer:5000,
      })
    })
  };

  const update =()=>{
    axios.put("http://localhost:3001/update", {
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios

    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Se ha actualizado correctamente</strong>",
        html: "<i>EL empleado <strong>"+nombre+"</strong> fue Actualizado con exito</i>",
        icon:'success',
        timer:5000,
      })
    })
  };
//primera forma de eliminar "http://localhost:3001/delete/"+id
//con alt 96 se sacan ``

  const deleteEmpleado =(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Se ha actualizado correctamente</strong>",
        html: "<i>EL empleado <strong>"+nombre+"</strong> fue Actualizado con exito</i>",
        icon:'success',
        timer:5000,
      })
    })
  };

 const limpiarCampos= ()=>{
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);

 };
  const getEmpleados =()=>{
    axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    })
  };
  //para listar de una vez se puede descomentar lo siguiente
  //getEmpleados();

  const editarEmpleado=(val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);


  }

  return (
    <div className="container">
      
      <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input 
            onChange={(event) =>{
              setNombre(event.target.value);
            }} 
            type="text" className="form-control" value={nombre} placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Edad:</span>
            <input 
            onChange={(event) =>{
              setEdad(event.target.value);
            }} 
            type="number" className="form-control" value={edad} placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Pais:</span>
            <input 
            onChange={(event) =>{
              setPais(event.target.value);
            }} 
            type="text" className="form-control" value={pais} placeholder="Ingrese el país" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Cargo:</span>
            <input 
            onChange={(event) =>{
              setCargo(event.target.value);
            }} 
            type="text" className="form-control" value={cargo} placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Años de experiencia:</span>
            <input 
            onChange={(event) =>{
              setAnios(event.target.value);
            }} 
            type="number" className="form-control" value={anios} placeholder="Ingrese los años de experiencia" aria-label="Username" aria-describedby="basic-addon1"></input>
          </div>

          
        </div>
        <div className="card-footer text-muted">

            {
              editar?
              <div className=''>
              <button className="btn btn-warning m-2" onClick={update} >Actualizar</button >
              <button className="btn btn-info m-2" onClick={limpiarCampos} >Cancelar</button >
              </div>
              :
              <div className=''>
              <button className="btn btn-success" onClick={add} >Guardar</button >
              <button className='btn btn-secondary' id ="lista" onClick={getEmpleados}>Lista</button>
              </div>
            }
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Acciones</th>


          </tr>
        </thead>
        <tbody>

            {
            empleadosList.map((val,key)=>{
              //editar
              return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button 
                  onClick={()=>{
                    editarEmpleado(val);
                  }}
                  type="button" className="btn btn-info">Editar</button>
                  <button type="button" className="btn btn-danger">Eliminar</button>
                </div>
              </td>

            </tr>
            })
            }
        </tbody>
      </table>
    </div>
  );
}

export default App;
