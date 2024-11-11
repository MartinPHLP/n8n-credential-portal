import { NextResponse } from "next/server";
import { BaseCredential } from "@/types/credentials";

export async function POST(request: Request) {
  try {
    const data: BaseCredential = await request.json();

    const response = await fetch(
      "https://vps-99122bfa.vps.ovh.net/api/v1/credentials",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "X-N8N-API-KEY": process.env.N8N_API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create credential" },
      { status: 500 }
    );
  }
}
