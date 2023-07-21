import {React, useState} from "react";

const Blog = ({blog, handleDelete, handleLike}) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible? 'none': ''}
    const showWhenVisible = {display: visible? '': 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className = 'blog'>
            
            <div style = {hideWhenVisible}>
                <h3>{blog.title}</h3>
                <button onClick={toggleVisibility}>View</button>
            </div>

            <div style = {showWhenVisible} className="togglableContent">
                <h3>{blog.title}</h3>
                <p><a href = {blog.url}>{blog.url}</a></p>
                <pre>
                    {'\t-'+ blog.author} ({blog.likes} likes)
                    <button onClick={handleLike}>Like</button>
                </pre>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={toggleVisibility}>Hide</button>
            </div>
        
        </div>
    )

}

export default Blog