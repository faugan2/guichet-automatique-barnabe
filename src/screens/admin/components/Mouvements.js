import "../styles/mouvements.scss";
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
   


    const [data,set_data]=useState([]);
    const [data_show,set_data_show]=useState([]);
    const [search,set_search]=useState("");
    useEffect(()=>{
        db.collection("mouvements").onSnapshot((snap)=>{
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
            return client.client.toLowerCase().indexOf(search.toLowerCase())>=0 || 
            client.email.toLowerCase().indexOf(search.toLowerCase())>=0 ||
            client.montant.indexOf(search)>=0;
        })

        set_data_show(res);
    },[search]);

    const delete_client=async (e,key)=>{
        await db.collection("mouvements").doc(key).delete();
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
                            <th width="15%" style={{textAlign:"left"}}>Date</th>
                            <th style={{textAlign:"left"}}>Client</th>
                            <th width="15%">Montant</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data_show.map((client,i)=>{
                               let d=client.str_date;
                               d=d.replace("GMT","");
                               d=d.split(",");
                               d=d[1];
                                return(
                                    <tr key={client.key}>
                                        <td align="center">{i+1}</td>
                                        <td>{d}</td>
                                        <td>{client.client}</td>
                                        <td align="center">{client.montant}</td>
                                        <td align="center">
                                            <div className="actions_btn">
                                                
                                                <button onClick={e=>delete_client(e,client.key)}>
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

            
        </div>
    )
}

export default Clients;