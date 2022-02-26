import { FunctionComponent } from "react";

interface NoPlanetsPageProps {
    
}


 
const NoPlanetsPage: FunctionComponent<NoPlanetsPageProps> = (props) => {
    return ( 
        <>
            <div style={{height: '18vh'}}></div>
            <h2 className="typography-h2" style={{color: 'hsl(180, 2%, 92%)'}}>You currently have no planets in your wallet. <br/> Fear not! You can still play on some of the public planets!</h2>
            { props.children }
        </>
     );
}
 
export default NoPlanetsPage;