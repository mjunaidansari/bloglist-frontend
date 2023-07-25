import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

import Filter from "./components/Filter";
import BlogForm from './components/BlogForm'
import Blog from "./components/Blog";
import Notification from './components/Notification'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

import blogServices from "./services/blogs";
import loginServices from './services/login'

import './App.css'
const App = () => {

    /** USESTATE HOOKS */

    let [blogs, setBlogs] = useState([])
    
    const [search, setSearch] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState('')

    const [message, setMessage] = useState(null)
    const [notificationtype ,setNotificationType] = useState(null)

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /** USEREF HOOKS */

    const blogFormRef = useRef()
    
    /** USEEFFECTS HOOKS */

    useEffect(() => {
        blogServices
            .getAll()
            .then(result => {
                console.log('Promise fulfilled')
                setBlogs(result.data)
            })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            blogServices.setToken(user.token)
            setUser(user)
        }
    }, [])

    /** ONCLICK HANDLERS */

    const addBlog = async blog => {
        try {
            const data = await blogServices.create(blog)
            console.log(data)
            setBlogs(blogs.concat(data))
            setNotification(`A new blog: ${newTitle} by ${newAuthor} added`, 'green')
            blogFormRef.current.toggleVisibility() // making the blog form invisible
            console.log(blogs)
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleDelete = async (id) => {

        const blog = blogs.find(blog => blog.id === id)
        if (window.confirm(`Do you want to delete this blog: ${blog.title}`)) {
            try {
                const response = await blogServices.deleteBlog(id)
                console.log(response)
                setBlogs(blogs.filter(blog => blog.id !== id))
            } catch (exception) {
                console.log(exception)
            }
        }

    }

    const handleLike = async id => {

        const blog = blogs.find(blog => blog.id === id)
        const blogObject = {
            ...blog,
            likes : blog.likes + 1
        }
        const updatedBlog = await blogServices.update(id, blogObject)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
        console.log(updatedBlog)

    }

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            const user = await loginServices.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogServices.setToken(user.token)
            setUser(user)
            console.log(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            setNotification('Wrong Credentials', 'red')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    /** CHANGE EVENT HANDLERS */

    const handleSearchChange = event => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const handleTitleChange = event => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = event => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = event => {
        console.log(event.target.value)
        setNewUrl(event.target.value)
    }

    const handleLikesChange = event => {
        console.log(event.target.value)
        setNewLikes(event.target.value)
    }

    /** FUNCTIONS */    

    const setNotification = (message, type) => {
        setMessage(message)
        setNotificationType(type)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    /** VALIDATION */

    const validateForm = () => {
        if(newTitle === '' || newAuthor === '' || newUrl === '' || newLikes === '')
            return false
        else
            return true
    }

    /** FILTER LOGIC */

    const checkBlog = (blog) => {
        return blog.title.includes(search)
    }
    const blogsToShow = blogs.filter(checkBlog)

    /** HELPER FUNCTIONS */

    const loginForm = () => {
        return (
            <LoginForm
                username = {username}
                password = {password}
                handleUsernameChange = {({target}) => setUsername(target.value)}
                handlePasswordChange = {({target}) => setPassword(target.value)}
                handleLogin = {handleLogin}
            />
        )
    }

    const blogForm = () => {
        return (
            <Togglable buttonLabel = 'New Blog' ref = {blogFormRef}>
                <BlogForm 
                    createBlog = {addBlog}
                />
            </Togglable>
        )
    }

    const blogPage = () => {
        return (
            <>
                <div>
                    {user.name} logged in
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <h1>Blogs</h1>
                {blogForm()}
                <Filter 
                    search = {search}
                    handleSearchChange = {handleSearchChange}
                />
                <div>
                    <h2>BlogList</h2>
                    {blogsToShow.map(blog => <Blog 
                                                key={blog.id} 
                                                blog = {blog} 
                                                handleDelete = {() => handleDelete(blog.id)}
                                                handleLike = {() => handleLike(blog.id)}
                                             />)}
                </div>
            </>
        )
    }

    return (
        <>
            <Notification message = {message} type = {notificationtype}/>   
            {!user && loginForm()}
            {user && blogPage()}
        </>
    )
}
export default App