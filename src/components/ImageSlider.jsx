import { useEffect, useState } from "react";

const ImageSlider = ({ images, alt = "Otuuse service" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-44 md:h-48 overflow-hidden rounded-xl bg-green-50">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} photo ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`w-2 h-2 rounded-full transition ${
                i === index ? "bg-orange-500" : "bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;