import {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers } from '../actions/userActions';

export default function UserListScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList );
    const { loading, error, users} = userList;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo])

    const deleteHandler = (id) => {
        console.log('delete', id);
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
             ? (<Loader />)
             : error
                ? (<Message variant='danger'>{error}</Message>) 
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <th>{user._id}</th>
                                    <th>{user.name}</th>
                                    <th>{user.email}</th>
                                    <th>{user.isAdmin ? (
                                        <i className='fas fa-check' style={{color:'green'}}></i>
                                    ) : (
                                        <i className='fas fa-check' style={{color:'red'}}></i>
                                    )}</th>
                                    <th>
                                       <LinkContainer to={`/admin/user/${user._id}/`}>
                                           <Button variant='light' className='btn-sm'>
                                               <i className='fas fa-edit'></i>
                                           </Button>
                                       </LinkContainer>
                                       <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) 
            }
        </div>
    )
}