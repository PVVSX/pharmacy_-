"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/layout/Footer";

const scheduleData = [
  { day: "จันทร์", type: "lec", subject: "Adv. Pharmacotherapeutics I", room: "BCP-101", start: 8, duration: 2 },
  { day: "จันทร์", type: "lec", subject: "Evidence-Based Medicine", room: "BCP-102", start: 10, duration: 1 },
  { day: "จันทร์", type: "lec", subject: "Clinical Pharmacokinetics", room: "BCP-102", start: 11, duration: 1 },
  { day: "จันทร์", type: "lab", subject: "Internal Medicine Ward Round", room: "Ward 1", start: 13, duration: 3 },
  
  { day: "อังคาร", type: "lec", subject: "Cardiovascular Pharmacotherapy", room: "BCP-101", start: 8, duration: 2 },
  { day: "อังคาร", type: "lec", subject: "Biostatistics", room: "BCP-103", start: 10, duration: 1 },
  { day: "อังคาร", type: "lec", subject: "Research Methodology", room: "BCP-103", start: 11, duration: 1 },
  { day: "อังคาร", type: "lab", subject: "Cardiology Ward Round", room: "CCU", start: 13, duration: 3 },
  
  { day: "พุธ", type: "lec", subject: "Infectious Disease Pharmacotherapy", room: "BCP-101", start: 8, duration: 2 },
  { day: "พุธ", type: "lec", subject: "Critical Care Pharmacotherapy", room: "BCP-101", start: 10, duration: 2 },
  { day: "พุธ", type: "lec", subject: "Ambulatory Care Practice", room: "OPD-1", start: 13, duration: 2 },
  
  { day: "พฤหัสบดี", type: "lec", subject: "Adv. Pharmacotherapeutics II", room: "BCP-102", start: 8, duration: 2 },
  { day: "พฤหัสบดี", type: "lec", subject: "Oncology Pharmacy Practice", room: "BCP-102", start: 10, duration: 2 },
  { day: "พฤหัสบดี", type: "lab", subject: "Oncology Ward Round", room: "Ward 2", start: 13, duration: 3 },
  
  { day: "ศุกร์", type: "lec", subject: "Pharmacogenomics & Precision Med.", room: "BCP-103", start: 8, duration: 2 },
  { day: "ศุกร์", type: "lab", subject: "ICU Ward Round", room: "ICU", start: 10, duration: 2 },
  { day: "ศุกร์", type: "lab", subject: "Case Presentation & Seminar", room: "Conf Room", start: 13, duration: 3 },
];

const dayRowMap: Record<string, number> = {
  "จันทร์": 2,
  "อังคาร": 3,
  "พุธ": 4,
  "พฤหัสบดี": 5,
  "ศุกร์": 6,
};

const times = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"];

export default function SchedulePage() {
  return (
    <>
      <div className="p-4 md:p-6 pb-24 max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-semibold mb-1">ตารางเรียน (Class Schedule)</h1>
            <p className="text-xs text-muted-foreground">หลักสูตรวุฒิบัตรฯ สาขาเภสัชบำบัด (BCP) · ภาคปฏิบัติการและทฤษฎีขั้นสูง</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20 text-xs px-2 py-1">ทฤษฎี (Lecture)</Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-xs px-2 py-1">ปฏิบัติการ (Lab)</Badge>
          </div>
        </div>

        <Card className="card-shadow overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div 
                className="grid min-w-[1100px] border-b border-border text-xs" 
                style={{ gridTemplateColumns: '80px repeat(9, minmax(110px, 1fr))' }}
              >
                {/* Header Row */}
                <div className="font-semibold text-center py-4 border-b border-r border-border bg-muted/40" style={{ gridRow: 1, gridColumn: 1 }}>วัน/เวลา</div>
                {times.map((time, i) => (
                  <div key={i} className="font-semibold text-center py-4 border-b border-r border-border bg-muted/40" style={{ gridRow: 1, gridColumn: i + 2 }}>
                    {time}
                  </div>
                ))}

                {/* Day Labels */}
                {Object.keys(dayRowMap).map((day, i) => (
                  <div key={day} className="font-medium text-center flex items-center justify-center border-b border-r border-border bg-muted/10 py-6" style={{ gridRow: i + 2, gridColumn: 1 }}>
                    {day}
                  </div>
                ))}

                {/* Empty Grid Cells for Borders */}
                {Array.from({ length: 5 }).map((_, r) => (
                  Array.from({ length: 9 }).map((_, c) => (
                    <div key={`empty-${r}-${c}`} className="border-b border-r border-border/50" style={{ gridRow: r + 2, gridColumn: c + 2 }}></div>
                  ))
                ))}

                {/* Lunch Break */}
                <div 
                  className="bg-muted/30 text-muted-foreground flex items-center justify-center border-b border-r border-border/50 overflow-hidden" 
                  style={{ gridRow: "2 / 7", gridColumn: 6 }}
                >
                  <span className="rotate-90 whitespace-nowrap font-medium tracking-widest text-[13px]">พักรับประทานอาหารกลางวัน</span>
                </div>

                {/* Event Cells */}
                {scheduleData.map((evt, i) => (
                  <div 
                    key={i} 
                    className={`m-1 p-2 rounded-md border flex flex-col items-center justify-center text-center shadow-sm transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden
                      ${evt.type === 'lab' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-800 dark:text-blue-300'}`} 
                    style={{ gridRow: dayRowMap[evt.day], gridColumn: `${(evt.start - 8) + 2} / span ${evt.duration}` }}
                  >
                    <span className={`font-semibold line-clamp-2 leading-tight break-words w-full ${evt.subject.length > 15 && evt.duration === 1 ? 'text-[9px]' : ''}`}>{evt.subject}</span>
                    <span className="text-[9px] opacity-75 mt-1 font-mono">({evt.room})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
