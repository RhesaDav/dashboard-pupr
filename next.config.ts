import type { NextConfig } from "next";
import nextPwa from 'next-pwa';

const withPWA = nextPwa({
  dest: 'public', // Direktori output untuk file service worker (sw.js) & workbox
  register: true, // Otomatis menambahkan kode registrasi service worker ke aplikasi Anda
  skipWaiting: true, // Service worker baru akan aktif segera setelah instalasi (recommended)
  disable: process.env.NODE_ENV === 'development', // Nonaktifkan PWA di mode development
  // Caching untuk runtime (API calls, gambar, font, dll.) - PENTING UNTUK OFFLINE DATA
  runtimeCaching: [
    // Strategi untuk API (Contoh: NetworkFirst)
    {
      // Cocokkan dengan URL API Anda (gunakan Regex)
      // Contoh: semua request ke /api/... atau domain API eksternal
      urlPattern: /^https:\/\/api\.domainanda\.com\/.*/i, // atau urlPattern: /\/api\/.*/,
      handler: 'NetworkFirst', // Coba jaringan dulu, jika gagal (offline) gunakan cache
      options: {
        cacheName: 'api-cache', // Nama cache
        networkTimeoutSeconds: 10, // Timeout sebelum fallback ke cache
        expiration: {
          maxEntries: 50,       // Jumlah maksimum item cache
          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache selama 7 hari
        },
        cacheableResponse: {
          statuses: [0, 200], // Hanya cache response sukses
        },
      },
    },
    // Strategi untuk Gambar (Contoh: CacheFirst)
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: 'CacheFirst', // Ambil dari cache dulu, jika tidak ada baru ke jaringan
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache selama 30 hari
        },
        cacheableResponse: { statuses: [0, 200] } // Hanya cache gambar yang sukses diambil
      },
    },
    // Strategi untuk Halaman (Dokumen HTML) - StaleWhileRevalidate bagus untuk ini
    {
      urlPattern: ({ request }) => request.mode === 'navigate', // Cocokkan request navigasi halaman
      handler: 'StaleWhileRevalidate', // Sajikan dari cache, update di background
      options: {
        cacheName: 'page-cache',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache selama 7 hari
        },
        cacheableResponse: { statuses: [0, 200] }
      },
    },
     // Strategi untuk Aset Statis (JS, CSS)
     {
        urlPattern: /\.(?:js|css)$/i,
        handler: 'StaleWhileRevalidate', // Cepat + update background
        options: {
            cacheName: 'static-resources-cache',
            expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache 30 hari
            }
        }
     },
     // Strategi untuk Font (CacheFirst biasanya oke)
     {
        urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'font-cache',
            expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // Cache 1 tahun
            },
            cacheableResponse: { statuses: [0, 200] }
        }
     }
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/home',
        permanent: true,
      },
    ]
  },

};

export default nextConfig;
