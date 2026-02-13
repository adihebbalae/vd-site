"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  funFact: string;
}

interface RSVPFormProps {
  onSubmit: (data: FormData) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    major: "",
    year: "",
    email: "",
    phone: "",
    funFact: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "major":
        if (!value.trim()) return "Major is required";
        return "";
      case "year":
        if (!value) return "Please select your year";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    let hasErrors = false;
    (["name", "major", "year", "email"] as (keyof FormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) { newErrors[field] = error; hasErrors = true; }
    });
    setErrors(newErrors);
    setTouched({ name: true, major: true, year: true, email: true });
    if (!hasErrors) onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />

        <div className="text-center mb-8">
          <div className="text-3xl mb-2">📋</div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-1">LHB RSVP</h1>
          <p className="text-gray-400 text-sm">Fill out the form below to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter your full name" autoComplete="name"
              className={`form-input-casual ${errors.name && touched.name ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
            {errors.name && touched.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
              placeholder="your.email@example.com" autoComplete="email"
              className={`form-input-casual ${errors.email && touched.email ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
            {errors.email && touched.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-600 mb-1.5">
                Current Major <span className="text-red-400">*</span>
              </label>
              <input type="text" id="major" name="major" value={formData.major} onChange={handleChange} onBlur={handleBlur}
                placeholder="e.g. Computer Science"
                className={`form-input-casual ${errors.major && touched.major ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`} />
              {errors.major && touched.major && <p className="form-error">{errors.major}</p>}
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-600 mb-1.5">
                Year <span className="text-red-400">*</span>
              </label>
              <select id="year" name="year" value={formData.year} onChange={handleChange} onBlur={handleBlur}
                className={`form-input-casual appearance-none cursor-pointer ${!formData.year ? "text-gray-400" : ""} ${errors.year && touched.year ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}>
                <option value="" disabled>Select year</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
                <option value="Other">Other</option>
              </select>
              {errors.year && touched.year && <p className="form-error">{errors.year}</p>}
            </div>
          </div>

          {formData.year && (
            <p className="text-sm text-slate-500 -mt-2 ml-0.5">Look forward to Saturday 😊</p>
          )}

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1.5">
              Phone Number <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="(123) 456-7890" autoComplete="tel" className="form-input-casual" />
          </div>

          <div>
            <label htmlFor="funFact" className="block text-sm font-medium text-gray-600 mb-1.5">
              Fun Fact About You <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <textarea id="funFact" name="funFact" value={formData.funFact} onChange={handleChange}
              placeholder="Tell me something fun about yourself..." rows={2} className="form-input-casual resize-none" />
          </div>

          <div className="pt-3">
            <button type="submit"
              className="w-full px-8 py-3 bg-slate-800 text-white font-semibold rounded-xl shadow-md hover:bg-slate-700 hover:shadow-lg active:scale-[0.98] transition-all duration-150 text-base">
              Next →
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">Your information is kept private.</p>
        </form>
      </div>
    </div>
  );
};

export default RSVPForm;
