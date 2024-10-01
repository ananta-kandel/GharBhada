import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import OwnerSignupForm from "../pages/signUp";
import HomePage from "../pages/HomePage";
import OwnerHomePage from "../pages/OwnerHomePage";
import ClientBillView from "../pages/BillPage";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<OwnerSignupForm />}/>
        <Route path="/owner" element={<OwnerHomePage />}/>
        <Route path="/client-bill/:id" element={<ClientBillView />}/>
        </>
    )
  );

  export default router