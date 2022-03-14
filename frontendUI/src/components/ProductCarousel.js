import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Carousel, CarouselItem, Image} from 'react-bootstrap';
import Message from "./Message";
import Loader from "./Loader";
import { listTopProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

export default function ProductCarousel() {
    const dispatch = useDispatch();

    const productTopReated = useSelector(state => state.productTopRated);
    const {error, loading, products} = productTopReated;

    useEffect(() => {
        dispatch(listTopProducts())
    }, [])

    return ( loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' className='bg-dark'>
                        {products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                    <Carousel.Caption className='carousel.caption'>
                                        <h4>{product.name} ($ {product.price})</h4>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    )
}