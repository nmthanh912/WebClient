import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as deviceService from '../../services/deviceService'
import './DeviceManage.scss'
import ModalDevice from './ModalDevice'
import ModalEditDevice from './ModalEditDevice'
import ModalReadRegister from './ModalReadRegister'
import ModalWriteRegister from './ModalWriteRegister'
import ModalWatchRegister from './ModalWatchRegister'
import ModalDelete from './ModalDelete'
import {emitter} from '../../utils/emitter'

class DeviceManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device_type: [],
            isOpenModal: {
                openDevice: false,
                openReadRegister: false,
                openWriteRegister: false,
                openWatchRegister: false,
                openEditDevice: false,
                openDelete: false,
            },
            id: '',
            deviceEdit: {},
            read_registerEdit: [],
            write_registerEdit: [],
            watch_registerEdit: [],
        }
    }

    async componentDidMount() {
        await this.getAllDeviceType()
    }

    getAllDeviceType = async () => {
        let response = await deviceService.getAllDevice()
        if (response && response.errCode === 0) {
            this.setState({
                device_type: response.device_type,
            })
        }
    }

    handleOpenModal = (name, device_id) => {
        let copyItem = this.state.isOpenModal
        copyItem[name] = !this.state.isOpenModal[name]
        this.setState({
            isOpenModal: copyItem,
            id: device_id,
        })
    }

    openEditReadRegisterModal = (device) => {
        let copyItem = this.state.isOpenModal
        copyItem.openReadRegister = !this.state.isOpenModal.openReadRegister
        this.setState({
            isOpenModal: copyItem,
            read_registerEdit: device.read_register,
            id: device.id,
        })
    }

    openEditWriteRegisterModal = (device) => {
        let copyItem = this.state.isOpenModal
        copyItem.openWriteRegister = !this.state.isOpenModal.openWriteRegister
        this.setState({
            isOpenModal: copyItem,
            write_registerEdit: device,
            id: device.id,
        })
    }

    openEditWatchRegisterModal = (device) => {
        let copyItem = this.state.isOpenModal
        copyItem.openWatchRegister = !this.state.isOpenModal.openWatchRegister
        this.setState({
            isOpenModal: copyItem,
            watch_registerEdit: device,
            id: device.id,
        })
    }

    openEditDeviceModal = (device) => {
        let copyItem = this.state.isOpenModal
        copyItem.openEditDevice = !this.state.isOpenModal.openEditDevice
        this.setState({
            isOpenModal: copyItem,
            deviceEdit: device,
            id: device.id,
        })
    }

    handleToggleDevice = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openDevice = !this.state.isOpenModal.openDevice
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleToggleDelete = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openDelete = !this.state.isOpenModal.openDelete
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleToggleEditDevice = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openEditDevice = !this.state.isOpenModal.openEditDevice
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleToggleReadRegister = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openReadRegister = !this.state.isOpenModal.openReadRegister
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleToggleWriteRegister = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openWriteRegister = !this.state.isOpenModal.openWriteRegister
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleToggleWatchRegister = () => {
        let copyItem = this.state.isOpenModal
        copyItem.openWatchRegister = !this.state.isOpenModal.openWatchRegister
        this.setState({
            isOpenModal: copyItem,
        })
    }

    handleCreateNewDevice = async (dataFromModal) => {
        try {
            let response = await deviceService.createNewDevice(dataFromModal)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllDeviceType()
                let copyItem = this.state.isOpenModal
                copyItem.openDevice = !this.state.isOpenModal.openDevice
                this.setState({
                    isOpenModal: copyItem,
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditDeviceTypeOne = async (name, dataFromModal) => {
        try {
            let response = await deviceService.editDeviceTypeOne(this.state.id, dataFromModal)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllDeviceType()
                let copyItem = this.state.isOpenModal
                copyItem[name] = !this.state.isOpenModal[name]
                this.setState({
                    isOpenModal: copyItem,
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditDevice = async (dataFromModal) => {
        try {
            let response = await deviceService.editDeviceTypeOne(this.state.id, dataFromModal)
            if (response && response.errCode === 0) {
                await this.getAllDeviceType()
                let copyItem = this.state.isOpenModal
                copyItem.openEditDevice = !this.state.isOpenModal.openEditDevice
                this.setState({
                    isOpenModal: copyItem,
                })
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteDeviceType = async () => {
        try {
            let response = await deviceService.deleteDeviceType(this.state.id)
            if (response && response.errCode === 0) {
                await this.getAllDeviceType()
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let device = this.state.device_type
        return (
            <div className='device-container'>
                <ModalDevice
                    isOpen={this.state.isOpenModal.openDevice}
                    toggle={this.handleToggleDevice}
                    handleCreateNewDevice={this.handleCreateNewDevice}
                />
                {this.state.isOpenModal.openReadRegister && (
                    <ModalReadRegister
                        isOpen={this.state.isOpenModal.openReadRegister}
                        toggle={this.handleToggleReadRegister}
                        read_registerEdit={this.state.read_registerEdit}
                        handleEditDeviceTypeOne={this.handleEditDeviceTypeOne}
                    />
                )}
                {this.state.isOpenModal.openWriteRegister && (
                    <ModalWriteRegister
                        isOpen={this.state.isOpenModal.openWriteRegister}
                        toggle={this.handleToggleWriteRegister}
                        write_registerEdit={this.state.write_registerEdit}
                        handleEditDeviceTypeOne={this.handleEditDeviceTypeOne}
                    />
                )}
                {this.state.isOpenModal.openWatchRegister && (
                    <ModalWatchRegister
                        isOpen={this.state.isOpenModal.openWatchRegister}
                        toggle={this.handleToggleWatchRegister}
                        watch_registerEdit={this.state.watch_registerEdit}
                        handleEditDeviceTypeOne={this.handleEditDeviceTypeOne}
                    />
                )}
                <ModalDelete
                    isOpen={this.state.isOpenModal.openDelete}
                    toggle={this.handleToggleDelete}
                    handleDeleteDeviceType={this.handleDeleteDeviceType}
                />
                {this.state.isOpenModal.openEditDevice && (
                    <ModalEditDevice
                        isOpen={this.state.isOpenModal.openEditDevice}
                        toggle={this.handleToggleEditDevice}
                        deviceEdit={this.state.deviceEdit}
                        editDevice={this.handleEditDevice}
                    />
                )}
                <div className='title text-center'>Manage your device type</div>
                <div className='mx-4 add-btn'>
                    <button className='btn btn-primary px-2' onClick={() => this.handleOpenModal('openDevice')}>
                        <i className='fas fa-plus'></i>
                        New device type
                    </button>
                </div>
                <div className='device-table mt-4 mx-4'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Read Registers</th>
                                <th>Write Registers</th>
                                <th>Watch Registers</th>
                                <th>Version</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {device.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.read_register.length}{' '}
                                            {item.read_register.length > 1 ? `elements` : `element`}
                                            <button
                                                className='btn-edit'
                                                onClick={() => {
                                                    this.openEditReadRegisterModal(item)
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                        </td>
                                        <td>
                                            {item.write_register.length}{' '}
                                            {item.write_register.length > 1 ? `elements` : `element`}
                                            <button
                                                className='btn-edit'
                                                onClick={() => {
                                                    this.openEditWriteRegisterModal(item)
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                        </td>
                                        <td>
                                            {item.watch_register.length}{' '}
                                            {item.watch_register.length > 1 ? `elements` : `element`}
                                            <button
                                                className='btn-edit'
                                                onClick={() => {
                                                    this.openEditWatchRegisterModal(item)
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                        </td>
                                        <td>{item.version}</td>
                                        <td className='text-center'>
                                            <button
                                                className='btn-detail'
                                                onClick={() => {
                                                    this.openEditDeviceModal(item)
                                                }}
                                            >
                                                <i className='fas fa-edit'></i>
                                            </button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => {
                                                    this.handleOpenModal('openDelete', item.id)
                                                }}
                                            >
                                                <i className='fas fa-trash-alt'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManage)
