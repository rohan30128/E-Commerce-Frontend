import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';

export default function Layout({
  children,
  title = "E-Commerce Shop now",
  description= "mern stack project",
  keywords = "mern,react,node,mongodb,express",
  author = "Dev-Rohan",
}) 
{
  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }} className="">
      <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}
