// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding process...");

  // Clean existing data
  await cleanDatabase();

  // Create users with different roles
  const users = await createUsers();

  // Create contracts with related data
  await createContracts(users);

  console.log("Seeding completed successfully!");
}

async function cleanDatabase() {
  console.log("Cleaning database...");

  // Delete all existing data in reverse order of dependencies
  await prisma.contractAccess.deleteMany({});
  await prisma.addendum.deleteMany({});
  await prisma.physicalProgress.deleteMany({});
  await prisma.financialProgress.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.contract.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database cleaned successfully");
}

async function createUsers() {
  console.log("Creating users...");

  // Create users with different roles
  const superadmin = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin@binamarga.com",
      password: await bcrypt.hash("123456", 10),
      role: "SUPERADMIN",
      lastLoggedIn: new Date(),
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@binamarga.com",
      password: await bcrypt.hash("123456", 10),
      role: "ADMIN",
      lastLoggedIn: new Date(),
    },
  });

  const consultant = await prisma.user.create({
    data: {
      name: "Consultant User",
      email: "consultant@binamarga.com",
      password: await bcrypt.hash("123456", 10),
      role: "CONSULTANT",
      lastLoggedIn: new Date(),
    },
  });

  console.log("Users created successfully");

  return { superadmin, admin, consultant };
}

