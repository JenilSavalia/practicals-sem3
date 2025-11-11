import { NextResponse } from 'next/server';
import { readBookings, writeBookings } from '../../../../lib/bookings';

export async function GET(request: Request, { params }: { params: { bookingId: string } }) {
  try {
    const { bookingId } = params;
    const bookings = await readBookings();
    const found = bookings.find((b) => b.id === bookingId);
    if (!found) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(found);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read booking' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { bookingId: string } }) {
  try {
    const { bookingId } = params;
    const bookings = await readBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const [deleted] = bookings.splice(idx, 1);
    await writeBookings(bookings);
    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
