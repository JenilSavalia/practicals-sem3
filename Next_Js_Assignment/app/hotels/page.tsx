// app/hotels/page.tsx
import Link from "next/link";

export default function Hotels() {
  const hotels = [
    { id: 1, name: "Lotus Hotel" },
    { id: 2, name: "Blue Bay Resort" },
  ];

  return (
    <div>
      <h1>Hotels</h1>
      <ul>
        {hotels.map((h) => (
          <li key={h.id}>
            <Link href={`/hotels/${h.id}`}>{h.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
