import React from 'react';
import { format, addDays, parse } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Define types
interface Addendum {
  id: string;
  hari: string;
  pemberianKesempatan: boolean;
  tipe: 'waktu' | 'nilai' | string;
}

interface FormValues {
  tanggalKontrak: string;
  masaPelaksanaan: number;
  addendum?: Addendum[];
}

interface ContractDurationCardProps {
  form: {
    watch: (field: string) => any;
  };
}

// Roman numeral conversion function
const romanize = (num: number): string => {
  const roman: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X'
  };
  return roman[num] || num.toString();
};

const ContractDurationCard: React.FC<ContractDurationCardProps> = ({ form }) => {
  // Calculate the total contract duration
  const calculateTotalDays = (): number => {
    const baseDays: number = form.watch("masaPelaksanaan") || 0;
    
    // Regular addendum days (non-pemberianKesempatan)
    const regularAddendumDays: number = form.watch("addendum")
      ?.filter((item: Addendum) => Number(item.hari) && !item.pemberianKesempatan && item.tipe === "waktu")
      .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0) || 0;
    
    // Special addendum days (pemberianKesempatan)
    const specialAddendumDays: number = form.watch("addendum")
      ?.filter((item: Addendum) => Number(item.hari) && item.pemberianKesempatan && item.tipe === "waktu")
      .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0) || 0;
    
    return baseDays + regularAddendumDays + specialAddendumDays;
  };

  // Calculate end date based on start date and number of days
  const calculateEndDate = (startDateString: string | undefined, days: number): string => {
    if (!startDateString) return "-";
    
    try {
      const startDate = parse(startDateString, "dd-MM-yyyy", new Date());
      return format(addDays(startDate, days), "dd-MM-yyyy");
    } catch (error) {
      console.error("Date calculation error:", error);
      return "-";
    }
  };

  // Get regular addendums (non-pemberianKesempatan)
  const regularAddendums: Addendum[] = form.watch("addendum")?.filter((item: Addendum) => !item.pemberianKesempatan) || [];
  
  // Get special addendums (pemberianKesempatan)
  const specialAddendums: Addendum[] = form.watch("addendum")?.filter((item: Addendum) => item.pemberianKesempatan) || [];
  
  // Base contract days
  const baseDays: number = form.watch("masaPelaksanaan") || 0;
  
  // Calculate cumulative days for regular addendums
  const getRegularAddendumCumulativeDays = (index: number): number => {
    return baseDays + 
      regularAddendums
        .slice(0, index + 1)
        .filter((item: Addendum) => Number(item.hari) && item.tipe === "waktu")
        .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0);
  };
  
  // Calculate cumulative days including all regular addendums + special addendums up to index
  const getSpecialAddendumCumulativeDays = (index: number): number => {
    const allRegularDays: number = regularAddendums
      .filter((item: Addendum) => Number(item.hari) && item.tipe === "waktu")
      .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0);
      
    const specialDays: number = specialAddendums
      .slice(0, index + 1)
      .filter((item: Addendum) => Number(item.hari) && item.tipe === "waktu")
      .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0);
      
    return baseDays + allRegularDays + specialDays;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Masa Kontrak <span>{calculateTotalDays()} Hari</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Original Contract End Date */}
          <div className="grid grid-cols-12 gap-2 items-center text-sm">
            <div className="col-span-4 font-medium">
              Akhir Kontrak Asli
            </div>
            <div className="col-span-5">
              : {calculateEndDate(form.watch("tanggalKontrak"), baseDays)}
            </div>
            <div className="col-span-3 text-right">
              <span className="px-2 py-1 bg-gray-100 rounded-md">
                {baseDays} Hari
              </span>
            </div>
          </div>

          {/* Regular Addendum Contract End Dates */}
          {regularAddendums.map((item: Addendum, index: number) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center text-sm">
              <div className="col-span-4 font-medium">
                Akhir Kontrak ADD {romanize(index + 1)}
              </div>
              <div className="col-span-5">
                : {calculateEndDate(
                    form.watch("tanggalKontrak"), 
                    getRegularAddendumCumulativeDays(index)
                  )}
              </div>
              <div className="col-span-3 text-right">
                <span className="px-2 py-1 bg-gray-100 rounded-md">
                  {regularAddendums
                    .slice(0, index + 1)
                    .filter((item: Addendum) => Number(item.hari) && item.tipe === "waktu")
                    .reduce((acc: number, item: Addendum) => acc + Number(item.hari || 0), 0)} Hari
                </span>
              </div>
            </div>
          ))}

          {/* Divider when special addendums exist */}
          {specialAddendums.length > 0 && (
            <div className="border-t border-gray-200 my-2"></div>
          )}

          {/* Special Addendum Sections (pemberianKesempatan) */}
          {specialAddendums.map((item: Addendum, index: number) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 items-center text-sm bg-gray-50 p-2 rounded-md"
            >
              <div className="col-span-4 font-medium">
                Addendum {romanize(index + 1)}
              </div>
              <div className="col-span-5">
                : {calculateEndDate(
                    form.watch("tanggalKontrak"),
                    getSpecialAddendumCumulativeDays(index)
                  )}
              </div>
              <div className="col-span-3 text-right">
                <span className="px-2 py-1 bg-white rounded-md">
                  {item.hari || 0} Hari
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractDurationCard;