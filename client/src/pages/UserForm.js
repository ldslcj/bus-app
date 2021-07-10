import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Form, Input } from 'semantic-ui-react'

const UserForm = (props) => {
    const { getData } = props
    const location = useLocation()
    const params = useParams()
    const history = useHistory()
    const [name, setName] = useState(location.name)
    const [selectedUser, setSelectedUser] = useState(location.id ? location.id : null)
    const [bus, setBus] = useState([])
 
    useEffect (()=>{
        getUser()
    }, [])

    const getUser = async () => {
        if (params.id) {
            let res = await axios.get(`/api/user/${params.id}`)
            setBus(res.data)
        }
    }

    const handleSubmit = async () => {
        if (params.id) {
            let res = await axios.put(`/api/users/${params.id}`, {
                id: selectedUser,
                name: name,

            })
        } else {
            let res = await axios.post('/api/users', {
                id: selectedUser,
                name: name,

            }) 
        } 
        history.push('/')
        history.push('/users')
    }



    const nameChange = (event, { name, value }) => {
        setName(value)
    }



    return (
        <div>
            <h3>Add or Edit User Here</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>User Name</label>
                        <Input
                            defaultValue={location.name}
                            onChange={nameChange}
                            placeholder='User Name'
                            fluid
                            value={name}
                            lavel='Name'
                        />
                    </Form.Field>
                </Form.Group>
                <Button primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default UserForm