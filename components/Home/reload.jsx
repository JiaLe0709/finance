import { useRouter } from "next/router";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button"
import { lang } from '@/lib/lang'

const Reload = () => {
    const router = useRouter();
    const { locale } = useRouter()
    const t = lang[locale]


    const handleReload = () => {
        router.reload();
    };

    return(
        <>
    <Button onClick={handleReload}>
      <RefreshCcw className="mr-2 h-4 w-4" /> { t.refresh }
    </Button>
        </>
    )
}

export default Reload;