import LockIcon from '@material-ui/icons/Lock';
import "../styles/modifier_mp.scss";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {useState,useEffect} from "react";
import { useSelector,useDispatch} from "react-redux";
import {selectMe} from "../features/counterSlice";
import {auth, db} from "../connexion_base";

const ModifierMp=()=>{
    const [mp1,set_mp1]=useState("");
    const [mp2,set_mp2]=useState("");
    const [mp3,set_mp3]=useState("");

    const [show_mp1,set_show_mp1]=useState(false);
    const [show_mp2,set_show_mp2]=useState(false);
    const [show_mp3,set_show_mp3]=useState(false);

    const me=useSelector(selectMe);

    useEffect(()=>{
        if(show_mp1==true){
            document.querySelector("#mp1").type="text";
        }else{
            document.querySelector("#mp1").type="password";
        }


        if(show_mp2==true){
            document.querySelector("#mp2").type="text";
        }else{
            document.querySelector("#mp2").type="password";
        }

        if(show_mp3==true){
            document.querySelector("#mp3").type="text";
        }else{
            document.querySelector("#mp3").type="password";
        }

    },[show_mp1,show_mp2,show_mp3])

    const [alerte,set_alerte]=useState("");
    const changer_pw=(e)=>{
        set_alerte("");
        if(mp1==""){
            set_alerte("L'ancien mot de passe n'est pas saisie");
            return;
        }
        if(mp2==""){
            set_alerte("Le nouveau mot de passe n'est pas saisie");
            return;
        }
        if(mp3==""){
            set_alerte("Confirmez le mot de passe");
            return;
        }

        if(mp2!=mp3){
            set_alerte("Mot de passe non conforme");
            return;
        }
        const pw=me.password;
        if(mp1!=pw){
            set_alerte("Votre ancien mot de passe est erronné");
            return;
        }

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        db.collection("clients").doc(me.key).update({password:mp2},{merge:true}).then(()=>{
            auth.currentUser.updateProfile({
                password:mp2
            }).then(()=>{
                btn.disabled=false;
                btn.innerHTML="Changez";
                set_alerte("Mot de passe bien modifier");
                
            }).catch((err)=>{
                btn.disabled=false;
                btn.innerHTML="Changez";
                set_alerte(err.message);
            })
        }).catch((err)=>{
            btn.disabled=false;
            btn.innerHTML="Changez";
            set_alerte(err.message);
        })

        
       


    }
    return(
        <div className="modifier_mp">
            <div className="line">
                <label>Ancien mot de passe</label>
                <div>
                    <input type="password" placeholder="votre ancien mot de passe"  id="mp1"
                    value={mp1} onChange={e=>set_mp1(e.target.value)}
                    />
                    <button onClick={e=>set_show_mp1(!show_mp1)}>
                        {show_mp1==false && <VisibilityIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                        {show_mp1==true && <VisibilityOffIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                    </button>
                    
                </div>
            </div>

            <div className="line">
                <label>Nouveau mot de passe</label>
                <div>
                    <input type="password" placeholder="votre nouveau mot de passe"  id="mp2"
                    value={mp2} onChange={e=>set_mp2(e.target.value)}
                    />
                    <button onClick={e=>set_show_mp2(!show_mp2)}>
                        {show_mp2==false && <VisibilityIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                        {show_mp2==true && <VisibilityOffIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                    </button>
                </div>
            </div>

            <div className="line">
                <label>Confirmez le  mot de passe</label>
                <div>
                    <input type="password" placeholder="Confirmation"  id="mp3"
                    value={mp3} onChange={e=>set_mp3(e.target.value)}
                    />
                    <button onClick={e=>set_show_mp3(!show_mp3)}>
                        {show_mp3==false && <VisibilityIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                        {show_mp3==true && <VisibilityOffIcon style={{color:"gray",fontSize:"1.2rem"}}/>}
                    </button>
                </div>
            </div>

            <div className="line">
                <button onClick={changer_pw}>Changez</button>
            </div>

            <div className="line">
                <p>{alerte}</p>
            </div>
        </div>
    )
}

export default ModifierMp;