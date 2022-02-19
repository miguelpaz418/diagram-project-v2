import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import InteractionComponent from './component'
import Interaction from './figure'

describe( '<InteractionComponent/>', () => {
    it('renders content', () => {
        const parentsActions = []
        const object = Interaction()
        const mockHandler = jest.fn()
        const component = render(<InteractionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
        />)

        const button = component.getByTestId("conectar")
        fireEvent.click(button)
    })

    it('renders content', () => {
        const parentsActions = ["presionar"]
        const object = Interaction()
        const mockHandler = jest.fn()
        const component = render(<InteractionComponent 
            parentsActions={parentsActions} 
            handleClose={mockHandler}
            object={object}
            />)
        let button = component.getByTestId("presionar")
        fireEvent.click(button)
        const actions = ["abrir","accionar","agarrar","apagar","bajar","comenzar","cortar","doblar",
        "empujar","encender","esperar","finalizar","girar","introducir","levantar","mover","parar",
        "poner","quitar","sacar","salir","soltar","subir"]
        actions.forEach(element => {
            button = component.getByTestId(element)
            fireEvent.click(button)
        });
    })
})

