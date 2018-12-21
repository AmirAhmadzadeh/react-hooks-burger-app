import React ,{Component} from 'react'
import Aux from '../../../hoc/Aux';
import Button from './../../UI/Button/Button';


class OrderSummery extends Component {


        render(){

            const ingrideintsSummery =  Object.keys(this.props.ingrideints).map(igkey =>{
                return <li key={igkey}> <span>{igkey}</span>:{this.props.ingrideints[igkey]}</li>
            });
            return (  
                <Aux>
                    <h3>
                        youre Order
                    </h3>
                    <p>delicious burger with this ingredeints :</p>
                    <ul>
                        {ingrideintsSummery}
                    </ul>
                    <p>
                        countinue to check out ?
                    </p>
                     <p>
                         total price:<strong> {this.props.totalPrice.toFixed(2)} $ </strong>
                     </p>
        
                    <Button btnType="Danger"  clicked = {this.props.cancelProcess}> Cancel</Button>
                    <Button btnType="Success" clicked = {this.props.continueProcess}> Continue</Button>
                </Aux>
            );
        }



} 
 
export default OrderSummery;