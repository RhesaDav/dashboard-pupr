import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Font.register({ family: 'Roboto', src: '/fonts/Roboto-Regular.ttf' }); 

export interface PdfData {
  tahun: number | string;
  sasaran: string;
  indikator: string;
  pekerjaan: string;
  deskripsi: string;
  lingkupPekerjaan: string;
  dimensi: number | string;
  // panjang?: number | string;
  // lebar?: number | string;
  // tebal?: number | string;
  lokasi: {
    kabupaten: string;
    distrik: string;
    koordinatAwal: string;
    koordinatAkhir: string;
  };
  kontrakFisik: {
    nilai: string;
    kontraktor: string;
    nomor: string;
    nomorAddendum1?: string;
    nomorAddendum2?: string;
  };
  kontrakPengawasan: {
    nilai: string;
    konsultan: string;
    nomor: string;
  };
  pihakTerlibat: {
    direksi: string;
    koordinatorPengawas: string;
    ppk: string;
  };
  realisasi: {
    rencanaFisik: string;
    realisasiFisik: string;
    rencanaKeuangan: string;
    realisasiKeuangan: string;
  };
  dataPendukung: {
    laporan: string;
    gambar: string;
    dokumentasi: string;
    backUpQuality: string;
  };
  manfaat: string[];
  foto0?: string | null;
  foto50?: string | null;
  foto100?: string | null;
  penandatangan: {
    ppk: { nama: string; nip: string };
    koordinator: { nama: string; nip: string };
    pengawasLapangan: { nama: string; nip: string };
  };
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 8,
    fontSize: 7,
  },
  header: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 3,
    borderWidth: 1,
    borderColor: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#000000',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  cell: {
    padding: 3,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  cellNoBorder: {
    padding: 3,
  },
  leftColumn: {
    width: '25%',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    padding: 3,
  },
  middleColumn: {
    width: '45%',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    padding: 3,
  },
  rightColumn: {
    width: '30%',
    borderBottomWidth: 1,
    borderColor: '#000000',
    padding: 3,
  },
  rowWithLabel: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    marginRight: 5,
  },
  colon: {
    width: 10,
    textAlign: 'center',
  },
  value: {
    flex: 1,
  },
  valueWithUnit: {
    flexDirection: 'row',
  },
  unit: {
    marginLeft: 5,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 15,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
  },
  fotoSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  fotoContainer: {
    width: '33.33%',
    padding: 3,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#000000',
  },
  fotoContainerLast: {
    width: '33.33%',
    padding: 3,
    alignItems: 'center',
  },
  fotoTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foto: {
    width: '100%',
    height: 150,
  },
  signatureSection: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signatureColumn: {
    width: '33.33%',
    alignItems: 'center',
    padding: 3,
  },
  signatureTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  signatureName: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  signatureNip: {
    textAlign: 'center',
  },
  nestedList: {
    marginLeft: 10,
  },
});

