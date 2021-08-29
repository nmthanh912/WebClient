import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import _ from 'lodash'

class ModalReadRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            write_register: [
                {
                    tagName: '',
                    dataType: '',
                    unit: '',
                    offset: '',
                    PF: '',
                    size: '',
                },
            ],
            indexElement: 0,
        }
    }

    componentDidMount() {
        let {write_registerEdit} = this.props
        if (write_registerEdit.write_register && !_.isEmpty(write_registerEdit.write_register)) {
            this.setState({
                write_register: write_registerEdit.write_register,
            })
        } else {
            this.setState({
                write_register: [
                    {
                        tagName: '',
                        dataType: '',
                        unit: '',
                        offset: '',
                        PF: '',
                        size: '',
                    },
                ],
            })
        }
    }

    handleToggle = () => {
        let isValid = this.checkValidInput()
        if (isValid) {
            this.props.toggle()
        }
    }

    handleOnChangeInput = (event, id, index) => {
        let copyItem = this.state.write_register
        copyItem[index] = this.state.write_register[index]
        copyItem[index][id] = event.target.value
        this.setState({
            write_register: copyItem,
        })
    }

    handleOnClickAdd = () => {
        let copyItem = this.state
        copyItem.write_register.push({
            tagName: '',
            dataType: '',
            unit: '',
            offset: '',
            PF: '',
            size: '',
        })
        copyItem.indexElement = this.state.indexElement + 1
        this.setState({
            write_register: copyItem.write_register,
            indexElement: copyItem.indexElement,
        })
    }

    handleOnClickMinus = (index) => {
        let copyItem = this.state
        copyItem.write_register.splice(index, 1)
        copyItem.indexElement = this.state.indexElement - 1
        this.setState({
            write_register: copyItem.write_register,
            indexElement: copyItem.indexElement,
        })
    }
    z
    checkValidInput = () => {
        let isValid = true
        let showMissing = ['Tag Name', 'Data Type', 'Unit', 'Offset', 'PF', 'Size']
        let arrInput = ['tagName', 'dataType', 'unit', 'offset', 'PF', 'size']
        let indexElement = this.state.indexElement

        for (let i = 0; i <= indexElement; i++) {
            for (let j = 0; j < arrInput.length; j++) {
                if (!this.state.write_register[i][arrInput[j]]) {
                    isValid = false
                    alert(`Missing parameters: ${showMissing[j]}`)
                    break
                }
            }
            if (!isValid) {
                break
            }
        }
        return isValid
    }

    handleEditDeviceTypeOne = () => {
        let isValid = this.checkValidInput()
        if (isValid) {
            this.props.handleEditDeviceTypeOne('openWriteRegister', this.state)
        }
    }

    render() {
        let numberLoop = this.state.write_register
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
                    Edit write register element
                </ModalHeader>
                <ModalBody>
                    <table className='table edit-table'>
                        <thead>
                            <tr>
                                <th>Tag Name</th>
                                <th>Data Type</th>
                                <th>Unit</th>
                                <th>Offset</th>
                                <th>PF</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {numberLoop.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'tagName', index)}
                                                value={item.tagName}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'dataType', index)}
                                                value={item.dataType}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'unit', index)}
                                                value={item.unit}
                                                className='edit-input'
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'offset', index)}
                                                value={item.offset}
                                                className='edit-input-offset'
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'PF', index)}
                                                value={item.PF}
                                                className='edit-input'
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'size', index)}
                                                value={item.size}
                                                className='edit-input'
                                            ></input>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    this.handleOnClickAdd()
                                                }}
                                            >
                                                <i className='fas fa-plus-circle'></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    this.handleOnClickMinus(index)
                                                }}
                                            >
                                                <i className='fas fa-minus-circle minus-button'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3 btn-save'
                        onClick={() => {
                            this.handleEditDeviceTypeOne()
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReadRegister)
