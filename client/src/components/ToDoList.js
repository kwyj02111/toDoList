import React, {Component} from 'react';
import * as axiosService from '../services/axios/axios';
import * as userInfoService from '../services/userInfo/userInfo';
import { getListURL } from '../services/axios/axiosUrl';

class ToDoList extends Component {

    constructor(props) {
        super();

        this.state = {
            axios : false,
            list : [],
        }
    }

    fetchTodoList = async () => {
        this.setState({
            axios: true
        });

        try {
            // wait for promises
            let url = getListURL;
            let token = userInfoService.getLocalStorage('aslover-token');
            let param = {
                page : 0,
                size : 100,
                token : token
            }

            const todoList = await axiosService.getData(url, param);

            this.setState({
                axios: false,
                list: todoList.data.data
            });

        } catch(e) {
            // if err, stop at this point
            this.setState({
                axios: false
            });
            console.log(e);
        }
    }

    componentDidMount() {
        this.fetchTodoList();
    }

    render() {
        return (
            <div>
            TodoList!!!
            </div>
        );
    }

};

export default ToDoList;