
import "./styles/page.scss";
import Left from "./components/Left";
import Right from "./components/Right";
const Page=()=>{
   
    return(
        <div className="page">
            <div className="left">
                <Left />
            </div>
            <div className="right">
                <Right />
            </div>
        </div>
    );
}

export default Page;