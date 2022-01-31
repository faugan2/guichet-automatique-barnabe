import "../styles/mouvement.scss";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
const Mouvement=({mouvement})=>{
    const client=mouvement.client;
    const email=mouvement.email;
    const montant=parseFloat(mouvement.montant);
    let date=new Date(mouvement.date?.seconds*1000).toUTCString();
    date=date.replace("GMT","");
    date=date.split(" ");
    date=date[1]+" "+date[2]+" "+date[3];

    let type="Dépot";
    let t=1;
    if(montant<0){
        type="Retrait";
        t=2;
    }
    return(
        <div className="mouvement">
            <div>
                {t==1 && <TrendingUpIcon style={{color:"green",}}/>}
                {t==2 && <TrendingDownIcon style={{color:"indianred",}} />}
            </div>
           <div>
               <p>Date</p>
               <p>{date}</p>
           </div>

           <div>
               <p>Montant</p>
               <p>{Math.abs(montant)}</p>
           </div>

           <div>
               <p>Type</p>
               <p>{type}</p>
           </div>
        </div>
    );
}

export default Mouvement;