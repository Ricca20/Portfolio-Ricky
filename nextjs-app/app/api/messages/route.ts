import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { sendContactEmail } from "@/lib/emailService";
import Message from "@/models/Message";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const readParam = searchParams.get("read");

    const query: Record<string, boolean> = {};
    if (readParam !== null) {
      query.read = readParam === "true";
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide name, email, and message",
        },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({ name, email, subject, message });

    // Send email notification (non-critical — don't fail if email fails)
    try {
      await sendContactEmail({ name, email, subject: subject || "No Subject", message });
    } catch (emailError) {
      console.error("Email notification failed (non-critical):", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        data: newMessage,
        message: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
