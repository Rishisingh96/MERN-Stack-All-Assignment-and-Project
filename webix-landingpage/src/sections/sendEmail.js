import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init("tXdd0MXJ57Y6Zuvbj");

export const sendEmail = async (e) => {
  e.preventDefault();

  try {
    const form = e.target;
    const formData = new FormData(form);
    
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      industry: formData.get('industry'),
      budget: formData.get('budget'),
      message: formData.get('message'),
    };

    await emailjs.send(
      "service_izyqmmp",
      "template_1k87zk2",
      templateParams
    );
    
    alert("Thank you for your response! We will get back to you soon.");
  } catch (error) {
    console.error('EmailJS Error:', error);
    alert('Failed to send email. Please try again or contact us directly.');
    throw error;
  }
};