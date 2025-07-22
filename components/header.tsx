"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { usePokemonStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Heart, GitCompare, Search, Home, Menu, X } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const { comparisonPokemon, favoritePokemon } = usePokemonStore()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/favorites", label: "Favorites", icon: Heart, count: favoritePokemon.length },
    { href: "/comparison", label: "Compare", icon: GitCompare, count: comparisonPokemon.length },
  ]

  const NavItem = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => mobile && setIsOpen(false)}
      >
        <Button
          variant={isActive ? "default" : "ghost"}
          className={`relative justify-start ${mobile ? 'w-full h-12 text-base' : ''}`}
        >
          <Icon className="h-4 w-4 mr-3" />
          {item.label}
          {item.count !== undefined && item.count > 0 && (
            <Badge
              variant="secondary"
              className="ml-auto h-5 w-5 p-1 flex justify-center items-center text-xs bg-red-500 text-white"
            >
              {item.count}
            </Badge>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            Pokedex
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-lg font-semibold">Navigation</span>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <NavItem key={item.href} item={item} mobile />
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Theme</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
