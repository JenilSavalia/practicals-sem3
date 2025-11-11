// app/hotels/[hotelId]/page.tsx

interface Props {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelDetail({ params }: Props) {
  const { hotelId } = await params; // ✅ await params

  return (
    <div>
      <h1>Hotel Details Page</h1>
      <p>Hotel ID: {hotelId}</p>
    </div>
  );
}
