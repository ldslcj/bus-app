import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Table } from 'semantic-ui-react'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'
import BusForm from './BusForm'
import UserForm from './UserForm'

const Users = () => {
    const { data, loading, error, setData, getData } = useAxiosOnMount('/api/users')

    const deleteUser = async (id) => {
        try {
            console.log('delete try')
            console.log(id)
            await axios.delete(
                `/api/users/${id}`
            )
            filterUser(id)
        } catch (error) {
            console.log(error)
        }
    }


    const filterUser = (id) => {
        setData(data.filter((d) => d.id !== id))
    }

    const renderData = () => {
        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User Name</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(d => (
                        <Table.Row>
                            <Table.Cell>{d.name}</Table.Cell>
                            <Table.Cell>
                                <Link to={{
                                    pathname: `/users/edit/${d.id}`,
                                    id: d.id,
                                    name: d.name,
                                }}>
                                    <Icon name='pencil'></Icon>

                                </Link>
                                <Link onClick={() => deleteUser(d.id)}>
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
            <h1>Users List</h1>
            <UserForm data={data} setData={setData} getData={getData} />
            {renderData()}

        </div>
    )
}

export default Users