async function createContracts(users: {
  superadmin: any;
  admin: any;
  consultant: any;
}) {
  console.log("Creating contracts and related data...");

  // Create first contract with all related data
  const contract1 = await prisma.contract.create({
    data: {
      namaPaket: "Pembangunan Jalan Utama Kampung Sari",
      namaPenyedia: "PT. Konstruksi Jaya",
      ppk: "Ir. Bambang Sutrisno",
      nipPPK: "197505152000031002",
      korwaslap: "Ahmad Fatoni, ST",
      nipKorwaslap: "198203102006041003",
      pengawasLapangan: "Eko Prabowo",
      nipPengawasLapangan: "199001152015071001",
      paguAnggaran: 3500000000,
      nilaiKontrak: 3200000000,
      sumberDana: "APBD 2023",
      nomorKontrak: "KONTR/2023/PJU-01",
      tanggalKontrak: new Date("2023-03-15"),
      masaPelaksanaan: 180,
      subKegiatan: "Pembangunan Infrastruktur Jalan",
      volumeKontrak: "2.5 KM",
      satuanKontrak: "KM",
      konsultanSupervisi: "CV. Teknik Konsultan",
      nomorKontrakSupervisi: "KONTR/2023/KONS-01",
      nilaiKontrakSupervisi: 180000000,
      tanggalKontrakSupervisi: new Date("2023-03-20"),
      masaPelaksanaanSupervisi: 200,
      hasilProdukAkhir: "Jalan dengan perkerasan aspal hotmix",
      dimensi: "Lebar 6 meter, tebal 4 cm",
      kendala: true,
      permasalahan: "Cuaca hujan yang menghambat pengerjaan pada bulan pertama",
      keterangan: "Proyek sedang berjalan sesuai jadwal revisi",
      dokumentasiAwal: "https://storage.example.com/docs/jalan-sari-awal.jpg",
      dokumentasiTengah:
        "https://storage.example.com/docs/jalan-sari-tengah.jpg",
      dokumentasiAkhir: null,
      hasAddendum: true,
      location: {
        create: {
          kota: "Jayapura",
          distrik: "Abepura",
          kampung: "Kampung Sari",
          koordinatAwal: "-2.5916, 140.6689",
          koordinatAkhir: "-2.5820, 140.6750",
        },
      },
      financialProgress: {
        create: {
          totalProgress: 45.5,
          totalPayment: 1456000000,
          uangMuka: 20.0,
          termin1: 30.0,
          termin2: 25.0,
          termin3: 15.0,
          termin4: 10.0,
        },
      },
      addendum: {
        create: [
          {
            name: "Addendum Perpanjangan Waktu",
            tipe: "waktu",
            hari: "30",
            pemberianKesempatan: true,
          },
        ],
      },
      physicalProgress: {
        create: [
          {
            month: "April 2023",
            week: 1,
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-04-07"),
            rencana: 5.0,
            realisasi: 4.2,
            deviasi: -0.8,
          },
          {
            month: "April 2023",
            week: 2,
            startDate: new Date("2023-04-08"),
            endDate: new Date("2023-04-14"),
            rencana: 10.0,
            realisasi: 8.5,
            deviasi: -1.5,
          },
          {
            month: "April 2023",
            week: 3,
            startDate: new Date("2023-04-15"),
            endDate: new Date("2023-04-21"),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: "April 2023",
            week: 4,
            startDate: new Date("2023-04-22"),
            endDate: new Date("2023-04-30"),
            rencana: 20.0,
            realisasi: 18.8,
            deviasi: -1.2,
          },
          {
            month: "May 2023",
            week: 1,
            startDate: new Date("2023-05-01"),
            endDate: new Date("2023-05-07"),
            rencana: 25.0,
            realisasi: 23.5,
            deviasi: -1.5,
          },
          {
            month: "May 2023",
            week: 2,
            startDate: new Date("2023-05-08"),
            endDate: new Date("2023-05-14"),
            rencana: 30.0,
            realisasi: 29.2,
            deviasi: -0.8,
          },
          {
            month: "May 2023",
            week: 3,
            startDate: new Date("2023-05-15"),
            endDate: new Date("2023-05-21"),
            rencana: 35.0,
            realisasi: 34.6,
            deviasi: -0.4,
          },
          {
            month: "May 2023",
            week: 4,
            startDate: new Date("2023-05-22"),
            endDate: new Date("2023-05-31"),
            rencana: 40.0,
            realisasi: 40.2,
            deviasi: 0.2,
          },
          {
            month: "June 2023",
            week: 1,
            startDate: new Date("2023-06-01"),
            endDate: new Date("2023-06-07"),
            rencana: 45.0,
            realisasi: 45.5,
            deviasi: 0.5,
          },
        ],
      },
      contractAccess: {
        create: [
          {
            userId: users.superadmin.id,
          },
          {
            userId: users.admin.id,
          },
        ],
      },
    },
  });

  // Create second contract
  const contract2 = await prisma.contract.create({
    data: {
      namaPaket: "Pembangunan Drainase Kota Sentani",
      namaPenyedia: "PT. Karya Mandiri",
      ppk: "Drs. Suparman",
      nipPPK: "196808171995121001",
      korwaslap: "Hendra Wijaya, ST",
      nipKorwaslap: "198505202010011005",
      pengawasLapangan: "Budi Santoso",
      nipPengawasLapangan: "199104282017081002",
      paguAnggaran: 1200000000,
      nilaiKontrak: 1150000000,
      sumberDana: "DAK 2023",
      nomorKontrak: "KONTR/2023/DKS-01",
      tanggalKontrak: new Date("2023-02-10"),
      masaPelaksanaan: 120,
      subKegiatan: "Pembangunan Sistem Drainase",
      volumeKontrak: "1.8 KM",
      satuanKontrak: "KM",
      hasilProdukAkhir: "Saluran drainase beton bertulang",
      dimensi: "Lebar 1 meter, kedalaman 1.5 meter",
      kendala: false,
      hasAddendum: false,
      location: {
        create: {
          kota: "Jayapura",
          distrik: "Sentani",
          kampung: "Hinekombe",
          koordinatAwal: "-2.5933, 140.5161",
          koordinatAkhir: "-2.5975, 140.5230",
        },
      },
      financialProgress: {
        create: {
          totalProgress: 70.5,
          totalPayment: 810750000,
          uangMuka: 20.0,
          termin1: 25.0,
          termin2: 25.0,
          termin3: 20.0,
          termin4: 10.0,
        },
      },
      physicalProgress: {
        create: [
          {
            month: "February 2023",
            week: 4,
            startDate: new Date("2023-02-20"),
            endDate: new Date("2023-02-28"),
            rencana: 8.0,
            realisasi: 7.5,
            deviasi: -0.5,
          },
          {
            month: "March 2023",
            week: 1,
            startDate: new Date("2023-03-01"),
            endDate: new Date("2023-03-07"),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: "March 2023",
            week: 2,
            startDate: new Date("2023-03-08"),
            endDate: new Date("2023-03-14"),
            rencana: 22.0,
            realisasi: 21.0,
            deviasi: -1.0,
          },
          {
            month: "March 2023",
            week: 3,
            startDate: new Date("2023-03-15"),
            endDate: new Date("2023-03-21"),
            rencana: 29.0,
            realisasi: 28.5,
            deviasi: -0.5,
          },
          {
            month: "March 2023",
            week: 4,
            startDate: new Date("2023-03-22"),
            endDate: new Date("2023-03-31"),
            rencana: 36.0,
            realisasi: 35.0,
            deviasi: -1.0,
          },
          {
            month: "April 2023",
            week: 1,
            startDate: new Date("2023-04-01"),
            endDate: new Date("2023-04-07"),
            rencana: 43.0,
            realisasi: 42.0,
            deviasi: -1.0,
          },
          {
            month: "April 2023",
            week: 2,
            startDate: new Date("2023-04-08"),
            endDate: new Date("2023-04-14"),
            rencana: 50.0,
            realisasi: 49.5,
            deviasi: -0.5,
          },
          {
            month: "April 2023",
            week: 3,
            startDate: new Date("2023-04-15"),
            endDate: new Date("2023-04-21"),
            rencana: 57.0,
            realisasi: 56.0,
            deviasi: -1.0,
          },
          {
            month: "April 2023",
            week: 4,
            startDate: new Date("2023-04-22"),
            endDate: new Date("2023-04-30"),
            rencana: 64.0,
            realisasi: 63.0,
            deviasi: -1.0,
          },
          {
            month: "May 2023",
            week: 1,
            startDate: new Date("2023-05-01"),
            endDate: new Date("2023-05-07"),
            rencana: 70.0,
            realisasi: 70.5,
            deviasi: 0.5,
          },
        ],
      },
      contractAccess: {
        create: [
          {
            userId: users.superadmin.id,
          },
          {
            userId: users.consultant.id,
          },
        ],
      },
    },
  });

  // Create third contract
  const contract3 = await prisma.contract.create({
    data: {
      namaPaket: "Renovasi Gedung Kantor Distrik Abepura",
      namaPenyedia: "CV. Arsitektur Nusantara",
      ppk: "Ir. Wahyu Hidayat",
      nipPPK: "197210182001121003",
      korwaslap: "Deni Purnama, ST",
      nipKorwaslap: "198607122011011004",
      pengawasLapangan: "Rudi Santoso",
      nipPengawasLapangan: "199212152018081001",
      paguAnggaran: 850000000,
      nilaiKontrak: 825000000,
      sumberDana: "APBD 2023",
      nomorKontrak: "KONTR/2023/RGA-01",
      tanggalKontrak: new Date("2023-05-01"),
      masaPelaksanaan: 90,
      subKegiatan: "Renovasi Bangunan Pemerintah",
      volumeKontrak: "450 M²",
      satuanKontrak: "M²",
      konsultanSupervisi: "PT. Arsitektur Konsultan",
      nomorKontrakSupervisi: "KONTR/2023/KONS-03",
      nilaiKontrakSupervisi: 65000000,
      tanggalKontrakSupervisi: new Date("2023-05-05"),
      masaPelaksanaanSupervisi: 100,
      hasilProdukAkhir: "Gedung kantor yang telah direnovasi",
      dimensi: "Luas bangunan 450 M²",
      kendala: false,
      hasAddendum: true,
      location: {
        create: {
          kota: "Jayapura",
          distrik: "Abepura",
          kampung: "Vim",
          koordinatAwal: "-2.5998, 140.6703",
          koordinatAkhir: "-2.5998, 140.6703",
        },
      },
      financialProgress: {
        create: {
          totalProgress: 30.0,
          totalPayment: 247500000,
          uangMuka: 15.0,
          termin1: 30.0,
          termin2: 30.0,
          termin3: 25.0,
          termin4: 0.0,
        },
      },
      addendum: {
        create: [
          {
            name: "Addendum Penambahan Volume",
            tipe: "volume",
            volume: "50 M²",
            satuan: "M²",
            pemberianKesempatan: false,
          },
        ],
      },
      physicalProgress: {
        create: [
          {
            month: "May 2023",
            week: 2,
            startDate: new Date("2023-05-10"),
            endDate: new Date("2023-05-14"),
            rencana: 5.0,
            realisasi: 4.5,
            deviasi: -0.5,
          },
          {
            month: "May 2023",
            week: 3,
            startDate: new Date("2023-05-15"),
            endDate: new Date("2023-05-21"),
            rencana: 10.0,
            realisasi: 9.5,
            deviasi: -0.5,
          },
          {
            month: "May 2023",
            week: 4,
            startDate: new Date("2023-05-22"),
            endDate: new Date("2023-05-31"),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: "June 2023",
            week: 1,
            startDate: new Date("2023-06-01"),
            endDate: new Date("2023-06-07"),
            rencana: 20.0,
            realisasi: 19.0,
            deviasi: -1.0,
          },
          {
            month: "June 2023",
            week: 2,
            startDate: new Date("2023-06-08"),
            endDate: new Date("2023-06-14"),
            rencana: 25.0,
            realisasi: 24.5,
            deviasi: -0.5,
          },
          {
            month: "June 2023",
            week: 3,
            startDate: new Date("2023-06-15"),
            endDate: new Date("2023-06-21"),
            rencana: 30.0,
            realisasi: 30.0,
            deviasi: 0.0,
          },
        ],
      },
      contractAccess: {
        create: [
          {
            userId: users.superadmin.id,
          },
          {
            userId: users.admin.id,
          },
          {
            userId: users.consultant.id,
          },
        ],
      },
    },
  });

  const kontrakList = [
    {
      namaPaket: "Pembangunan Jembatan Sungai Tami",
      namaPenyedia: "PT. Karya Prima",
      ppk: "Ir. Budi Hartono",
      nipPPK: "197305012002121001",
      korwaslap: "Andi Firmansyah, ST",
      nipKorwaslap: "198511192010121003",
      pengawasLapangan: "Siti Nurhaliza",
      nipPengawasLapangan: "199001202017042001",
      paguAnggaran: 1200000000,
      nilaiKontrak: 1170000000,
      tanggalKontrak: new Date("2025-03-15"),
      masaPelaksanaan: 90,
    },
    {
      namaPaket: "Rehabilitasi Saluran Irigasi Kampung Yoka",
      namaPenyedia: "CV. Tirta Mandiri",
      ppk: "Ir. Agus Suryana",
      nipPPK: "196912101998031003",
      korwaslap: "Hendra Saputra, ST",
      nipKorwaslap: "198703242012011002",
      pengawasLapangan: "Wulan Fitriani",
      nipPengawasLapangan: "199211052019032004",
      paguAnggaran: 650000000,
      nilaiKontrak: 620000000,
      tanggalKontrak: new Date("2025-04-01"),
      masaPelaksanaan: 60,
    },
    {
      namaPaket: "Peningkatan Jalan Kampung Harapan",
      namaPenyedia: "PT. Papua Sejahtera",
      ppk: "Ir. Sri Wahyuni",
      nipPPK: "197801182003122002",
      korwaslap: "Arman Hakim, ST",
      nipKorwaslap: "198511132009121001",
      pengawasLapangan: "Yoga Pratama",
      nipPengawasLapangan: "199301202018061003",
      paguAnggaran: 950000000,
      nilaiKontrak: 930000000,
      tanggalKontrak: new Date("2025-04-10"),
      masaPelaksanaan: 75,
    },
    {
      namaPaket: "Pembangunan Gedung Serbaguna Kampung Waena",
      namaPenyedia: "CV. Bangun Cipta",
      ppk: "Ir. Taufik Hidayat",
      nipPPK: "197605182000122003",
      korwaslap: "Maya Kartika, ST",
      nipKorwaslap: "198905102013031005",
      pengawasLapangan: "Dede Kurniawan",
      nipPengawasLapangan: "199202102017071002",
      paguAnggaran: 800000000,
      nilaiKontrak: 780000000,
      tanggalKontrak: new Date("2025-04-20"),
      masaPelaksanaan: 65,
    },
    {
      namaPaket: "Rehabilitasi Rumah Dinas Guru",
      namaPenyedia: "PT. Cipta Mandiri",
      ppk: "Ir. Rina Susanti",
      nipPPK: "197411282001122001",
      korwaslap: "Yudi Pranata, ST",
      nipKorwaslap: "198409142011011002",
      pengawasLapangan: "Lia Puspita",
      nipPengawasLapangan: "199104182019072003",
      paguAnggaran: 500000000,
      nilaiKontrak: 480000000,
      tanggalKontrak: new Date("2025-04-12"),
      masaPelaksanaan: 45,
    },
    {
      namaPaket: "Pemeliharaan Jalan Lingkungan Kelurahan Entrop",
      namaPenyedia: "CV. Prima Karya",
      ppk: "Ir. Hendra Wijaya",
      nipPPK: "197901112005122005",
      korwaslap: "Ratna Dewi, ST",
      nipKorwaslap: "198802172014032003",
      pengawasLapangan: "Bayu Saputra",
      nipPengawasLapangan: "199305162018041002",
      paguAnggaran: 400000000,
      nilaiKontrak: 385000000,
      tanggalKontrak: new Date("2025-03-29"),
      masaPelaksanaan: 40,
    },
    {
      namaPaket: "Pembangunan Pos Kesehatan Desa (Poskesdes)",
      namaPenyedia: "PT. Medika Sejahtera",
      ppk: "Ir. Diah Lestari",
      nipPPK: "197604122002122006",
      korwaslap: "Rizky Ramadhan, ST",
      nipKorwaslap: "198709112012021002",
      pengawasLapangan: "Melati Wulandari",
      nipPengawasLapangan: "199210172019022004",
      paguAnggaran: 750000000,
      nilaiKontrak: 730000000,
      tanggalKontrak: new Date("2025-04-05"),
      masaPelaksanaan: 55,
    },
    {
      namaPaket: "Pemasangan Lampu Jalan Kota Jayapura",
      namaPenyedia: "CV. Cahaya Abadi",
      ppk: "Ir. Bambang Suharto",
      nipPPK: "197212152000121001",
      korwaslap: "Intan Permatasari, ST",
      nipKorwaslap: "198601212010122001",
      pengawasLapangan: "Andika Pratama",
      nipPengawasLapangan: "199211282018061005",
      paguAnggaran: 600000000,
      nilaiKontrak: 590000000,
      tanggalKontrak: new Date("2025-04-22"),
      masaPelaksanaan: 50,
    },
    {
      namaPaket: "Pembangunan Drainase Jalan Pasar Lama",
      namaPenyedia: "PT. Drainusa Teknik",
      ppk: "Ir. Kusuma Dewi",
      nipPPK: "197703022003122002",
      korwaslap: "Faisal Rahman, ST",
      nipKorwaslap: "198803122012011001",
      pengawasLapangan: "Ayu Lestari",
      nipPengawasLapangan: "199306222018061003",
      paguAnggaran: 700000000,
      nilaiKontrak: 685000000,
      tanggalKontrak: new Date("2025-04-18"),
      masaPelaksanaan: 60,
    },
    {
      namaPaket: "Renovasi Puskesmas Abepura",
      namaPenyedia: "CV. Medika Utama",
      ppk: "Ir. Suyanto",
      nipPPK: "197402142001121005",
      korwaslap: "Diana Amelia, ST",
      nipKorwaslap: "198703152010122004",
      pengawasLapangan: "Ferry Kurniawan",
      nipPengawasLapangan: "199312182018071001",
      paguAnggaran: 900000000,
      nilaiKontrak: 870000000,
      tanggalKontrak: new Date("2025-04-08"),
      masaPelaksanaan: 70,
    },
    {
      namaPaket: "Pembangunan Talud Penahan Longsor Kampung Nolokla",
      namaPenyedia: "CV. Mitra Alam",
      ppk: "Ir. Slamet Riyadi",
      nipPPK: "197605182001121001",
      korwaslap: "Yohana Mulyani, ST",
      nipKorwaslap: "198512202010122002",
      pengawasLapangan: "Rahmat Hidayat",
      nipPengawasLapangan: "199204152018041002",
      paguAnggaran: 550000000,
      nilaiKontrak: 535000000,
      tanggalKontrak: new Date("2025-04-15"),
      masaPelaksanaan: 45,
    },
    {
      namaPaket: "Perbaikan Jalan Akses Sekolah Kampung Skouw",
      namaPenyedia: "PT. Jayapura Konstruksi",
      ppk: "Ir. Endang Sulastri",
      nipPPK: "197311192001122004",
      korwaslap: "Bambang Yulianto, ST",
      nipKorwaslap: "198412022012021001",
      pengawasLapangan: "Nina Agustina",
      nipPengawasLapangan: "199309102019012003",
      paguAnggaran: 720000000,
      nilaiKontrak: 710000000,
      tanggalKontrak: new Date("2025-03-31"),
      masaPelaksanaan: 55,
    },
    {
      namaPaket: "Renovasi Kantor Distrik Muara Tami",
      namaPenyedia: "CV. Karya Sejati",
      ppk: "Ir. Joko Widodo",
      nipPPK: "197011152001121001",
      korwaslap: "Herlina Sari, ST",
      nipKorwaslap: "198712112011022001",
      pengawasLapangan: "Rangga Prasetya",
      nipPengawasLapangan: "199312152018061003",
      paguAnggaran: 850000000,
      nilaiKontrak: 820000000,
      tanggalKontrak: new Date("2025-04-19"),
      masaPelaksanaan: 60,
    },
    {
      namaPaket: "Pembangunan Gedung PKK Kota Jayapura",
      namaPenyedia: "PT. Cipta Murni",
      ppk: "Ir. Dian Paramita",
      nipPPK: "197805162002122002",
      korwaslap: "Indra Gunawan, ST",
      nipKorwaslap: "198601172010121004",
      pengawasLapangan: "Sarah Angelina",
      nipPengawasLapangan: "199205202017082002",
      paguAnggaran: 1100000000,
      nilaiKontrak: 1085000000,
      tanggalKontrak: new Date("2025-04-11"),
      masaPelaksanaan: 75,
    },
    {
      namaPaket: "Rehabilitasi Drainase Jalan Poros Koya",
      namaPenyedia: "CV. Draino Teknik",
      ppk: "Ir. Anwar Sadat",
      nipPPK: "197501132001121004",
      korwaslap: "Citra Purnama, ST",
      nipKorwaslap: "198812022012031003",
      pengawasLapangan: "Dimas Aditya",
      nipPengawasLapangan: "199410182019052001",
      paguAnggaran: 670000000,
      nilaiKontrak: 660000000,
      tanggalKontrak: new Date("2025-04-03"),
      masaPelaksanaan: 50,
    },
    {
      namaPaket: "Peningkatan Jalan Lingkungan BTN Heram",
      namaPenyedia: "PT. Papua Jaya Mandiri",
      ppk: "Ir. Linda Kartika",
      nipPPK: "197401122003122003",
      korwaslap: "Fahmi Rizal, ST",
      nipKorwaslap: "198504212010121003",
      pengawasLapangan: "Selvi Amelia",
      nipPengawasLapangan: "199209202017072001",
      paguAnggaran: 920000000,
      nilaiKontrak: 895000000,
      tanggalKontrak: new Date("2025-04-07"),
      masaPelaksanaan: 70,
    },
    {
      namaPaket: "Perbaikan Gedung Perpustakaan Daerah",
      namaPenyedia: "CV. Buku Pintar",
      ppk: "Ir. Rudi Hartono",
      nipPPK: "197311102001121002",
      korwaslap: "Vera Setiawati, ST",
      nipKorwaslap: "198701252012031004",
      pengawasLapangan: "Tomi Saputra",
      nipPengawasLapangan: "199307222019032002",
      paguAnggaran: 480000000,
      nilaiKontrak: 470000000,
      tanggalKontrak: new Date("2025-04-14"),
      masaPelaksanaan: 40,
    },
    {
      namaPaket: "Pembangunan Pos Ronda Kampung Ayapo",
      namaPenyedia: "CV. Jaya Abadi",
      ppk: "Ir. Anton Sihombing",
      nipPPK: "197302192002121005",
      korwaslap: "Liana Octaviani, ST",
      nipKorwaslap: "198702202011011004",
      pengawasLapangan: "Bayu Fadillah",
      nipPengawasLapangan: "199411302018071001",
      paguAnggaran: 300000000,
      nilaiKontrak: 290000000,
      tanggalKontrak: new Date("2025-04-02"),
      masaPelaksanaan: 30,
    },
    {
      namaPaket: "Pembangunan Jaringan Air Bersih Kampung Nafri",
      namaPenyedia: "PT. Air Bersih Papua",
      ppk: "Ir. Mega Sari",
      nipPPK: "197608152001122006",
      korwaslap: "Rio Pradipta, ST",
      nipKorwaslap: "198505182010121002",
      pengawasLapangan: "Tina Anastasya",
      nipPengawasLapangan: "199312172018071003",
      paguAnggaran: 850000000,
      nilaiKontrak: 840000000,
      tanggalKontrak: new Date("2025-04-09"),
      masaPelaksanaan: 65,
    },
    {
      namaPaket: "Pemasangan Rambu Lalu Lintas Jalan Kota",
      namaPenyedia: "CV. Sinar Jalan",
      ppk: "Ir. Taufan Ridwan",
      nipPPK: "197211052002121005",
      korwaslap: "Desi Anggraini, ST",
      nipKorwaslap: "198612012012011004",
      pengawasLapangan: "Reza Mahendra",
      nipPengawasLapangan: "199406102018061004",
      paguAnggaran: 550000000,
      nilaiKontrak: 545000000,
      tanggalKontrak: new Date("2025-04-13"),
      masaPelaksanaan: 35,
    },
  ];

  for (const kontrak of kontrakList) {
    await prisma.contract.create({ data: kontrak });
  }

  console.log("Contracts created successfully");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
