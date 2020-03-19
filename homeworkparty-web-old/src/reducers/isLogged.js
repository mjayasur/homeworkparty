const isLogged = (state = false, action) => {
    switch (action.type) {
        case "LOG": 
            console.log(!state)
            return !state;

        default:
            return state;
    }
}
export default isLogged;