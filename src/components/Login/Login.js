import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import app from '../../firebase/firebase.init';


const loginAuth = getAuth(app)
const Login = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('');
    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(loginAuth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    const handleEmailBlur = event =>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () =>{
        sendPasswordResetEmail(loginAuth, userEmail)
        .then(()=>{
            alert('password reset email send! check ur mail')
        })
        .catch(error=>{
            console.log('error', error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Example label</label>
                    <input onBlur={handleEmailBlur} name="email" type="email" className="form-control" id="formGroupExampleInput" placeholder="your email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Another label</label>
                    <input name="password" type="password" className="form-control" id="formGroupExampleInput2" placeholder="your password" required/>
                </div>Another
                <br></br>

                <button type="submit" className="btn btn-success">Login</button>
                </form>
                {success && <p>Login successfully</p>}
                <p>Don't have an account Please <Link to='/register'>Register</Link></p>
                <p>Forget <button type='button' onClick={handleForgetPassword} className="btn btn-link">Password</button></p>
        </div>
    );
};

export default Login;