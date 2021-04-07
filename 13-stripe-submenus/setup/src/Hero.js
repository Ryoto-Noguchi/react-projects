import React from 'react'
import phoneImg from './images/phone.svg'
import {useGlobalContext} from "./context"

const Hero = () => {
  const {closSubmenu} = useGlobalContext()
  return (
    <section className="hero">
      <div className="hero-center">
      <article className="hero-info">
        <h1>Payments infrastructure for the internet</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sunt, similique praesentium laboriosam expedita harum pariatur repellendus, ipsa at enim, commodi veniam molestias consectetur dolore tenetur doloribus laudantium! Voluptatem odio doloremque facilis iste beatae laborum, voluptatibus illum possimus dignissimos reprehenderit.
        </p>
        <button className="btn">Start now</button>
      </article>
      <article className="hero-images">
        <img src={phoneImg} alt="phone" className="phone-img"/>
      </article>
      </div>
    </section>
  )
}

export default Hero
