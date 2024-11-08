import logo from './logo.svg';
import './App.css';
// import S1 from './simple-todo/S1';
// import A1 from './axious/A1';
// import A3 from './axious/A3';
// import A4 from './axious/A4';
import Post from './rtk-thunk/Post';
import { Provider } from 'react-redux';
import { store } from './rtk-thunk/store';
import A4 from './axious/A4';
import Form from './form/Form';


function App() {
  return (
    // <div className="App">
    //  {/* <S1/>
    //  <A1/> */}
    //  {/* <A3/> */}
    //  <A4/>
    // </div>

  // <div className='App'>
  //   <Provider store={store}>
  //     <Post/>
    
      

    
  //    </Provider>
  // </div>
    <div>
      <Form/>
    </div>

  );
}

export default App;
