import { NextRequest, NextResponse } from "next/server";

interface QuoteRequestData {
  name: string;
  contactMethod: "phone" | "email";
  contact: string;
  product: string;
  notes: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequestData = await request.json();

    // Validate required fields
    if (!body.name || !body.contact || !body.product) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log the quote request (in real implementation, save to database)
    console.log("New Quote Request:", {
      timestamp: new Date().toISOString(),
      name: body.name,
      contactMethod: body.contactMethod,
      contact: body.contact,
      product: body.product,
      notes: body.notes,
    });

    // TODO: In a real implementation, you would:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Integrate with CRM system

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
        requestId: `QR-${Date.now()}`, // Generate unique request ID
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
