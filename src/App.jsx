import { Routes, Route } from 'react-router';
import "../config/firebaseinit"

import useFavicon from './components/Favicon';
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Contacts from './components/Contacts';
import Pricing from './components/Pricing';
import IndividualPricing from './components/IndividualPricing';
import BusinessPricing from './components/BusinessPricing';
import NotFound from './components/NotFound';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';
import Weather from './components/weather';
import Footer from './components/Footer';

import './App.css'


function App() {
    useFavicon("/logo.png");
    return (
        <div className="bg-white flex flex-col min-h-screen">

            <main className="flex-grow">

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/logout" element={"<h1>logout<h1/>"} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:productId" element={<ProductDetails />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/pricing" element={<Pricing />}>
                    <Route index element={<IndividualPricing />} />
                    <Route path='business' element={<BusinessPricing />} />
                </Route>
                <Route path="/weather" element={<Weather />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            </main>

            <Footer/>
        </div>
    )
}

export default App
