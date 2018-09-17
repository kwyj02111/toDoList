import Home from '../components/Home';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as axiosService from '../services/axios/axios';
import * as userInfoService from '../services/userInfo/userInfo';
import { LoginURL } from '../services/axios/axiosUrl';


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

        const login = await axiosService.getData(url, param);

        if(login.data.data.code === 1){
            dispatch(actions.loginSuccess(id));

            let token = login.data.token;
            userInfoService.setUserToken(token);
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