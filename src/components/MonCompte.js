import "../styles/mon_compte.scss";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectMouvements} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";

const MonCompte=()=>{
    const navigate=useNavigate ();
    const [solde,set_solde]=useState(0);
    
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
        navigate("/retrait");
    }
    return (
        <div className="mon_compte">
            <div className="top">
                <MonetizationOnIcon style={{fontSize:"4rem"}} />
                <p className="solde">{solde} CFA</p>
                <p className="text_solde">Solde</p>
            </div>

            <div className="body">
                <div>
                    <h2>Voulez-vous effectuer un retrait ?</h2>
                    <button onClick={go_to_retrait}>
                        Faire un retrait maintenant
                    </button>
                </div>
               
            </div>
        </div>
    );
}
export default MonCompte;