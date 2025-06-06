import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_SIKERJA,
});

export const pgClient = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

export type TipePaket = 'Fisik' | 'Pengawasan' | 'Perencanaan' | 'LainLain';

export interface Paket {
  id: string;
  createdAt: string;
  title?: string;
  kodeRekening?: string;
  tipePaket: TipePaket;
  urusan?: string;
  bidang?: string;
  distrik?: string;
  kabupatenKota?: string;
  titikKoordinat?: string;
  penyedia?: string;
  nomorKontrak?: string;
  nilaiKontrak?: string;
  nilaiPagu?: string;
  sumberDana?: string;
  awalKontrak?: string;
  akhirKontrak?: string;
  volumeKontrak?: string;
  satuanKontrak?: string;
  korwaslap?: string;
  pengawasLapangan?: string;
  hasilProdukAkhir?: string;
  tautanMediaProgresAwal?: string;
  tautanMediaProgresTengah?: string;
  tautanMediaProgresAkhir?: string;
  progresFisik?: string;
  progresKeuangan?: string;
  keuanganTerbayar?: string;
  volumeDPA?: string;
  satuanDPA?: string;
  volumeCapaian?: string;
  satuanCapaian?: string;
  kegiatanId?: string;
  programId?: string;
  subKegiatanId?: string;
  kampung?: string;
  nipKorwaslap?: string;
  nipPengawas?: string;
  tanggalKontrak?: string;
  nipPejabatPembuatKomitmen?: string;
  pejabatPembuatKomitmen?: string;
  klasifikasi?: string;

  kegiatan_id?: string | null;
  kegiatan_title?: string | null;
  program_id?: string | null;
  program_title?: string | null;
  subkegiatan_id?: string | null;
  subkegiatan_title?: string | null;
}

export async function getPaket(): Promise<Paket[]> {
  const query = `
    SELECT 
      p.id,
      p."createdAt",
      p.title,
      p."kodeRekening",
      p."tipePaket",
      p.urusan,
      p.bidang,
      p.distrik,
      p."kabupatenKota",
      p."titikKoordinat",
      p.penyedia,
      p."nomorKontrak",
      p."nilaiKontrak",
      p."nilaiPagu",
      p."sumberDana",
      p."awalKontrak",
      p."akhirKontrak",
      p."volumeKontrak",
      p."satuanKontrak",
      p.korwaslap,
      p."pengawasLapangan",
      p."hasilProdukAkhir",
      p."tautanMediaProgresAwal",
      p."tautanMediaProgresTengah",
      p."tautanMediaProgresAkhir",
      p."progresFisik",
      p."progresKeuangan",
      p."keuanganTerbayar",
      p."volumeDPA",
      p."satuanDPA",
      p."volumeCapaian",
      p."satuanCapaian",
      p.kampung,
      p."nipKorwaslap",
      p."nipPengawas",
      p."tanggalKontrak",
      p."nipPejabatPembuatKomitmen",
      p."pejabatPembuatKomitmen",
      p.klasifikasi,
      k.id AS kegiatan_id,
      k.title AS kegiatan_title,
      pr.id AS program_id,
      pr.title AS program_title,
      sk.id AS subkegiatan_id,
      sk.title AS subkegiatan_title
    FROM sikerjaprod."Paket" p
    LEFT JOIN "Kegiatan" k ON p."kegiatanId" = k.id
    LEFT JOIN "Program" pr ON p."programId" = pr.id
    LEFT JOIN "SubKegiatan" sk ON p."subKegiatanId" = sk.id
    ORDER BY p."createdAt" DESC
  `;
  
  const res = await pgClient.query(query);
  return res.rows;
}

