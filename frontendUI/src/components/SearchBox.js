import { useState } from "react";
import { Button, Form, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router";

export default function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(location.pathname);
        } 
        
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={ (e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            >
            </Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className="p-2"
            >
                Submit
            </Button>
        </Form>
    )
}