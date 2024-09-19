import React from 'react'
import Navbar from '../../Navbar'
import StNavbar from '../../StNavbar'

const About = () => {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="hero_section container" style={{ height: '99vh' }}>
        <div className="about_heading" style={{ marginTop: '5rem' }}>
          <p style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#21A0A0 ' }}>About Us - LearnHub </p>
        </div>

        <div className="about_content">
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>Welcome to LearnHub, your gateway to a world of boundless learning opportunities!

            At LearnHub, we believe that education should be accessible to everyone, anytime, anywhere. Our mission is to empower learners of all ages and backgrounds to unlock their full potential through innovative e-learning solutions. Whether you're a student looking to supplement your studies, a professional aiming to enhance your skills, or an enthusiast eager to explore new subjects, we've got you covered.

            Driven by a passion for knowledge and fueled by cutting-edge technology, our platform offers a diverse range of courses taught by industry experts, educators, and thought leaders from around the globe. From academic subjects to practical skills, from beginner tutorials to advanced masterclasses, there's something for everyone on LearnHub.

            What sets us apart is our commitment to providing a seamless and engaging learning experience. Our intuitive interface, personalized recommendations, and interactive features make learning both effective and enjoyable. Whether you prefer to learn at your own pace or engage with a vibrant community of fellow learners, LearnHub offers the flexibility and support you need to succeed.

            But we're more than just a platform – we're a community. We believe in the power of collaboration, curiosity, and lifelong learning. That's why we're constantly evolving, adding new courses, features, and resources to meet the ever-changing needs of our diverse user base.

            Join us on this exciting journey of discovery and growth. Whether you're taking your first step or pursuing your lifelong passion, LearnHub is here to help you achieve your goals, one lesson at a time.

            Start your learning adventure today with LearnHub – where knowledge knows no bounds.</p>

          <div className="about_contact" style={{paddingBottom:'5rem'}}>
              <div className="contact_us_heading">
                <p style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#21A0A0 ' }}>Contact Us</p>
              </div>

              <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>If you have any questions or suggestions, feel free to reach out to us at wade.neversendEmail@gmail.com or connect with us on social media!

              Join us on this exciting journey of discovery and growth. Whether you're taking your first step or pursuing your lifelong passion, LearnHub is here to help you achieve your goals, one lesson at a time.

              Start your learning adventure today with LearnHub – where knowledge knows no bounds.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About
