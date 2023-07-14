import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Navbar } from "./Navbar"

describe('Testing the Navbar Component', () => {

    test("it should render the logo properly",()=> {
        render(<MemoryRouter><Navbar/></MemoryRouter>)

        const logo = screen.getByRole('img', /logo/i)
        expect(logo).toBeInTheDocument();
    })
})