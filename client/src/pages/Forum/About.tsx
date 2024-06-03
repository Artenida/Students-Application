const About = () => {
    return (
      <div className="bg-gray-100 min-h-screen pt-16 pr-4 pl-20">
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-32 py-16">
          <div className="bg-white p-6 lg:p-10 w-full max-w-screen-lg rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-custom-color3">About Us</h1>
            <p className="text-lg mb-4">
              Welcome to EduConnect, the premier forum for students to connect,
              collaborate, and succeed together. Our mission is to provide a
              supportive and engaging platform where students can share knowledge, 
              seek advice, and build lasting connections.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-4">Our Vision</h2>
            <p className="text-md mb-4">
              At EduConnect, we envision a community of students who are
              empowered to help each other achieve their academic and personal
              goals. We believe in the power of collaboration and the importance
              of a supportive community.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside mb-4">
              <li className="text-md mb-2">Student Forums: Engage in discussions on various topics.</li>
              <li className="text-md mb-2">Event Updates: Stay informed about upcoming events and opportunities.</li>
              <li className="text-md mb-2">Real-time Chat: Connect with peers instantly through our chat feature.</li>
              {/* <li className="text-md mb-2">Resource Sharing: Share and access study materials, guides, and more.</li> */}
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-4">Our Community</h2>
            <p className="text-md mb-4">
              Our community is made up of students from diverse backgrounds and
              fields of study. We foster an inclusive environment where everyone
              is welcome to share their experiences and insights. Whether you are
              looking for study partners, mentors, or just want to make new
              friends, EduConnect is the place for you.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-4">Get Involved</h2>
            <p className="text-md mb-4">
              Join EduConnect today and start connecting with other students. 
              Together, we can achieve more.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  