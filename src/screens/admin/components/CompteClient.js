import "../styles/compte_client.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectClient} from "../../../features/counterSlice";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {auth, db} from "../../../connexion_base"
import firebase from "firebase";
const CompteClient=()=>{
    const client=useSelector(selectClient);
    const [solde,set_solde]=useState(0);
    const [depot,set_depot]=useState("");
    const [alerte,set_alerte]=useState("");
    useEffect(()=>{
        const key=client.key;
       db.collection("mouvements").where("user","==",key).onSnapshot((snap)=>{
           let d=0;
           snap.docs.map((doc)=>{
               const id=doc.id;
               const montant=parseFloat(doc.data().montant);
               d+=montant;
           })
           set_solde(d);
       })
    },[client]);

    const make_depot=async(e)=>{
        set_alerte("");
        if(depot== "" || depot==0){
            set_alerte("Vous n'avez saisie aucun montant");
            return;
        }
        const line={montant:depot,user:client.key,date:firebase.firestore.FieldValue.serverTimestamp(),
            client:client.nom,email:client.email};
        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        
        await db.collection("mouvements").add(line).then(()=>{
            btn.disabled=false;
            btn.innerHTML="Valider";
            set_depot("");
            set_alerte("Dépot bien effectué");

        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Valider";
            set_alerte(err.message);
        })
    }
    return(
        <div className="compte_client">
            <div className="top">
                <AccountCircleIcon style={{color:"black",fontSize:"3rem"}} />
                <h2>{client.nom}</h2>
                <h3>{solde} FCFA</h3>
            </div>

            <div className="body">
                <div className="line">
                    <label>Effectuer un dépot</label>
                    <div>
                        <input type="number" placeholder="500" value={depot}  onChange={e=>set_depot(e.target.value)}/>
                        <AttachMoneyIcon />
                    </div>
                </div>

                <div className="line">
                    <button onClick={make_depot}>Valider</button>
                </div>

                <div className="line">
                    <p>{alerte}</p>
                </div>
            </div>
           
        </div>
    )
}

export default CompteClient;