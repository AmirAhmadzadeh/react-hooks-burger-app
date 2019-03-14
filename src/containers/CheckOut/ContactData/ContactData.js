import React, { Component } from 'react'
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../../store/actions/index';
import Input from './../../../components/UI/Input/Input';




class ContactData extends Component {

    state = {

        orderForm: {
            name: {

                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "please insert youre name here"
                },
                value: '',
                validation: false
            },

            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "please insert youre email here"
                },
                value: '',
                validation: false
            },

            address: {

                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "please insert youre address here"
                },
                value: '',
                validation: false
            },

            code: {

                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "please insert youre code  here"
                },
                value: '',
                validation: false
            },

            deliveryMethod: {

                elementType: "select",
                elementConfig: {
                    options: [{
                        value: "fastest"
                    }, {
                        value: "cheapest"
                    }]
                },
                value: 'fastest'
            }
        },
        disableSubmitButton: true

    }


    orderHandler = (event) => {
        event.preventDefault();

        const order = {
            ingredeints: this.props.ings,
            price: this.props.totalPrice,
            name: this.state.orderForm.name.value,
            address: this.state.orderForm.address.value,
            email: this.state.orderForm.email.value,
            costumer : this.props.user._id

        }
        this.props.orderCreatorHandler(order);
        this.props.history.push('/');
    }


    validationData = (value, target) => {

        // console.log(target, value);


        switch (target) {
            case "name":

                if (value.length > 3) {

                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = true;
                    newElemet.value = value;
                    newForm[target] = newElemet;
                    this.setState({ orderForm: newForm });
                    // console.log("name is okay ")
                } else {
                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = false;
                    newElemet.value = value;
                    newForm[target] = newElemet;
                    this.setState({ orderForm: newForm });
                }
                break;


            case "email":

                // regular expretion to check is email or not 
                const checkRegExp = true;


                if (value.length > 5 && checkRegExp) {

                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = true;
                    newElemet.value = value;
                    newForm[target] = newElemet;
                    this.setState({ orderForm: newForm });
                    // console.log("email is okay ")
                } else {
                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = false;
                    newElemet.value = value;
                    newForm[target] = newElemet;
                    this.setState({ orderForm: newForm });
                }
                break;

            case "address":
                if (value.length > 6) {
                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = true;
                    newElemet.value = value;

                    newForm[target] = newElemet;

                    this.setState({ orderForm: newForm });
                    // console.log("address is okay ")
                } else {
                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = false;
                    newElemet.value = value;
                    newForm[target] = newElemet;

                    this.setState({ orderForm: newForm });
                }
                break;

            case "code":
                // console.log(+value);
                if (+value && +value > 1000) {

                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = true;
                    newElemet.value = +value;
                    newForm[target] = newElemet;

                    this.setState({ orderForm: newForm });
                    // console.log("code is okay ")
                } else {
                    const newForm = { ...this.state.orderForm }
                    const newElemet = { ...newForm[target] }
                    newElemet.validation = false;
                    newElemet.value = +value;
                    newForm[target] = newElemet;

                    this.setState({ orderForm: newForm });
                    // console.log("code is not okay ")
                }
                break;

            default:
                break;
        }

        const { name, code, email, address } = this.state.orderForm;

        if (address.validation && code.validation && email.validation && name.validation) return true;

        return false;

    }
    inputChangedHandler = (event, target) => {

        const newForm = { ...this.state.orderForm }
        const newElemet = { ...newForm[target] };
        newElemet.value = event.target.value;
        newForm[target] = newElemet;
        this.setState({
            orderForm: newForm
        });


        const result = this.validationData(event.target.value, target);

        if (result) {

            this.setState({
                disableSubmitButton: false
            });

        } else {
            this.setState({
                disableSubmitButton: true
            });
        }
    }




    render() {

        let formElementsArray = [];

        for (const key in this.state.orderForm) {

            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
                , validation: this.state.orderForm[key].validation , 
                length: this.state.orderForm[key].value.length  
            });

        }

        let form = (

            <form>

                {formElementsArray.map(elm => {
                    return <Input
                        valid={elm.validation}
                        length= {elm.length}
                        key={elm.id}
                        elementConfig={elm.config.elementConfig}
                        elementType={elm.config.elementType}
                        value={elm.config.value}
                        changed={(event) => this.inputChangedHandler(event, elm.id)}
                    />
                })
                }
                <div className={classes.ButtonArea}>
                    <Button 
                        disabled={this.state.disableSubmitButton}
                        clicked={this.orderHandler}
                        btnType="Success"
                    >ORDER
                    </Button>

                </div>
            </form>

        );
        // if(this.state.loading) form = <Spinner /> ;
        return (

            <div>
                <div className={classes.ContactData}>

                    <h4 className={classes.headerForm}>please enter youre contact data</h4>

                    {this.props.error ? "an error occured please try again" : form}

                </div>
            </div>
        );
    }
}



const mapStatesToProps = state => {

    return {
        ings: state.burgerBuilder.ings,
        totalPrice: state.burgerBuilder.totalPrice,
        user : state.auth.user   
    }
}

const mapDispatchToProps = dispatch => {

    return {

        orderCreatorHandler: (data) => dispatch(actions.orederCreatorHandler(data))
    }
}


export default connect(mapStatesToProps, mapDispatchToProps)(withRouter(ContactData));
