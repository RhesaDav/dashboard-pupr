'use client'

import { useEffect } from 'react'
import { refreshTokenAction } from '@/actions/auth'

export function TokenRefreshProvider() {
  useEffect(() => {
    // Cek dan refresh token setiap 45 menit (lebih awal dari 1 jam)
    const refreshInterval = setInterval(async () => {
      const result = await refreshTokenAction()
      
      if (!result.success) {
        // Redirect ke halaman login jika refresh gagal
        window.location.href = '/login'
      }
    }, 45 * 60 * 1000) // 45 menit

    return () => clearInterval(refreshInterval)
  }, [])

  return null
}
