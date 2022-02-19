import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import InterrelationComponent from './component'
import Interrelation from './figure'

describe( '<InterrelationComponent/>', () => {
    it('renders content', () => {
        const parentsActions = []
        const object = Interrelation()
        const mockHandler = jest.fn()
        const component = render(<InterrelationComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            />)

        const button = component.getByTestId("roce")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = ["dependencia"]
        const object = Interrelation()
        const mockHandler = jest.fn()
        const component = render(<InterrelationComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            />)
        let button = component.getByTestId("dependencia")
        fireEvent.click(button)
        const actions = ["choque","comunicación multidireccional","comunicación bidireccional","toque","comunicación digital","encaje"]
        actions.forEach(element => {
            button = component.getByTestId(element)
            fireEvent.click(button)
        });
    })
})

