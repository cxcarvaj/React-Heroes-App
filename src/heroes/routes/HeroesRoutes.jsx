import { Navigate, Routes, Route } from 'react-router-dom';

import { MarvelPage, DcPage, SearchPage, HeroPage } from '../pages';
import { Navbar } from "../../ui";

export const HeroesRoutes = () => {
    return(
        <>
            <Navbar />

            <div className='container'>
                <Routes>
                    <Route path="/marvel" element={ <MarvelPage /> } />
                    <Route path="/dc" element={ <DcPage /> } />

                    <Route path="/search" element={ <SearchPage /> } />
                    <Route path="/hero/:id" element={ <HeroPage /> } />


                    <Route path="/" element={ <Navigate to="marvel" /> } />

                </Routes>
            </div>
        </>
    );
};