import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lang } from "../../lib/lang";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Settings, Languages } from 'lucide-react'

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { locale, asPath } = useRouter()
    const t = lang[locale]

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Settings className="h-5 w-5" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t.settings}</DialogTitle>
                        <DialogDescription>
                            {t.settingsMsg}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="theme-mode" className="text-right">
                                {t.theme}
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div>
                                        <Button variant="outline">
                                            <div className="flex items-center">
                                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                <span className="sr-only">Toggle theme</span>
                                                <span>&nbsp;&nbsp;{theme}</span>
                                            </div>
                                        </Button>
                                    </div>
                                </DropdownMenuTrigger>


                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        {t.light}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        {t.dark}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        {t.system}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                {t.language}
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div>
                                        <Button variant="outline">
                                            <div className="flex items-center">
                                                <Languages />
                                                <span className="sr-only">Toggle language</span>
                                                <span>&nbsp;&nbsp;{locale}</span>
                                            </div>
                                        </Button>
                                    </div>
                                </DropdownMenuTrigger>


                                <DropdownMenuContent align="end">
                                    <Link passHref href={asPath} locale="en" scroll={false}>
                                        <DropdownMenuItem>
                                            English
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link passHref href={asPath} locale="zh" scroll={false}>
                                        <DropdownMenuItem>
                                            中文
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}