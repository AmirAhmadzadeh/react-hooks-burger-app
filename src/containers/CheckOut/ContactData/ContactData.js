import React, { Component } from 'react'
import Aux from './../../../hoc/Aux';
import Button from './../../../components/UI/Button/Button' ; 
import classes from './ContactData.css' ;



class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            code: ''
        }
    }


    render() {
        return (
            <Aux>
                <h4>please enter youre contact data</h4>
                <from className={classes.ContactData}>
                
                        <label>youre name</label>
                        <input type="text" placeholder="enter name" name="name" />
           

              
                        <label>youre email</label>
                        <input type="email" placeholder="enter name" name="email" />
               

              
                        <h5>youre address</h5>

                        <label>youre street</label>
                        <input type="text" placeholder="enter street" name="street" />


                        <label>youre code</label>
                        <input type="text" placeholder="enter code" name="code" />

            
                        <Button>purchase</Button>   
      
                </from>
            </Aux>
        )
    }
}


export default ContactData;
