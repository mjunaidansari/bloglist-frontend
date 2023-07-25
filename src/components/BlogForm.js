import {React, useState} from "react";

const BlogForm = ({createBlog}) => {
    
    const [search, setSearch] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState('')

    const validateForm = () => {
        if(newTitle === '' || newAuthor === '' || newUrl === '' || newLikes === '')
            return false
        else
            return true
    }

    const addBlog = event => {
        event.preventDefault()
        if(!validateForm()){
            alert('Please enter all the details')   
        } else {
            createBlog({
                title: newTitle,
                author: newAuthor,
                url: newUrl,
                likes: Number(newLikes)
            })
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
            setNewLikes('')
        }
    }

    return (
        <div>
            <h3>Add a Blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title: <input id = 'title' value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                </div>
                <div>
                    Author: <input id = 'author' value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
                </div>
                <div>
                    URL: <input id = 'url' value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                </div>
                <div>
                    Likes: <input id = 'likes' value={newLikes} onChange={e => setNewLikes(e.target.value)} />
                </div>
                <div>
                    <button id = 'add-blog' type='submit'>Add</button>
                </div>
            </form>
        </div>
    )

}

export default BlogForm