import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => (
  <div>
    <div className="text-2xl text-center pt-8 border-t">
      <Title text1={"ABOUT"} text2={"US"} />
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16">
      <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>
          At SHAMI WATCH, we believe a watch is more than just a way to tell
          time—it’s a statement of style, personality, and precision. Our
          mission is to bring you a carefully curated collection of watches that
          combine elegance, durability, and modern design.
        </p>
        <p>
          We are passionate about quality and craftsmanship. Each watch in our
          collection is selected with attention to detail, ensuring it meets
          high standards of performance and design. We work with trusted brands
          and manufacturers to deliver reliable watches that not only look great
          but also stand the test of time.
        </p>
        <b className="text-gray-800">Our Mission</b>
        <p>
          Our goal is to make watch shopping simple, convenient, and enjoyable.
          Through our online store, customers can explore a wide variety of
          styles, compare options, and find the perfect watch from the comfort
          of their home.
        </p>
      </div>
    </div>

    <div className="text-xl py-4">
      <Title text1={"WHY"} text2={"CHOOSE US"} />
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">
          We are committed to providing watches that meet high standards of
          quality and reliability. Every product in our collection is carefully
          selected and inspected to ensure durability, precision, and style. Our
          goal is to deliver timepieces that not only look great but also
          perform flawlessly for years to come.
        </p>
      </div>

      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p className="text-gray-600">
          Shopping for the perfect watch should be simple and enjoyable. Our
          online store is designed to make browsing, selecting, and purchasing
          watches easy and hassle-free. With a user-friendly interface, secure
          payment options, and fast delivery, you can shop confidently from the
          comfort of your home.
        </p>
      </div>

      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service:</b>
        <p className="text-gray-600">
          Our customers are at the heart of everything we do. We strive to
          provide responsive support, clear communication, and a smooth shopping
          experience from start to finish. Whether you need help choosing the
          right watch or assistance after your purchase, our team is always
          ready to help.
        </p>
      </div>
    </div>

    {/* news letter box.......... */}
    <NewsletterBox />
  </div>
);

export default About;