export async function getPaketById(id: string): Promise<Paket | null> {
  const query = `
    SELECT 
      p.id,
      p."createdAt",
      p.title,
      p."kodeRekening",
      p."tipePaket",
      p.urusan,
      p.bidang,
      p.distrik,
      p."kabupatenKota",
      p."titikKoordinat",
      p.penyedia,
      p."nomorKontrak",
      p."nilaiKontrak",
      p."nilaiPagu",
      p."sumberDana",
      p."awalKontrak",
      p."akhirKontrak",
      p."volumeKontrak",
      p."satuanKontrak",
      p.korwaslap,
      p."pengawasLapangan",
      p."hasilProdukAkhir",
      p."tautanMediaProgresAwal",
      p."tautanMediaProgresTengah",
      p."tautanMediaProgresAkhir",
      p."progresFisik",
      p."progresKeuangan",
      p."keuanganTerbayar",
      p."volumeDPA",
      p."satuanDPA",
      p."volumeCapaian",
      p."satuanCapaian",
      p.kampung,
      p."nipKorwaslap",
      p."nipPengawas",
      p."tanggalKontrak",
      p."nipPejabatPembuatKomitmen",
      p."pejabatPembuatKomitmen",
      p.klasifikasi,
      k.id AS kegiatan_id,
      k.title AS kegiatan_title,
      pr.id AS program_id,
      pr.title AS program_title,
      sk.id AS subkegiatan_id,
      sk.title AS subkegiatan_title
    FROM sikerjaprod."Paket" p
    LEFT JOIN sikerjaprod."Kegiatan" k ON p."kegiatanId" = k.id
    LEFT JOIN sikerjaprod."Program" pr ON p."programId" = pr.id
    LEFT JOIN sikerjaprod."SubKegiatan" sk ON p."subKegiatanId" = sk.id
    WHERE p.id = $1
  `;
  
  const res = await pgClient.query(query, [id]);
  return res.rows[0] || null;
}

export interface InsertPaketInput {
  id?: string; // Optional ID to allow setting specific ID from another database
  title?: string;
  kodeRekening?: string;
  tipePaket: TipePaket;
  urusan?: string;
  bidang?: string;
  distrik?: string;
  kabupatenKota?: string;
  titikKoordinat?: string;
  penyedia?: string;
  nomorKontrak?: string;
  nilaiKontrak?: string;
  nilaiPagu?: string;
  sumberDana?: string;
  awalKontrak?: string;
  akhirKontrak?: string;
  volumeKontrak?: string;
  satuanKontrak?: string;
  korwaslap?: string;
  pengawasLapangan?: string;
  hasilProdukAkhir?: string;
  tautanMediaProgresAwal?: string;
  tautanMediaProgresTengah?: string;
  tautanMediaProgresAkhir?: string;
  progresFisik?: string;
  progresKeuangan?: string;
  keuanganTerbayar?: string;
  volumeDPA?: string;
  satuanDPA?: string;
  volumeCapaian?: string;
  satuanCapaian?: string;
  kegiatanId?: string;
  programId?: string;
  subKegiatanId?: string;
  kampung?: string;
  nipKorwaslap?: string;
  nipPengawas?: string;
  tanggalKontrak?: string;
  nipPejabatPembuatKomitmen?: string;
  pejabatPembuatKomitmen?: string;
  klasifikasi?: string;
}

export async function insertPaket(data: InsertPaketInput): Promise<Paket> {
  const query = `
    INSERT INTO sikerjaprod."Paket" (
      id, "createdAt", title, "kodeRekening", "tipePaket", urusan, bidang, distrik, "kabupatenKota",
      "titikKoordinat", penyedia, "nomorKontrak", "nilaiKontrak", "nilaiPagu", "sumberDana", "awalKontrak",
      "akhirKontrak", "volumeKontrak", "satuanKontrak", korwaslap, "pengawasLapangan", "hasilProdukAkhir",
      "tautanMediaProgresAwal", "tautanMediaProgresTengah", "tautanMediaProgresAkhir", "progresFisik",
      "progresKeuangan", "keuanganTerbayar", "volumeDPA", "satuanDPA", "volumeCapaian", "satuanCapaian",
      "kegiatanId", "programId", "subKegiatanId", kampung, "nipKorwaslap", "nipPengawas", "tanggalKontrak",
      "nipPejabatPembuatKomitmen", "pejabatPembuatKomitmen", klasifikasi
    ) VALUES (
      $1, now(), $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20, $21,
      $22, $23, $24, $25,
      $26, $27, $28, $29, $30, $31,
      $32, $33, $34, $35, $36, $37, $38,
      $39, $40, $41
    ) RETURNING *;
  `;

  const values = [
    data.id ?? null, // Use provided ID or null (will generate UUID if null)
    data.title ?? null,
    data.kodeRekening ?? null,
    data.tipePaket,
    data.urusan ?? null,
    data.bidang ?? null,
    data.distrik ?? null,
    data.kabupatenKota ?? null,
    data.titikKoordinat ?? null,
    data.penyedia ?? null,
    data.nomorKontrak ?? null,
    data.nilaiKontrak ?? null,
    data.nilaiPagu ?? null,
    data.sumberDana ?? null,
    data.awalKontrak ?? null,
    data.akhirKontrak ?? null,
    data.volumeKontrak ?? null,
    data.satuanKontrak ?? null,
    data.korwaslap ?? null,
    data.pengawasLapangan ?? null,
    data.hasilProdukAkhir ?? null,
    data.tautanMediaProgresAwal ?? null,
    data.tautanMediaProgresTengah ?? null,
    data.tautanMediaProgresAkhir ?? null,
    data.progresFisik ?? null,
    data.progresKeuangan ?? null,
    data.keuanganTerbayar ?? null,
    data.volumeDPA ?? null,
    data.satuanDPA ?? null,
    data.volumeCapaian ?? null,
    data.satuanCapaian ?? null,
    data.kegiatanId ?? null,
    data.programId ?? null,
    data.subKegiatanId ?? null,
    data.kampung ?? null,
    data.nipKorwaslap ?? null,
    data.nipPengawas ?? null,
    data.tanggalKontrak ?? null,
    data.nipPejabatPembuatKomitmen ?? null,
    data.pejabatPembuatKomitmen ?? null,
    data.klasifikasi ?? null,
  ];

  // If ID is not provided, use gen_random_uuid()
  if (!data.id) {
    const queryWithUUID = query.replace('$1', 'gen_random_uuid()');
    values.shift(); // Remove the first parameter (id)
    const res = await pgClient.query(queryWithUUID, values);
    return res.rows[0];
  }

  const res = await pgClient.query(query, values);
  return res.rows[0];
}

