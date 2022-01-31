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
import {setClient} from "../../../features/counterSlice";
import CompteClient from "./CompteClient";

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
        db.collection("barnabe_achat").onSnapshot((snap)=>{
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
        await db.collection("barnabe_achat").doc(key).delete();
    }

    const handle_open_edit=(client)=>{
       dispatch(setClient(client))
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
                    {/*<button onClick={e=>set_open(true)}>
                        <PersonAddIcon style={{color:"gray",fontSize:"1.2rem"}} />
    Ajouter</button>*/}
                </div>
            </div>
            <div className="body">
                <table width="100%" border={1}>
                    <thead>
                        <tr>
                            <th width="5%">N°</th>
                            <th width="10%">Date</th>
                            <th style={{textAlign:"left"}}>Nom</th>
                            <th style={{textAlign:"left"}}>Email</th>
                            <th width="15%" style={{textAlign:"left"}}>Téléphone</th>
                            <th width="10%">Piece</th>
                            <th width="10%">Visage</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data_show.map((client,i)=>{
                                const nom=client.nom;
                                const email=client.email;
                                const telephone=client.telephone;
                                let date=new Date(client.date?.seconds*1000).toUTCString();
                                date=date.split(" ");
                                date=date[1]+" "+date[2]+" "+date[3];
                                return(
                                    <tr key={client.key}>

                                        <td align="center">{i+1}</td>
                                        <td align="center">{date}</td>
                                        <td>{nom}</td>
                                        <td>{email}</td>
                                        <td>{telephone}</td>
                                        <td>
                                            <button>
                                                <img src={client.piece} style={{width:"60px",height:"60px"}} />
                                            </button>
                                        </td>
                                        <td>
                                            <button>
                                                <img src={client.visage} style={{width:"60px",height:"60px"}} />
                                            </button>
                                        </td>
                                        <td align="center">
                                            <div className="actions_btn">
                                               
                                                <button onClick={e=>delete_client(e,client.key)} style={{width:"15px"}}>
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
                content={<AjouterClient />} 
                click={close_modal}
                width={300}
                />
            }

            {open_edit==true && <Modal 
                content={<EditerClient />} 
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