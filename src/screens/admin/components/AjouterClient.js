import "../styles/ajouter_client.scss";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth, db} from "../../../connexion_base";
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import LockIcon from '@material-ui/icons/Lock';
const AjouterClient=()=>{
    const [alerte,set_alerte]=useState("");
    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [telephone,set_telephone]=useState("");
    const [password,set_password]=useState("");
    
    const create_user=async(e)=>{
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
        const client={nom,email,telephone,password,date:firebase.firestore.FieldValue.serverTimestamp(),nouveau:true};
        db.collection("clients").add(client).then(()=>{
            set_alerte("Client bien ajouté");
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_nom("");
            set_email("");
            set_telephone("");
            set_password("");
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Ajouter";
            set_alerte(err.message);
        })

    }

    return (
        <div className="ajouter_client">
            <h2>Ajouter un client</h2>
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
                <button onClick={create_user}>Ajouter</button>
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