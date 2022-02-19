import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ObjectComponent from './component'
import Action from './figure'
import Passive from '../passive/figure'
import Hardware from '../hardware/figure'
import Multimedia from '../multimedia/figure'
import * as joint from 'jointjs';

describe( '<ActionComponent/>', () => {
    it('renders content', () => {
        const parentsActions = []
        let object = Hardware()
        const listObjects = ["name1"]
        let typeDiagram = "1"
        const mockHandler = jest.fn()
        let graph = new joint.dia.Graph({},{})
        graph.addCells([object]);
        const component = render(<ObjectComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            type={typeDiagram}
            listObjects={listObjects}
        />)
        const input = component.getByTestId("name-input")
        fireEvent.change(input, { target: { value: "rojo" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
        expect(object.attributes.attrs.label.text).toBe('rojo')
    })

    it('renders content', () => {
        const parentsActions = ["name1"]
        let object = Hardware()
        const listObjects = ["name1"]
        let typeDiagram = "1"
        const mockHandler = jest.fn()
        const component = render(<ObjectComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            type={typeDiagram}
            listObjects={listObjects}
        />)
        const input = component.getByTestId("name-input")
        fireEvent.change(input, { target: { value: "name1" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = []
        let object = Hardware()
        const listObjects = ["name1"]
        let typeDiagram = "1"
        const mockHandler = jest.fn()
        const component = render(<ObjectComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            type={typeDiagram}
            listObjects={listObjects}
        />)
        const input = component.getByTestId("name-input")
        fireEvent.change(input, { target: { value: "" } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = []
        let object = Hardware()
        let object1 = {
            name: "name",
            colorName: "colorName",
            id: "id",
            color: "color",
        }
        const listObjects = [object1]
        let typeDiagram = "2"
        const mockHandler = jest.fn()
        const component = render(<ObjectComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            type={typeDiagram}
            listObjects={listObjects}
        />)
        const select = component.getByTestId("object-select")
        fireEvent.change(select, { target: { value: object1 } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = ["name"]
        let object = Hardware()
        let object1 = {
            name: "name",
            colorName: "colorName",
            id: "id",
            color: "color",
        }
        let object2 = {
            name: "name2",
            colorName: "colorName",
            id: "id",
            color: "color",
        }
        const listObjects = [object1,object2]
        let typeDiagram = "2"
        const mockHandler = jest.fn()
        const component = render(<ObjectComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            type={typeDiagram}
            listObjects={listObjects}
        />)
        const select = component.getByTestId("object-select")
        fireEvent.change(select, { target: { value: object2 } })
        const button = component.getByTestId("check-button")
        fireEvent.click(button)
    })
})

