'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordField() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor="password" className="mb-1 block text-sm">Password</label>
      <div className="relative">
        <input id="password" name="password" type={visible ? 'text' : 'password'} required maxLength={256} autoComplete="current-password"
          className="min-h-11 w-full min-w-0 rounded-[2px] border border-[#8c8f94] bg-white py-2 pl-2 pr-12 text-base focus:outline-2 focus:outline-[#3858e9]" />
        <button type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} aria-controls="password"
          onClick={() => setVisible(!visible)} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#3858e9] focus-visible:outline-2 focus-visible:outline-[#3858e9]">
          {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
