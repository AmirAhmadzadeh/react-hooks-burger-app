import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return ( 
        <div className={classes.Buildcontrol}>
           
           <div className={classes.Label}>{props.label}</div>
           <button className={classes.Less}
                   onClick={props.less}
                   disabled={props.disabled}
                   >less</button>
          
          
           <button className={classes.More} onClick={props.more}>more</button>
        </div>
     );
}
 
export default buildControl;