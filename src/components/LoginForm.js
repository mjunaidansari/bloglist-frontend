import React from "react";

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {

    return (
        <>
           <h2>Login to the Application</h2>
            <form onSubmit={handleLogin}>
                    <div>
                        Username: 
                        <input 
                            id = 'username'
                            type = 'text'
                            name = 'Username'
                            value = {username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        Password: 
                        <input 
                            id = 'password'
                            type = 'password'
                            name = 'Password'
                            value = {password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button id = 'login-button' type = 'submit'>Login</button>
            </form> 
        </>
    )

}

export default LoginForm 