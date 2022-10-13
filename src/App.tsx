import React, {useState} from 'react';
import './scss/app.scss';
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import {Cart} from "./pages/Cart";
import {AppContext} from "./components/Context/AppContext";



function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
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
