const Redux = require('redux')


console.clear();
// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: amount
        }
    }
}

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    }
}

const createClaim = (name, amount) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amount: amount
        }
    }
}

// (Action)
// Action is the form itself. So, the above step includes Action part too

// (Dispatch)
// Dispatch will be taken care by Redux itself by its own library

// (Reducers)
const claimHistory = (oldClaimList = [], action) => {
    if (action.type == 'CREATE_CLAIM') {
        return [...oldClaimList, action.payload]
    }
    return oldClaimList
}

const policyHistory = (oldPolicyList = [], action) => {
    if (action.type === 'CREATE_POLICY') {
        return [...oldPolicyList, action.payload.name]
    } else if (action.type === 'DELETE_POLICY') {
        return oldPolicyList.filter(name => name !== action.payload.name)
    }
    return oldPolicyList
}

const accounting = (money = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return money - action.payload.amount;
    }
    if (action.type === 'CREATE_POLICY') {
        return money + action.payload.amount;
    }
    return money;
}


// (State)

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
    accounting: accounting,
    claimHistory: claimHistory,
    policyHistory: policyHistory
})

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Ganesha', 100));
store.dispatch(createPolicy('Siva', 140));
store.dispatch(createPolicy('Karthikeya', 80));

store.dispatch(createClaim('Ganesha', 20))
store.dispatch(createClaim('Karthikeya', 30))

store.dispatch(deletePolicy('Siva'))
console.log(store.getState())