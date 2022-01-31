import "../styles/resultat.scss";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectResultatDection,setResultatDetection,setEtape,setPiece,setVisage,setCode, selectLivre, selectPiece, selectVisage, selectTelephone} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import {db} from "../connexion_base";
import firebase from "firebase";
const TAUX=70;
const Resultat=()=>{
    const dispatch=useDispatch ();
    const navigate=useNavigate ();
    const [result,set_result]=useState(null);
    const r=useSelector(selectResultatDection);
    const [cl,set_cl]=useState("red");
    const livre=useSelector (selectLivre);
    const piece=useSelector(selectPiece);
    const visage=useSelector(selectVisage);
    const telephone=useSelector (selectTelephone);

    useEffect(()=>{
        if(r==null) return;
        const res=(r.toFixed(2))*100
        if(res>=TAUX){
            set_cl("green")
        }else{
            set_cl("red")
        }
        set_result(res);
    },[r]);

    const reprendre=()=>{
        dispatch(setEtape(3))
        dispatch(setPiece(null));
        dispatch(setVisage(null));
        dispatch(setResultatDetection(null));
    }

    const quitter=()=>{
        dispatch(setEtape(1))
        dispatch(setPiece(null));
        dispatch(setVisage(null));
        dispatch(setResultatDetection(null));
        dispatch(setCode(null))
        navigate("/home");
    }

    const valider=async (e)=>{
        set_alerte("");
        if(nom== ""){
            set_alerte("Le nom est vide");
            return;
        }

        if(email==""){
            set_alerte("L'email est vide");
            return;
        }

        const btn=e.target;

        const achat={
            nom,
            email,
            telephone,
            result,
            livre,
            piece,
            visage,
            date:firebase.firestore.FieldValue.serverTimestamp()
        }

        set_alerte("Patientez...");
        btn.disabled=true;
        db.collection("barnabe_achat").add(achat).then(()=>{
            btn.disabled=false;
            set_alerte("Achat bien effectué");
            setTimeout(()=>{
                set_alerte("");
                quitter();
            },2000) 
        }).catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            setTimeout(()=>{
                set_alerte("");
            },5000) 

        })

       


    }

    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [alerte,set_alerte]=useState("");



    return(
        <div className="resultat">
           <div className="top">
               <p className={cl}>{result}%</p>
               <p>Pourcentage de resemblance</p>
           </div>

           {
               result<TAUX && <div className="echec">
                        <p>&#128532;</p>
                        <p>Le pourcentage de resemblance doit être au moins de {TAUX} % pour valider votre achat</p>

                        <div>
                            <button onClick={reprendre}>Reprendre</button>
                            <label>Ou</label>
                            <button onClick={quitter}>Quitter</button>
                        </div>
                   </div>
           }

           {
               result>=TAUX && 
               <div className="success">
                   <p>&#128516;</p>
                   <p>Bravo !!!</p>
                   <p>Veuillez completez vos informations pour valider l'achat</p>

                   <div className="line">
                        <label>Votre nom</label>
                        <div>
                            <input type="text"
                             value={nom} onChange={e=>set_nom(e.target.value)}
                            />
                            <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                    </div>

                    <div className="line">
                        <label>Votre email</label>
                        <div>
                            <input type="email"
                            value={email} onChange={e=>set_email(e.target.value)}
                            />
                            <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                    </div>

                    <div className="line">
                        <button className="submit" onClick={valider}>Validez l'achat</button>
                    </div>
                    <div className="ou">Ou</div>
                    <div className="line">
                        <button className="cancel" onClick={quitter}>Annuler</button>
                    </div>

                    <div className="line">
                        {alerte}
                    </div>
               </div>
           }
        </div>
    );
}
export default Resultat;