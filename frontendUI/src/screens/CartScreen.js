import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from '../components/Message';
import { addToCart } from '../actions/cartActions'; 

export default function CartScreen({location}){

    const params = useParams();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams()
    const productId = params.id;
    const qty = Number(searchParams.get('qty'));
    
    const cart = useSelector(state => state.cart)
    const { cartItems} = cart;
    console.log("cartItems", cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    return (
        <h1>Cart</h1>
    )
}