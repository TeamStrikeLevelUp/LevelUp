function authState(reduxState = null, action) {
    switch (action.type) {
        case "RECEIVE_AUTHSTATE":
            return action.payload;

        default:
            return reduxState;
    }
}

export default authState;
