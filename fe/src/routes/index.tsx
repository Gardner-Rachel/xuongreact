import UserAddAdminPage from "@/pages/(dashboard)/auth/add/page";
import UserEditAdminPage from "@/pages/(dashboard)/auth/edit/page";
import UserAdminPage from "@/pages/(dashboard)/auth/page";
import CategoryAddPage from "@/pages/(dashboard)/categorys/add/page";
import CategoryEditPage from "@/pages/(dashboard)/categorys/edit/page";
import CategoryManagementPage from "@/pages/(dashboard)/categorys/page";
import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add/page";
import ProductEditPage from "@/pages/(dashboard)/products/edit/page";
import ProductsManagementPage from "@/pages/(dashboard)/products/page";
import NotFoundPage from "@/pages/(website)/404/page";
import Login from "@/pages/(website)/auth/login/pages";
import Register from "@/pages/(website)/auth/register/pages";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsManagementPage />} />
                    <Route path="products/add" element={<ProductAddPage/>} />
                    <Route path="products/:id/edit" element={<ProductEditPage />} />
                    <Route path="categories" element={<CategoryManagementPage />} />
                    <Route path="categories/add" element={<CategoryAddPage />} />
                    <Route path="categories/:id/edit" element={<CategoryEditPage />} />
                    <Route path="users" element={<UserAdminPage />} />
                    <Route path="users/add" element={<UserAddAdminPage />} />
                    <Route path="users/:id/edit" element={<UserEditAdminPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default Router;
