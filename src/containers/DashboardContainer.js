import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { receiveAuthState } from '../actions/index';

console.log("receiveAuthState", receiveAuthState)

const mapStateToProps = reduxState => {
    return {
        userAuthState: reduxState.authState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setAuthState: user => dispatch(receiveAuthState(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);