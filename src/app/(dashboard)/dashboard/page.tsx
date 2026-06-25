"use client";

import Footer from "@/components/layout/Footer";
import { dashboardData } from "@/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const iconClass = "material-symbols-outlined text-[20px]";
const iconSm = "material-symbols-outlined text-[16px]";

export default function DashboardPage() {
  const d = dashboardData;

  return (
    <div className="p-4 md:p-6 pb-16 max-w-[1280px] mx-auto">
      <header className="mb-5">
        <h1 className="text-lg md:text-xl font-semibold mb-0.5">
          ยินดีต้อนรับกลับ, {d.studentName}
        </h1>
        <p className="text-xs text-muted-foreground">
          รหัสนักศึกษา: {d.studentId}
        </p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { icon: "school", label: "เกรดเฉลี่ย (GPA)", value: d.gpa.toFixed(2), color: "text-primary", bg: "bg-primary/10", border: false, borderDestructive: false },
          { icon: "credit_score", label: "หน่วยกิตที่ได้รับ", value: `${d.creditsEarned}/${d.creditsTotal}`, color: "text-chart-3", bg: "bg-chart-3/10", border: true, borderDestructive: false },
          { icon: "how_to_reg", label: "สถานะการลงทะเบียน", value: d.registrationTerm, color: "text-secondary-foreground", bg: "bg-secondary/20", border: false, borderDestructive: false },
          { icon: "warning", label: "ยอดค้างชำระ", value: `฿${d.balanceDue.toLocaleString()}`, color: "text-destructive", bg: "bg-destructive/10", border: false, borderDestructive: true },
        ].map((m) => (
          <Card key={m.label} className={`card-shadow ${m.border ? "border-l-4 border-l-chart-3" : ""} ${m.borderDestructive ? "border-l-4 border-l-destructive" : ""}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.bg} flex-shrink-0`}>
                <span className={`${iconClass} ${m.color}`}>{m.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Event Banner */}
      <Card className="card-shadow overflow-hidden mb-5 border-none relative h-[160px] md:h-[200px] hover:shadow-md transition-shadow cursor-pointer">
        <img src="/images/assets/meeting/meeting-banner.png" alt="Upcoming Event" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center p-5 md:p-8">
          <Badge className="w-fit mb-2 bg-blue-500/20 text-blue-100 border border-blue-500/30 text-[10px]">กิจกรรมกำลังจะมาถึง</Badge>
          <h2 className="text-lg md:text-xl font-bold text-white mb-1.5 drop-shadow-sm">งานประชุมวิชาการนานาชาติด้านเภสัชศาสตร์ 2569</h2>
          <p className="text-xs text-gray-200 flex items-center gap-1.5 drop-shadow-sm">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            10 มิถุนายน 2569 | โรงแรมเซ็นทาราแกรนด์
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* GPA Trend */}
        <Card className="lg:col-span-2 card-shadow hover:-translate-y-1 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">แนวโน้มผลการเรียน (GPA Trend)</CardTitle>
            <CardDescription className="text-xs">เกรดเฉลี่ยสะสมแยกตามภาคการศึกษา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={d.gpaHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.1)" />
                  <XAxis dataKey="semester" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                  <YAxis domain={[2.0, 4.0]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="var(--color-primary)" 
                    strokeWidth={4} 
                    dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))" }} 
                    activeDot={{ r: 7, fill: "var(--color-primary)", stroke: "hsl(var(--background))", strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Credits Donut */}
        <Card className="card-shadow hover:-translate-y-1 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ความก้าวหน้าหน่วยกิต</CardTitle>
            <CardDescription className="text-xs">เก็บได้แล้ว {d.creditsEarned} จาก {d.creditsTotal} หน่วยกิต</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col pt-2 pb-6">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-medium text-foreground">ภาพรวม (สำเร็จแล้ว)</span>
              <span className="text-primary font-bold text-xl">{Math.round((d.creditsEarned/d.creditsTotal)*100)}%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-1">
              {d.creditsBreakdown.map((item, i) => (
                <div key={i} className="flex flex-col bg-muted/40 p-3.5 rounded-xl border border-border/50 hover:bg-muted/80 transition-colors">
                  <div className="flex items-center gap-1.5 mb-2 text-muted-foreground">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.fill }} />
                    <span className="text-[11px] font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold tracking-tight text-foreground">{item.value} <span className="text-xs text-muted-foreground font-normal tracking-normal">หน่วยกิต</span></span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Schedule */}
        <Card className="card-shadow hover:-translate-y-1 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ตารางเรียนวันนี้</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {d.schedule.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border bg-card p-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => toast.info(`วิชา: ${item.course}\nเวลา: ${item.time}\nห้อง: ${item.room}\nรหัสวิชา: ${item.code}`)}
              >
                <div className="bg-primary/10 p-2 rounded-md flex-shrink-0 mt-0.5">
                  <span className={`${iconSm} text-primary`}>schedule</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground/90 leading-tight mb-1">{item.course}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto font-normal">{item.room}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="card-shadow hover:-translate-y-1 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">ประกาศและข่าวสาร</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {d.announcements.map((a, i) => {
              const isImportant = a.category === "ประกาศสำคัญ";
              const isNews = a.category === "ข่าวสาร";
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => toast.info(`เปิดอ่าน: ${a.title}\n\nวันที่: ${a.date}\nหมวดหมู่: ${a.category}`)}
                >
                  <div className={`p-2 rounded-md flex-shrink-0 mt-0.5 ${isImportant ? "bg-destructive/10" : isNews ? "bg-primary/10" : "bg-secondary"}`}>
                    <span className={`${iconSm} ${isImportant ? "text-destructive" : isNews ? "text-primary" : "text-muted-foreground"}`}>
                      {isImportant ? "campaign" : isNews ? "newspaper" : "event"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight mb-1 line-clamp-2">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
