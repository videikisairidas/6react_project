import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; //Ensure the extension is .jsx if necessary
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import HomePage from './page/HomePage';
import ProfilePage from './page/ProfilePage';
import ProtectedRoute from './ProtectedRoute.jsx';
import ShopPage from './page/ShopPage.jsx';



const Body = () => {
    return (

        <AuthProvider>
            <Router>
                <Header />
                <main id="main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />

                        {/* <Route path="/favorites" element={<ProtectedRoute component={MyFavoriteProducts} />} /> */}


                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />


                        <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
                        {/* <Route path="/recipes" element={<ProtectedRoute component={RecipeList} />} /> */}
                        {/* <Route path="recipes">
                            <Route index element={<ProtectedRoute component={RecipeList} />} />
                            <Route path=":id" element={<ProtectedRoute component={RecipeDetail} />} />
                        </Route> */}
                        
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>

    );
};

export default Body;

