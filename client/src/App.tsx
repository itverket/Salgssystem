import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Header } from "./components/Header";
import { Users } from "./components/Users";
import DndColumns from "./components/dnd/DndColumns";

// interface user {
//   firstName: string,
//   lastName: string
// }

class App extends Component {
  state = {
    user: {},
    users: [],
    numberOfUsers: 0,
  };

  // componentDidMount() {
  //   this.getAllUsers();
  // }

  // createUser = (e) => {
  //   UserService.createUser(this.state.user).then((response) => {
  //     this.setState({ numberOfUsers: this.state.numberOfUsers + 1 });
  //   });
  // };

  // getAllUsers = () => {
  //   UserService.getAllUsers().then((users) => {
  //     this.setState({ users: users, numberOfUsers: users.length });
  //   });
  // };

  // onChangeForm = (e) => {
  //   let user = this.state.user<user>; // Hvordan få dette til å funke???
  //   if (e.target.name === "firstname") {
  //     user.firstName = e.target.value;
  //   } else if (e.target.name === "lastname") {
  //     user.lastName = e.target.value;
  //   } else if (e.target.name === "email") {
  //     user.email = e.target.value;
  //   }
  //   this.setState({ user });
  // };

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
              {/* <CreateUser
                user={this.state.user}
                onChangeForm={this.onChangeForm}
                createUser={this.createUser}
              ></CreateUser>
              <DragAndDropIndex/> */}
              <DndColumns />
            </div>
            {/* <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={this.state.numberOfUsers}
                getAllUsers={this.getAllUsers}
              ></DisplayBoard>
            </div> */}
          </div>
        </div>
        <div className="row mrgnbtm">
          <Users users={this.state.users}></Users>
        </div>
      </div>
    );
  }
}

export default App;