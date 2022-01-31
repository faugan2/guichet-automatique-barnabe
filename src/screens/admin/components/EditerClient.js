import "../styles/ajouter_client.scss";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth, db} from "../../../connexion_base";
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import LockIcon from '@material-ui/icons/Lock';
import {useSelector} from "react-redux";
import {selectClient} from "../../../features/counterSlice";

const AjouterClient=()=>{
    const [alerte,set_alerte]=useState("");
    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [telephone,set_telephone]=useState("");
    const [password,set_password]=useState("");
    const client=useSelector(selectClient);

    useEffect(()=>{
        if(client==null) return;
        set_nom(client.nom);
        set_email(client.email);
        set_telephone(client.telephone);
        set_password(client.password);
    },[client])
    
    const editer_client=async(e)=>{
        set_alerte("");
        if(nom== ""){
            set_alerte("Le nom est vide");
            return;
        }
        if(email==""){
            set_alerte("L'email est vide");
            return;
        }
        if(telephone== ""){
            set_alerte("Le téléphone est vide");
            return;
        }
        if(password== ""){
            set_alerte("Le mot de passe est vide");
            return;
        }

        const btn=e.target;
        btn.innerHTML="Patientez...";
        btn.disabled=true;
        const user={nom,email,telephone,password};
        db.collection("clients").doc(client.key)
        .update(user,{merge:true})
        .then(()=>{
            set_alerte("Client bien edité");
            btn.disabled=false;
            btn.innerHTML="Editer";
           
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Editer";
            set_alerte(err.message);
        })

    }

    return (
        <div className="ajouter_client">
            <h2>Editer left client</h2>
            <div className="line">
                <label>Nom</label>
                <div>
                    <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" value={nom} onChange={e=>set_nom(e.target.value)}/>
                </div>
            </div>

            <div className="line">
                <label>Email</label>
                <div>
                    <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="email" 
                    value={email} onChange={e=>set_email(e.target.value)}
                    />
                </div>
            </div>

            <div className="line">
                <label>Téléphone</label>
                <div>
                    <CallIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="tel" 
                    value={telephone} onChange={e=>set_telephone(e.target.value)}
                    />
                </div>
            </div>

            <div className="line">
                <label>Mot de passe</label>
                <div>
                    <LockIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" 
                    value={password} onChange={e=>set_password(e.target.value)}
                    />
                </div>
            </div>

            <div className="line">
                <button onClick={editer_client}>Editer</button>
            </div>

            <div className="line">
                <p style={{
                    fontSize:"0.8rem",
                    textAlign:"center"
                }}>{alerte}</p>
            </div>

        </div>
    )
}

export default AjouterClient;