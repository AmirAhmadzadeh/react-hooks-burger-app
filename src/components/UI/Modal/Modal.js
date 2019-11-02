import React, { useMemo } from 'react';
import classes from './Modal.css';
import Backdrop from './../../UI/Bsckdrop/BackDrop';



function Modal(props) {


    return (
        <React.Fragment>
            <Backdrop show={props.show}
                clicked={props.closeModal}
            />
            <div className={classes.Modal}
                style={
                    {
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }
                }
            >

                {useMemo(() => props.children, [props.show])}
                {/* {props.children} */}
            </div>



        </React.Fragment>

    );
}
// check this after 
export default React.useMemo(Modal , (prevProps , nextProps) => (nextProps.show === prevProps.show) || (nextProps.show === prevProps.show) );






