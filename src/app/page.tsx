import Image from "next/image";
import Link from "next/link"
import { ViewTransition } from "react"
import styles from "./home.module.css"

export default function Home() {
  return (
      <ViewTransition
          enter={{'fade-white': 'fade-white-enter', default: 'none'}}
          exit={{'fade-white': 'fade-white-exit', default: 'none'}}
          default="none">
          <Link href="/quiz/list" transitionTypes={['fade-white']}
                className={`flex items-center justify-center h-screen w-screen ${styles['fade-in']}`}>
              <video src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/intro_vertical.webm`}
                     autoPlay
                     loop
                     muted
                     className="fixed top-0 left-0 size-full object-cover -z-10"/>
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/logo.png`} alt="Logo"
                     className="w-96 lg:w-3xl h-auto" width={715} height={797}/>
              <span className={`text-4xl lg:text-7xl font-semibold uppercase text-center
                            ${styles['fade-border']} ${styles.blink} ${styles.bottom}
                            z-0 bg-opacity-50 opacity-50 px-4 py-2 lg:px-8 lg:py-4 w-4/5`}>
                Tap to start
              </span>
          </Link>
      </ViewTransition>
  )
}
