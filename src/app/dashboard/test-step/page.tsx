import MultiStepForm from "./_components/multi-step-form";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">Buat Data Kontrak Baru</h1>
      <div className="grid grid-cols-1">
        <MultiStepForm />
      </div>
    </main>
  )
}
