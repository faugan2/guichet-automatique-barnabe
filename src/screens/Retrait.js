import HeaderBack from "../components/HeaderBack";
import "../styles/retrait.scss";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useState,useEffect} from "react";
import {auth, db} from "../connexion_base";
import {useSelector,useDispatch} from "react-redux"
import { selectMe, selectMouvements } from "../features/counterSlice";
import firebase from "firebase";


const Retrait=()=>{
    const [alerte,set_alerte]=useState("");
    const [montant,set_montant]=useState("");
    const [solde,set_solde]=useState(0);
    const me=useSelector(selectMe);

    const valider_retrait=(e)=>{
        set_alerte("");
        if(montant== ""){
            set_alerte("Le montant est vide");
            return;
        }

        let m=parseFloat(montant);
        if(m>solde){
            set_alerte("Vous devez saisir un montant inférieur à "+solde);
            return;
        }
        const btn=e.target;
        btn.innerHTML="Patientez...";
        btn.disabled=true;

        const line={
            date:firebase.firestore.FieldValue.serverTimestamp(),
            email:me.email,
            client:me.nom,
            montant:"-"+m,
            user:me.key
        }
        

        db.collection("mouvements").add(line).then(()=>{
            set_montant("");
            set_alerte("Retrait bien effecuté");
            btn.disabled=false;
            btn.innerHTML="Valider";
        })
        .catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.innerHTML="Valider"
        })
       

        
    }

    const mouvements=useSelector(selectMouvements)
    useEffect(()=>{
        if(mouvements==null || mouvements==undefined) return;
        let total=0;
        for(var i=0; i<mouvements.length; i++){
           const m=parseFloat(mouvements[i].montant);
           total+=m;
        }
        set_solde(total);
    },[mouvements]);
    return(
        <div className="retrait">
            <HeaderBack title="Retrait" />
            <div className="body">
                <div className="top">
                    <MonetizationOnIcon style={{fontSize:"4rem"}} />
                    <p className="solde">{solde} CFA</p>
                    <p className="text_solde">Solde</p>
                </div>
                <div className="bottom">
                    <div className="line">
                        <label>Montant du retrait</label>
                        <div>
                            <input type="tel" placeholder="saisir le montant" 
                            value={montant} onChange={e=>set_montant(e.target.value)}
                            />
                            <AttachMoneyIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                        
                    </div>

                    <div className="line">
                        <button onClick={valider_retrait}>Valider</button>
                    </div>
                    
                    <div className="line">
                        <p>{alerte}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Retrait;