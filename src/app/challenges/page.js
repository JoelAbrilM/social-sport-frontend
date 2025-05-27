import { Challenges } from "@/components/Challenges/Challenges";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Page() {
    return (
        <ProtectedRoute>
            <div>
                <Sidebar />
                <Challenges />
            </div>
        </ProtectedRoute>
    );
}