/** Shared (non-server) types + initial state for the contact form. */

export type ContactField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "subject"
  | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors: Partial<Record<ContactField, string>>;
  formError?: string;
  values: Record<ContactField, string>;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  fieldErrors: {},
  values: {
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  },
};
