import "../styles/livre.scss";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
const Livre=({livre,click,show_all})=>{
    let description=livre.description;
    let new_description=description;
    if(description.length>100){
        new_description="";
        for(var i=0; i<100; i++){
            new_description+=description[i];
        }
    }
    return(
        <div className="livre" onClick={click}>
            <div className="zone1">
                <img src={livre.image} />
                <div>
                    {Math.round(Math.random()*2000)} CFA
                </div>
            </div>
            
            <div className="zone2">
                <h1>{livre.titre}</h1>
                {show_all==true? <p>{description}</p> : <p>{new_description}</p>}
            </div>

            {show_all !=true && <button>
                <ArrowRightAltIcon style={{color:"black",fontSize:"1.2rem"}} />
            </button>
            }
        </div>
    )
}

export default Livre;