const PdfDocument: React.FC<{ data: PdfData }> = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>HASIL PELAKSANAAN KEGIATAN TAHUN {data.tahun}</Text>

      {/* Baris 1: Sasaran, Deskripsi, dan Data */}
      <View style={styles.tableRow}>
        <View style={styles.leftColumn}>
          <Text style={{ fontWeight: 'bold' }}>Sasaran</Text>
          <Text>{data.sasaran}</Text>
        </View>
        <View style={styles.middleColumn}>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Deskripsi</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.deskripsi}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Lingkup Pekerjaan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.lingkupPekerjaan}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Dimensi</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.dimensi}</Text>
          </View>
          
          {/* Panjang, Lebar, Tebal dengan bullet points */}
          {/* <View style={styles.bulletItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.label}>Panjang</Text>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueWithUnit}>
              <Text>{data.panjang}</Text>
              <Text style={styles.unit}>Meter</Text>
            </View>
          </View>
          
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.label}>Lebar</Text>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueWithUnit}>
              <Text>{data.lebar}</Text>
              <Text style={styles.unit}>Meter</Text>
            </View>
          </View>
          
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>-</Text>
            <Text style={styles.label}>Tebal</Text>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueWithUnit}>
              <Text>{data.tebal}</Text>
              <Text style={styles.unit}>Meter</Text>
            </View>
          </View> */}
          
          {/* Lokasi dan koordinat */}
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.lokasi.kabupaten}</Text>
          </View>
          
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Distrik</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.lokasi.distrik}</Text>
          </View>
          
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Koordinat Awal</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.lokasi.koordinatAwal}</Text>
          </View>
          
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Koordinat Akhir</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.lokasi.koordinatAkhir}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}></View>
      </View>

      {/* Baris 2: Pekerjaan, Data Pekerjaan, Realisasi */}
      <View style={styles.tableRow}>
        <View style={styles.leftColumn}>
          <Text style={{ fontWeight: 'bold' }}>Pekerjaan</Text>
          <Text>{data.pekerjaan}</Text>
        </View>
        <View style={styles.middleColumn}>
          <Text style={{ fontWeight: 'bold' }}>Data Pekerjaan</Text>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nilai Kontrak Fisik</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakFisik.nilai}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nama Kontraktor</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakFisik.kontraktor}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nomor Kontrak Fisik</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakFisik.nomor}</Text>
          </View>
          {data.kontrakFisik.nomorAddendum1 && (
            <View style={styles.rowWithLabel}>
              <Text style={styles.label}>Nomor Kontrak Addendum I</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.kontrakFisik.nomorAddendum1}</Text>
            </View>
          )}
          {data.kontrakFisik.nomorAddendum2 && (
            <View style={styles.rowWithLabel}>
              <Text style={styles.label}>Nomor Kontrak Addendum II</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.value}>{data.kontrakFisik.nomorAddendum2}</Text>
            </View>
          )}
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nilai Kontrak Pengawasan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakPengawasan.nilai}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nama Konsultan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakPengawasan.konsultan}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nomor Kontrak Pengawasan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.kontrakPengawasan.nomor}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nama Direksi (Pengawas Lapangan)</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.pihakTerlibat.direksi}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Nama Koordinator Pengawas Lapangan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.pihakTerlibat.koordinatorPengawas}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Kepala Bidang / PPK</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.pihakTerlibat.ppk}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <Text style={{ fontWeight: 'bold' }}>Realisasi</Text>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Rencana Target Fisik</Text>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueWithUnit}>
              <Text>{data.realisasi.rencanaFisik}</Text>
              {/* <Text style={styles.unit}>Meter</Text> */}
            </View>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Realisasi Target Fisik</Text>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueWithUnit}>
              <Text>{data.realisasi.realisasiFisik}</Text>
              {/* <Text style={styles.unit}>Meter</Text> */}
            </View>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Rencana Keuangan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.realisasi.rencanaKeuangan}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Realisasi Keuangan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.realisasi.realisasiKeuangan}</Text>
          </View>
          
          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Data Pendukung</Text>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Laporan</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.dataPendukung.laporan}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Gambar</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.dataPendukung.gambar}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Dokumentasi</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.dataPendukung.dokumentasi}</Text>
          </View>
          <View style={styles.rowWithLabel}>
            <Text style={styles.label}>Back Up Quality</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>{data.dataPendukung.backUpQuality}</Text>
          </View>
        </View>
      </View>

      {/* Baris 3: Manfaat dan Foto-foto */}
      <View style={styles.tableRow}>
        <View style={styles.leftColumn}>
          <Text style={{ fontWeight: 'bold' }}>Manfaat</Text>
          {data.manfaat.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bullet}>{index + 1}.</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.fotoSection, { width: '75%', borderLeftWidth: 0 }]}>
          <View style={styles.fotoContainer}>
            <Text style={styles.fotoTitle}>FOTO 0%</Text>
            {data.foto0 ? (
              <Image src={data.foto0} style={styles.foto} />
            ) : (
              <View style={[styles.foto, { backgroundColor: '#E0E0E0' }]} />
            )}
          </View>
          <View style={styles.fotoContainer}>
            <Text style={styles.fotoTitle}>FOTO 50%</Text>
            {data.foto50 ? (
              <Image src={data.foto50} style={styles.foto} />
            ) : (
              <View style={[styles.foto, { backgroundColor: '#E0E0E0' }]} />
            )}
          </View>
          <View style={styles.fotoContainerLast}>
            <Text style={styles.fotoTitle}>FOTO 100%</Text>
            {data.foto100 ? (
              <Image src={data.foto100} style={styles.foto} />
            ) : (
              <View style={[styles.foto, { backgroundColor: '#E0E0E0' }]} />
            )}
          </View>
        </View>
      </View>

      {/* Bagian Tanda Tangan */}
      <View style={styles.signatureSection}>
        <View style={styles.signatureColumn}>
          <Text style={styles.signatureTitle}>KEPALA BIDANG / PPK</Text>
          <Text style={styles.signatureName}>{data.penandatangan.ppk.nama}</Text>
          <Text style={styles.signatureNip}>NIP. {data.penandatangan.ppk.nip}</Text>
        </View>
        <View style={styles.signatureColumn}>
          <Text style={styles.signatureTitle}>KOORDINATOR PENGAWAS LAPANGAN</Text>
          <Text style={styles.signatureName}>{data.penandatangan.koordinator.nama}</Text>
          <Text style={styles.signatureNip}>NIP. {data.penandatangan.koordinator.nip}</Text>
        </View>
        <View style={styles.signatureColumn}>
          <Text style={styles.signatureTitle}>DIREKSI (PENGAWAS LAPANGAN)</Text>
          <Text style={styles.signatureName}>{data.penandatangan.pengawasLapangan.nama}</Text>
          <Text style={styles.signatureNip}>NIP. {data.penandatangan.pengawasLapangan.nip}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;