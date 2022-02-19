import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ActionComponent from './component'
import Action from './figure'
import Passive from '../passive/figure'
import Hardware from '../hardware/figure'
import Multimedia from '../multimedia/figure'
import * as joint from 'jointjs';

describe( '<ActionComponent/>', () => {
    it('renders content', () => {
        const parentsActions = []
        let object = Action()
        let parent = Passive()
        let graph = new joint.dia.Graph({},{})
        parent.embed(object)
        graph.addCells([parent, object]);
        //getParent() doesn't work
        const mockHandler = jest.fn()
        const component = render(<ActionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)

        let button = component.getByTestId("desplazar")
        fireEvent.click(button)
        const actions = ["levantar","presionar","leer","girar","introducir","adherir","arrastrar"]
        actions.forEach(element => {
            button = component.getByTestId(element)
            fireEvent.click(button)
        });
    })

    it('renders content', () => {
        const parentsActions = ["agarrar"]
        let object = Action()
        let parent = Hardware()
        parent.embed(object)
        const mockHandler = jest.fn()
        const component = render(<ActionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            />)
        let button = component.getByTestId("agarrar")
        fireEvent.click(button)
        button = component.getByTestId("retroalimentar")
        fireEvent.click(button)
        button = component.getByTestId("ajustar")
        fireEvent.click(button)

    })

    it('renders content', () => {
        const parentsActions = ["agarrar"]
        let object = Action()
        let parent = Multimedia()
        parent.embed(object)
        const mockHandler = jest.fn()
        const component = render(<ActionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            />)
        let button = component.getByTestId("lanzar")
        fireEvent.click(button)
        button = component.getByTestId("gestualizar")
        fireEvent.click(button)
        button = component.getByTestId("soltar")
        fireEvent.click(button)

    })
})

