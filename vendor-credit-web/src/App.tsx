import { Navigate, Route, Routes } from "react-router";
import { GuestOnly } from "./components/GuestOnly";
import { RequireAuth } from "./components/RequireAuth";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { LoanApplicationPage } from "./pages/LoanApplicationPage";
import { LoanHistoryPage } from "./pages/LoanHistoryPage";

function App() {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/loans/apply" element={<LoanApplicationPage />} />
        <Route path="/loans" element={<LoanHistoryPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/loans/apply" replace />} />
    </Routes>
  );
}

export default App;
