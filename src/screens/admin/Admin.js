import { useEffect, useState} from "react";
import {auth, db} from "../../connexion_base";
import "./styles/admin.scss";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { useNavigate  } from "react-router-dom";


const Admin=()=>{
    const navigate=useNavigate ();
    useEffect(()=>{
       auth.onAuthStateChanged((user)=>{
           if(user==null){
                navigate("/admin-login");
           }else{
               navigate("/admin-page")
           }
       })
    },[auth])
    return(
        <div className="admin">
            <div>
                <HourglassEmptyIcon style={{color:"gray",fontSize:"1.2rem"}}/> 
                <label>Chargement...</label>
            </div>
           
        </div>
    );
}
export default Admin;