import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MessageDialogComponent from './messageDialog'
import ActionComponent from './action/component'
import Interrelation from './interrelation/figure'

describe( '<MessageDialogComponent/>', () => {
    it('renders action form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "action"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders attribute form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "attribute"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders interaction form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "interaction"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders interrelation form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "interrelation"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders reaction form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "reaction"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders object form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "object"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders information form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "information"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders confimation form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "change"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders confimation form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "confirmation"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })

    it('renders no form', () => {
        const parentsActions = []
        const object = Interrelation()
        const message = "message"
        const modal = "default"
        const typeDiagram = "1"
        const listObjects = []
        const open = true
        const mockHandler = jest.fn()
        const component = render(<MessageDialogComponent 
            open={open} 
            handleClose={mockHandler}
            message={message}
            type={modal}
            parentsActions={parentsActions}
            object={object}
            typeDiagram={typeDiagram}
            listObjects={listObjects}
            handleClick={mockHandler}
        />)
    })
})

