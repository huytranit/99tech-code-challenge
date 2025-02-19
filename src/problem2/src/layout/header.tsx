import { ModeToggle } from "@/components/theme/mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold">Currency Swap</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
