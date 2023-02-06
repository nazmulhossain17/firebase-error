import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.init';
import {Link} from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleRegister = event =>{
        
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide at lease two uppercase character');
            return;
        }
        if(password.length < 6){
            setPasswordError('password should be 6 character');
            return;
        }
        if(/(?=.*[!@#$%*])/.test(password)){
            setPasswordError('Please add at least one special character');
            return;
        }
        setPasswordError('');
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            setSuccess(true);
            form.reset('');
            verifyEmail();
        })
        .catch(error =>{
            console.log(error);
            setPasswordError(error.message)
        })
    }

    const verifyEmail = () =>{
      sendEmailVerification(auth.currentUser)
      .then(()=>{
        alert('check your email and verify')
      })
    }

    return (
        <div className='w-50 mx-auto'>
        <h3>Please Register</h3>
        <Form onSubmit={handleRegister}>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required name='email' type="email" placeholder="Enter email" />
       
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required name='password' type="password" placeholder="Password" />
      </Form.Group>
      
      <p className='text-danger'>{passwordError}</p>
      {success && <p>User Created successfully</p>}
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    <p>Already have an account please <Link to='/login'>login</Link></p>
        </div>
    );
};

export default Register;