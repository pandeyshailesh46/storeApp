import {fireEvent, render, screen} from '@testing-library/react'
import TestingApp from './TestingApp'

test('Testing Input field',()=>{
    render(<TestingApp/>)
    let checkInput = screen.getByRole('textbox');
    let checkInputPlaceholder = screen.getByPlaceholderText('Enter user name...');
    expect(checkInput).toBeInTheDocument();
    expect(checkInputPlaceholder).toBeInTheDocument();
    expect(checkInput).toHaveAttribute('name', 'username')
    expect(checkInput).toHaveAttribute('id', 'name')
})

test('test on change',()=>{
    render(<TestingApp/>);
    let inputval = screen.getByRole('textbox');
    fireEvent.change(inputval, {target:{value:'abc'}});
    expect(inputval.value).toBe('abc')   
})

test('Click event test',()=>{
    render(<TestingApp/>);
    let btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(screen.getByText('Update Text')).toBeInTheDocument() 
})