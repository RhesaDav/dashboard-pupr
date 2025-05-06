import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

function generateWeeks(startDate: Date, durationDays: number) {
  const weeks: { month: string; items: any[] }[] = [];

  let currentDate = new Date(startDate);
  const dayOfWeek = currentDate.getDay();
  const daysToMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 1 - dayOfWeek;
  currentDate.setDate(currentDate.getDate() + daysToMonday);

  const endDate = addDays(startDate, durationDays);
  let weekNumber = 1;
  let currentMonth = '';
  let currentMonthData: { month: string; items: any[] } | null = null;

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  while (currentDate <= endDate) {
    const monthName = formatMonth(currentDate);
    const weekStart = new Date(currentDate);
    const weekEnd = addDays(weekStart, 6);

    if (monthName !== currentMonth) {
      currentMonth = monthName;
      currentMonthData = {
        month: monthName,
        items: [],
      };
      weeks.push(currentMonthData);
    }

    if (currentMonthData) {
      currentMonthData.items.push({
        week: weekNumber,
        startDate: weekStart,
        endDate: weekEnd,
        rencana: 0,
        realisasi: 0,
        deviasi: 0,
      });
    }

    currentDate = addDays(currentDate, 7);
    weekNumber++;
  }

  return weeks;
}

async function main() {
  // 🔄 Bersihkan database
  await prisma.contractAccess.deleteMany();
  await prisma.physicalProgress.deleteMany();
  await prisma.location.deleteMany();
  await prisma.financialProgress.deleteMany();
  await prisma.addendum.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.user.deleteMany();

  // 🔐 Buat 3 user berdasarkan role
  const passwordHash = await bcrypt.hash('123456', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@binamarga.com',
        password: passwordHash,
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Superadmin User',
        email: 'superadmin@binamarga.com',
        password: passwordHash,
        role: 'SUPERADMIN',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Consultant User',
        email: 'consultant@binamarga.com',
        password: passwordHash,
        role: 'CONSULTANT',
      },
    }),
  ]);

  for (let i = 0; i < 10; i++) {
    const tanggalKontrak = faker.date.between({ from: '2024-12-01', to: '2025-05-10' });
    const masaPelaksanaan = faker.number.int({ min: 30, max: 120 });

    const contract = await prisma.contract.create({
      data: {
        namaPaket: faker.commerce.productName(),
        nomorKontrak: `CNTR-${faker.string.numeric(5)}`,
        nilaiKontrak: faker.number.int({ min: 100_000_000, max: 900_000_000 }),
        paguAnggaran: faker.number.int({ min: 100_000_000, max: 900_000_000 }),
        namaPenyedia: `PT. ${faker.company.name()}`,
        tanggalKontrak,
        masaPelaksanaan,
        tanggalKontrakSupervisi: tanggalKontrak,
        hasAddendum: false,
      },
    });

    await prisma.financialProgress.create({
      data: {
        contractId: contract.id,
        termin1: 10,
        termin2: 20,
        termin3: 10,
        termin4: 10,
        uangMuka: 20
      },
    });

    await prisma.location.create({
      data: {
        contractId: contract.id,
        distrik: "Manokwari Barat",
        kota: "MANOKWARI",
        kampung: faker.location.streetAddress()
      },
    });

    const progressWeeks = generateWeeks(tanggalKontrak, masaPelaksanaan);
    for (const month of progressWeeks) {
      await prisma.physicalProgress.createMany({
        data: month.items.map((item) => ({
          contractId: contract.id,
          month: month.month,
          week: item.week,
          startDate: item.startDate,
          endDate: item.endDate,
          rencana: item.rencana,
          realisasi: item.realisasi,
          deviasi: item.deviasi,
        })),
      });
    }
  }

  console.log('✅ Seeding selesai: 3 users & 10 contracts created.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
