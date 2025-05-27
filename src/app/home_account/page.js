import { Home_Account } from "@/components/Home_Account/Home_Account";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Page() {
    return (
        <ProtectedRoute>
            <div>
                <Sidebar />
                <Home_Account />
            </div>
        </ProtectedRoute>
    );
}