import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    meat: 1.4,
    cheese: 0.6,
    salad: 0.5,
    bacon: 1.1
}


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                meat: 0,
                cheese: 0,
                salad: 0,
                bacon: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce ((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1;
       const updatedIngredients = {
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;

       const priceAddition = INGREDIENTS_PRICE[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;

       this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
       });

       this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
       
        let newPrice = this.state.totalPrice;

        if (this.state.ingredients[type] > 0){
            newPrice -= INGREDIENTS_PRICE[type];
            updatedIngredients[type]--;
        }
       
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => (
        this.setState({purchasing: false})
    );

    purchaseContinueHandler = () => (
        alert('purchased')
    );

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (const item in disabledInfo) {
            disabledInfo[item] = disabledInfo[item] <= 0
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} hideModal={this.purchaseCancelHandler}>
                    <OrderSummary 
                        price = {this.state.totalPrice}
                        purchaseContinued = {this.purchaseContinueHandler}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    clicked = {this.purchaseHandler}
                    price = {this.state.totalPrice}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;