"use server";

import { isLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";
import {
  initialContactState,
  type ContactField,
  type ContactFormState,
} from "./form-state";

const REQUIRED: ContactField[] = ["name", "email", "subject", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const localeRaw = String(formData.get("locale") ?? "en");
  const locale = isLocale(localeRaw) ? localeRaw : "en";
  const dict = await getDictionary(locale);
  const t = dict.contact.form;

  const values: Record<ContactField, string> = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  for (const f of REQUIRED) {
    if (!values[f]) fieldErrors[f] = t.errorRequired;
  }
  if (values.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email = t.errorEmail;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  try {
    // Integration point: forward the enquiry to an email provider or CRM.
    // Left unwired deliberately: no provider credentials are configured for
    // this build. Replace the log below with e.g. a Resend / SMTP call.
    console.info("[contact] enquiry received", {
      ...values,
      locale,
      receivedAt: new Date().toISOString(),
    });

    return {
      status: "success",
      fieldErrors: {},
      values: initialContactState.values,
    };
  } catch {
    return {
      status: "error",
      fieldErrors: {},
      formError: t.errorGeneric,
      values,
    };
  }
}
