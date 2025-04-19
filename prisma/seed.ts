// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding process...');

  // Clean existing data
  await cleanDatabase();

  // Create users with different roles
  const users = await createUsers();

  // Create contracts with related data
  await createContracts(users);

  console.log('Seeding completed successfully!');
}

async function cleanDatabase() {
  console.log('Cleaning database...');
  
  // Delete all existing data in reverse order of dependencies
  await prisma.contractAccess.deleteMany({});
  await prisma.addendum.deleteMany({});
  await prisma.physicalProgress.deleteMany({});
  await prisma.financialProgress.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.contract.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('Database cleaned successfully');
}

async function createUsers() {
  console.log('Creating users...');
  
  // Create users with different roles
  const superadmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'superadmin@binamarga.com',
      password: await bcrypt.hash('123456', 10),
      role: 'SUPERADMIN',
      lastLoggedIn: new Date(),
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@binamarga.com',
      password: await bcrypt.hash('123456', 10),
      role: 'ADMIN',
      lastLoggedIn: new Date(),
    },
  });

  const consultant = await prisma.user.create({
    data: {
      name: 'Consultant User',
      email: 'consultant@binamarga.com',
      password: await bcrypt.hash('123456', 10),
      role: 'CONSULTANT',
      lastLoggedIn: new Date(),
    },
  });

  console.log('Users created successfully');
  
  return { superadmin, admin, consultant };
}

