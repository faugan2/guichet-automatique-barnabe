import "../styles/etape5.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectPiece,selectVisage} from "../features/counterSlice";

const Etape5=()=>{
    const [piece,set_piece]=useState(null);
    const [visage,set_visage]=useState(null);
    const p=useSelector(selectPiece);
    const v=useSelector(selectVisage);

    useEffect(()=>{
        console.log("la piece est ",p);
        set_piece(p);
    },[p]);
    useEffect(()=>{
        console.log("le visage est ",v);
        set_visage(v);
    },[v]);
    return (
        <div className="etape5">
            <div className="piece">
                {piece!=null && <img src={piece}/>}
            </div>
            <div className="visage">
                {visage!=null && <img src={visage}/>}
            </div>
            
        </div>
    )
}
export default Etape5;