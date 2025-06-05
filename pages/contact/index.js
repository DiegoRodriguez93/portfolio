import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import Circles from "../../components/Circles";
import MathCaptcha from "../../components/MathCaptcha";

// icons
import { BsArrowRight } from "react-icons/bs";

// framer
import { motion } from "framer-motion";

// variants
import { fadeIn } from "../../variants";

// service categories mapping
const serviceCategories = {
  "web-applications": "Web Applications Development",
  "trading-bots": "Trading Bots Development",
  "chrome-extensions": "Chrome Extensions Development",
  "mobile-apps": "Mobile Apps Development",
  "web3-development": "Web3 Development",
  "financial-solutions": "Financial Solutions Development",
};

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [selectedService, setSelectedService] = useState(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaReset, setCaptchaReset] = useState(false);

  // Load service parameter from URL - solo una vez cuando el router esté listo
  useEffect(() => {
    if (router.isReady && !selectedService) {
      const { service } = router.query;
      if (service && serviceCategories[service]) {
        setSelectedService(service);
        setFormData((prev) => ({
          ...prev,
          subject: `Inquiry about ${serviceCategories[service]}`,
          message: `Hi Diego,\n\nI'm interested in your ${serviceCategories[
            service
          ].toLowerCase()} services.\n\nI'd like to discuss:\n- \n\nLooking forward to hearing from you.\n\nBest regards.`,
        }));
      }
    }
    /* eslint-disable-next-line */
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanUrlParams = () => {
    // Limpiar los parámetros GET de la URL sin recargar la página
    const url = new URL(window.location);
    url.search = ""; // Eliminar todos los query params
    window.history.replaceState({}, "", url);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setSelectedService(null);
    setIsCaptchaValid(false);
    setCaptchaAnswer("");
    setCaptchaReset(true);
    setTimeout(() => setCaptchaReset(false), 100); // Reset captcha trigger
    cleanUrlParams();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha before submitting
    if (!isCaptchaValid) {
      setSubmitStatus("captcha_error");
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService || null,
          captchaAnswer: captchaAnswer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");

        // Usar la función centralizada para resetear todo
        resetForm();

        // Optionally redirect or show success message
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", data.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para cerrar manualmente el banner de servicio
  const clearServiceSelection = () => {
    resetForm(); // Usar la misma función para mantener consistencia
  };

  const handleCaptchaValidation = (isValid, answer) => {
    setIsCaptchaValid(isValid);
    setCaptchaAnswer(answer || "");
  };

  return (
    <div className="h-full bg-primary/30">
      <Circles />
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        {/* text & form */}
        <div className="flex flex-col w-full max-w-[700px]">
          {/* text */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          {/* Success/Error Messages */}
          {submitStatus && (
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={`mb-6 p-4 rounded-lg text-center ${
                submitStatus === "success"
                  ? "bg-green-500/10 border border-green-500/30"
                  : submitStatus === "captcha_error"
                    ? "bg-yellow-500/10 border border-yellow-500/30"
                    : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <p
                className={`font-medium ${
                  submitStatus === "success"
                    ? "text-green-400"
                    : submitStatus === "captcha_error"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {submitStatus === "success"
                  ? "Message sent successfully! I'll get back to you soon."
                  : submitStatus === "captcha_error"
                    ? "Please solve the math problem correctly before submitting."
                    : "Error sending message. Please try again."}
              </p>
            </motion.div>
          )}

          {/* Show selected service if any - con botón para cerrar */}
          {selectedService && serviceCategories[selectedService] && (
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center relative"
            >
              <p className="text-green-400 font-medium">
                Interested in: {serviceCategories[selectedService]}
              </p>
            </motion.div>
          )}

          {/* form */}
          <motion.form
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
            onSubmit={handleSubmit}
          >
            {/* input group */}
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="subject"
              className="input"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="message"
              className="textarea"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            {/* Captcha Component */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full"
            >
              <label className="block text-white/80 text-sm mb-2">
                Please solve this math problem to verify you&apos;re human:
              </label>
              <MathCaptcha
                onValidationChange={handleCaptchaValidation}
                reset={captchaReset}
              />
            </motion.div>

            <button
              type="submit"
              disabled={isSubmitting || !isCaptchaValid}
              className={`btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group ${
                isSubmitting || !isCaptchaValid
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                {isSubmitting ? "Sending..." : "Let's talk"}
              </span>
              <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
