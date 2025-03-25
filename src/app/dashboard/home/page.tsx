export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Selamat Datang di Dashboard Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Jumlah Paket</h2>
          <p className="text-xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Nilai Kontrak</h2>
          <p className="text-xl font-bold">Rp 5.000.000.000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Nilai Anggaran</h2>
          <p className="text-xl font-bold">Rp 10.000.000.000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Progress Fisik</h2>
          <p className="text-xl font-bold">75%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Progress Keuangan</h2>
          <p className="text-xl font-bold">60%</p>
        </div>
      </div>
    </div>
  );
}
