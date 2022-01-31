import "../styles/resultat.scss";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectResultatDection,setResultatDetection,setEtape,setPiece,setVisage,setCode} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const TAUX=70;
const Resultat=()=>{
    const dispatch=useDispatch ();
    const navigate=useNavigate ();
    const [result,set_result]=useState(null);
    const r=useSelector(selectResultatDection);
    const [cl,set_cl]=useState("red");

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
        alert("going to validate")
    }
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
                            <input type="text" />
                            <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                    </div>

                    <div className="line">
                        <label>Votre email</label>
                        <div>
                            <input type="email" />
                            <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                        </div>
                    </div>

                    <div className="line">
                        <button className="submit" onClick={valider}>Validez l'achat</button>
                    </div>
                    <p>Ou</p>
                    <div className="line">
                        <button className="cancel" onClick={quitter}>Annuler</button>
                    </div>
               </div>
           }
        </div>
    );
}
export default Resultat;