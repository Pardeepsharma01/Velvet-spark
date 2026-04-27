"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { signOut } from "@/app/auth/actions";
import {
  FadeIn,
  SlideUp,
  StaggerChildren,
  StaggerItem,
  ScaleOnHover,
} from "@/components/motion";
import type { User } from "@supabase/supabase-js";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Shield,
  ChevronRight,
  Star,
  Edit2,
  Check,
  X,
  LogOut,
} from "lucide-react";

// ─── Avatar Initials ──────────────────────────────────────────────────────────
function AvatarInitials({ name, email }: { name?: string; email?: string }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (email?.[0]?.toUpperCase() ?? "?");

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#D4AF37] border-[3px] border-white shadow-md flex items-center justify-center">
      <span className="font-display text-4xl sm:text-5xl font-bold text-white">
        {initials}
      </span>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Profile fields state (Pre-filled + mocked local states)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+1 (555) 000-0000",
    address: "123 Velvet Spark Blvd, New York, NY",
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth/login?redirectTo=/profile");
        return;
      }
      setUser(data.user);

      const providerName = data.user.user_metadata?.full_name;
      const providerEmail = data.user.email;

      setFormData((prev) => ({
        ...prev,
        fullName: providerName || "Velvet Spark Customer",
        email: providerEmail || "customer@velvetspark.com",
      }));
      setLoading(false);
    });
  }, [router]);

  const handleSave = () => {
    // Mock save operation
    setIsEditing(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000); // hide after 3 seconds
  };

  const handleCancel = () => {
    // Reset or keep previous locally
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Section spacing="xl">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <span className="h-10 w-10 rounded-full border-[3px] border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
          </div>
        </Container>
      </Section>
    );
  }

  const name = user?.user_metadata?.full_name as string | undefined;
  const email = user?.email;
  const joinedAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  // Data mapping
  const profileDetails = [
    { id: "fullName", icon: UserIcon, label: "Full Name", type: "text" },
    { id: "email", icon: Mail, label: "Email Address", type: "email" },
    { id: "phone", icon: Phone, label: "Phone Number", type: "tel" },
    { id: "address", icon: MapPin, label: "Shipping Address", type: "text" },
  ];

  const quickAccessLinks = [
    {
      label: "My Orders",
      description: "Track your packages",
      href: "/orders",
      icon: Package,
    },
    {
      label: "My Wishlist",
      description: "View your saved items",
      href: "/wishlist",
      icon: Heart,
    },
    {
      label: "Security",
      description: "Password & Authentication",
      href: "/auth/update-password",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-charcoal pt-16 pb-24">
      {/* Toast Notification */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          successToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-green-50 text-green-800 border border-green-200 px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          <Check size={18} className="text-green-600" />
          <span className="font-medium text-sm">
            Profile updated successfully!
          </span>
        </div>
      </div>

      <Container size="lg">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* 1. Hero Section */}
          <FadeIn direction="up" duration={0.6}>
            <div className="relative flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 p-8 bg-white dark:bg-charcoal-700/50 rounded-2xl border border-border shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
              {/* Avatar */}
              <div className="shrink-0 relative">
                {/* {avatarUrl ? ( */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-[#D4AF37] shadow-md overflow-hidden relative">
                  {/* <Image 
                      src={avatarUrl} 
                      alt={formData.fullName} 
                      fill 
                      className="object-cover"
                    /> */}
                  <AvatarInitials name={name} email={email} />
                </div>
                {/* ) : ( */}
                {/* //   <AvatarInitials name={formData.fullName} email={formData.email} /> */}
                {/* )} */}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col items-center md:items-start justify-center pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
                  <div className="flex -space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-[#D4AF37] fill-[#D4AF37]"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
                    Velvet Gold Member
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333] dark:text-ivory mb-1">
                  {formData.fullName}
                </h1>
                <p className="text-charcoal-400 dark:text-charcoal-300 text-sm mb-4">
                  Customer since {joinedAt}
                </p>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-sm rounded-full px-6"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </FadeIn>

          {/* 2. Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left 60% (col-span-3) - Profile Details */}
            <div className="lg:col-span-3 space-y-6">
              <SlideUp delay={0.1}>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#333333] dark:text-ivory px-1">
                  Profile Details
                </h2>

                <div className="mt-4 bg-white dark:bg-charcoal-700/50 rounded-2xl border border-border shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden">
                  <div className="flex flex-col">
                    {profileDetails.map((field, idx) => (
                      <div
                        key={field.id}
                        className={`group p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200 border-b border-[#EEEEEE] dark:border-border hover:bg-black/5 dark:hover:bg-ivory/5 ${
                          idx === profileDetails.length - 1 ? "border-b-0" : ""
                        } ${isEditing ? "hover:border-[#D4AF37]/30" : ""}`}
                      >
                        <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                            <field.icon size={18} />
                          </div>
                          <span className="text-sm font-medium text-charcoal-400 dark:text-charcoal-300">
                            {field.label}
                          </span>
                        </div>

                        <div className="w-full sm:w-2/3 flex-1 flex justify-end">
                          {isEditing ? (
                            <Input
                              type={field.type}
                              value={
                                formData[field.id as keyof typeof formData]
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  field.id as keyof typeof formData,
                                  e.target.value,
                                )
                              }
                              className="w-full bg-transparent border-[#D4AF37] focus-visible:ring-[#D4AF37]/50 shadow-sm"
                            />
                          ) : (
                            <span className="text-sm text-right font-medium text-[#333333] dark:text-ivory group-hover:text-[#D4AF37] transition-colors block w-full truncate">
                              {formData[field.id as keyof typeof formData]}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Row when editing */}
                  {isEditing && (
                    <div className="p-5 sm:p-6 bg-[#D4AF37]/5 border-t border-[#D4AF37]/20 flex items-center justify-end gap-3 transition-all">
                      <Button
                        variant="ghost"
                        onClick={handleCancel}
                        className="text-charcoal-500 hover:text-charcoal hover:bg-black/5"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 shadow-md"
                      >
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </SlideUp>
            </div>

            {/* Right 40% (col-span-2) - Quick Access & Sign Out */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <SlideUp delay={0.2}>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#333333] dark:text-ivory px-1">
                  Quick Access
                </h2>

                <div className="mt-4 p-1 rounded-2xl bg-white dark:bg-charcoal-700/50 border border-[#D4AF37] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
                  <StaggerChildren delay={0.3} stagger={0.1}>
                    {quickAccessLinks.map((link, idx) => (
                      <StaggerItem key={link.label}>
                        <a
                          href={link.href}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-[#D4AF37]/10 group ${
                            idx !== quickAccessLinks.length - 1 ? "mb-1" : ""
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-ivory/5 text-charcoal-400 group-hover:text-[#D4AF37] group-hover:bg-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                            <link.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-[#333333] dark:text-ivory group-hover:text-[#D4AF37] transition-colors">
                              {link.label}
                            </h3>
                            <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-0.5">
                              {link.description}
                            </p>
                          </div>
                          <ChevronRight
                            size={18}
                            className="text-border group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all"
                          />
                        </a>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </SlideUp>

              {/* 3. Sign Out Section */}
              <SlideUp delay={0.4}>
                <div className="flex flex-col items-center pt-6 border-t border-[#EEEEEE] dark:border-border mt-4">
                  <p className="text-xs text-charcoal-400 mb-4 text-center">
                    Signed in as{" "}
                    <strong className="text-[#333333] dark:text-ivory break-all">
                      {formData.email}
                    </strong>
                  </p>

                  <form action={signOut} className="w-full">
                    <ScaleOnHover className="w-full text-center">
                      <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        fullWidth
                        className="rounded-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 font-semibold shadow-[0_4px_6px_rgba(0,0,0,0.05)]"
                      >
                        <LogOut size={18} className="mr-2" />
                        Sign Out
                      </Button>
                    </ScaleOnHover>
                  </form>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
