"use client";

import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { useState } from "react";
import { studentDetailData, profileData, registrationData, financeData, requestsData } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { AddressCard } from "@/components/profile/AddressCard";
import { WorkplaceCard } from "@/components/profile/WorkplaceCard";

const icon20 = "material-symbols-outlined text-[20px]";
const icon18 = "material-symbols-outlined text-[18px]";

const tabs = [
  { key: "personal", icon: "badge", label: "ข้อมูลส่วนตัว" },
  { key: "education", icon: "history_edu", label: "การศึกษา" },
  { key: "work", icon: "work", label: "ประวัติการทำงาน" },
  { key: "research", icon: "biotech", label: "ผลงานวิจัย" },
  { key: "registration", icon: "how_to_reg", label: "การลงทะเบียน" },
  { key: "finance", icon: "payments", label: "การเงิน" },
  { key: "requests", icon: "description", label: "คำร้องของฉัน" },
  { key: "documents", icon: "folder", label: "เอกสารของฉัน" },
];

export default function StudentsPage() {
  const s = studentDetailData;
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="p-4 md:p-6 pb-16 max-w-[1280px] mx-auto space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <a href="/dashboard" className="hover:text-primary transition-colors">หน้าหลัก</a>
        <span className={`${icon18} text-muted-foreground/50`}>chevron_right</span>
        <span className="text-primary font-medium flex items-center gap-1">
          <span className={icon18}>person</span> ข้อมูลของฉัน
        </span>
      </div>

      {/* Bento Grid — ID Card + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* ===== Digital ID Card ===== */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#737300] to-[#5C5C00] p-6 text-primary-foreground border-2 border-[#C4A43E] shadow-lg h-[210px] max-w-[360px]">
            {/* Emblem watermark */}
            <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[200px]">local_pharmacy</span>
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h2 className="text-xs font-semibold tracking-wider uppercase opacity-80 mb-1">
                  {s.college}
                </h2>
                <p className="text-xs font-medium">ปีการศึกษา {s.academicYear}</p>
              </div>
              {/* Student photo */}
              <div className="w-24 h-24 rounded-md bg-white p-1.5 border border-[#C4A43E]/50 shadow-sm shrink-0">
                <div className="w-full h-full rounded-sm overflow-hidden">
                  <img src="/Karina_new.jpg" alt={s.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-lg font-bold mb-1">{s.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="opacity-70 text-xs opacity-90 block">รหัสประจำตัว</span>
                  <span className="font-mono">{s.id}</span>
                </div>
                <div>
                  <span className="opacity-70 text-xs opacity-90 block">เลขที่ใบประกอบวิชาชีพ</span>
                  <span className="font-mono">{s.licenseNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 max-w-[360px]">
            <a href="/print/profile" target="_blank" className="flex-1 block">
              <Button variant="outline" size="sm" className="w-full h-9 text-xs gap-1.5">
                <span className={icon18}>download</span> ดาวน์โหลด
              </Button>
            </a>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 h-9 text-xs gap-1.5">
                  <span className={icon18}>badge</span> บัตรดิจิทัล
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-transparent border-none shadow-none flex flex-col items-center justify-center p-0 [&>button]:hidden">
                <div className="relative w-[340px] h-[540px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#737300] to-[#4a4a00] text-white flex flex-col items-center p-6">
                  {/* Subtle Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>

                  {/* Header Content */}
                  <div className="relative z-10 flex items-center gap-3 w-full pb-4 mb-5 mt-2">
                    <div className="bg-white p-1 rounded-md shrink-0">
                      <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm tracking-tight leading-tight drop-shadow-sm">ราชวิทยาลัยเภสัชกรรมแห่งประเทศไทย</div>
                      <div className="text-[9px] opacity-80 tracking-wider">ROYAL PHARMACY COLLEGE OF THAILAND</div>
                    </div>
                  </div>

                  {/* Profile Image & Name */}
                  <div className="relative z-10 flex flex-col items-center text-center w-full">
                    <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden shadow-xl bg-white/10 shrink-0 mb-3">
                      <img src="/Karina_new.jpg" alt="Profile" className="w-full h-full object-cover object-top" />
                    </div>
                    
                    <h2 className="text-xl font-bold mt-1">{profileData.personalInfo.title}{profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h2>
                    <div className="text-sm opacity-90 mb-1">{profileData.personalInfo.title} {profileData.personalInfo.firstNameEn} {profileData.personalInfo.lastNameEn}</div>
                    
                    <div className="mt-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      สมาชิกราชวิทยาลัย
                    </div>
                  </div>

                  {/* License Info */}
                  <div className="relative z-10 w-full mt-5 space-y-2 text-sm bg-black/10 p-3.5 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-between items-center px-1">
                      <span className="opacity-70 text-xs">เลขที่ใบประกอบฯ</span>
                      <span className="font-medium tracking-wide">{profileData.personalInfo.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="opacity-70 text-xs">สถานะ</span>
                      <span className="font-medium text-green-300">ปกติ (Active)</span>
                    </div>
                  </div>

                  {/* Centered QR Code inside card */}
                  <div className="relative z-10 mt-auto flex flex-col items-center bg-white text-black p-3 rounded-xl shadow-xl w-full max-w-[200px] mb-2">
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RPC-2569-KARINA" alt="QR Code" className="w-full h-full" />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium mt-2">สแกนเพื่อยืนยันตัวตน</span>
                  </div>
                </div>

                {/* Actions below the card */}
                <div className="mt-6 flex gap-3 w-full justify-center">
                  <Button variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-full px-5 h-10 shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">download</span> บันทึกรูปภาพ
                  </Button>
                  <Button className="gap-2 bg-white text-primary hover:bg-white/90 rounded-full px-5 h-10 shadow-lg font-medium">
                    <span className="material-symbols-outlined text-[18px]">share</span> แชร์บัตร
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon" className="h-9 w-9" title="แชร์" onClick={() => {
              if (navigator.share) { navigator.share({ title: "บัตรนักศึกษา", text: `${s.name} — ${s.id}`, url: window.location.href }).catch(() => {}); }
              else { navigator.clipboard.writeText(window.location.href).then(() => toast.info("คัดลอกลิงก์แล้ว!")); }
            }}>
              <span className={icon18}>share</span>
            </Button>
          </div>
        </div>

        {/* ===== Quick Stats (4 cards) ===== */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3 content-start">
          <Card className="card-shadow">
            <CardContent className="p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className={icon20}>school</span>
                <span className="text-sm font-medium">เกรดเฉลี่ยสะสม (GPA)</span>
              </div>
              <div className="text-3xl font-bold text-primary">{s.gpa.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className={icon20}>library_books</span>
                <span className="text-sm font-medium">หน่วยกิตสะสม</span>
              </div>
              <div className="text-3xl font-bold">
                {s.creditsEarned}
                <span className="text-lg text-muted-foreground font-normal">/{s.creditsTotal}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className={icon20}>history_edu</span>
                <span className="text-sm font-medium">วิชาที่ลงทะเบียน (เทอมนี้)</span>
              </div>
              <div className="text-3xl font-bold">{s.registeredCourses}</div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className={icon20}>fact_check</span>
                <span className="text-sm font-medium">สถานภาพ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#137333]" />
                <span className="text-lg font-semibold">กำลังศึกษา</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ===== Tabbed Content ===== */}
      <Card className="card-shadow overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-border overflow-x-auto bg-muted/30 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              <span className={icon18}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 md:p-8 min-h-[600px]">
          {/* ---- Personal Info ---- */}
          {activeTab === "personal" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center border-b border-border pb-2 mb-6">
                <h3 className="text-lg font-bold">ข้อมูลพื้นฐาน</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => window.open("/print/profile", "_blank")}
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  พิมพ์ประวัติส่วนตัว (PDF)
                </Button>
              </div>
              <PersonalInfoCard data={profileData.personalInfo} isReadOnly={true} />
              <AddressCard title="ที่อยู่ตามบัตรประชาชน" icon="home" data={profileData.personalInfo} isReadOnly={true} showContactInfo={false} />
              <AddressCard title="ที่อยู่ปัจจุบัน/ที่ติดต่อได้" icon="contact_mail" data={profileData.personalInfo} isReadOnly={true} showContactInfo={true} />
              <WorkplaceCard data={profileData.workHistory} isReadOnly={true} />
            </div>
          )}

          {/* ---- Education Timeline ---- */}
          {activeTab === "education" && (
            <div>
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-6">ประวัติการศึกษา</h3>
              <div className="relative border-l-2 border-border ml-3 space-y-8">
                {s.educationTimeline.map((edu, i) => (
                  <div key={i} className="relative pl-8">
                    <span
                      className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ring-4 ring-card ${
                        edu.isCurrent ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {edu.institution} — {edu.field}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Work History ---- */}
          {activeTab === "work" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-end border-b border-border pb-2 mb-6">
                <h3 className="text-lg font-bold">ประวัติการทำงาน</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><span className={icon18}>edit</span> แก้ไขประวัติ</Button>
              </div>
              <div className="space-y-6">
                <div className="bg-muted/30 p-5 rounded-xl border border-border">
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">apartment</span> ที่ทำงานปัจจุบัน</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">สถานที่ทำงาน</label>
                      <div className="text-sm font-medium">{profileData.workHistory.currentWorkplace}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">เบอร์โทรศัพท์ที่ทำงาน</label>
                      <div className="text-sm font-medium">{profileData.workHistory.workplacePhone}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">ตำแหน่ง</label>
                      <div className="text-sm font-medium">{profileData.workHistory.position}</div>
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">ระดับ</label>
                      <div className="text-sm font-medium">{profileData.workHistory.level}</div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">หน้าที่ความรับผิดชอบหลัก</label>
                      <div className="text-sm">{profileData.workHistory.responsibilities}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">ประสบการณ์ทำงานย้อนหลัง</h4>
                  <div className="space-y-3">
                    {profileData.workHistory.previousJobs.map((job, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-lg border bg-card">
                        <div className="w-16 shrink-0 text-sm font-medium text-muted-foreground pt-0.5">{job.year}</div>
                        <div>
                          <div className="text-sm font-semibold">{job.position}</div>
                          <div className="text-sm text-muted-foreground">{job.workplace}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---- Research & Publications ---- */}
          {activeTab === "research" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-end border-b border-border pb-2 mb-6">
                <h3 className="text-lg font-bold">ผลงานวิจัยและวิชาการ</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><span className={icon18}>add</span> เพิ่มผลงาน</Button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">science</span> โครงการวิจัย</h4>
                  <div className="grid gap-3">
                    {profileData.research.projects.map((proj, i) => (
                      <div key={i} className="p-4 rounded-lg border bg-card/50">
                        <div className="font-medium text-sm mb-1">{proj.title}</div>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">person</span> บทบาท: {proj.role}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {proj.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">article</span> ผลงานตีพิมพ์ / นำเสนอวิชาการ</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {profileData.research.publications.map((pub, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">{pub.title}</span> <span className="text-muted-foreground">({pub.year})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="text-sm font-semibold mb-1 text-primary">ความสนใจด้านงานวิจัย (Research Interest)</h4>
                  <p className="text-sm">{profileData.research.interest}</p>
                </div>
              </div>
            </div>
          )}

          {/* ---- Registration Tab ---- */}
          {activeTab === "registration" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-6">วิชาที่ลงทะเบียน (เทอมปัจจุบัน)</h3>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 font-medium">
                    <tr>
                      <th className="px-4 py-3">รหัสวิชา</th>
                      <th className="px-4 py-3">ชื่อวิชา</th>
                      <th className="px-4 py-3">หน่วยกิต</th>
                      <th className="px-4 py-3">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {registrationData.courses.map((course, i) => (
                      <tr key={i} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono">{course.code}</td>
                        <td className="px-4 py-3">{course.title}</td>
                        <td className="px-4 py-3">{course.credits}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ลงทะเบียนแล้ว</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---- Finance Tab ---- */}
          {activeTab === "finance" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-6">ประวัติการชำระเงิน</h3>
              <div className="space-y-4">
                {financeData.items.map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card gap-4">
                    <div>
                      <div className="font-semibold text-sm">{item.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">กำหนดชำระ: {item.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-base font-bold text-primary">฿{item.amount.toLocaleString()}</div>
                      <Badge variant="outline" className={item.status === "paid" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                        {item.status === "paid" ? "ชำระแล้ว" : "รอชำระเงิน"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Requests Tab ---- */}
          {activeTab === "requests" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-6">คำร้องของฉัน</h3>
              <div className="space-y-4">
                {requestsData.map((req, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card gap-4">
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">description</span>
                        {req.type}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">ยื่นเมื่อ: {req.date}</div>
                    </div>
                    <Badge variant="outline" className={
                      req.status === "approved" ? "bg-green-50 text-green-700 border-green-200" :
                      req.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }>
                      {req.status === "approved" ? "อนุมัติ" : req.status === "pending" ? "รอดำเนินการ" : "ปฏิเสธ"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Documents Tab ---- */}
          {activeTab === "documents" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-6">เอกสารของฉัน</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "บัตรประจำตัวนักศึกษา (PDF)", icon: "badge" },
                  { name: "ใบรับรองการเป็นนักศึกษา (PDF)", icon: "school" },
                  { name: "ใบแจ้งผลการศึกษา (Transcript)", icon: "description" },
                  { name: "ใบเสร็จรับเงินค่าลงทะเบียน", icon: "receipt" }
                ].map((doc, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-xl border bg-muted/20 hover:bg-muted/50 hover:border-primary/50 transition-colors text-center cursor-pointer group" onClick={() => toast.info(`กำลังดาวน์โหลด: ${doc.name}`)}>
                    <span className={`material-symbols-outlined text-4xl text-muted-foreground mb-3 group-hover:text-primary transition-colors`}>{doc.icon}</span>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{doc.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">คลิกเพื่อดาวน์โหลด</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </Card>
      <Footer />
    </div>
  );
}
