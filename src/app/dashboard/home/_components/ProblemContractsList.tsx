"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Calendar, MapPin } from "lucide-react";

interface ProblemContractsListProps {
  contracts: any[];
}

export function ProblemContractsList({ contracts }: ProblemContractsListProps) {
  return (
    <Card>
      <CardHeader className="bg-red-50">
        <CardTitle className="text-lg flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Kontrak Bermasalah
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract: any) => (
            <div
              key={contract.id}
              className="p-4 border rounded-lg hover:bg-red-50 transition-colors space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">{contract.packageName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
                    <MapPin className="w-4 h-4" />
                    {contract.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
                    <Calendar className="w-4 h-4" />
                    {contract.startDate} – {contract.endDate}
                  </div>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Bermasalah
                </span>
              </div>

              {contract.issueDetails && (
                <div className="text-sm space-y-2 mt-2">
                  <p className="whitespace-pre-line">{contract.issueDetails.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Tipe: {contract.issueDetails.type}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        contract.issueDetails.severity === "BERAT"
                          ? "bg-red-200 text-red-900"
                          : contract.issueDetails.severity === "SEDANG"
                          ? "bg-orange-200 text-orange-900"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      Keparahan: {contract.issueDetails.severity}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {contract.issueDetails.progressImpact}
                    </span>
                  </div>

                  {contract.issueDetails.suggestedActions?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-sm mb-1">Tindakan yang Disarankan:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {contract.issueDetails.suggestedActions.map((action: string, i: number) => (
                          <li key={i}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
