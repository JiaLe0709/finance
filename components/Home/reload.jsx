import { useRouter } from "next/router";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button"

const Reload = () => {
    const router = useRouter();

    const handleReload = () => {
        router.reload();
    };

    return(
        <>
    <Button onClick={handleReload}>
      <RefreshCcw className="mr-2 h-4 w-4" /> Reload
    </Button>
        </>
    )
}

export default Reload;