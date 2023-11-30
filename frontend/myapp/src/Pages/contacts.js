import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
const accessToken = Cookies.get("accessToken");

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contact form data from your API endpoint
    axios
      .get("http://localhost:4000/contacts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setContacts(response.data.form);
      })
      .catch((error) => {
        console.error("Error fetching contact data: ", error);
      });
  }, []);

  return (
    <>
    <Navbar/>
   
    <div className="flex flex-wrap">
      {contacts.map((contact, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-black shadow-lg rounded p-4">
            <h2 className="text-xl font-semibold">{contact.name}</h2>
            <p className="text-gray-500 mb-2">{contact.email}</p>
            <p className="text-gray-700">{contact.message}</p>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default ContactList;
