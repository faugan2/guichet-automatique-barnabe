import {auth,db} from "../connexion_base";
import {useState,useEffect} from "react";
import "../styles/actions.scss";
import retrait from "./img/retrait.png";
import consulter from "./img/consulter.png";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import mouvement from "./img/mouvement.png";
import profil from "./img/profil.jpg";
import {useDispatch,useSelector} from "react-redux";
import {setTab,selectMe, setMatiere} from "../features/counterSlice";
import {useNavigate} from "react-router-dom";
import {matieres} from "../screens/admin/data";
const Actions=()=>{
    const dispatch=useDispatch ();
    const navigate=useNavigate ();
    const [user,set_user]=useState(null);
    const me=useSelector(selectMe);
   
    

    const go_to_matiere=(matiere)=>{
        dispatch(setMatiere(matiere))
        navigate("/Livres");
    }
    return (
        <div className="actions">
            <div className="top">
                <h1>Bonjour, </h1>
                <p>Quel livre souhaitez-vous acheter ?</p>
            </div>

            <div className="body">
                <div className="line">
                    {matieres.map((m,i)=>{
                        return(
                            <button onClick={go_to_matiere.bind(this,m)} key={i}>
                            {<img src={m.image} />}
                            {m.nom}
                            <div>
                                <ArrowRightAltIcon />
                            </div>
                            </button>
                        );
                    })}
                   
                   
                </div>

                
            </div>
            
        </div>
    );
}
export default Actions;