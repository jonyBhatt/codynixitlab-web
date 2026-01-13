import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const SchedulingModal: React.FC = () => {
    const { isModalOpen, closeModal } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                closeModal();
            }, 3000);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                {isSubmitted ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                        <p className="text-slate-600">We've sent a confirmation email with the meeting details.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Schedule a Consultation</h3>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Calendar size={14} className="text-blue-500" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-700"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                        <Clock size={14} className="text-blue-500" /> Time
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <User size={14} className="text-blue-500" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <Mail size={14} className="text-blue-500" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                    <MessageSquare size={14} className="text-blue-500" /> Project Details
                                </label>
                                <textarea
                                    placeholder="Briefly describe your project..."
                                    rows={3}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-2"
                            >
                                Confirm Meeting
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default SchedulingModal;
