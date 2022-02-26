import { FunctionComponent } from "react";
import SelectWalletButton from "../views/SelectWalletButton";

interface NotLoggedInScreenProps {
    
}
 
const NotLoggedInScreen: FunctionComponent<NotLoggedInScreenProps> = (props) => {
    return ( 
        <>
            <div style={{height: '18vh'}}></div>
            <h2 className="typography-h2" style={{color: 'hsl(180, 2%, 92%)'}}>You are not connected with your wallet!</h2>
            <p className="typography-h2"style={{color: 'hsl(180, 2%, 92%)'}} >Either connect your wallet to view your NFTs or play on some of our free planets</p>
            <SelectWalletButton style={{minWidth: '7em', marginLeft: 'auto', marginRight: 'auto'}}/>
            {props.children}
        </>
     );
}
 
export default NotLoggedInScreen;