import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://dev.qubic.at:8080/api/service/v1/qx/assets')
    const assets = await response.json()
    return NextResponse.json(assets, { status: 200 })
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 })
  }
}