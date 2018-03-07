import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Meat" , type: 'meat' },
    { label: "Cheese" , type: 'cheese' },
    { label: "Salad" , type: 'salad' },
    { label: "Bacon" , type: 'bacon' }
];

const buildControls = (props) => {
    
    return (
        <div className={styles.BuildControls}>
            <p>Total price: {props.price.toFixed(2)}</p>
            {
                controls.map(ctrl => {
                    return <BuildControl
                        added={() => props.ingredientAdded(ctrl.type)}
                        key={ctrl.label}
                        label={ctrl.label}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabledEl={props.disabled[ctrl.type]}

                    />
                })
            }
            <button
                onClick={props.clicked}
                className={styles.OrderButton}
                disabled={!props.purchasable}
            >ORDER NOW</button>
        </div>
    )
}

export default buildControls;