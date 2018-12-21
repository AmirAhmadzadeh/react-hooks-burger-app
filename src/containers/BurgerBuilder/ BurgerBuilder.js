import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerBuildController from '../../components/Burger/BuildBurgerControll/BuildBurgerControll';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummery from './../../components/Burger/Ordersummery/Ordersummery'
import axios   from './../../axios' ;
import Spinner from './../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
  salad : 0.4 ,
  bacon : 0.7 ,
  cheese :0.5 ,
  meat : 1.3 
};


class  BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ingredients :{
           salad : 0 ,
           bacon : 0 ,
           cheese: 0 ,
           meat  : 0
        },
        loading :false ,  
        totalPrice : 0,
        purchaseable:false,
        purchasing:false ,
        enrollerdRequest:false 
      
    }
  }

  updatePurchase = (ingredients) => {

     
      const sum  = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
      }).reduce((sum , el)=>{
            return sum + el ;
      },0) ;
     
      this.setState({
         purchaseable : sum > 0 
      });
  }


  moreHandeler = (type)=>{
        const ingredients = {...this.state.ingredients}
        ingredients[type] += 1 ;
        let totalPrice = this.state.totalPrice ;
        totalPrice += INGREDIENT_PRICES[type];
        this.setState({ingredients ,totalPrice});
        this.updatePurchase(ingredients);
  }
  lessHandeler = (type)=>{
        
        const ingredients = {...this.state.ingredients}
        if(ingredients[type]=== 0) return ;
        ingredients[type] -= 1 ;
        let totalPrice = this.state.totalPrice ;
        totalPrice -= INGREDIENT_PRICES[type];
        this.setState({ingredients,totalPrice});
        this.updatePurchase(ingredients);
  }  
 
  purchaseHandler = ()=>{

    this.setState({
        purchasing :true 
    }) ;
  }

  purchaseCancelHandler = () => {
     
      this.setState({
        purchasing:false 
      })
  }
  purchaseContinueHandler = () => {
        
      this.setState({ loading:true }) ;     

      const order = {
             ingredeints :this.state.ingredients , 
             price : this.state.totalPrice , 
             customer  : {
  
                  name : "amir" , 
                  addres : {
                    street : "test street 1" ,alley  : "test alley" , id : "1000"
                  },
                  email : "test@test.com"
             }        
          }  

        axios.post('/api/createOrder' ,{  order  })
                      .then(response => {
                
                        this.setState({ loading :false }); 
                  
                        this.setState({
                          enrollerdRequest : true  
                         })  ;

                         setTimeout(() => {
                          this.setState({purchasing :false }); 
                         }, 50000) ;
                    
                    
                  }).catch(err => {
                  
                    this.setState({loading : false}); 
                    if(err) console.log(`[ERROR in purchaseContinueHandler method in the BurgerBuilder handler ] `)
                    console.log(err); 
            }) ; 
  }
 

  render() {
    const disabledInfo ={
      ...this.state.ingredients
    };
    for(let item in disabledInfo) {
         disabledInfo[item] = disabledInfo[item] <= 0  ? true : false ;
    }
    let rolledMessage= null; 
    let ordersummary = <OrderSummery 
                          continueProcess={this.purchaseContinueHandler}
                          cancelProcess={this.purchaseCancelHandler}
                          ingrideints={this.state.ingredients} 
                          totalPrice ={this.state.totalPrice}
                      /> ; 
 
    if(this.state.loading) ordersummary = <Spinner /> ; 
    else if(this.state.enrollerdRequest) rolledMessage = <p>thanks for youre choice </p> ;
    return (
      <Aux>
         <Modal show={this.state.purchasing}
                closeModal={this.purchaseCancelHandler}
          >
        {ordersummary}
        {rolledMessage}
        </Modal>
        <Burger ingredients ={this.state.ingredients} />
        <BurgerBuildController 
                      less={ this.lessHandeler } 
                      more={ this.moreHandeler }
                      disabled = {disabledInfo}
                      price ={this.state.totalPrice}
                      purchaseable={this.state.purchaseable}
                      ordered ={this.purchaseHandler}   
                    />
      </Aux>
    )
  }
}



export default  BurgerBuilder ;