import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Signup from "../components/Signup";
import { useChats } from "../utils/ChatsContext";

jest.mock("../utils/ChatsContext", () => ({
    useChats: jest.fn()
}));

describe("Signup Component", () => {
    let mockSetSigned: jest.Mock;
    let mockSetName: jest.Mock;
    let mockSetChats: jest.Mock;

    beforeEach(() => {
        mockSetSigned = jest.fn();
        mockSetName = jest.fn();
        mockSetChats = jest.fn();

        (useChats as jest.Mock).mockReturnValue({ setChats: mockSetChats });

        render(<Signup setSigned={mockSetSigned} setName={mockSetName} />);
    });

    test("render full component test", () => {
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    });
    test("updates state on user input", () => {
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(usernameInput, { target: { value: "testUser" } });
        fireEvent.change(passwordInput, { target: { value: "testPass" } });

        expect(usernameInput).toHaveValue("testUser");
        expect(passwordInput).toHaveValue("testPass");
    });

    test("handles successful signup", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ body: { chats: ["chat1", "chat2"] } })
            })
        ) as jest.Mock;

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testPass" } });

        fireEvent.submit(screen.getByRole("button", { name: /signup/i }));

        expect(global.fetch).toHaveBeenCalledWith("https://localhost:7070/signup", expect.anything());
        await screen.findByText("SIGNUP"); // Wait for update

        expect(mockSetSigned).toHaveBeenCalledWith(true);
        expect(mockSetName).toHaveBeenCalledWith("testUser");
        expect(mockSetChats).toHaveBeenCalledWith(["chat1", "chat2"]);
    });
    test("handles signup failure", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 400,
                json: () => Promise.resolve({ body: "Signup failed" })
            })
        ) as jest.Mock;

        fireEvent.submit(screen.getByRole("button", { name: /signup/i }));

        await screen.findByText("SIGNUP"); // Wait for update

        expect(mockSetSigned).not.toHaveBeenCalled();
        expect(mockSetName).not.toHaveBeenCalled();
    });
});