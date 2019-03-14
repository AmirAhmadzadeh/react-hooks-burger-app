
import React from 'react' ;
import Logo from './../../Logo/Logo';
import NavItems from './../NavItems/NavItems';
import classes from './sideDrawer.css' ;
import BackDrop from './../../UI/Bsckdrop/BackDrop';
import Aux from './../../../hoc/Aux';

const sideDrawer = (props) => {
  
    const cssStyles = [] ;

    if(props.show){
          cssStyles.push(classes.sideDrawer) ;
         // cssStyles.push(classes.hide) ;
          cssStyles.push(classes.Open) ;
    }else{
        cssStyles.push(classes.sideDrawer) ;
   //     cssStyles.push(classes.hide) ;
        cssStyles.push(classes.Close);
    }
     

   return ( 
   
       <Aux >
            <BackDrop show={props.show} clicked={props.clicked}/>
         
              <div className={cssStyles.join(' ')} onClick={props.clicked}>
              
                  <div className={classes.Logo}>
                    <Logo />    
                  </div>
                  <nav>
                    <NavItems  />    
                  </nav>
            </div>
       </Aux>
    );
}
 
export default sideDrawer;