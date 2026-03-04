import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, type, message } = body;

    // Validate input
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to Firebase
    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        type,
        message,
        createdAt: new Date(),
      });
      console.log("Message saved to Firebase");
    } catch (firebaseError) {
      console.error("Firebase error:", firebaseError);
      // Continue anyway to send email
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "noreply@yourdomain.com",
          to: process.env.CONTACT_EMAIL || "hazriqhaykal04@gmail.com",
          subject: `New ${type} inquiry from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Continue anyway, message is saved in Firebase
      }
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
