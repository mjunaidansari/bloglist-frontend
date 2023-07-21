import React from "react";

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {

    return (
        <>
           <h2>Log in to the Application</h2>
            <form onSubmit={handleLogin}>
                    <div>
                        Username: 
                        <input 
                            type = 'text'
                            name = 'Username'
                            value = {username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        Password: 
                        <input 
                            type = 'password'
                            name = 'Password'
                            value = {password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type = 'submit'>Login</button>
            </form> 
        </>
    )

}

export default LoginForm 