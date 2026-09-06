"use client";

import { useActionState, useId, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { Icon } from "@/components/ui/icon";
import { submitContactForm } from "@/app/[lang]/contact/actions";
import { initialContactState } from "@/app/[lang]/contact/form-state";

type FormDict = {
  title: string;
  note: string;
  fields: {
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  subjectPlaceholder: string;
  subjectOptions: { value: string; label: string }[];
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
};

type FieldName = keyof FormDict["fields"];

export function ContactForm({
  locale,
  form,
}: {
  locale: Locale;
  form: FormDict;
}) {
  // Remounting on "send another" is the simplest way to reset `useActionState`.
  const [instance, setInstance] = useState(0);
  return (
    <ContactFormFields
      key={instance}
      locale={locale}
      form={form}
      onReset={() => setInstance((n) => n + 1)}
    />
  );
}

function ContactFormFields({
  locale,
  form,
  onReset,
}: {
  locale: Locale;
  form: FormDict;
  onReset: () => void;
}) {
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialContactState,
  );
  const uid = useId();

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-hairline bg-white p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Icon name="check" size={24} strokeWidth={2.2} />
        </span>
        <h2 className="text-xl font-bold text-navy-900">{form.successTitle}</h2>
        <p className="leading-relaxed text-muted">{form.successBody}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-700 hover:text-amber-600"
        >
          {form.sendAnother}
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    );
  }

  const bind = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    defaultValue: state.values[name],
    "aria-invalid": Boolean(state.fieldErrors[name]) || undefined,
    "aria-describedby": state.fieldErrors[name]
      ? `${uid}-${name}-err`
      : undefined,
  });

  const fieldError = (name: FieldName): ReactNode =>
    state.fieldErrors[name] ? (
      <p id={`${uid}-${name}-err`} className="text-xs font-medium text-red-600">
        {state.fieldErrors[name]}
      </p>
    ) : null;

  const labelCls = "font-display text-sm font-semibold text-navy-800";
  const controlCls =
    "w-full rounded-md border border-hairline bg-white px-3.5 py-2.5 text-[0.95rem] text-foreground shadow-sm outline-none transition-colors placeholder:text-sand-400 focus:border-navy-400 focus:ring-2 focus:ring-navy-200 aria-[invalid]:border-red-400 aria-[invalid]:ring-red-100";

  return (
    <form
      action={action}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-hairline bg-white p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      <div>
        <h2 className="text-xl font-bold text-navy-900">{form.title}</h2>
        <p className="mt-1 text-sm text-muted">{form.note}</p>
      </div>

      {state.formError ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          {state.formError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className={labelCls}>
            {form.fields.name} *
          </label>
          <input
            type="text"
            autoComplete="name"
            className={controlCls}
            {...bind("name")}
          />
          {fieldError("name")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-company`} className={labelCls}>
            {form.fields.company}
          </label>
          <input
            type="text"
            autoComplete="organization"
            className={controlCls}
            {...bind("company")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-email`} className={labelCls}>
            {form.fields.email} *
          </label>
          <input
            type="email"
            autoComplete="email"
            className={controlCls}
            {...bind("email")}
          />
          {fieldError("email")}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            {form.fields.phone}
          </label>
          <input
            type="tel"
            autoComplete="tel"
            className={controlCls}
            {...bind("phone")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-subject`} className={labelCls}>
          {form.fields.subject} *
        </label>
        <select
          id={`${uid}-subject`}
          name="subject"
          defaultValue={state.values.subject || ""}
          aria-invalid={Boolean(state.fieldErrors.subject) || undefined}
          aria-describedby={
            state.fieldErrors.subject ? `${uid}-subject-err` : undefined
          }
          className={controlCls}
        >
          <option value="" disabled>
            {form.subjectPlaceholder}
          </option>
          {form.subjectOptions.map((opt) => (
            <option key={opt.value} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldError("subject")}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-message`} className={labelCls}>
          {form.fields.message} *
        </label>
        <textarea rows={5} className={`${controlCls} resize-y`} {...bind("message")} />
        {fieldError("message")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center justify-center gap-2 self-start rounded-md bg-amber-500 px-7 py-3.5 font-display text-[0.95rem] font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(247,162,31,0.7)] transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-60"
      >
        {pending ? form.sending : form.submit}
        {!pending && (
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        )}
      </button>
    </form>
  );
}
