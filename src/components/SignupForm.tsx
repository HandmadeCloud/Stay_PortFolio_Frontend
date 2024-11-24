'use client';

import { useState } from 'react';
import { signupApi } from '@/lib/signupApi';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone_number: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await signupApi(formData);
      setMessage('회원가입 성공: ' + response.message);
      setFormData({ email: '', password: '', name: '', phone_number: '' });
    } catch (error) {
      setMessage((error as Error).message || '회원가입 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리 중...' : '회원가입'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}