//  pure redux code
import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer={
  fullName:"",
  nationID:"",
  createAt:""

}

const ACCOUNT_DEPOSIT = "account/deposite";
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_DEPOSIT:
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state=initialStateCustomer,action){
  switch(action.type){
    case "customer/createCustomer":
      return {...state,fullName:action.payload.fullName,nationID:action.payload.nationID,createdAt:action.payload.createdAt}
    case "customer/updateName":
      return {...state,fullName:action.payload}
    default : return state
  }
}

const rootReducer=combineReducers({
  account:accountReducer,
  cutomer:customerReducer
})

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposite", payload: 500 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     loanPurpose: "Buy a car",
//   },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

function deposite(amount) {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      loanPurpose: purpose,
    },
  };
}

function payloan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposite(500));
console.log(store.getState());

store.dispatch(withdraw(100));
console.log(store.getState());

store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());

store.dispatch(payloan());
console.log(store.getState());

function createCustomer(fullName,nationID){
  return {
    type:"customer/createCustomer",payload:{
      fullName,
      nationID,
      createdAt:new Date().toISOString()
    }
  }
}

function updateName(fullName){
  return {type:"customer/updateName",payload:fullName}
}

store.dispatch(createCustomer("Aman","234533"));
store.dispatch(deposite(500));
console.log(store.getState());