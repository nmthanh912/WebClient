import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import _ from 'lodash'

class ModalEditDevice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            version: '',
            read_coils: 'true',
            write_coils: 'true',
            read_register: [],
        }
    }

    // truoc khi component duoc mount, dien du lieu vao modal
    componentDidMount() {
        let device = this.props.deviceEdit
        if (device && !_.isEmpty(device)) {
            this.setState({
                name: device.name,
                version: device.version,
                read_coils: device.read_coils,
                write_coils: device.write_coils,
                read_register: device.read_register,
            })
        }
    }

    handleToggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let copyItem = {...this.state}
        copyItem[id] = event.target.value
        this.setState({
            ...copyItem,
        })
    }

    checkValidInput = () => {
        let isValid = true
        let showMissing = ['Name', 'Version', 'Read Coils', 'Write Coils']
        let arrInput = ['name', 'version', 'read_coils', 'write_coils']

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Missing parameters: ${showMissing[i]}`)
                break
            }
        }
        return isValid
    }

    handleEditDevice = () => {
        let isValid = this.checkValidInput()
        if (isValid) {
            this.props.editDevice(this.state)
        }
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
                size='lg'
            >
                <ModalHeader
                    toggle={() => {
                        this.handleToggle()
                    }}
                >
                    Edit your device type
                </ModalHeader>
                <ModalBody>
                    <div className='modal-body-container'>
                        <div className='modal-device-content row'>
                            <div className='col-12 input-container max-width-input'>
                                <div className='col-2 edit-text'>Name</div>
                                <input
                                    className='col-10'
                                    type='text'
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className='col-12 input-container'>
                                <div className='col-2 edit-text'>Version</div>
                                <input
                                    className='col-10'
                                    type='text'
                                    onChange={(event) => this.handleOnChangeInput(event, 'version')}
                                    value={this.state.version}
                                />
                            </div>
                            <div className='col-12 input-container'>
                                <div className='col-2 edit-text'>Read Coils</div>
                                <input
                                    className='col-4 edit-input'
                                    type='text'
                                    onChange={(event) => this.handleOnChangeInput(event, 'read_coils')}
                                    value={this.state.read_coils}
                                />
                                <div className='col-2 edit-text'>Write Coils</div>
                                <input
                                    className='col-4 edit-input'
                                    type='text'
                                    onChange={(event) => this.handleOnChangeInput(event, 'write_coils')}
                                    value={this.state.write_coils}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3 btn-save'
                        onClick={() => {
                            this.handleEditDevice()
                        }}
                    >
                        Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDevice)
