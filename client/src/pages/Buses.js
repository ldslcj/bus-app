import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table } from 'semantic-ui-react'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'
import BusForm from './BusForm'

const Buses = () => {
    const { data, loading, error, setData, getData } = useAxiosOnMount('/api/buses')

    const deleteBuses = async (id) => {
        try {
            console.log('delete try')
            console.log(id)
            await axios.delete(
                `/api/buses/${id}`
            )
            filterBuses(id)
        } catch (error) {
            console.log(error)
        }
    }


    const filterBuses = (id) => {
        setData(data.filter((d) => d.id !== id))
    }

    const renderData = () => {
        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Bus Name</Table.HeaderCell>
                        <Table.HeaderCell>Route</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(d => (
                        <Table.Row>
                            <Table.Cell>{d.name}</Table.Cell>
                            <Table.Cell>{d.route}</Table.Cell>
                            <Table.Cell>
                                <Link to={{
                                    pathname: `/buses/edit/${d.id}`,
                                    id: d.id,
                                    name: d.name,
                                    route: d.route,
                                }}>
                                    <Icon name='pencil'></Icon>

                                </Link>
                                <Link onClick={() => deleteBuses(d.id)}>
                                    <Icon name='trash' ></Icon>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }



    return (
        <div>
            <h1>Buses</h1>
            <BusForm data={data} setData={setData} getData={getData} />
            {renderData()}

        </div>
    )
}

export default Buses