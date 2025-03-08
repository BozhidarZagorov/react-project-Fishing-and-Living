import { Routes, Route } from 'react-router';

import Header from './components/Header'
import Home from './components/Home'
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
    return (
        <div className="bg-white flex flex-col min-h-screen">

            <main className="flex-grow">

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={"<h1>login<h1/>"} />
                <Route path="/register" element={"<h1>register<h1/>"} />
                <Route path="/logout" element={"<h1>logout<h1/>"} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:productId" element={<ProductDetails />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/pricing" element={<Pricing />}>
                    <Route index element={<IndividualPricing />} />
                    <Route path='business' element={<BusinessPricing />} />
                </Route>
                <Route path="/weather" element={<Weather />} />
                {/* //todo fetch from visualcrossing.com the weather info for dospat with some changes to the options */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            </main>

            <Footer/>
        </div>
    )
}

export default App
