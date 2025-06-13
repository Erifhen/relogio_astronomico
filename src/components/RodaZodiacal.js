import React from "react";
import image from "../roda-do-zodiaco.png";

const zodiacSigns = [
  { name: "Aries", start: "03-21", end: "04-19" },
  { name: "Taurus", start: "04-20", end: "05-20" },
  { name: "Gemini", start: "05-21", end: "06-20" },
  { name: "Cancer", start: "06-21", end: "07-22" },
  { name: "Leo", start: "07-23", end: "08-22" },
  { name: "Virgo", start: "08-23", end: "09-22" },
  { name: "Libra", start: "09-23", end: "10-22" },
  { name: "Scorpio", start: "10-23", end: "11-21" },
  { name: "Sagittarius", start: "11-22", end: "12-21" },
  { name: "Capricorn", start: "12-22", end: "01-19" },
  { name: "Aquarius", start: "01-20", end: "02-18" },
  { name: "Pisces", start: "02-19", end: "03-20" },
];

function getCurrentSign(date = new Date()) {
  const monthDay = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { start, end } = zodiacSigns[i];
    if (
      (start <= monthDay && monthDay <= end) ||
      (start > end && (monthDay >= start || monthDay <= end))
    ) {
      return { index: i, ...zodiacSigns[i] };
    }
  }
  return null;
}

export default function ZodiacClock() {
  const sign = getCurrentSign();
  const imageOffSet =  8;
  const adjustedIndex = (sign.index - imageOffSet + 12) % 12;
  const rotationDegrees = -adjustedIndex * 32;

  return (
    <div style={{ width: 600, height: 600, position: "relative" }}>
      <img
        src={image}
        alt="Zodiac Wheel"
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${rotationDegrees}deg)`,
          transition: "transform 1s ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {sign?.name}
      </div>
    </div>
  );
}
