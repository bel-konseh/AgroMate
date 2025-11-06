
function AboutUs() {
  return (
    <main className='flex justify-center items-center lg:h-[600px] bg-[url("src/assets/images/about-bg.png")]  relative bg-cover'>
     
      <div className="absolute inset-0 bg-[url('src/assets/images/about-gradient.png')] "></div>
      <div className='lg:h-[494px] lg:w-[1216px] flex flex-col bg-red-300/10 lg:flex-row text-white w-4/5] z-10'>
        <div className='p-5 lg:w-1/2 lg:p-20'>
          <h2 className='font-bold text-3xl'>Who are we?</h2>
        </div>
        <div className='lg:w-1/2 p-3 lg:text-[16px]'>
          <p>Agromate is your gateway to a better food system in Bamenda. We're a passionate team on a mission to connect you directly with local farmers, bringing the freshest produce straight from farm to fridge</p>

          <h2 className='font-semibold text-xl mb-2.5'>Why We Do It</h2>
          <p>We believe everyone deserves access to healthy, delicious food. But the traditional food system often creates barriers, leading to inflated prices, limited choices, and a disconnect between consumers and the source of their food</p>

          <h3 className='font-semibold text-xl mb-2.5'>The Agromate Difference</h3>
          <ul className='list-disc p-2.5'>
            <li>Hyper-Local Focus:  We connect you directly with Bamenda-area farmers, ensuring peak freshness and supporting your local community.</li>
            <li>On-Demand Convenience:  Order farm-fresh produce through our user-friendly app and have it delivered straight to your doorstep.</li>
            <li>Fair Prices & Transparency:  Our streamlined supply chain eliminates unnecessary middlemen, offering competitive prices for both farmers and consumers. You'll know exactly where your food comes from and who you're supporting.</li>
            <li>Sustainable Practices:  We champion eco-friendly agriculture and empower local farmers to adopt sustainable practices.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default AboutUs
