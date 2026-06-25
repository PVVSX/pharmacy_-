"use client";

import { useState } from "react";
import { profileData } from "@/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/layout/Footer";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { AddressCard } from "@/components/profile/AddressCard";
import { WorkplaceCard } from "@/components/profile/WorkplaceCard";
import { useMockDb } from "@/context/MockDbContext";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "เลือกหลักสูตร" },
  { id: 2, title: "ตรวจสอบประวัติส่วนตัว" },
  { id: 3, title: "แนบเอกสารอ้างอิง" },
  { id: 4, title: "ยืนยันการสมัคร" },
];

export default function AdmissionPage() {
  const { settings, setAdmissions } = useMockDb();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCollege, setSelectedCollege] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleNext = () => {
    if (currentStep === 4) {
      submitApplication();
    } else {
      setCurrentStep((p) => Math.min(p + 1, 4));
    }
  };
  
  const handlePrev = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const submitApplication = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      const newId = `APP-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      const admissionData = {
        id: newId,
        name: `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`,
        license: profileData.personalInfo.licenseNumber || "รอตรวจสอบ",
        program: selectedCollege || "ไม่ระบุ",
        date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: "pending" as const
      };
      
      setAdmissions(prev => [admissionData, ...prev]);
      
      toast.success("ส่งใบสมัครเรียบร้อยแล้ว", {
        description: "ระบบได้รับข้อมูลของคุณแล้ว กรุณารอการตรวจสอบจากเจ้าหน้าที่"
      });
      setIsComplete(true);
    }, 1500);
  };

  if (!settings.admissionOpen) {
    return (
      <div className="p-4 md:p-6 pb-16 max-w-[1280px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-slate-400">event_busy</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">ปิดรับสมัคร</h1>
        <p className="text-slate-500 max-w-md">
          ขณะนี้อยู่นอกช่วงเวลาการเปิดรับสมัครนักศึกษาใหม่<br />
          กรุณาติดตามประกาศเปิดรับสมัครรอบถัดไปทางหน้าเว็บไซต์
        </p>
        <Button className="mt-6" onClick={() => window.history.back()}>
          กลับไปหน้าก่อนหน้า
        </Button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="p-4 md:p-6 pb-16 max-w-[1024px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">check_circle</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">ส่งใบสมัครสำเร็จแล้ว!</h1>
        <p className="text-slate-500 max-w-md mb-8">
          ระบบได้รับข้อมูลใบสมัครของคุณเรียบร้อยแล้ว<br />
          คุณสามารถติดตามสถานะการพิจารณาได้ที่เมนู "ข้อมูลของฉัน" หรือหน้าหลัก
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>กลับหน้าหลัก</Button>
          <Button onClick={() => window.location.href = '/students'}>ดูสถานะการสมัคร</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6 pb-16 max-w-[1024px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-primary">ระบบรับสมัครเข้าศึกษาต่อ (Online Admission)</h1>
          <p className="text-sm text-muted-foreground">ยื่นใบสมัครเข้าฝึกอบรมหลักสูตรวุฒิบัตร / หนังสืออนุมัติฯ ง่ายๆ ในไม่กี่ขั้นตอน</p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-between relative mb-8 px-4 md:px-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm
                    ${isActive ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20" : 
                      isCompleted ? "bg-primary text-primary-foreground" : "bg-card border-2 border-muted text-muted-foreground"}`}
                >
                  {isCompleted ? <span className="material-symbols-outlined text-lg">check</span> : step.id}
                </div>
                <span className={`text-[10px] md:text-xs font-medium absolute top-12 whitespace-nowrap ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="mt-16">
          
          {/* STEP 1: Choose College */}
          {currentStep === 1 && (
            <Card className="card-shadow border-t-4 border-t-primary animate-in fade-in zoom-in-95 duration-300">
              <CardHeader>
                <CardTitle>1. เลือกวิทยาลัยและหลักสูตรที่ต้องการสมัคร</CardTitle>
                <CardDescription>กรุณาเลือกวิทยาลัยที่คุณต้องการยื่นใบสมัครเข้าฝึกอบรม</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  [
                    {
                      id: "วิทยาลัยเภสัชบำบัด",
                      name: "วิทยาลัยเภสัชบำบัด",
                      abbr: "วภท.",
                      desc: "หลักสูตรวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรม สาขาเภสัชบำบัด",
                      icon: "local_hospital",
                    },
                    {
                      id: "วิทยาลัยการคุ้มครองผู้บริโภค",
                      name: "วิทยาลัยการคุ้มครองผู้บริโภคด้านยาและสุขภาพ",
                      abbr: "วคบท.",
                      desc: "หลักสูตรวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรม สาขาการคุ้มครองผู้บริโภค",
                      icon: "shield",
                    },
                    {
                      id: "วิทยาลัยเภสัชกรรมชุมชน",
                      name: "วิทยาลัยเภสัชกรรมชุมชน",
                      abbr: "วภช.",
                      desc: "หลักสูตรวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรม สาขาเภสัชกรรมชุมชน",
                      icon: "storefront",
                    },
                    {
                      id: "วิทยาลัยการบริหารเภสัชกิจ",
                      name: "วิทยาลัยการบริหารเภสัชกิจ",
                      abbr: "CPAT",
                      desc: "หลักสูตรวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรม สาขาการบริหารเภสัชกิจ",
                      icon: "business_center",
                    }
                  ].map((college) => (
                  <div 
                    key={college.id}
                    onClick={() => setSelectedCollege(college.name)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4
                      ${selectedCollege === college.name ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20" : "border-muted hover:border-primary/30 hover:bg-muted/30"}`}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                      ${selectedCollege === college.name ? "border-primary bg-primary text-white" : "border-muted-foreground/20 bg-slate-50 text-slate-400"}`}>
                      {selectedCollege === college.name ? (
                        <span className="material-symbols-outlined text-[24px]">check</span>
                      ) : (
                        <span className="material-symbols-outlined text-[24px]">{college.icon}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">{college.name}</span>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 text-slate-500 bg-white">{college.abbr}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{college.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* STEP 2: Auto-filled Profile */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-500 mt-0.5">auto_awesome</span>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400 text-sm">ดึงข้อมูลอัตโนมัติสำเร็จ!</h4>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1">ระบบได้ดึงข้อมูลประวัติของคุณจาก "แฟ้มประวัติส่วนตัว" มากรอกให้แล้ว กรุณาตรวจสอบความถูกต้องก่อนไปขั้นตอนถัดไป</p>
                </div>
              </div>

              <div className="space-y-6">
                <PersonalInfoCard data={profileData.personalInfo} isReadOnly={true} />
                <AddressCard title="ที่อยู่ตามบัตรประชาชน" icon="home" data={profileData.personalInfo} isReadOnly={true} showContactInfo={false} />
                <AddressCard title="ที่อยู่ปัจจุบัน/ที่ติดต่อได้" icon="contact_mail" data={profileData.personalInfo} isReadOnly={true} showContactInfo={true} />
                <WorkplaceCard data={profileData.workHistory} isReadOnly={true} />
              </div>
            </div>
          )}

          {/* STEP 3: Upload */}
          {currentStep === 3 && (
            <Card className="card-shadow animate-in fade-in slide-in-from-right-8 duration-500">
              <CardHeader>
                <CardTitle>3. แนบเอกสารหลักฐานเพิ่มเติม</CardTitle>
                <CardDescription>อัปโหลดไฟล์ PDF หรือรูปภาพ (ขนาดไม่เกิน 5MB)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl">upload_file</span>
                  </div>
                  <h4 className="text-sm font-semibold mb-1">ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์</h4>
                  <p className="text-xs text-muted-foreground max-w-[250px]">สำเนาใบประกอบวิชาชีพฯ, สำเนา Transcript, หนังสือรับรองจากผู้บังคับบัญชา</p>
                </div>
                
                {/* Mock Uploaded Files */}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                      <span className="text-sm font-medium">สำเนาใบประกอบวิชาชีพ_YooJimin.pdf</span>
                    </div>
                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                      <span className="text-sm font-medium">Transcript_CU.pdf</span>
                    </div>
                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 4: Confirm */}
          {currentStep === 4 && (
            <Card className="card-shadow border-t-4 border-t-green-500 animate-in fade-in zoom-in-95 duration-500">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">task_alt</span>
                </div>
                <CardTitle className="text-xl">สรุปการสมัครเรียน</CardTitle>
                <CardDescription>กรุณาตรวจสอบข้อมูลทั้งหมดอีกครั้งก่อนกดส่งคำร้อง</CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="bg-muted/30 p-5 rounded-xl border space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-muted-foreground">หลักสูตรที่สมัคร</span>
                    <Badge className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-0">{selectedCollege || "วิทยาลัยการคุ้มครองผู้บริโภคด้านยาและสุขภาพ"}</Badge>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-muted-foreground">ผู้สมัคร</span>
                    <span className="text-sm font-semibold">{profileData.personalInfo.firstName} {profileData.personalInfo.lastName} ({profileData.personalInfo.licenseNumber})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">เอกสารแนบ</span>
                    <span className="text-sm font-semibold">2 รายการ (ครบถ้วน)</span>
                  </div>
                </div>

                {/* Print Button */}
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline" 
                    className="gap-2 border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => window.open("/print/admission", "_blank")}
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    พิมพ์ใบสมัคร (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-8 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentStep === 1}
            className="w-24 gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> กลับ
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={(currentStep === 1 && !selectedCollege) || isSubmitting}
            className={`w-36 gap-1 shadow-sm ${currentStep === 4 ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
          >
            {isSubmitting ? "กำลังส่ง..." : currentStep === 4 ? "ส่งใบสมัครเลย" : "ถัดไป"} 
            {!isSubmitting && currentStep !== 4 && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
          </Button>
        </div>

      </div>
      <Footer />
    </>
  );
}
