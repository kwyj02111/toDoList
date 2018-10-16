import React, {Component} from 'react';
import * as axiosService from '../services/axios/axios';
import * as userInfoService from '../services/userInfo/userInfo';
import { getListURL } from '../services/axios/axiosUrl';
import '../assets/css/toDoList.css';

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
            <div className="todolist-container">
                <div className="todolist-area">
                    <div className="todolist-input-box">
                        <input
                            className="todolist-input"
                            type="text"
                            placeholder="+ add ToDoList"
                        />

                        <button className="todolist-add-btn">
                            <i className="todolist-add-btn-icon material-icons">playlist_add</i>
                        </button>
                    </div>

                    <ul className="todolist-item-box">
                        {this.state.list.map(item =>
                            <li key={item.NO}
                                className="todolist-item"
                            >
                                <button className="todolist-item-check-btn">
                                    {item.IS_COMPLETE > 0 ?
                                        <i className="todolist-item-check-icon material-icons">done</i> : ''
                                    }
                                </button>

                                <div className={item.IS_COMPLETE > 0 ? 'todolist-item-content done' : 'todolist-item-content'}>
                                    {item.CONTENT}
                                </div>

                                <button className="todolist-item-menu-btn">
                                    <i className="todolist-item-menu-icon material-icons">more_vert</i>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
};

export default ToDoList;