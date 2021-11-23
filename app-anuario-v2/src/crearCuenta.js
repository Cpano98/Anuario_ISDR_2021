import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './crearCuenta.css';

function CrearCuenta() {
    //Inicialización (constructor)
    const [state,setState] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        contraseña: "",
        contraseñaConfirm: "",
        apodo: "",
        path_foto: ""
    });
    
    const [errorsState,setErrorState] = useState({
        nombresError: "",
        apellidosError: "",
        emailError: "",
        contraseñaError: "",
        contraseñaConfirmError: "",
        apodoError: "",
        path_fotoError: ""
    }); 

    const [status, setStatus] = useState({
        status: ""
    })
    
    //Consumiendo el servicio POST  
    const usuarioNuevo = async () =>{
         const respuesta = await fetch('http://18.234.222.26:8080/usuario/agregar',{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ...state
            })
        });
        //Imprimir lo que responde el servidor
      const data = await respuesta.json();
      console.log(data);
      if(data.status===400){
          setStatus({
              status: data.status
          })
          setErrorState({
            nombresError: data.errors.nombres ? data.errors.nombres.msg : "",
            apellidosError: data.errors.apellidos ? data.errors.apellidos.msg : "",
            emailError: data.errors.email ? data.errors.email.msg : "",
            contraseñaError: data.errors.contraseña ? data.errors.contraseña.msg : "",
            contraseñaConfirmError: data.errors.contraseñaConfirm ? data.errors.contraseñaConfirm.msg : "",
            apodoError: data.errors.apodo ? data.errors.apodo.msg : "",
            path_fotoError: data.errors.path_foto ? data.errors.path_foto.msg : ""
        });
      }else if(data.status === 201){
        setStatus({
            status: data.status
        })
        console.log(status);
        alert("Usuario creado con éxito");
        window.location.href="/AnuarioF";
      }
    };

    useEffect(() => {
        fetch('http://18.234.222.26:8080/usuarios')
        .then(res=>res.json())
          .then(datos=>{
            //console.log(datos)
            const usuarios=datos;
            //console.log(usuarios);
          })
          .catch(err=>{
            console.log("Servidor desconectado")
            console.log(err)
          }) 
    },[]);

    return (
        <div className="crearCuenta">

            <div className="row inicioSes ajuste2">

                <form action="AnuarioF" onSubmit={(e)=>{
                        e.preventDefault();
                    }}>
                    <h2 id="inicio">Crear mi cuenta</h2>
                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="text" onChange={(e)=>setState({...state, nombres:e.target.value})} className="form-control formatoIn" id="nombres" name="nombres" placeholder="Tu nombre" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.nombresError}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="text" onChange={(e)=>setState({...state, apellidos:e.target.value})} className="form-control formatoIn" id="apellidos" name="apellidos" placeholder="Tus apellidos" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.apellidosError}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="email" onChange={(e)=>setState({...state, email:e.target.value})} className="form-control formatoIn" id="email" name="email" placeholder="Correo electrónico" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.emailError}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="password" onChange={(e)=>setState({...state, contraseña:e.target.value})} className="form-control formatoIn" id="contraseña" name="contraseña" placeholder="Contraseña" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.contraseñaError}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="password" onChange={(e)=>setState({...state, contraseñaConfirm:e.target.value})} className="form-control formatoIn" id="contraseñaConfirm" name="contraseñaConfirm" placeholder="Confirma tu contraseña" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.contraseñaConfirmError}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <input type="text" onChange={(e)=>setState({...state, apodo:e.target.value})} className="form-control formatoIn" id="apodo" name="apodo" placeholder="Username" />
                        </div>
                        <div className="errors">
                            <p>{errorsState.apodoError}</p>
                        </div>
                    </div>
                    <h6>Sube tu foto de perfil</h6>
                    <div className="input-group mb-3">
                        <input type="file" onChange={(e)=>setState({...state, path_foto:e.target.value})} className="form-control" id="path_foto" name="path_foto" />
                    </div>
                    <div className="errors">
                            <p>{errorsState.path_fotoError}</p>
                    </div>


                    <button type="submit" onClick={usuarioNuevo} className="btn btn-primary" >Registrarme</button>
                </form>
            {/* <p>{usuarios}</p> */}
            </div>

        </div>
    )
}

export default CrearCuenta;
