import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Form } from 'semantic-ui-react'

  import {useParams, useLocation, useHistory} from 'react-router-dom'

const FavsForm = (props) => {
    const {getData} = props
    const location = useLocation()
    const params = useParams()
    const history = useHistory()
    console.log(location)
    console.log(params)
    const [buses, setBuses] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(location.user_id ? location.user_id : null )
    const [selectedBus, setSelectedBus] = useState(location.bus_id ? location.bus_id : null)

    useEffect(() => {
        getBuses()
    }, [])
    const getBuses = async () => {
        let res = await axios.get('/api/buses')
        let res1 = await axios.get('/api/users')
        // map first to match semantic select {key, value, text}
        let selectBusData = res.data.map(bus => {
            return { key: bus.id, value: bus.id, text: bus.name }
        })
        let selectUserData = res1.data.map(user => {
            return { key: user.id, value: user.id, text: user.name }
        })
        setBuses(selectBusData)
        setUsers(selectUserData)
    }

    const handleSubmit = async () => {
       if(params.id){
           // api call to update to db
        let res = await axios.put(`/api/favs/${params.id}`, {
            bus_id: selectedBus,
            user_id: selectedUser,
        })
       }
       else {
        // api call to create to db
        let res = await axios.post('/api/favs', {
            bus_id: selectedBus,
            user_id: selectedUser,
        })
       }

       // react route page change
       history.push('/')

       history.push('/favs')

    }

    return (
        <div>
            <h3>Add or Edit Your Favorite List</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Bus</label>
                        <Dropdown
                            defaultValue ={selectedBus}
                            onChange={(e, { value }) => setSelectedBus(value)}
                            placeholder='Buses'
                            fluid
                            search
                            selection
                            options={buses}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Users</label>
                        <Dropdown
                            defaultValue ={selectedUser}
                            onChange={(e, { value }) => setSelectedUser(value)}
                            placeholder='Users'
                            fluid
                            search
                            selection
                            options={users}

                        />
                    </Form.Field>
                </Form.Group>
                <Button primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default FavsForm