import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const mapStateToProps = reduxState => {
    return {
        // user: reduxState.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);