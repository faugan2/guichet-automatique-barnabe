import "../styles/right.scss";
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectPage} from "../../../features/counterSlice";
import Clients from "./Clients";
import Mouvements from "./Mouvements";
import Utilisateurs from "./Utilisateurs";
import Livres from "./Livres";
const Right=()=>{
    const page=useSelector(selectPage);
    return (
        <div className="right">
            {page==1 && <Clients />}
            {page==2 && <Mouvements />}
            {page==3 && <Utilisateurs />}
            {page==4 && <Livres />}
        </div>
    )
}

export default Right;