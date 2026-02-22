import React, { useState, useRef } from 'react';
import { profile } from '../../data/profile';
import emailjs from '@emailjs/browser';

// ─── EmailJS config ───
// To set up: go to https://emailjs.com, create free account, then:
// 1. Add email service (Gmail/Outlook) → copy Service ID
// 2. Create email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 3. Copy Template ID and Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';  // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // Replace with your EmailJS public key

export const ContactApp: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setSending(true);
        setStatus('idle');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            formRef.current.reset();
        } catch {
            setStatus('error');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="contact-app">
            <h2 className="contact-header">📬 Get in Touch</h2>

            {/* Quick links */}
            <div className="contact-items">
                <a className="contact-item" href={`mailto:${profile.email}`}>
                    <div className="contact-item-icon email">📧</div>
                    <div className="contact-item-info">
                        <span className="contact-item-label">Email</span>
                        <span className="contact-item-value">{profile.email}</span>
                    </div>
                </a>
                <a className="contact-item" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className="contact-item-icon linkedin">🔗</div>
                    <div className="contact-item-info">
                        <span className="contact-item-label">LinkedIn</span>
                        <span className="contact-item-value">Shreenath Mehta</span>
                    </div>
                </a>
                <a className="contact-item" href={profile.github} target="_blank" rel="noopener noreferrer">
                    <div className="contact-item-icon github">🐙</div>
                    <div className="contact-item-info">
                        <span className="contact-item-label">GitHub</span>
                        <span className="contact-item-value">Shreenathmehta32</span>
                    </div>
                </a>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
                <h3 className="contact-form-title">📝 Send a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-field">
                        <label className="contact-label">Your Name</label>
                        <input
                            type="text"
                            name="from_name"
                            required
                            placeholder="John Doe"
                            className="contact-input"
                        />
                    </div>
                    <div className="contact-field">
                        <label className="contact-label">Your Email</label>
                        <input
                            type="email"
                            name="from_email"
                            required
                            placeholder="john@example.com"
                            className="contact-input"
                        />
                    </div>
                    <div className="contact-field">
                        <label className="contact-label">Message</label>
                        <textarea
                            name="message"
                            required
                            placeholder="Hey Shreenath, I'd love to collaborate on..."
                            rows={4}
                            className="contact-textarea"
                        />
                    </div>
                    <button type="submit" className="contact-submit" disabled={sending}>
                        {sending ? '⏳ Sending...' : '🚀 Send Message'}
                    </button>
                    {status === 'success' && (
                        <div className="contact-status success">✅ Message sent! I'll get back to you soon.</div>
                    )}
                    {status === 'error' && (
                        <div className="contact-status error">❌ Failed to send. Try emailing me directly.</div>
                    )}
                </form>
            </div>
        </div>
    );
};
