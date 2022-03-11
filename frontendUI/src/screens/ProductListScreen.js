import {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList );
    const { loading, error, products} = productList;

    const productDelete = useSelector(state => state.productDelete);
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;
    
    const productCreate = useSelector(state => state.productCreate);
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:productedCreate} = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        
        if (!userInfo.isAdmin) {
            navigate('/login');
        }
        
        if (successCreate) {
            navigate(`/admin/product/${productedCreate._id}/edit/`);
        } else {
            dispatch(listProducts());
        }
        dispatch({ type: PRODUCT_CREATE_RESET })
    }, [dispatch, navigate, userInfo, successDelete, successCreate, productedCreate])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct());
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col style={{textAlign:'right'}}>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <td>BRAND</td>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <th>{product._id}</th>
                                    <th>{product.name}</th>
                                    <th>$ {product.price}</th>
                                    <th>{product.category}</th>
                                    <th>{product.brand}</th>
                                    <th>
                                       <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                           <Button variant='light' className='btn-sm'>
                                               <i className='fas fa-edit'></i>
                                           </Button>
                                       </LinkContainer>
                                       <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
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