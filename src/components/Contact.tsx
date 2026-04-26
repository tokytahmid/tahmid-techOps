import React, { useState } from 'react';
import { firebaseService } from '../services/firebaseService';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = { name: '', email: '', phone: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      tempErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Save to Firebase
      await firebaseService.submitContact(formData);
      
      // Also trigger email notification via API (optional)
      try {
        await axios.post('/api/contact', formData);
      } catch (emailErr) {
        console.warn('Email notification failed, but data saved to Firestore', emailErr);
      }

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-bg-dark px-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[1.8rem] font-bold text-text-main">Contact me</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full bg-surface border ${errors.name ? 'border-red-500' : 'border-border'} rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full bg-surface border ${errors.email ? 'border-red-500' : 'border-border'} rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full bg-surface border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors text-sm`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={`w-full bg-surface border ${errors.subject ? 'border-red-500' : 'border-border'} rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors text-sm`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={6}
              className={`w-full bg-surface border ${errors.message ? 'border-red-500' : 'border-border'} rounded-md px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-accent-orange transition-colors resize-none text-sm`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          {status.message && (
            <div className={`p-4 rounded-md text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-4 bg-accent-orange hover:bg-[#e64300] text-white rounded-md font-bold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
