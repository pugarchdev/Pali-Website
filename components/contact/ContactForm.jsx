"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service");
  const projectParam = searchParams.get("project");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: serviceParam || "Weddings & Pre-Weddings",
    date: "",
    location: "",
    details: projectParam
      ? `Hello Pali,\n\nI was inspired by your "${projectParam}" series and would love to discuss a wedding or photography commission...\n`
      : "",
    hp: "", // honeypot
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const errors = {
    name:
      touched.name && formData.name.trim().length < 2
        ? "Please enter your full name."
        : null,
    email:
      touched.email && !isEmailValid(formData.email)
        ? "Please enter a valid email address."
        : null,
    details:
      touched.details && formData.details.trim().length < 10
        ? "Please share at least 10 characters regarding your project or vision."
        : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all required touched
    setTouched({ name: true, email: true, details: true });

    if (
      formData.name.trim().length < 2 ||
      !isEmailValid(formData.email) ||
      formData.details.trim().length < 10
    ) {
      return;
    }

    if (status.submitting) return; // duplicate prevention

    setStatus({ submitting: true, success: false, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus({
        submitting: false,
        success: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "Wild Elopements & Highland Ceremonies",
        date: "",
        location: "",
        details: "",
        hp: "",
      });
      setTouched({});
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error:
          err.message ||
          "Could not submit enquiry. Please email studio@alasdairvance.com directly.",
      });
    }
  };

  return (
    <div className="bg-[#FAF9F6] border border-[#D8D2C7] p-8 sm:p-12 shadow-xs">
      {status.success ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#303B32] mx-auto stroke-1" />
          <h3 className="font-editorial text-3xl text-[#242421]">
            Enquiry Received With Thanks
          </h3>
          <p className="text-sm text-[#5E5D57] max-w-md mx-auto font-light leading-relaxed">
            Thank you for reaching out. Alasdair personally reviews each commission and will reply
            within 24 to 48 hours to discuss dates, terrain, and availability.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setStatus({ submitting: false, success: false, error: null })}
              className="text-xs uppercase tracking-[0.2em] text-[#777B60] hover:text-[#242421] border-b border-[#777B60] pb-1 transition-colors"
            >
              Send Another Note &rarr;
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Global Error Banner */}
          {status.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          {/* Hidden Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_field">Do not fill this</label>
            <input
              type="text"
              id="hp_field"
              name="hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
              >
                Full Name <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="Fiona & Callum MacLeod"
                className={`w-full px-4 py-3 bg-[#F5F2EB] border text-sm text-[#242421] placeholder-[#5E5D57]/50 focus:outline-none focus:ring-1 focus:ring-[#777B60] transition-colors ${
                  errors.name ? "border-red-400" : "border-[#D8D2C7]"
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-700 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
              >
                Email Address <span className="text-red-800">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="fiona@example.com"
                className={`w-full px-4 py-3 bg-[#F5F2EB] border text-sm text-[#242421] placeholder-[#5E5D57]/50 focus:outline-none focus:ring-1 focus:ring-[#777B60] transition-colors ${
                  errors.email ? "border-red-400" : "border-[#D8D2C7]"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-700 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Service & Preferred Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="service"
                className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
              >
                Area of Commission
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#D8D2C7] text-sm text-[#242421] focus:outline-none focus:ring-1 focus:ring-[#777B60]"
              >
                <option value="Weddings & Pre-Weddings">
                  Weddings &amp; Pre-Weddings
                </option>
                <option value="Creative Engagement Sessions">
                  Creative Engagement Sessions
                </option>
                <option value="Majestic Landscapes & Fine Art">
                  Majestic Landscapes &amp; Fine Art
                </option>
                <option value="Childhood Magic & Family Portfolios">
                  Childhood Magic &amp; Family Portfolios
                </option>
                <option value="Destination Celebration & Other">
                  Destination Celebration &amp; Other
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
              >
                Preferred Date / Season
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. October 2025 or Autumn 2026"
                className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#D8D2C7] text-sm text-[#242421] placeholder-[#5E5D57]/50 focus:outline-none focus:ring-1 focus:ring-[#777B60]"
              />
            </div>
          </div>

          {/* Location / Territory */}
          <div>
            <label
              htmlFor="location"
              className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
            >
              Anticipated Location / Region
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Isle of Skye, Glencoe, Torridon, or Undecided"
              className="w-full px-4 py-3 bg-[#F5F2EB] border border-[#D8D2C7] text-sm text-[#242421] placeholder-[#5E5D57]/50 focus:outline-none focus:ring-1 focus:ring-[#777B60]"
            />
          </div>

          {/* Project Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-xs uppercase tracking-wider text-[#777B60] mb-2 font-medium"
            >
              Project Details &amp; Intentions <span className="text-red-800">*</span>
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              required
              value={formData.details}
              onChange={handleChange}
              onBlur={() => handleBlur("details")}
              placeholder="Tell me about your plans, what draws you to the Scottish landscape, and how you envision your gathering or commission..."
              className={`w-full px-4 py-3 bg-[#F5F2EB] border text-sm text-[#242421] placeholder-[#5E5D57]/50 focus:outline-none focus:ring-1 focus:ring-[#777B60] transition-colors ${
                errors.details ? "border-red-400" : "border-[#D8D2C7]"
              }`}
            />
            {errors.details && (
              <p className="text-[11px] text-red-700 mt-1">{errors.details}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status.submitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#242421] text-[#FAF9F6] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 ${
                status.submitting
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[#343430]"
              }`}
            >
              {status.submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Commission Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
