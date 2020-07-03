import React, {Component} from 'react';
import Aux from "../Aux/Aux";
// eslint-disable-next-line no-unused-vars
import axios from "../../axios-orders";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentWillMount() {
            console.log(111)
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(null, error => {
                this.setState({error: error.message})
            });
        }

        closeModal = () => {
            this.setState({error: null})
        };


        render() {
            console.log(222)
            return (
                <Aux>
                    <Modal modal={this.state.error} closeModal={this.closeModal}>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    };
};

export default withErrorHandler;