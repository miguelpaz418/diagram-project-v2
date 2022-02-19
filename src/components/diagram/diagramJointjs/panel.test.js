import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import PanelComponent from './panel'
import  { returnAction } from './config-panel'

describe( '<ActionComponent/>', () => {
    it('renders actions for diagram objects/actions', () => {
        const actions = ['Objeto pasivo','Objeto hardware','Objeto multimedia',"action","attribute","in","out"]
        let list = []
        let button = {}
        actions.forEach(element => {
            button = returnAction(element)
            list.push(button)
        });
        const mockHandler = jest.fn()
        const component = render(<PanelComponent 
            listOfActions={list} 
            action={mockHandler}  
        />)

    })

    it('renders actions for diagram interactions/intra-actions', () => {
        const actions = ['Objeto pasivo','Objeto hardware','Objeto multimedia',"interaction","dotted","continuous","in","out"]
        let list = []
        let button = {}
        actions.forEach(element => {
            button = returnAction(element)
            list.push(button)
        });
        const mockHandler = jest.fn()
        const component = render(<PanelComponent 
            listOfActions={list} 
            action={mockHandler}  
        />)

    })

    it('renders actions for diagram interrelation/reactions', () => {
        const actions = ['Objeto pasivo','Objeto hardware','Objeto multimedia',"interrelation","reaction","in","out"]
        let list = []
        let button = {}
        actions.forEach(element => {
            button = returnAction(element)
            list.push(button)
        });
        const mockHandler = jest.fn()
        const component = render(<PanelComponent 
            listOfActions={list} 
            action={mockHandler}  
        />)

        button = component.getByTestId("Reacción")
        fireEvent.click(button)

    })

})

