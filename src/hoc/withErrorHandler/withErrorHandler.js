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
            console.log('willMount')
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(null, error => {
                this.setState({error: error.message})
            });
        }
        componentWillUnmount() {
            console.log('willUnmount')
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        closeModal = () => {
            this.setState({error: null})
        };

        render() {
            console.log('render')
            console.log(this.state.error)
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