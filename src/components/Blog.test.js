import React from "react"
import '@testing-library/jest-dom/extend-expect'
import {screen, render, getByText} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from "./Blog"

describe('<Blog />', () => {

    let container, deleteHandler, likeHandler

    beforeEach(() => {
        const blog = {
            title: 'Title',
            author: 'Author',
            url: 'url',
            likes: 7
        }
        deleteHandler = jest.fn()
        likeHandler = jest.fn() 
        // eslint-disable-next-line testing-library/no-render-in-setup
        container = render(
            <Blog
                blog = {blog}
                handleDelete={deleteHandler}
                handleLike={likeHandler}
            />
        ).container
    })

    test('Only the title is rendered at first', () => {
        
        // eslint-disable-next-line testing-library/no-node-access
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')

    })

    test('other components are rendered on click', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        // eslint-disable-next-line testing-library/no-node-access
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')

    })

    test('likeHandler will be called the number of times the button is clicked', async () => {

        const user = userEvent.setup()
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeHandler.mock.calls).toHaveLength(2)

    })

})