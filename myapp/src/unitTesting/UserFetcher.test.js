import { screen, render, fireEvent, waitFor} from "@testing-library/react"
import UserFetcher from "./UserFetcher"

describe('UserFetcher Component',()=>{
   global.fetch = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('test input feild',()=>{
        render(<UserFetcher/>)
        let checkInput = screen.getByRole('textbox');
        let checkInputPlaceholder = screen.getByPlaceholderText('Enter name');
        expect(checkInput).toBeInTheDocument()
        expect(checkInputPlaceholder).toBeInTheDocument()
    });

    test('input accepts text',()=>{
        render(<UserFetcher/>)
        let checkInputPlaceholder = screen.getByPlaceholderText('Enter name');
       fireEvent.change(checkInputPlaceholder, {
        target: {value: 'shailesh'}
       })
        expect(checkInputPlaceholder.value).toBe('shailesh')
    });


    test('clicking button triggers fetch and displays user data', async()=>{
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async()=> ([
                    {
                        name:'Shailesh Pandey',
                        email:'shailesh@gmail.com'
                    }
                ]) 
        });

        render(<UserFetcher/>)
        
        fireEvent.change(screen.getByPlaceholderText('Enter name'),{
            target: {value: 'shailesh'}
        });

        fireEvent.click(screen.getByText('Fetch User'));

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(()=>{
            expect(screen.getByTestId('user')).toBeInTheDocument();
            expect(screen.getByText(/Shailesh Pandey/)).toBeInTheDocument();
        })
        expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users?name=shailesh');
    })

    test('displays error on fetch failure',async ()=>{
        fetch.mockResolvedValueOnce({
            ok: false
        });

        render(<UserFetcher/>);
        fireEvent.change(screen.getByPlaceholderText('Enter name'),{
            target: { value: 'invalid'}
        })
        fireEvent.click(screen.getByText('Fetch User'));

        await waitFor(()=>{
           // expect(screen.getByTestId('error')).toHaveTextContent('User not found')

           expect(screen.getByTestId('error').textContent).toBe('User not found')
        })

    })
})