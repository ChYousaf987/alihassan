"use client";
import SectionHead from "./SectionHead";
import { useRef, useState } from "react";
import emailJS from "@emailjs/browser";
import CustomToast from "./CustomToast";
import { ArrowUp } from "lucide-react";

const ContactSection = () => {
  const defaultToastState = {
    visible: false,
    message: null,
    severity: "success",
  };

  const [isDisabled, setIsDisabled] = useState(false);
  const [toast, setToast] = useState(defaultToastState);
  const formRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    emailJS
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setToast({
            visible: true,
            message: "Successfully sent",
            severity: "success",
          });
          formRef.current.reset();
          setIsDisabled(false);

          setTimeout(() => {
            setToast(defaultToastState);
          }, 2000);
        },
        (error) => {
          console.error(error);
          setToast({
            visible: true,
            message: "Something went wrong",
            severity: "error",
          });
          formRef.current.reset();
          setIsDisabled(false);

          setTimeout(() => {
            setToast(defaultToastState);
          }, 2000);
        }
      );
  };

  return (
    <>
      <section
        id="contact"
        className="text-white scroll-mt-[80px] min-h-[60vh] flex flex-col items-center justify-center"
      >
        <SectionHead>Let&apos;s Connect</SectionHead>

        <div className="mt-6 w-full max-w-lg p-6 bg-gradient-to-b from-slate-900 border border-gray-600 rounded-md">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500"
              suppressHydrationWarning
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500"
              suppressHydrationWarning
            />
            <input
              type="text"
              name="title"
              placeholder="Subject"
              required
              className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500"
              suppressHydrationWarning
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="6"
              className="w-full bg-slate-800 placeholder-slate-300 text-white rounded-md py-2.5 px-4 border border-gray-600 text-sm outline-none focus:border-blue-500"
              suppressHydrationWarning
            ></textarea>

            <button
              disabled={isDisabled}
              type="submit"
              className={`rounded-md text-sm px-4 py-2.5 w-full !mt-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white ${
                isDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-s"
              }`}
              suppressHydrationWarning
            >
              {isDisabled && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {isDisabled ? "Sending..." : "Message"}
            </button>
          </form>
        </div>

        {toast.visible && (
          <CustomToast
            severity={toast.severity}
            message={toast.message}
            handleClose={() => setToast(defaultToastState)}
          />
        )}
      </section>

      <footer className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mt-8 w-full text-white py-7 px-8 flex justify-around items-center">
        {" "}
        <p className="text-sm text-center ">
          Copyright © 2024 by <span className="font-semibold">Ali Hassan</span>{" "}
          | All Rights Reserved.
        </p>
        
      </footer>
    </>
  );
};

export default ContactSection;
