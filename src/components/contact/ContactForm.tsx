"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ApiError, submitContact } from "@/lib/api";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const inputClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-charcoal focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30 disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "mb-1 block text-sm font-medium text-charcoal";
const errorClass = "mt-1 text-xs text-red-600";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await submitContact({
        name: values.name,
        email: values.email,
        message: values.message,
        subject: values.subject,
        ...(values.phone ? { phone: values.phone } : {}),
      });
      toast.success(
        "Message sent! We'll get back to you within 24 hours. ✉️"
      );
      reset();
    } catch (err) {
      const message =
        err instanceof ApiError && err.message
          ? err.message
          : "Failed to send. Please try again.";
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6"
      noValidate
      aria-busy={isSubmitting}
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={inputClass}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name && (
          <p className={errorClass}>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone Number{" "}
          <span className="font-normal text-cool-gray">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        {errors.phone && (
          <p className={errorClass}>{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <select
          id="contact-subject"
          className={inputClass}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          {...register("subject")}
        >
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className={errorClass}>{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={`${inputClass} resize-y`}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner className="h-5 w-5 text-navy" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
