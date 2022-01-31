import "../styles/clients.scss";
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Modal from "./Modal";
import {useState,useEffect} from "react";
import AjouterClient from "./AjouterClient";
import {auth, db} from "../../../connexion_base";
import EditIcon from '@material-ui/icons/Edit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import EditerClient from "./EditerClient";
import {useDispatch} from "react-redux";
import {setClient, setLivre} from "../../../features/counterSlice";
import CompteClient from "./CompteClient";
import AjouterLivre from "./AjouterLivre";
import {matieres} from "../data";
import EditerLivre from "./EditerLivre";

const Clients=()=>{
    const dispatch=useDispatch ();
    const [open,set_open]=useState(false);
    const [open_edit,set_open_edit]=useState(false);
    const [open_compte,set_open_compte]=useState(false);

    const close_modal=()=>{
        set_open(false);
        set_open_edit(false);
        set_open_compte(false);
    }


    const [data,set_data]=useState([]);
    const [data_show,set_data_show]=useState([]);
    const [search,set_search]=useState("");
    useEffect(()=>{
        db.collection("barnabe_livres").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                data.key=key;
                const date=new Date(data.date?.seconds*1000).toUTCString();
                data.str_date=date;
                d.push(data);
            })

            set_data(d);
            set_data_show(d);
        })
    },[])


    useEffect(()=>{
        if(search== ""){
            set_data_show(data);
            return;
        }
        const res=data_show.filter((client)=>{
            return client.nom.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            client.email.toLowerCase().indexOf(search.toLowerCase())>=0 ||
            client.telephone.indexOf(search)>=0;
        })

        set_data_show(res);
    },[search]);

    const delete_client=async (e,key)=>{
        await db.collection("barnabe_livres").doc(key).delete();
    }

    const handle_open_edit=(client)=>{
       dispatch(setLivre(client))
        set_open_edit(true);

    }

    const handle_open_compte=(client)=>{
        dispatch(setClient(client));
        set_open_compte(true);
    }
    return(
        <div className="clients">
            <div className="head">
                <div>
                    <div>
                        <SearchIcon style={{color:"gray",fontSize:"1.2rem"}} />
                        <input type="text" placeholder="Rechercher" value={search} onChange={e=>set_search(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button onClick={e=>set_open(true)}>
                        <PersonAddIcon style={{color:"gray",fontSize:"1.2rem"}} />
                        Ajouter</button>
                </div>
            </div>
            <div className="body">
                <table width="100%" border={1}>
                    <thead>
                        <tr>
                            <th width="5%">N°</th>

                            <th style={{textAlign:"left"}} width="10%">Matière</th>
                            <th style={{textAlign:"left"}} width="15%" >Titre</th>
                            <th width="10%" >Prix</th>
                            <th width="15%">Image</th>
                            <th style={{textAlign:"left"}}>Description</th>
                            
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data_show.map((livre,i)=>{
                               
                                const id_matiere=livre.matiere;
                                const matiere=matieres.filter((m)=>{
                                    return m.id==id_matiere;
                                })[0].nom;
                                const titre=livre.titre;
                                const description=livre.description;
                                const image=livre.image;
                                return(
                                    <tr key={livre.key}>
                                        <td align="center">{i+1}</td>
                                        <td>{matiere}</td>
                                        <td>{titre}</td>
                                        <td>{livre.prix}</td>
                                        <td align="center">
                                            <img src={image} style={{width:25,height:25,resize:"contain"}}/>
                                        </td>
                                        <td>{description}</td>
                                        <td align="center">
                                            <div className="actions_btn">
                                                <button onClick={handle_open_edit.bind(this,livre)}>
                                                    <EditIcon style={{color:"blue",fontSize:"1.2rem"}} />
                                                </button>
                                                {/*<button onClick={handle_open_compte.bind(this,client)}>
                                                    <AttachMoneyIcon style={{color:"green",fontSize:"1.2rem"}} />
                                                </button>*/}
                                                <button onClick={e=>delete_client(e,livre.key)}>
                                                    <DeleteIcon style={{color:"indianred",fontSize:"1.2rem"}}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            {open==true && <Modal 
                content={<AjouterLivre />} 
                click={close_modal}
                width={300}
                />
            }

            {open_edit==true && <Modal 
                content={<EditerLivre />} 
                click={close_modal}
                width={300}
                />
            }

            {open_compte==true && <Modal 
                content={<CompteClient />} 
                click={close_modal}
                width={300}
                />
            }
        </div>
    )
}

export default Clients;