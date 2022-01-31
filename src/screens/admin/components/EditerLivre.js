import "../styles/ajouter_client.scss";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useState,useEffect} from "react";
import firebase from "firebase";
import {auth, db,storage} from "../../../connexion_base";
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import LockIcon from '@material-ui/icons/Lock';
import {matieres} from "../data";
import { selectLivre } from "../../../features/counterSlice";
import { useSelector } from "react-redux";

const AjouterClient=()=>{
    const [alerte,set_alerte]=useState("");
    const [matiere,set_matiere]=useState("0");
    const [titre,set_titre]=useState("");
    const [file,set_file]=useState(null);
    const [description,set_description]=useState("");
    const [img,set_img]=useState(null);
    const [prix,set_prix]=useState("");

    const livre=useSelector(selectLivre)

    useEffect(()=>{
        if(livre==null) return;
        set_matiere(livre.matiere);
        set_titre(livre.titre);
        set_description(livre.description);
        set_img(livre.image);
        set_prix(livre.prix);
        
    },[livre]);
    
    const create_user=async(e)=>{
        set_alerte("");
        if(matiere== "0"){
            set_alerte("Vous devez choisir une matière");
            return;
        }
        if(titre== ""){
            set_alerte("Vous devez saisir un titre");
            return;
        }

        if(prix== ""){
            set_alerte("Vous devez saisir un prix");
            return;
        }
        
        if(description==""){
            set_alerte("Vous devez saisir une description");
            return;
        }

        const btn=e.target;
        btn.disabled=true;
        btn.innerHTML="Patientez...";
        //upload image 
        if(file!=null){
            const filename=file.name;
            const ref=storage.ref("images/"+filename);
            ref.put(file).then(()=>{
                ref.getDownloadURL().then((url)=>{
                    const obj={prix,matiere,titre,image:url,description};
                    db.collection("barnabe_livres").doc(livre.key)
                    .update(obj,{merge:true}).then(()=>{
                        set_alerte("Livre bien modifié");
                        btn.disabled=false;
                        btn.innerHTML="Modifier";
                        
                    }).catch((err)=>{
                        set_alerte(err.message);
                        btn.disabled=false;
                        btn.innerHTML="Modifier";
                    })
                }).catch((err)=>{
                    set_alerte(err.message);
                    btn.disabled=false;
                    btn.innerHTML="Modifier";
                })
            }).catch((err)=>{
                set_alerte(err.message);
                btn.disabled=false;
                btn.innerHTML="Modifier";
            })
        }else{
            const obj={prix,matiere,titre,description};
            db.collection("barnabe_livres").doc(livre.key).update(obj,{merge:true}).then(()=>{
                set_alerte("Livre bien modifié");
                btn.disabled=false;
                btn.innerHTML="Modifier";
                
            }).catch((err)=>{
                set_alerte(err.message);
                btn.disabled=false;
                btn.innerHTML="Modifier"; 
            })
        }
       
        

    }

    const image_changed=(e)=>{
        const files=e.target.files;
        if(files.length==0) return;
        set_file(files[0]);
    }

    return (
        <div className="ajouter_client">
            <h2>Editer un livre</h2>
            <div className="line">
                <label>Matière</label>
                <div>
                    <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <select value={matiere} onChange={e=>set_matiere(e.target.value)}>
                    <option value="0">Choisir une matière</option>
                        {
                            matieres.map((m)=>{
                                return <option value={m.id}>{m.nom}</option>
                            })
                        }
                        
                        
                    </select>
                </div>
            </div>
            <div className="line">
                <label>Titre du livre</label>
                <div>
                    <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" value={titre} onChange={e=>set_titre(e.target.value)}/>
                </div>
            </div>

            <div className="line">
                <label>Prix du livre</label>
                <div>
                    <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <input type="text" value={prix} onChange={e=>set_prix(e.target.value)}/>
                </div>
            </div>

            <div className="line">
                <label>Image du livre</label>
                <div>
                    <input type="file" onChange={image_changed}  accept="image/*"/>
                </div>
            </div>
            <div className="line">
                <img src={img} style={{width:50,height:50,resize:"contain",}}/>
            </div>

            <div className="line">
                <label>Description du livre</label>
                <div>
                    <AccountBoxIcon style={{color:"gray",fontSize:"1.2rem"}}/>
                    <textarea value={description} onChange={e=>set_description(e.target.value)} />
                </div>
            </div>

            

            

            

            <div className="line">
                <button onClick={create_user}>Modifier</button>
            </div>

            <div className="line">
                <p style={{
                    fontSize:"0.8rem",
                    textAlign:"center"
                }}>{alerte}</p>
            </div>

        </div>
    )
}

export default AjouterClient;