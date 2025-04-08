'use client';
import SectionHead from './SectionHead';
import { useRef, useState } from 'react';
import emailJS from '@emailjs/browser';
import CustomToast from './CustomToast';

const ContactSection = () => {
  const defaultToastState = { visible: false, message: null, severity: 'success' };
  const [isDisabled, setIsDisabled] = useState(false);
  const [toast, setToast] = useState(defaultToastState);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    emailJS.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, formRef.current, {
      publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
    }).then(() => {
      setToast({ visible: true, message: 'Successfully sent', severity: 'success' });
      formRef.current.reset();
      setIsDisabled(false);
    },
      (error) => {
        console.error(error);
        setToast({ visible: true, message: 'Something went wrong', severity: 'error' });
        formRef.current.reset();
        setIsDisabled(false);
      },
    );
  };

  return (
    <section id='contact' className='text-white scroll-mt-[80px] min-h-[60vh] flex flex-col items-center justify-center'>
      <SectionHead>Let&apos;s Connect</SectionHead>
      <div className="mt-6 w-full max-w-lg p-6 bg-gradient-to-b from-slate-900 border border-gray-600 rounded-md">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input type='text' name='name' placeholder='Name' required className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500" />
          <input type='email' name='email' placeholder='Email' required className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500" />
          <input type='text' name='subject' placeholder='Subject' required className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500" />
          <textarea name='message' placeholder='Message' rows="6" className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md px-4 border border-gray-600 text-sm pt-2.5 outline-none focus:border-blue-500"></textarea>
          <button disabled={isDisabled} type='submit' className="rounded-md text-sm px-4 py-2.5 w-full !mt-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white">Message</button>
        </form>
      </div>
      <div>
        {
          toast.visible ? 
            <CustomToast
              severity={toast.severity}
              message={toast.message}
              handleClose={() => { setToast(defaultToastState); }}
            />
            : null
        }
      </div>
    </section>
  );
};

export default ContactSection;
