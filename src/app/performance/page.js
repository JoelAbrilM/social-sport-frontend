import { PerformanceComponent } from "@/components/Performance_component/PerformanceComponent";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Page() {
    return (
        <div>
            <Sidebar />
            <PerformanceComponent />
        </div>
    );
}