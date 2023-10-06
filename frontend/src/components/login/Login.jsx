import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './style.css'

const Login = () => {
    const [isLoading, setLoading] = useState(true);
    const [clases, setclases] = useState('');
    const [conceccionarios, setConceccionarios] = useState([]);
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    let history = useHistory();
    if(isLoading){
    async function fetchData(){
        try {
            axios.get(`http://localhost:3309/api/conceccionarios/all`)
            .then((response)=>{
                setConceccionarios(response.data.conceccionarios)
                setLoading(false)
            });
        } catch (error) {
            console.error(error," algo anda mal -_-");
        }
    }fetchData()}
    
    const sendLogin = ()=>{
        console.log({
            email,
            contrasena
        });
        axios.post(`http://localhost:3309/api/login`,
            {
                Email: email,
                NumeroId: contrasena
            })
            .then((response)=>{
              if(response){ 
                document.cookie = (`tokenX=${response.data.token}`);
                history.push('/productos')
              }
              else {console.warn("El api no funshion ;V")}
              console.log(response);
          }).catch(function (error) {
            console.log(error);
            if(error.response.data.errors === Array){
                alert(error.response.data.errors.map((e)=>e.msg))
            }else {
                alert(error.response.data.message)
            }
          })
    }

    return (
        <div className="body">
            <h2>Bienvenido...</h2>
            <div className={clases} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Crear Cuenta</h1>
                        <div className="social-container">
                        </div>
                        <span>Registrate con tu email</span>
                        <input type="text" placeholder="Nombre" required />
                        <input type="email" placeholder="Email" required />
                        <input type="number" placeholder="Telefono" required />
                        <input type="password" placeholder="Contraseña" required />
                        <input type="text" placeholder="Cargo" required />
                        <span>Selecciona el conceccionario</span>
                        <select>
                            {conceccionarios.map((e)=>(
                                <option value={e._id}>{e.Nombre}</option>
                            ))}
                        </select>
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Iniciar Sesion</h1>
                        <div className="social-container">
                        </div>
                        <span>Ingresa a tu cuenta</span>
                        <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" placeholder="Contraseña" required onChange={(e)=>setContrasena(e.target.value)}/>
                        <button onClick={()=>sendLogin()} >Ingresar</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Registro!</h1>
                            <p>
                            Ingresa los siguientes datos para crear tu cuenta
                            </p>
                            <button className="ghost" id="signIn" onClick={()=>setclases('')}>
                                Ya tienes Cuenta?
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, My Friend!</h1>
                            <p>
                                No tienes cuenta? 
                                Registrate...
                            </p>
                            <button className="ghost" id="signUp" onClick={()=>setclases('right-panel-active')}>
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>
                    Created with <i className="fa fa-heart"></i> Alejandro
                </p>
            </footer>
        </div>
    );
};
export default Login;
