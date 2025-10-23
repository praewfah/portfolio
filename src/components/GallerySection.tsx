'use client';

function GalleryItem() {
  return (
    <div className="aspect-square bg-gradient-to-b from-blue-100 to-green-100 rounded-sm border border-gray-300" />
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="pt-6 pb-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <GalleryItem key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
