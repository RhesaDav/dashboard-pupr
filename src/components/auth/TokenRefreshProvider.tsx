'use client'

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"

/**
 * TokenRefreshProvider memantau status sesi di sisi klien.
 * Jika sesi terdeteksi berakhir (null) saat berada di area dashboard,
 * pengguna akan otomatis diarahkan kembali ke halaman login.
 */
export function TokenRefreshProvider() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Hanya lakukan redirect jika proses pemuatan sesi selesai (isPending === false)
    // dan sesi bernilai null (tidak login)
    // dan sedang berada di area dashboard
    if (!isPending && !session && pathname?.startsWith("/dashboard")) {
      console.warn("Session expired or invalid, redirecting to login...")
      router.push("/signin")
      router.refresh()
    }
  }, [session, isPending, pathname, router])

  return null
}
