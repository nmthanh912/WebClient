import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ModalDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    handleToggle = () => {
        this.props.toggle()
    }

    handleDelete = () => {
        this.props.handleDeleteDeviceType()
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.handleToggle()
                }}
                className={'modal-device-container'}
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.handleToggle()
                    }}
                >
                    Delete device type
                </ModalHeader>
                <ModalBody>Are you sure to delete this device type? This action can't be undo!</ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3 btn-save'
                        onClick={() => {
                            this.handleDelete()
                        }}
                    >
                        Delete
                    </Button>{' '}
                    <Button
                        color='secondary'
                        className='px-3 btn-cancel'
                        onClick={() => {
                            this.handleToggle()
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete)