export interface UpdatePaketInput extends Partial<InsertPaketInput> {
  id: string; // ID is required for update
}

export async function updatePaket(data: UpdatePaketInput): Promise<Paket | null> {
  // Build dynamic update query based on provided fields
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Add fields to update if they are provided
  const fieldMappings = {
    title: 'title',
    kodeRekening: '"kodeRekening"',
    tipePaket: '"tipePaket"',
    urusan: 'urusan',
    bidang: 'bidang',
    distrik: 'distrik',
    kabupatenKota: '"kabupatenKota"',
    titikKoordinat: '"titikKoordinat"',
    penyedia: 'penyedia',
    nomorKontrak: '"nomorKontrak"',
    nilaiKontrak: '"nilaiKontrak"',
    nilaiPagu: '"nilaiPagu"',
    sumberDana: '"sumberDana"',
    awalKontrak: '"awalKontrak"',
    akhirKontrak: '"akhirKontrak"',
    volumeKontrak: '"volumeKontrak"',
    satuanKontrak: '"satuanKontrak"',
    korwaslap: 'korwaslap',
    pengawasLapangan: '"pengawasLapangan"',
    hasilProdukAkhir: '"hasilProdukAkhir"',
    tautanMediaProgresAwal: '"tautanMediaProgresAwal"',
    tautanMediaProgresTengah: '"tautanMediaProgresTengah"',
    tautanMediaProgresAkhir: '"tautanMediaProgresAkhir"',
    progresFisik: '"progresFisik"',
    progresKeuangan: '"progresKeuangan"',
    keuanganTerbayar: '"keuanganTerbayar"',
    volumeDPA: '"volumeDPA"',
    satuanDPA: '"satuanDPA"',
    volumeCapaian: '"volumeCapaian"',
    satuanCapaian: '"satuanCapaian"',
    kegiatanId: '"kegiatanId"',
    programId: '"programId"',
    subKegiatanId: '"subKegiatanId"',
    kampung: 'kampung',
    nipKorwaslap: '"nipKorwaslap"',
    nipPengawas: '"nipPengawas"',
    tanggalKontrak: '"tanggalKontrak"',
    nipPejabatPembuatKomitmen: '"nipPejabatPembuatKomitmen"',
    pejabatPembuatKomitmen: '"pejabatPembuatKomitmen"',
    klasifikasi: 'klasifikasi'
  };

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'id' && key in fieldMappings && value !== undefined) {
      updateFields.push(`${fieldMappings[key as keyof typeof fieldMappings]} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  if (updateFields.length === 0) {
    throw new Error('No fields to update');
  }

  // Add ID parameter for WHERE clause
  values.push(data.id);

  const query = `
    UPDATE sikerjaprod."Paket" 
    SET ${updateFields.join(', ')}
    WHERE id = $${paramCount}
    RETURNING *;
  `;

  const res = await pgClient.query(query, values);
  return res.rows[0] || null;
}

export async function deletePaket(id: string): Promise<boolean> {
  const query = `
    DELETE FROM sikerjaprod."Paket" 
    WHERE id = $1
    RETURNING id;
  `;

  const res = await pgClient.query(query, [id]);
  return res.rows.length > 0;
}