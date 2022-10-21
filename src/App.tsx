import React, {useState} from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import {Cart} from "./pages/Cart";
import {AppContext} from "./components/Context/AppContext";
import { useSelector, useDispatch } from 'react-redux'
import {RootState} from "./redux/store";
import { decrement, increment } from './redux/slices/filterSlice'




function App() {
    const [searchValue, setSearchValue] = useState('')

    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className="wrapper">

            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>





            <AppContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
