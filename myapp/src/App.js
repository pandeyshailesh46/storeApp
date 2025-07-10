import './App.css';
import MainAuth from './Authentication/MainAuth';
import UserProvider from './component/ContextAPI/UserProvider';
import Gallery from './component/Gallery/Gallery';
import Todo from './component/Todos/Todo';
import UserForm from './component/TodowithApi/UserForm';
import ProductList from './product/pages/ProductList';
import TestingApp from './unitTesting/TestingApp';
import UserFetcher from './unitTesting/UserFetcher';
import InfiniteScrollList from './𝗜𝗻𝗳𝗶𝗻𝗶𝘁𝗲-𝗦𝗰𝗿𝗼𝗹𝗹𝗶𝗻𝗴-𝗟𝗶𝘀𝘁/InfiniteScrollList';
import ScrollPagination from './𝗜𝗻𝗳𝗶𝗻𝗶𝘁𝗲-𝗦𝗰𝗿𝗼𝗹𝗹𝗶𝗻𝗴-𝗟𝗶𝘀𝘁/ScrollPagination';

function App() {
  return (
    <div className="App">
      <h1>learn react</h1>
       {/* 
        <Gallery/> 
        <Todo/>
       <MainAuth/>
        <UserProvider/>
        <UserForm/>
         <ProductList/>

         <InfiniteScrollList/>
         <ScrollPagination/>
        <TestingApp/>*/}
        <UserFetcher/>
        

    </div>
  );
}

export default App;
