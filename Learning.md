# REDUX

-> 3rd party library to manager global state in web application
-> stand alone liberary,but easy to integrate with react apps using react-redux library
-> All golbal state is stored in on globally accessible store,which is easy to update using "action"(like useReducer)

> Global store is updated -> All consuming component re-render

> It's conceptually similar to using the Context API + useReducer

- You need to0 have a really good understanding for the useReducer hook in order to understand Redux
  -> Two versions
  - Classic Redux
  - Modern Redux toolkit

## DO YOU NEED TO LEARN REDUX

-> Historically, Reux was used in most React apps for all golbal state.Today, that has chnaged,because there are many alernatives.Many apps don't need redux anymore,unless they need a lot of global UI state

## THE MECHANISM OF THE USEREDUCER HOOK

- useReducer
  Event handler in component -> dispatch -> reducer(current state) -> next state -> re-render
- redux
  Event handler in component -> Action creator function(function creating actions) -> dispatch -> STORE(reducer, reducer ,...,Current State) -> next state -> re-render
  > Action creator function: to automate writing action.Helpful to keep all possible actions in one center place(This is convention not a must)

> All global state lives in this centralised container.it's the single source of truth of global state in the app

> Each reducer is a pure finction that calculate the next state(state transition) based on the action and the cirrent state.Usually one reducer per app feature

## WHAT IS REDUX MIDDLEWARE?

> Where to make an asynchronous API call (oor any other async operation in redux)
> STORE -> (No asynchronous operation, reducer needs to be pure function)

> Fetching data inside component is not ideal

# THUNK

Middleware: A Function that ist between dispatching the action and the store.Allows us to run code after dispatching ,but before reaching the reducer in the store

> Perfect for asynchronous code, API calls, timer loggins, side effects

- we use 3 rd party component in this case Thunk(most popular)

## What is Redux Toolkit(RTK)?

-> the morden and preferred way to of writing Redux Code
-> An opinionated approach,forcing us to use redux best practices
-> 100% compatible with "classic" Redux allowing us to use them together
-> Allows us to write a lot less code to achieve the same result

- We can write code that "mutates" state inside reducer(will be converted to immutable logic behind the scenes by "Immer" library)
- Action creators are automatically created
- Automatically setup of thunk middleware and DevTools

```
    import { configureStore } from "@reduxjs/toolkit";
```

> configure store function basically wraps around create store and adds a few fucntionalities to it,it will automatically combine our reducers,add the thunk middleware,setup developer tools

```
  import { createSlice } from "@reduxjs/toolkit";
```

> it'll automatically create action creators from our reducers.Second, it makes writing these reducers a lot easier because we no longer need that switch statement and also the default case is automatically handled.And third, we can actually mutate now,our state inside reducers.

## Redux vs Context API

### Context API + useReducer

-> built into react

-> East to set up a single context

-> Additional state "slide" requires new content set up from scrach("provider hell" in App.js)
-> No mechanism for asynch operation
-> performance opetimization is a pain
-> Only React DevTool

### When to use Context API + useReducer

-> Use Context API for global state management in small apps

- When you just need to share a value that doesnt change often(color theme,language authenticate user..)
- When you need toslve simple prop drilling problem
- when you need to manage state in a local sub-tree of the app
  > example in the compound component pattern

### Redux

-> Require additional packages(larger bundle size)
-> more work to set up initially
-> once set up,it is easy to create additional state "slices"
-> supporst middleware for async operations
-> performance is optimized out of box
-> Excellent DevTool

### When to use redux

-> use Redux for global state management in large apps

- When you have lots of global UI state that needs to be updated frequently(beacause redux is optimized for this){shopping cart,current atb,complex filters or search...}
- When you have complex state with nested objects and array(beacause you can mutate state with redux toolkit)
  > these are not super common in UI state
