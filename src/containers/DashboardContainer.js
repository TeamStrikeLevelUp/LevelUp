import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { receiveAuthState } from '../actions/index';

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
    mapDispatchToProps,
    null,
    {
        // https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
        pure: false
    }
)(Dashboard);