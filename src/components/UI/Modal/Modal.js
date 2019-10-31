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

export default Modal;

// class Modal extends Component {



//     shouldComponentUpdate(nextProps, nextStaet) {
//         return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
//     }


//     render() {
//         return (
//             <Aux>
//                 <Backdrop show={this.props.show}
//                     clicked={this.props.closeModal}
//                 />
//                 <div className={classes.Modal}
//                     style={
//                         {
//                             transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                             opacity: this.props.show ? '1' : '0'
//                         }
//                     }
//                 >
//                     {this.props.children}
//                 </div>



//             </Aux>

//         );
//     }

// }


