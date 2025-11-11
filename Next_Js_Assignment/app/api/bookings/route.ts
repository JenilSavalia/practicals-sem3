import { NextResponse } from 'next/server';
import { readBookings, writeBookings, generateId } from '../../../lib/bookings';

export async function GET() {
  try {
    const bookings = await readBookings();
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) || {};
    const { hotelId, userId, startDate, endDate, guests, notes } = body;

    if (!hotelId || !userId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: hotelId, userId, startDate, endDate' },
        { status: 400 }
      );
    }

    const bookings = await readBookings();
    const id = generateId();
    const createdAt = new Date().toISOString();

    const newBooking = {
      id,
      hotelId: String(hotelId),
      userId: String(userId),
      startDate: String(startDate),
      endDate: String(endDate),
      guests: guests ? Number(guests) : undefined,
      notes: notes ? String(notes) : undefined,
      createdAt,
    };

    bookings.push(newBooking);
    await writeBookings(bookings);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
