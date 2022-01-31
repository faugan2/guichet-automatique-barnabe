import "../styles/profile.scss";
import HeaderBack from "../components/HeaderBack";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {auth,db,storage} from "../connexion_base";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {selectMe} from "../features/counterSlice";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';

import Modal from "./admin/components/Modal";
import ModifierMp from "../components/ModifierMP";
const Profile=()=>{
    const [sending_file,set_sending_file]=useState(false);
    const pick_photo=()=>{
        document.querySelector("#file").click();
    }

    const me=useSelector(selectMe);

    const photo_changed=(e)=>{
        const files=e.target.files;
        if(files.length==0){
            alert("Aucune photo n'est choisie");
            return;
        }

        let file=files[0];
        const name=file.name;
        const ref=storage.ref("images/"+name);
        set_sending_file(true);
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url)=>{
                db.collection("clients").doc(me.key).update({photo:url},{merge:true}).then(()=>{
                    set_sending_file(false);
                }).catch((err)=>{
                    set_sending_file(false);
                })
            })
            
        }).catch((err)=>{
            console.log(err);
            set_sending_file(false);
        })
    }

    const [alerte,set_alerte]=useState("");
    const [nom,set_nom]=useState("");
    const [email,set_email]=useState("");
    const [telephone,set_telephone]=useState("");

    useEffect(()=>{
        if(me==null) return;
        set_nom(me.nom);
        set_email(me.email);
        set_telephone(me.telephone);
    },[me])
    const modifier=(e)=>{
        set_alerte("");
        
        if(nom==""){
            set_alerte("Le nom est vide");
            return;
        }

        if(email==""){
            set_alerte("L'email est vide");
            return;
        }
        if(telephone== ""){
            set_alerte("Le telephone est vide");
            return;
        }

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";

        const info={nom,email,telephone};
        db.collection("clients").doc(me.key).update(info,{merge:true}).then(()=>{
            set_alerte("Mise à jour bien effectuée");
            btn.disabled=false;
            btn.innerHTML="Modifier";

            setTimeout(()=>{
                set_alerte("");
            },3000)
        }).catch((err)=>{
            set_alerte(err.message);
            btn.disabled=false;
            btn.innerHTML="Modifier";
        })
    }

    const changer_mot_de_passe=()=>{
        set_open(true)
    }

    const [open,set_open]=useState(false);
    const close_modal=()=>{
        set_open(false);
    }
    return(
        <div className="profile">
            <HeaderBack title="Mon profil" />
            <div className="body">
                <div className="photo" onClick={pick_photo}>
                    <button>
                            {me?.photo==undefined && <AccountCircleIcon style={{fontSize:"8rem"}} />}
                            {me?.photo!=undefined && <img src={me?.photo} style={{
                                width:"100px",
                                height:"100px",
                                borderRadius:"50%",
                                objectFit:"cover",
                            }} /> }
                    </button>

                    <div>
                        <CameraAltIcon />
                    </div>

                    
                </div>

                <div style={{
                    display:"flex",
                    alignItems:"center",
                    flexDirection:"column",
                }}>
                          {sending_file == true && <CircularProgress />}

                <input type="file" id="file" style={{opacity:0}} accept="image/*" onChange={photo_changed}/>
                    
                </div>

                <div className="line">
                    <label>Nom</label>
                    <div>
                        <input type="text" 
                        value={nom}
                        id="nom"
                        onChange={e=>set_nom(e.target.value)}
                        />
                        <AssignmentIndIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    </div>
                </div>

                <div className="line">
                    <label>Email</label>
                    <div>
                        <input type="email"
                        value={email}
                        onChange={e=>set_email(e.target.value)}
                        id="email"
                        />
                        <EmailIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    </div>
                </div>

                <div className="line">
                    <label>Téléphone</label>
                    <div>
                        <input type="tel" 
                        value={telephone}
                        id="telephone"
                        onChange={e=>set_telephone(e.target.value)}
                        />
                        <CallIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    </div>
                </div>

                <div className="line">
                    <button onClick={modifier}>Modifier</button>
                </div>

                <div className="line">
                    <p>{alerte}</p>
                </div>

                
                <div className="line2">
                    <button onClick={changer_mot_de_passe}>Changer votre mot de passe ?</button>
                </div>


               {open==true &&  <Modal 
                    open={true}
                    content={<ModifierMp />}
                    width={200}
                    click={close_modal}
                />
               }
            </div>
        </div>
    );
}

export default Profile;