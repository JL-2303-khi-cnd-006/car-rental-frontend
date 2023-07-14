import { render, screen } from "@testing-library/react"
import Thanks from "./Thanks"
import { MemoryRouter } from "react-router-dom";

describe('Testing the Thank You Component', () => {
    
    test("it should render Thank you message properly", () => {
        render(<MemoryRouter> <Thanks /></MemoryRouter>);

        const msg = screen.getByText("Thank You for Your Order");
        expect(msg).toBeInTheDocument();
    })

    test("It should have a button written Start Over",()=>{
        render(<MemoryRouter> <Thanks /></MemoryRouter>);

        const msg = screen.getByText("Start Over");
        expect(msg).toBeInTheDocument();
    } )

    test("It should have a button",()=> {
        render(<MemoryRouter> <Thanks /></MemoryRouter>);

        const msg = screen.getByRole("button");
        expect(msg).toBeInTheDocument();
    })

})