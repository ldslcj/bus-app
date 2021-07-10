import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { Button, Form, Input } from 'semantic-ui-react'

const BusForm = (props) => {
    const { getData } = props
    const location = useLocation()
    const params = useParams()
    const history = useHistory()
    const [name, setName] = useState(location.name)
    const [route, setRoute] = useState(location.route)

    const [selectedBus, setSelectedBus] = useState(location.id ? location.id : null)
    const [bus, setBus] = useState([])
 
    useEffect (()=>{
        getBus()
    }, [])

    const getBus = async () => {
        if (params.id) {
            let res = await axios.get(`/api/bus/${params.id}`)
            setBus(res.data)
        }
    }

    const handleSubmit = async () => {
        if (params.id) {
            let res = await axios.put(`/api/buses/${params.id}`, {
                id: selectedBus,
                name: name,
                route: route
            })
        } else {
            let res = await axios.post('/api/buses', {
                id: selectedBus,
                name: name,
                route: route
            }) 
        } 
        history.push('/')
        history.push('/buses')
    }



    const nameChange = (event, { name, value }) => {
        setName(value)
    }

    const routeChange = (event, { practice, value }) => {
        setRoute(value)
    }


    return (
        <div>
            <h3>Add or Edit Bus Here</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Bus Name</label>
                        <Input
                            defaultValue={location.name}
                            onChange={nameChange}
                            placeholder='Bus Name'
                            fluid
                            value={name}
                            lavel='Name'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Practice</label>
                        <Input
                            defaultValue={location.route}
                            onChange={routeChange}
                            placeholder='Route'
                            label='Route'
                            value={route}
                            fluid
                        />
                    </Form.Field>

                </Form.Group>
                <Button primary type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default BusForm