"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Create a single Supabase client instance
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define schemas for validation
const newsletterSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Server Action for Newsletter Subscription
export async function handleNewsletterSubmission(prevState: any, formData: FormData) {
  const validatedFields = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid input.",
    };
  }

  const { error } = await supabase
    .from("newsletter_subscriptions")
    .insert({ email: validatedFields.data.email });

  if (error) {
    // Handle potential duplicate email error
    if (error.code === '23505') {
       return { success: true, message: "You're already subscribed!" };
    }
    console.error("Supabase Error:", error.message);
    return { success: false, message: "Could not subscribe. Please try again later." };
  }

  return { success: true, message: "You're in! Check your inbox soon." };
}

// Server Action for Contact Form
export async function handleContactSubmission(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("cemail"), // Note: name is 'cemail' in your form
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
     const errors = validatedFields.error.flatten().fieldErrors;
     const firstError = Object.values(errors)[0]?.[0] || "Invalid input provided.";
    return { success: false, message: firstError };
  }

  const { error } = await supabase
    .from("contacts")
    .insert(validatedFields.data);

  if (error) {
    console.error("Supabase Error:", error.message);
    return { success: false, message: "Could not send message. Please try again." };
  }

  return { success: true, message: "Message sent! We'll reach out shortly." };
}