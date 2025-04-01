import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Disconnect from '../components/Disconnect';

describe("Disconnect component", ()=>{
    let mockDiscon: jest.Mock;

    beforeEach(()=>{
        mockDiscon=jest.fn();
        render(<Disconnect discon={mockDiscon}></Disconnect>)
    })
    test("render botton test", ()=>{
        expect(screen.getByRole("button",{name:/bye bye!/i}))
    });
    test("handle disconect", ()=>{
        const btn = screen.getByRole("button",{name:/bye bye!/i});
        fireEvent.click(btn);
        expect(mockDiscon).toHaveBeenCalled();
    });
})