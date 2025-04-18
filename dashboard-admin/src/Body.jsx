import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import LoginPage from './page/LoginPage';
import ProfilePage from './page/ProfilePage';
import ProtectedRoute from './ProtectedRoute.jsx';
import CategoriesPage from './page/CategoryPage.jsx';
import ProductsPage from './page/ProductPage.jsx';





const Body = () => {
    return (

        <AuthProvider>
            <Router>
                <Header />
                <main id="main">
                    <Routes>

                        {/* <Route path="/favorites" element={<ProtectedRoute component={MyFavoriteProducts} />} /> */}


                        <Route path="/" element={<LoginPage />} />


                        {/* <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} /> */}
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
                        <Route path="/products" element={<ProtectedRoute><ProductsPage/></ProtectedRoute>} />
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

