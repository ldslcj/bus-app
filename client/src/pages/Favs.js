import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Table } from 'semantic-ui-react'
import useAxiosOnMount from '../customHooks/useAxiosOnMount'
import FavsForm from './FavsForm'

const Favs = () => {
    const { data, loading, error, setData, getData } = useAxiosOnMount('/api/favs')

    const deleteFav = async (id) => {
        try{ console.log('delete try')
        console.log(id)
            await axios.delete(
                `/api/favs/${id}`
            ) 
            filterFavs(id)
        } catch (error) {
            console.log(error)
        }
    }

    const filterFavs = (id) => {
        setData(data.filter((d) => d.id !== id))
      }

    const renderData = () => {

        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Bus</Table.HeaderCell>
                        <Table.HeaderCell>Bus Route</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Crud Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map(d => (
                        <Table.Row>
                            <Table.Cell>{d.bus_name}</Table.Cell>
                            <Table.Cell>{d.bus_route}</Table.Cell>
                            <Table.Cell>{d.user_name}</Table.Cell>
                            <Table.Cell>
                                <Link to={{
                                       pathname: `/favs/edit/${d.id}`,
                                       bus_id: d.bus_id,
                                       user_id: d.user_id,
                                       user_name: d.user_name,
                                       bus_name: d.bus_name,
                                       bus_route: d.bus_route
                                       }}>
                                    <Icon name='pencil'></Icon>

                               </Link>
                               <Link onClick={()=> deleteFav(d.id)}> 
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
            <h1>Favs</h1>
            <FavsForm data={data} setData={setData} getData={getData}/>
            {renderData()}
        </div>
    )
}

export default Favs