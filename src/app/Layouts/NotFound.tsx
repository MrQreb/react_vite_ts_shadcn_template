
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Moon, Sun } from "lucide-react"
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-10"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      {/* Floating SVG Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <svg
          className="absolute top-20 left-10 w-20 h-20 text-primary/10 animate-bounce"
          style={{ animationDuration: "3s" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
        <svg
          className="absolute top-40 right-20 w-16 h-16 text-primary/15 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
        <svg
          className="absolute bottom-32 left-20 w-12 h-12 text-primary/20 animate-bounce"
          style={{ animationDuration: "3.5s", animationDelay: "1s" }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>

        {/* Floating stars */}
        <svg
          className="absolute top-32 right-1/4 w-8 h-8 text-primary/20 animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
        <svg
          className="absolute bottom-40 right-32 w-6 h-6 text-primary/25 animate-pulse"
          style={{ animationDelay: "0.7s" }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>

        {/* Floating triangles */}
        <svg
          className="absolute top-1/4 left-1/4 w-10 h-10 text-primary/10 animate-spin"
          style={{ animationDuration: "20s" }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
        <svg
          className="absolute bottom-1/4 right-1/4 w-14 h-14 text-primary/15 animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 space-y-8">
        {/* Animated 404 SVG */}
        <div className="relative">
          <svg
            className="w-64 h-64 mx-auto md:w-80 md:h-80"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background glow */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Lost astronaut */}
            <g className="animate-bounce" style={{ animationDuration: "4s" }}>
              {/* Helmet */}
              <ellipse
                cx="200"
                cy="100"
                rx="45"
                ry="50"
                className="fill-muted stroke-foreground"
                strokeWidth="3"
              />
              {/* Visor */}
              <ellipse
                cx="200"
                cy="105"
                rx="32"
                ry="35"
                className="fill-primary/20 stroke-primary"
                strokeWidth="2"
              />
              {/* Reflection on visor */}
              <ellipse cx="185" cy="95" rx="8" ry="12" className="fill-background/40" />

              {/* Body */}
              <rect
                x="160"
                y="148"
                width="80"
                height="70"
                rx="10"
                className="fill-muted stroke-foreground"
                strokeWidth="3"
              />

              {/* Backpack */}
              <rect
                x="235"
                y="155"
                width="25"
                height="55"
                rx="5"
                className="fill-muted-foreground/30 stroke-foreground"
                strokeWidth="2"
              />

              {/* Arms floating */}
              <g className="origin-center" style={{ animation: "wave 2s ease-in-out infinite" }}>
                <rect
                  x="115"
                  y="155"
                  width="50"
                  height="18"
                  rx="9"
                  className="fill-muted stroke-foreground"
                  strokeWidth="2"
                  transform="rotate(-20 140 164)"
                />
              </g>
              <rect
                x="235"
                y="165"
                width="45"
                height="18"
                rx="9"
                className="fill-muted stroke-foreground"
                strokeWidth="2"
                transform="rotate(15 257 174)"
              />

              {/* Legs floating */}
              <rect
                x="168"
                y="215"
                width="22"
                height="45"
                rx="8"
                className="fill-muted stroke-foreground"
                strokeWidth="2"
                transform="rotate(-10 179 237)"
              />
              <rect
                x="210"
                y="215"
                width="22"
                height="45"
                rx="8"
                className="fill-muted stroke-foreground"
                strokeWidth="2"
                transform="rotate(10 221 237)"
              />

              {/* Cable floating away */}
              <path
                d="M 245 180 Q 280 200 290 170 Q 300 140 330 150 Q 360 160 370 130"
                className="stroke-primary/50"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="8 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;24"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Broken cable end */}
              <circle cx="370" cy="130" r="6" className="fill-destructive" filter="url(#glow)" />
            </g>

            {/* Floating debris */}
            <g className="animate-pulse">
              <rect
                x="60"
                y="180"
                width="15"
                height="15"
                rx="2"
                className="fill-muted-foreground/40"
                transform="rotate(45 67 187)"
              />
              <rect
                x="320"
                y="80"
                width="12"
                height="12"
                rx="2"
                className="fill-muted-foreground/30"
                transform="rotate(30 326 86)"
              />
            </g>

            {/* Stars */}
            <circle cx="50" cy="60" r="2" className="fill-foreground/60" />
            <circle cx="350" cy="40" r="2" className="fill-foreground/60" />
            <circle cx="380" cy="200" r="1.5" className="fill-foreground/40" />
            <circle cx="30" cy="220" r="1.5" className="fill-foreground/40" />
            <circle cx="100" cy="30" r="2" className="fill-foreground/50" />
          </svg>

          {/* 404 Text overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <span className="text-8xl md:text-9xl font-bold text-foreground/10 select-none">
              404
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Lost in Space
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto text-pretty">
            Houston, we have a problem. The page you&apos;re looking for has drifted into the void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="gap-2 min-w-[160px]">
            <Link href="" to={"/"}>
              <Home className="w-4 h-4" />
              Login
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 min-w-[160px]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </div>

        {/* Fun SVG decoration at bottom */}
        <div className="pt-8">
          <svg
            className="w-32 h-8 mx-auto text-muted-foreground/30"
            viewBox="0 0 200 30"
            fill="currentColor"
          >
            <circle cx="20" cy="15" r="4" />
            <circle cx="50" cy="15" r="3" />
            <circle cx="75" cy="15" r="2" />
            <circle cx="95" cy="15" r="1.5" />
            <circle cx="105" cy="15" r="1.5" />
            <circle cx="125" cy="15" r="2" />
            <circle cx="150" cy="15" r="3" />
            <circle cx="180" cy="15" r="4" />
          </svg>
        </div>
      </div>

      {/* Custom wave animation */}
      <style>{`
        @keyframes wave {
          0%,
          100% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(-35deg);
          }
        }
      `}</style>
    </div>
  )
}
