import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";
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
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/loans/apply" element={<LoanApplicationPage />} />
          <Route path="/loans" element={<LoanHistoryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/loans/apply" replace />} />
    </Routes>
  );
}

export default App;