async function createContracts(users: { superadmin: any, admin: any, consultant: any }) {
  console.log('Creating contracts and related data...');
  
  // Create first contract with all related data
  const contract1 = await prisma.contract.create({
    data: {
      namaPaket: 'Pembangunan Jalan Utama Kampung Sari',
      namaPenyedia: 'PT. Konstruksi Jaya',
      ppk: 'Ir. Bambang Sutrisno',
      nipPPK: '197505152000031002',
      korwaslap: 'Ahmad Fatoni, ST',
      nipKorwaslap: '198203102006041003',
      pengawasLapangan: 'Eko Prabowo',
      nipPengawasLapangan: '199001152015071001',
      paguAnggaran: '3.500.000.000',
      nilaiKontrak: 3200000000,
      sumberDana: 'APBD 2023',
      nomorKontrak: 'KONTR/2023/PJU-01',
      tanggalKontrak: new Date('2023-03-15'),
      masaPelaksanaan: 180,
      subKegiatan: 'Pembangunan Infrastruktur Jalan',
      volumeKontrak: '2.5 KM',
      satuanKontrak: 'KM',
      konsultanSupervisi: 'CV. Teknik Konsultan',
      nomorKontrakSupervisi: 'KONTR/2023/KONS-01',
      nilaiKontrakSupervisi: 180000000,
      tanggalKontrakSupervisi: new Date('2023-03-20'),
      masaPelaksanaanSupervisi: 200,
      pemberianKesempatan: false,
      hasilProdukAkhir: 'Jalan dengan perkerasan aspal hotmix',
      dimensi: 'Lebar 6 meter, tebal 4 cm',
      kendala: true,
      permasalahan: 'Cuaca hujan yang menghambat pengerjaan pada bulan pertama',
      keterangan: 'Proyek sedang berjalan sesuai jadwal revisi',
      dokumentasiAwal: 'https://storage.example.com/docs/jalan-sari-awal.jpg',
      dokumentasiTengah: 'https://storage.example.com/docs/jalan-sari-tengah.jpg',
      dokumentasiAkhir: null,
      startDate: new Date('2023-04-01'),
      endDate: new Date('2023-09-28'),
      hasAddendum: true,
      location: {
        create: {
          kota: 'Jayapura',
          distrik: 'Abepura',
          kampung: 'Kampung Sari',
          koordinatAwal: '-2.5916, 140.6689',
          koordinatAkhir: '-2.5820, 140.6750',
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
            name: 'Addendum Perpanjangan Waktu',
            tipe: 'waktu',
            hari: '30',
            pemberianKesempatan: true,
          },
        ],
      },
      physicalProgress: {
        create: [
          {
            month: 'April',
            week: 1,
            startDate: new Date('2023-04-01'),
            endDate: new Date('2023-04-07'),
            rencana: 5.0,
            realisasi: 4.2,
            deviasi: -0.8,
          },
          {
            month: 'April',
            week: 2,
            startDate: new Date('2023-04-08'),
            endDate: new Date('2023-04-14'),
            rencana: 10.0,
            realisasi: 8.5,
            deviasi: -1.5,
          },
          {
            month: 'April',
            week: 3,
            startDate: new Date('2023-04-15'),
            endDate: new Date('2023-04-21'),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: 'April',
            week: 4,
            startDate: new Date('2023-04-22'),
            endDate: new Date('2023-04-30'),
            rencana: 20.0,
            realisasi: 18.8,
            deviasi: -1.2,
          },
          {
            month: 'May',
            week: 1,
            startDate: new Date('2023-05-01'),
            endDate: new Date('2023-05-07'),
            rencana: 25.0,
            realisasi: 23.5,
            deviasi: -1.5,
          },
          {
            month: 'May',
            week: 2,
            startDate: new Date('2023-05-08'),
            endDate: new Date('2023-05-14'),
            rencana: 30.0,
            realisasi: 29.2,
            deviasi: -0.8,
          },
          {
            month: 'May',
            week: 3,
            startDate: new Date('2023-05-15'),
            endDate: new Date('2023-05-21'),
            rencana: 35.0,
            realisasi: 34.6,
            deviasi: -0.4,
          },
          {
            month: 'May',
            week: 4,
            startDate: new Date('2023-05-22'),
            endDate: new Date('2023-05-31'),
            rencana: 40.0,
            realisasi: 40.2,
            deviasi: 0.2,
          },
          {
            month: 'June',
            week: 1,
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-06-07'),
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
      namaPaket: 'Pembangunan Drainase Kota Sentani',
      namaPenyedia: 'PT. Karya Mandiri',
      ppk: 'Drs. Suparman',
      nipPPK: '196808171995121001',
      korwaslap: 'Hendra Wijaya, ST',
      nipKorwaslap: '198505202010011005',
      pengawasLapangan: 'Budi Santoso',
      nipPengawasLapangan: '199104282017081002',
      paguAnggaran: '1.200.000.000',
      nilaiKontrak: 1150000000,
      sumberDana: 'DAK 2023',
      nomorKontrak: 'KONTR/2023/DKS-01',
      tanggalKontrak: new Date('2023-02-10'),
      masaPelaksanaan: 120,
      subKegiatan: 'Pembangunan Sistem Drainase',
      volumeKontrak: '1.8 KM',
      satuanKontrak: 'KM',
      pemberianKesempatan: false,
      hasilProdukAkhir: 'Saluran drainase beton bertulang',
      dimensi: 'Lebar 1 meter, kedalaman 1.5 meter',
      kendala: false,
      startDate: new Date('2023-02-20'),
      endDate: new Date('2023-06-20'),
      hasAddendum: false,
      location: {
        create: {
          kota: 'Jayapura',
          distrik: 'Sentani',
          kampung: 'Hinekombe',
          koordinatAwal: '-2.5933, 140.5161',
          koordinatAkhir: '-2.5975, 140.5230',
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
            month: 'February',
            week: 4,
            startDate: new Date('2023-02-20'),
            endDate: new Date('2023-02-28'),
            rencana: 8.0,
            realisasi: 7.5,
            deviasi: -0.5,
          },
          {
            month: 'March',
            week: 1,
            startDate: new Date('2023-03-01'),
            endDate: new Date('2023-03-07'),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: 'March',
            week: 2,
            startDate: new Date('2023-03-08'),
            endDate: new Date('2023-03-14'),
            rencana: 22.0,
            realisasi: 21.0,
            deviasi: -1.0,
          },
          {
            month: 'March',
            week: 3,
            startDate: new Date('2023-03-15'),
            endDate: new Date('2023-03-21'),
            rencana: 29.0,
            realisasi: 28.5,
            deviasi: -0.5,
          },
          {
            month: 'March',
            week: 4,
            startDate: new Date('2023-03-22'),
            endDate: new Date('2023-03-31'),
            rencana: 36.0,
            realisasi: 35.0,
            deviasi: -1.0,
          },
          {
            month: 'April',
            week: 1,
            startDate: new Date('2023-04-01'),
            endDate: new Date('2023-04-07'),
            rencana: 43.0,
            realisasi: 42.0,
            deviasi: -1.0,
          },
          {
            month: 'April',
            week: 2,
            startDate: new Date('2023-04-08'),
            endDate: new Date('2023-04-14'),
            rencana: 50.0,
            realisasi: 49.5,
            deviasi: -0.5,
          },
          {
            month: 'April',
            week: 3,
            startDate: new Date('2023-04-15'),
            endDate: new Date('2023-04-21'),
            rencana: 57.0,
            realisasi: 56.0,
            deviasi: -1.0,
          },
          {
            month: 'April',
            week: 4,
            startDate: new Date('2023-04-22'),
            endDate: new Date('2023-04-30'),
            rencana: 64.0,
            realisasi: 63.0,
            deviasi: -1.0,
          },
          {
            month: 'May',
            week: 1,
            startDate: new Date('2023-05-01'),
            endDate: new Date('2023-05-07'),
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
      namaPaket: 'Renovasi Gedung Kantor Distrik Abepura',
      namaPenyedia: 'CV. Arsitektur Nusantara',
      ppk: 'Ir. Wahyu Hidayat',
      nipPPK: '197210182001121003',
      korwaslap: 'Deni Purnama, ST',
      nipKorwaslap: '198607122011011004',
      pengawasLapangan: 'Rudi Santoso',
      nipPengawasLapangan: '199212152018081001',
      paguAnggaran: '850.000.000',
      nilaiKontrak: 825000000,
      sumberDana: 'APBD 2023',
      nomorKontrak: 'KONTR/2023/RGA-01',
      tanggalKontrak: new Date('2023-05-01'),
      masaPelaksanaan: 90,
      subKegiatan: 'Renovasi Bangunan Pemerintah',
      volumeKontrak: '450 M²',
      satuanKontrak: 'M²',
      konsultanSupervisi: 'PT. Arsitektur Konsultan',
      nomorKontrakSupervisi: 'KONTR/2023/KONS-03',
      nilaiKontrakSupervisi: 65000000,
      tanggalKontrakSupervisi: new Date('2023-05-05'),
      masaPelaksanaanSupervisi: 100,
      pemberianKesempatan: false,
      hasilProdukAkhir: 'Gedung kantor yang telah direnovasi',
      dimensi: 'Luas bangunan 450 M²',
      kendala: false,
      startDate: new Date('2023-05-10'),
      endDate: new Date('2023-08-08'),
      hasAddendum: true,
      location: {
        create: {
          kota: 'Jayapura',
          distrik: 'Abepura',
          kampung: 'Vim',
          koordinatAwal: '-2.5998, 140.6703',
          koordinatAkhir: '-2.5998, 140.6703',
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
            name: 'Addendum Penambahan Volume',
            tipe: 'volume',
            volume: '50 M²',
            satuan: 'M²',
            pemberianKesempatan: false,
          },
        ],
      },
      physicalProgress: {
        create: [
          {
            month: 'May',
            week: 2,
            startDate: new Date('2023-05-10'),
            endDate: new Date('2023-05-14'),
            rencana: 5.0,
            realisasi: 4.5,
            deviasi: -0.5,
          },
          {
            month: 'May',
            week: 3,
            startDate: new Date('2023-05-15'),
            endDate: new Date('2023-05-21'),
            rencana: 10.0,
            realisasi: 9.5,
            deviasi: -0.5,
          },
          {
            month: 'May',
            week: 4,
            startDate: new Date('2023-05-22'),
            endDate: new Date('2023-05-31'),
            rencana: 15.0,
            realisasi: 14.0,
            deviasi: -1.0,
          },
          {
            month: 'June',
            week: 1,
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-06-07'),
            rencana: 20.0,
            realisasi: 19.0,
            deviasi: -1.0,
          },
          {
            month: 'June',
            week: 2,
            startDate: new Date('2023-06-08'),
            endDate: new Date('2023-06-14'),
            rencana: 25.0,
            realisasi: 24.5,
            deviasi: -0.5,
          },
          {
            month: 'June',
            week: 3,
            startDate: new Date('2023-06-15'),
            endDate: new Date('2023-06-21'),
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

  console.log('Contracts created successfully');
  
  return { contract1, contract2, contract3 };
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });