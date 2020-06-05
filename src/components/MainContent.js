import React, { Component } from "react";
import { getAllLists } from "../api/todo";
import CreateListModal from "./CreateListModal";
import UserLists from "./UserLists";
import {Spin, message} from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lists: undefined,
      createListModalVisible: false,
    };
  }

  componentDidMount = async () => {
    try{
      const response = await getAllLists(localStorage.getItem("email"));
      this.setState({
         lists: response.data,
         loading: false
       });
    }
    catch(err)
    {
      message.error("Error while fetching the lists, Please try again")
    }

  };

  handleCreateNewList = () => {
    this.setState({ createListModalVisible: true });
  };

  toggleCreateModalVisibility = async (value, shouldReload) => {
    try{
      this.setState({ loading: true });
      const response = await getAllLists(localStorage.getItem("email"));
      this.setState({
        lists: response.data,
        createListModalVisible: false,
        loading: false
      });
    }
    catch(err)
    {
      message.error("Error while fetching the lists, Please try again")
    }

  };

  render() {
    return (
      
        this.state.loading
        ? <div className="loader-container center-align"> <Spin indicator={antIcon} />  </div>
        :
      
      <div className="main-content">

        {this.state.lists === undefined || this.state.lists.length === 0 ? (
          <React.Fragment>
            <p className="empty-lists-msg">
              
              It seems You haven't created any lists. What are you waiting for?
            </p>
            <p className="create-list-message">
              <button
                onClick={this.handleCreateNewList}
                className="create-new-list-link"
              >
               
                Click here
              </button>
              to create new lists.
            </p>
          </React.Fragment>
        ) : (
          <UserLists
            lists={this.state.lists}
            handleCreateNewList={this.handleCreateNewList}
            handleListSelection={this.props.handleListSelection}
          />
        )}

        {this.state.createListModalVisible && (
          <CreateListModal
            visible={this.state.createListModalVisible}
            toggleCreateModalVisibility={this.toggleCreateModalVisibility}
          />
        )}
      </div>
    );
  }
}
