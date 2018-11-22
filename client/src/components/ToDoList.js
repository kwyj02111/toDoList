import React, {Component} from 'react';
import * as axiosService from '../services/axios/axios';
import * as userInfoService from '../services/userInfo/userInfo';
import { getListURL, addListURL, updateStateURL, updateListURL } from '../services/axios/axiosUrl';
import { findIndex, each } from 'underscore';
import '../assets/css/toDoList.css';

class ToDoList extends Component {

    constructor(props) {
        super();

        this.state = {
            axios : false,
            list : [],
            addTodoValue : '',
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

            if(token === undefined){
                return;
            }

            let param = {
                page : 0,
                size : 100,
                token : token
            }

            const todoList = await axiosService.getData(url, param);

            each(todoList.data.data, (data) =>{
                data['edit'] = false;
                data['editContent'] = '';
            });

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

    addTodoList = async () => {

        if(this.state.addTodoValue === ''){
            alert('값을 입력해 주세요.');
            return;
        }

        try {
            // wait for promises
            let url = addListURL;
            let token = userInfoService.getLocalStorage('aslover-token');
            let param = {
                contents : this.state.addTodoValue,
                token : token
            }

            const addTodoList = await axiosService.postData(url, param);

            if(addTodoList.data.result !== 1){

                alert('error!');
                this.setState({
                    addTodoValue: '',
                });
                return;
            }

            this.setState({
                addTodoValue: '',
            });

            this.fetchTodoList();

        } catch(e) {
            // if err, stop at this point
            console.log(e);
        }
    }

    updateTodoListState = async (item, type) => {
        if(item === undefined){
            return;
        }

        if(type !== 'edit' && type !== 'remove'){
            return;
        }

        let complete = 0;

        if(type === 'edit' && item.IS_COMPLETE === 0){
            complete = 1;
        }

        if(type === 'remove'){
            complete = 3;
        }

        try {
            // wait for promises
            let url = updateStateURL;
            let token = userInfoService.getLocalStorage('aslover-token');
            let param = {
                NO : item.NO,
                IS_COMPLETE : complete,
                token : token
            }

            const updateState = await axiosService.putData(url, param);

            if(updateState.data.result !== 1){
                alert('error!');
                return;
            }

            if(type === 'remove'){
                this.fetchTodoList();
                return;
            }

            let newTodolist = this.state.list;
            let index = findIndex(newTodolist, { NO : item.NO });
            newTodolist[index].IS_COMPLETE = complete;

            this.setState({
                list: newTodolist
            });

        } catch(e) {
            // if err, stop at this point
            console.log(e);
        }
    }

    updateTodoList = async (item) => {

        if(item === undefined){
            return;
        }

        if(item.editContent === ''){
            return;
        }

        try {
            // wait for promises
            let url = updateListURL;
            let token = userInfoService.getLocalStorage('aslover-token');
            let param = {
                NO : item.NO,
                CONTENT : item.editContent,
                token : token
            }

            const updateTodoList = await axiosService.putData(url, param);

            if(updateTodoList.data.result !== 1){
                alert('error!');
                return;
            }

            this.fetchTodoList();

        } catch(e) {
            // if err, stop at this point
            console.log(e);
        }
    }

    updateTodoListEditMenuState(item) {

        if(item === undefined){
            return;
        }

        let listTest = this.state.list;

        let index = findIndex(listTest, { NO : item.NO });
        listTest[index].edit = !item.edit;

        this.setState({
            list: listTest
        });
    }

    componentDidMount() {
        this.fetchTodoList();
    }

    addTodoInputKeyPress = (event) => {
        if (event.keyCode === 13 || event.charCode === 13) {
            this.addTodoList();
        }

        return;
    }

    updateTodoInputKeyPress = (event, item) => {

        if(item === undefined){
            return;
        }

        if (event.keyCode === 13 || event.charCode === 13) {
            this.updateTodoList(item);
        }

        return;
    }

    updateInputValue(event) {
        this.setState({
            addTodoValue: event.target.value
        });

        return;
    }

    updateTodoItemInputValue(event, item) {

        if(item === undefined){
            return;
        }

        let newTodolist = this.state.list;
        let index = findIndex(newTodolist, { NO : item.NO });
        newTodolist[index].editContent = event.target.value;

        this.setState({
            list: newTodolist
        });

        return;
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
                            value={this.state.addTodoValue}
                            onKeyPress={this.addTodoInputKeyPress}
                            onChange={event => this.updateInputValue(event)}
                            autoFocus
                        />

                        <button
                            className="todolist-add-btn"
                            onClick={() => this.addTodoList}
                        >
                            <i className="todolist-add-btn-icon material-icons">playlist_add</i>
                        </button>
                    </div>

                    <ul className="todolist-item-box">
                        {this.state.list.map(item =>
                            <li key={item.NO}
                                className="todolist-item"
                            >
                                <div className={!item.edit ? "todolist-item-outer" : "todolist-item-outer edit-mode"}>
                                    <button
                                        className="todolist-item-check-btn"
                                        onClick={() => this.updateTodoListState(item, 'edit')}
                                    >
                                        {item.IS_COMPLETE > 0 ?
                                            <i className="todolist-item-check-icon material-icons">done</i> : ''
                                        }
                                    </button>

                                    <div className={item.IS_COMPLETE > 0 ? 'todolist-item-content done' : 'todolist-item-content'}>
                                        {item.CONTENT}
                                    </div>

                                    <button
                                        className="todolist-item-menu-btn"
                                        onClick={() => this.updateTodoListEditMenuState(item)}
                                    >
                                        <i className="todolist-item-menu-icon material-icons">more_vert</i>
                                    </button>
                                </div>

                                {item.edit ?
                                    <div className="todolist-item-edit-box">
                                        <div className="todolist-item-edit-input-box">
                                            <input
                                                className="todolist-item-edit-input"
                                                type="text"
                                                defaultValue={item.CONTENT}
                                                onKeyPress={event => this.updateTodoInputKeyPress(event, item)}
                                                onChange={event => this.updateTodoItemInputValue(event, item)}
                                            />

                                            <button
                                                className="todolist-item-edit-save-btn"
                                                onClick={() => this.updateTodoList(item)}
                                            >
                                                <i className="todolist-item-edit-save-icon material-icons">edit</i>
                                            </button>
                                        </div>

                                        <button
                                            className="todolist-item-edit-remove-btn"
                                            onClick={() => this.updateTodoListState(item, 'remove')}
                                        >
                                            <i className="todolist-item-edit-remove-icon material-icons">delete_forever</i>
                                        </button>

                                        <button
                                            className="todolist-item-edit-close-btn"
                                            onClick={() => this.updateTodoListEditMenuState(item)}
                                        >
                                            <i className="todolist-item-edit-close-icon material-icons">close</i>
                                        </button>

                                    </div>
                                : '' }

                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }

};

export default ToDoList;