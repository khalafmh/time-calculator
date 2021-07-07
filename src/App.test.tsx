import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

test('renders learn react link', () => {
    render(<App/>);
    const titleElement = screen.getByText(/Time Calculator/i);
    expect(titleElement).toBeInTheDocument();
});

test("Calculates output correctly", async () => {
    render(<App/>)
    const inputElement = screen.getByTestId("input") as HTMLInputElement;
    const outputElement = screen.getByTestId("output") as HTMLInputElement;

    userEvent.type(inputElement, "2h5m")
    expect(outputElement.value).toEqual("2h5m0s")

    userEvent.clear(inputElement)
    userEvent.type(inputElement, `
2h5m
20m
3h

4h5s
 10s
1h1m1s

  40m50s


    `)
    expect(outputElement.value).toEqual("11h7m6s")
})
