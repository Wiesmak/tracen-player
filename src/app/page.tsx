import Image from "next/image";
import Link from "next/link"
import styles from "./home.module.css"

export default function Home() {
  return (
      <Link href="/quiz/list" className="flex items-center justify-center h-screen w-screen">
          <video src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/intro_vertical.webm`}
                 autoPlay
                 loop
                 muted
                 className="fixed top-0 left-0 size-full object-cover -z-10"/>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/ui/demologo2.png`} alt="Logo"
                 className="w-96 h-auto" width={715} height={797}/>
          <span className={`text-4xl font-semibold uppercase text-center
                        ${styles['fade-border']} ${styles.blink} ${styles.bottom}
                        z-0 bg-opacity-50 opacity-50 px-4 py-2 w-4/5`}>
            Tap to start
          </span>
      </Link>
  )
}
