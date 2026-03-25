import './pages.css/Home.css'
function Home() {
  return (
   <>
 <section className="body-home">
 <div className='sections upper'>

  <div className="left-nav">
    <div className='logo'>Bussiness Logo</div>
    <div className='menu'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </div>
  </div>
  <div className='account-btns'>
    <button className='login-btn'>Sign in</button>
    <button className='signup-btn'>Sign up</button>
  </div>
    
 </div>
 <div className='sections mid'>
 


  <div className='title'>We Print. We Brand. We Deliver.</div>
  <div className='description'>Every great business deserves a strong visual identity. 
We help entrepreneurs, startups, and established brands 
stand out through quality printing, creative design, and 
branding solutions that leave a lasting impression.</div>
  <button className='explore-btn'>Explore Now</button>
  
 </div>
 </section>

   </>
  );
}
export default Home;