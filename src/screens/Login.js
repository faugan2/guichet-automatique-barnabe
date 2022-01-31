import "../styles/login.scss";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {useState,useEffect} from "react";
import {auth, db} from "../connexion_base";
import {useNavigate} from "react-router-dom";
const Login=()=>{
    const [alerte,set_alerte]=useState("");
    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const navigate=useNavigate ();
    const login=async(e)=>{
        set_alerte("");
        const btn=e.target;
        if(email==""){
            set_alerte("L'email est vide");
            return;
        }
        if(password== ""){
            set_alerte("Le mot de passe est vide");
            return;
        }
        
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        db.collection("clients")
        .where("email","==",email)
        .where("password","==",password)
        .get()
        .then((snap)=>{
            if(snap.docs.length>0){
                const user=snap.docs[0];
                const key=user.id;
                const user_data=user.data();

                if(user_data.nouveau==true){
                    //create account;
                    auth.createUserWithEmailAndPassword(email,password).then(async(user)=>{
                        
                        await user.user.updateProfile({
                            displayName:user_data.nom,
                        })
                        await db.collection("clients").doc(key).update({nouveau:false},{merge:true})
                        navigate("/home");
                    }).catch((err)=>{
                        set_alerte(err.message);
                        btn.disabled=false;
                        btn.innerHTML="Se connecter";
                    })
                }else{
                    //signup only;
                    auth.signInWithEmailAndPassword(email,password).then((user)=>{
                        
                        navigate("/home");
                    }).catch((err)=>{
                        set_alerte(err.message);
                        btn.disabled=false;
                        btn.innerHTML="Se connecter";
                    })
                }
                

            }else{
                set_alerte("Vos informations de connexion sont erronées");
                btn.disabled=false;
                btn.innerHTML="Se connecter";
            }
        })
        .catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.innerHTML="Se connecter";
        })

    }
    return(
        <div className="login_client">
            <div className="top">
                <h1>Connectez-vous</h1>
                <div className="line">
                    <label>Email</label>
                    <div>
                        <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/> 
                        <input type="email" placeholder="example@gmail.com" 
                        value={email} onChange={e=>set_email(e.target.value)}/>
                    </div>
                </div>

                <div className="line">
                    <label>Mot de passe</label>
                    <div>
                        <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/> 
                        <input type="password" placeholder="votre mot de passe" 
                        value={password} onChange={e=>set_password(e.target.value)}/>
                    </div>
                </div>

                <div className="line" onClick={login}>
                    <button>Se connecter</button>
                </div>
                
                <div className="line">
                    <p>{alerte}</p>
                </div>

            </div>
            <div className="footer">
                <input type="checkbox" readOnly />
                <button>
                    Conditions générales d'utilisation
                </button>
            </div>
        </div>
    );
}

export default Login;