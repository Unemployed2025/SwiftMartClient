function HeroForHomePage() {
  return (
    <section className="bg-[#40916C] min-h-screen flex flex-col justify-center items-center text-center pt-16 font-myfont relative">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="bg-black"></div>
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h1 className="text-9xl font-robotofont text-[#081C15] mb-4">
          Wife Complaining About Furniture!
        </h1>
        <h2 className="text-8xl font-robotofont text-[#081C15] m-6">We Welcome’s You</h2>
        <p className="text-2xl text-gray-700 font-robotofont">
          You can thank us because we made you lucky that night
        </p>
      </div>
    </section>
  );
}

export default HeroForHomePage;