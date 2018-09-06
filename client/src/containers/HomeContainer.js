import Home from '../components/Home';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as service from '../services/axios';
import { LoginURL } from '../services/axiosUrl';


const mapStateToProps = (state) => ({
    loginState: state.loginState,
});

const mapDispatchToProps = (dispatch) => ({
    loginClick: async (id, pwd) => {
        if(typeof id === 'undefined' || typeof pwd === 'undefined'){
            return;
        }

        let url = LoginURL;
        var param = {
            USER_ID : id,
            USER_PASSWORD : pwd,
            USE_TIME : 1
        };

        const login = await service.getData(url, param);

        if(login.data.data.code === 1){
            dispatch(actions.loginSuccess(id));
        }else{
            alert(login.data.data.msg);
        }
    },

});


const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


export default HomeContainer;