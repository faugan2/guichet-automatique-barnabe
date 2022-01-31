import "./styles/login.scss";
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useState,useEffect} from "react";
import { auth } from "../../connexion_base";
import { useNavigate  } from "react-router-dom";
const Login=()=>{
    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const [alerte,set_alerte]=useState("");
    const navigate=useNavigate ();
    const login=async (e)=>{
        const btn=e.target;
        if(email==""){
            set_alerte("L'adresse email est vide");
            return;
        }

        if(password==""){
            set_alerte("Le mot de passe est vide");
            return;
        }
        btn.disabled=true;
        btn.innerHTML="Patientez...";

         auth.signInWithEmailAndPassword(email,password)
         .then((user)=>{
            navigate("/admin-page");
         })
         .catch((err)=>{
             btn.disabled=false;
             btn.innerHTML="Se connecter";
             set_alerte(err.message);
         })

    }
    return(
        <div className="login">
            <div>
            <AccountCircleIcon  style={{fontSize:"3rem"}} />
             <h1>Administration</h1>
             
             <div className="line">
                 <label>Email</label>
                 <div>
                     <input type="email" placeholder="admin@gmail.com" value={email} onChange={e=>set_email(e.target.value)}/>
                     <EmailIcon  style={{color:"gray",fontSize:"1.2rem"}}/>
                 </div>
             </div>

             <div className="line">
                 <label>Mot de passe</label>
                 <div>
                     <input type="password" placeholder="votre mot de passe" value={password} onChange={e=>set_password(e.target.value)} />
                     <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                 </div>
             </div>
             
             <div className="line">
                 <button onClick={login}>Se connecter</button>
             </div>

             <div className="line">
                 <p style={{fontSize:"0.8rem",color:"indianred",alignSelf:"center"}}>{alerte}</p>
             </div>

            </div>
            
        </div>
    );
}
export default Login;