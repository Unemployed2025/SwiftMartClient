import { useState } from "react";
import { sendNewsletterRegards } from "../../api/newsletterRoute";
function PageNewsletter() {
  const [email, setEmail] = useState("");
  let subject = "Welcome to our Newsletter!";
  let message = "<b>🎉 Welcome to our newsletter!</b> 🎉<br><br>Thank you for subscribing to our daily updates. We're excited to bring you the latest trends, tips, and exclusive offers straight to your inbox. <br><br>Stay tuned for more exciting content! <br><br>🚀Best regards,The SWIFT_MART Team 🛍️"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("No reason why you'r wife is angry with you.");
      return;
    }

    try {
      const response = await sendNewsletterRegards(email, subject, message);
      alert(response.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
    setEmail("");
  };

  return (
    <div className="bg-[#283618] text-white py-24 px-6">
      <div className="text-center">
        <h2 className="text-4xl font-robotofont mb-2">Don&apos;t Miss Out Latest Furniture&apos;s</h2>
        <p className="text-white text-xl mt-4 mb-6">With our daily newsletter</p>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 rounded-lg text-black w-96" />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PageNewsletter;
