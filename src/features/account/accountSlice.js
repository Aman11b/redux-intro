// Reducer action creators and initial state and then export them in store 

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
  };
  
const ACCOUNT_DEPOSIT = "account/deposite";

export default function accountReducer(state = initialStateAccount, action) {
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


export function deposite(amount) {
    return { type: ACCOUNT_DEPOSIT, payload: amount };
  }
  
  export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
  }
  
  export function requestLoan(amount, purpose) {
    return {
      type: "account/requestLoan",
      payload: {
        amount: amount,
        loanPurpose: purpose,
      },
    };
  }
  
  export function payloan() {
    return { type: "account/payLoan" };
  }


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
