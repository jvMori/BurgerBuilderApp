import React from 'react';
import styles from '../../UI/Modal/Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';


const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} cancel={props.hideModal}/>
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            className={styles.Modal}>
            {props.children}
        </div>
    </Aux>
);

export default modal;