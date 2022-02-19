import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AttributeComponent from './component'
import Attribute from './figure'
import Multimedia from '../multimedia/figure'
import * as joint from 'jointjs';

describe( '<AttributeComponent/>', () => {

    it('renders component when any attribute is selected', () => {
        const parentsActions = []
        let object = Attribute()
        const mockHandler = jest.fn()
        let parent = Multimedia()
        let graph = new joint.dia.Graph({},{})
        parent.embed(object)
        graph.addCells([parent, object]);
        const component = render(<AttributeComponent 
            parentsAttributes={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)

        const select = component.getByTestId("attribute-select")
        fireEvent.change(select, { target: { value: "3-text" } })
        const input = component.getByTestId("attribute-input")
        fireEvent.change(input, { target: { value: "rojo" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('renders component when any attribute is already selected  and change attribute value when inputText is not valid', () => {
        const parentsActions = ["Dimensiones"]
        let object = Attribute()
        const mockHandler = jest.fn()
        const component = render(<AttributeComponent 
            parentsAttributes={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)

        const select = component.getByTestId("attribute-select")
        fireEvent.change(select, { target: { value: "1-number" } })
        const input = component.getByTestId("attribute-input")
        fireEvent.change(input, { target: { value: "rojo" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('change attribute value when inputText is empty', () => {
        const parentsActions = []
        let object = Attribute()
        object.attributes.attrs.label.text = "Color:rojo"
        object.attributes.attrs.root.key = "2-text"
        const mockHandler = jest.fn()
        const component = render(<AttributeComponent 
            parentsAttributes={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)

        const select = component.getByTestId("attribute-select")
        fireEvent.change(select, { target: { value: "3-text" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })
})

