import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import NavItems from "./NavItems"

const Header = () => {
    return (
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
          <Link href="/" className="w-36">
            <Image 
              src="/assets/images/logo.svg" width={128} height={38}
              alt="Evently logo" 
            />
          </Link>
  
            <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems />
            </nav>
  
          <div className="flex w-32 justify-end gap-3">
            {/* <Button>
              <UserButton afterSignOutUrl="/" />
              <MobileNav />
            </Button> */}
              <Button asChild className="rounded-full" variant="siteIndigo" size="lg">
                <Link href="/login">
                  Login
                </Link>
              </Button>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header