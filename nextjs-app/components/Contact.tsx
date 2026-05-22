'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useApi';
import { messageAPI, MessageData } from '@/services/apiServices';
import { validateEmail } from '@/utils/helpers';
import { useTheme } from '@/context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<MessageData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { loading, error, success, submit } = useFormSubmit<MessageData>(messageAPI.sendMessage);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!validateEmail(formData.email)) errors.email = 'Valid email is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const succeeded = await submit(formData);
    if (succeeded) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setValidationErrors({}), 2000);
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } transition-colors duration-300 scroll-mt-20`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
            isDark ? 'text-cyan-400' : 'text-cyan-600'
          } mb-10 text-center font-handwritten`}
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p
              className={`${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } text-sm md:text-base mb-4 font-body`}
            >
              I&apos;m always interested in hearing about new projects and opportunities. Whether
              you have a question or just want to say hello, feel free to reach out.
            </p>
            <a
              href="mailto:pereraricky20@gmail.com"
              className={`${
                isDark
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-cyan-600 hover:text-cyan-500'
              } text-base md:text-lg font-medium transition-colors font-body`}
            >
              pereraricky20@gmail.com
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg text-sm"
              >
                Message sent successfully!
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 ${
                    isDark
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-900 border-gray-200'
                  } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all ${
                    validationErrors.name ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="First Name"
                  aria-label="First Name"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  className={`w-full px-4 py-2.5 ${
                    isDark
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-900 border-gray-200'
                  } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  placeholder="Last Name"
                  aria-label="Last Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-gray-50 text-gray-900 border-gray-200'
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all ${
                  validationErrors.email ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Email"
                aria-label="Email Address"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-gray-50 text-gray-900 border-gray-200'
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all ${
                  validationErrors.subject ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Subject"
                aria-label="Message Subject"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2.5 ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-gray-50 text-gray-900 border-gray-200'
                } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none transition-all ${
                  validationErrors.message ? 'ring-2 ring-red-500' : ''
                }`}
                placeholder="Message"
                aria-label="Your Message"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className={`w-full px-6 py-3 ${
                isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-cyan-600 hover:bg-cyan-700'
              } text-white rounded-md font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed font-body`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
