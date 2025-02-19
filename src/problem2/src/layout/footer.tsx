export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row  mx-auto">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/huytranit"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Huy Tran
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/huytranit/tran-nguyen-gia-huy"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Currency Swap. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
