import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ReactionComponent from './component'
import Reaction from './figure'

describe( '<ActionComponent/>', () => {
    it('renders content', () => {
        const parentsActions = []
        let object = Reaction()
        const mockHandler = jest.fn()
        const component = render(<ReactionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)
        const input = component.getByTestId("reaction-input")
        fireEvent.change(input, { target: { value: "explotar" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = []
        let object = Reaction()
        const mockHandler = jest.fn()
        const component = render(<ReactionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)
        const input = component.getByTestId("reaction-input")
        fireEvent.change(input, { target: { value: "" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })
})

