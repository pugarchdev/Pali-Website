import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, service, date, location, details, hp } = body;

    // Spam honeypot detection: If hidden field is filled, reject silently
    if (hp) {
      return NextResponse.json(
        { success: false, error: "Spam submission detected." },
        { status: 400 }
      );
    }

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 422 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    if (!details || details.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please share a few more details about your project or gathering (at least 10 characters).",
        },
        { status: 422 }
      );
    }

    // In production, integrate here with Resend, Postmark, SendGrid or a secure webhook.
    // For local and production readiness, we log the enquiry safely on the server:
    console.log("[Studio Enquiry Received]", {
      name: name.trim(),
      email: email.trim(),
      service: service || "General Commission Enquiry",
      date: date || "Flexible / Unset",
      location: location || "Scotland / Unspecified",
      detailsLength: details.trim().length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out. Alasdair has received your enquiry and will respond within 24 to 48 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing enquiry submission:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected server error occurred while sending your enquiry. Please email us directly at studio@alasdairvance.com.",
      },
      { status: 500 }
    );
  }
}
