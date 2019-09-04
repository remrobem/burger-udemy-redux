// global error handler for axios
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

// wrapped component is a HOC concept
// WrappedComponent is the component that uses this module and is wrapped
// burgerDB is included because it is where the error is happening (API using axios)
const withErrorHandler = (WrappedComponent, burgerDB) => {
    // a class is returned that includes the wrapped component
    // class used so that componentDidMount can be used to create inteceptors
    return class extends Component {
        state = {
            error: null,
        };

        // done so interceptors can be defined
        componentDidMount() {
            // reset to no error when request made
            // the interceptors always need to return something
            burgerDB.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            })
            // if there is an error, set state to the error content
            burgerDB.interceptors.response.use(req => req, error => {
                this.setState({ error: error });
            })
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClose={this.errorConfirmedHandler}>
                        {/* error.message does not exist if no error */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        };
    };
};

export default withErrorHandler;