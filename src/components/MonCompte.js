import "../styles/mon_compte.scss";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectMouvements,setTab} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";

const MonCompte=()=>{
    const navigate=useNavigate ();
    const [solde,set_solde]=useState(0);
    const dispatch=useDispatch ();
    
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

    const go_to_retrait=()=>{
        dispatch(setTab(0));
    }
    return (
        <div className="mon_compte">
             
                <div className="line">
                    <p>Vous n'avez acheté aucun livre.</p>
                    <p>Commencez une opération d'achat de livre maintenant.</p>

                    <button onClick={go_to_retrait}>
                        Continuez avec un retrait
                    </button>
                </div>
            
        </div>
    );
}
export default MonCompte;