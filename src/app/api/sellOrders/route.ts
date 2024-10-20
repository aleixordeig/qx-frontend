import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Use headers to pass the 'name' parameter
    const name = req.headers.get('x-asset-name');
    if (!name) {
      throw new Error('Asset name is required');
    }

    // Construct the URL based on the 'name' parameter
    let url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB/asset/${name}/orders/ask`;

    if (name === 'QFT') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/TFUYVBXYIYBVTEMJHAJGEJOOZHJBQFVQLTBBKMEHPEVIZFXZRPEYFUWGTIWG/asset/${name}/orders/ask`;
    } else if (name === 'CFB') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/CFBMEMZOIDEXQAUXYYSZIURADQLAPWPMNJXQSNVQZAHYVOPYUKKJBJUCTVJL/asset/${name}/orders/ask`;
    } else if (name === 'QWALLET') {
      url = `https://dev.qubic.at:8443/api/service/v1/qx/issuer/QWALLETSGQVAGBHUCVVXWZXMBKQBPQQSHRYKZGEJWFVNUFCEDDPRMKTAUVHA/asset/${name}/orders/ask`;
    }

    // Fetch data from the constructed URL
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Parse the response data
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching sell orders:', error);
    return NextResponse.json({ error: 'An error occurred while fetching sell orders.' }, { status: 500 });
  }
}