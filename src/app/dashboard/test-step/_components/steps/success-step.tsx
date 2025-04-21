import { CheckCircle2 } from "lucide-react"

export default function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-3">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold">Kontrak Berhasil Dibuat!</h2>
      <p className="mt-2 text-muted-foreground">
        Terima kasih telah mengisi formulir. Data kontrak telah berhasil disimpan.
      </p>
    </div>
  )
}
