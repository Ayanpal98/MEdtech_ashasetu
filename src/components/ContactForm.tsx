import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-accent/10 border border-accent/20 p-8 rounded-sm text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4">
              <CheckCircle2 size={24} className="text-bg" />
            </div>
            <h3 className="text-lg font-serif font-bold text-text mb-2">Message Sent!</h3>
            <p className="text-xs text-muted leading-relaxed">
              Thank you for reaching out. Our team will get back to you shortly at the provided email address.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block font-mono text-[10px] text-accent uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-card border ${errors.name ? 'border-red-500/50' : 'border-border'} rounded-sm px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/50 transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <div className="flex items-center gap-1.5 text-red-500 text-[9px] font-medium uppercase tracking-tighter">
                    <AlertCircle size={10} /> {errors.name}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block font-mono text-[10px] text-accent uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-card border ${errors.email ? 'border-red-500/50' : 'border-border'} rounded-sm px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/50 transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <div className="flex items-center gap-1.5 text-red-500 text-[9px] font-medium uppercase tracking-tighter">
                    <AlertCircle size={10} /> {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="block font-mono text-[10px] text-accent uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.subject ? 'border-red-500/50' : 'border-border'} rounded-sm px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/50 transition-colors`}
                placeholder="Inquiry about MedTech Tripura"
              />
              {errors.subject && (
                <div className="flex items-center gap-1.5 text-red-500 text-[9px] font-medium uppercase tracking-tighter">
                  <AlertCircle size={10} /> {errors.subject}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block font-mono text-[10px] text-accent uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.message ? 'border-red-500/50' : 'border-border'} rounded-sm px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/50 transition-colors resize-none`}
                placeholder="How can we help you?"
              />
              {errors.message && (
                <div className="flex items-center gap-1.5 text-red-500 text-[9px] font-medium uppercase tracking-tighter">
                  <AlertCircle size={10} /> {errors.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-bg font-bold text-[11px] uppercase tracking-[0.1em] py-3 rounded-sm hover:bg-accent-light transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
