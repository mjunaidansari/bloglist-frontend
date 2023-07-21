import React from "react"
import '@testing-library/jest-dom/extend-expect'
import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from "./BlogForm"

test('form calls the event handler when a blog is created with right details', async () => {

    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'url',
        likes: 7
    }

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(
        <BlogForm createBlog={createBlog}/>
    )

    const formInput = screen.getAllByRole('textbox')
    await user.type(formInput[0], blog.title)
    await user.type(formInput[1], blog.author)
    await user.type(formInput[2], blog.url)
    await user.type(formInput[3], blog.likes.toString())
    
    const addButton = screen.getByText('Add')
    await user.click(addButton)

    expect(createBlog.mock.calls).toHaveLength(1)

})