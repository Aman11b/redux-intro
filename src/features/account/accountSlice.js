// Reducer action creators and initial state and then export them in store
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

const ACCOUNT_DEPOSIT = "account/deposite";
export function deposite(amount, currency) {
  if (currency === "USD") return { type: ACCOUNT_DEPOSIT, payload: amount };

  return async function (dispatch, getState) {
    // API call
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=${currency}&quotes=USD`,
    );
    const data = await res.json();
    console.log(data);
    // find rate
    const rate = data[0].rate;
    const converted = amount * rate;

    // return action
    dispatch({ type: ACCOUNT_DEPOSIT, payload: converted });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case ACCOUNT_DEPOSIT:
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// export function deposite(amount, currency) {
//   if (currency === "USD") return { type: ACCOUNT_DEPOSIT, payload: amount };

//   return async function (dispatch, getState) {
//     // API call
//     dispatch({ type: "account/convertingCurrency" });

//     const res = await fetch(
//       `https://api.frankfurter.dev/v2/rates?base=${currency}&quotes=USD`,
//     );
//     const data = await res.json();

//     // find rate
//     const rate = data[0].rate;
//     const converted = amount * rate;

//     // return action
//     dispatch({ type: ACCOUNT_DEPOSIT, payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: {
//       amount: amount,
//       loanPurpose: purpose,
//     },
//   };
// }

// export function payloan() {
//   return { type: "account/payLoan" };
// }

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
