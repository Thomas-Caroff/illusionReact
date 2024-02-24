import React, { Component } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import UserList from "../components/user/UserList";
import NewUserModal from "../components/user/NewUserModal";
import { API_URL } from "../constants";
import "../assets/css/app.css";

class Home extends Component {
	state = {
		users: [],
	};

	componentDidMount() {
		this.resetState();
	}

	getUsers = () => {
		axios
			.get(API_URL + "user/")
			.then((res) => this.setState({ users: res.data }));
	};

	resetState = () => {
		this.getUsers();
	};

	render() {
		return (
			<Container className="body">
				<Row>
					<Col>
						<UserList
							users={this.state.users}
							resetState={this.resetState}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<NewUserModal
							create={true}
							resetState={this.resetState}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;
