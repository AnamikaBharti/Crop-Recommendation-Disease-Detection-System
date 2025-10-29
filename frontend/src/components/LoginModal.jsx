import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Leaf, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// --- API Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md transition-colors ${className}`} {...props}>
    {children}
  </button>
);
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white rounded-lg ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>{children}</div>
);
const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
);
const Input = ({ className, ...props }) => (
  <input className={`w-full p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-green-500 outline-none ${className}`} {...props} />
);
const Label = ({ children, className, ...props }) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);
const TabsContext = createContext();
const Tabs = ({ children, defaultValue, onValueChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};
const TabsList = ({ children, className }) => <div className={className}>{children}</div>;
const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button onClick={() => setActiveTab(value)} className={`w-full p-2 text-sm font-semibold transition-colors ${className} ${isActive ? "bg-[#004D40] text-white rounded-md shadow" : "text-gray-500"}`}>
      {children}
    </button>
  );
};
const TabsContent = ({ children, value }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
};

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", phone: "", location: "", password: "" });

  useEffect(() => {
   
    if (!isOpen) {
      setLoginData({ email: "", password: "" });
      setSignupData({ name: "", email: "", phone: "", location: "", password: "" });
    }
  }, [isOpen]);

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const toast = (msg) => window.alert(msg);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);
      const { token } = res.data;

      if (token) {
        login(token);
      }
      
      toast(`${t("loginPage.toastLoginSuccess")}`);
      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast(error.response?.data?.message || "Invalid credentials.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, signupData);
      toast(`${t("loginPage.toastSignupSuccess")}`);
      alert("Please log in with your new account.");
    } catch (error) {
      toast(error.response?.data?.message || "Signup failed.");
    }
  };

  const bgTeal = "bg-[#004D40]";
  const hoverGreen = "hover:bg-[#45a049]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-[#F5FFFA] rounded-xl shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-2xl z-10"
              aria-label="Close"
            >
              &times;
            </button>
            
            <div className="w-full space-y-3">
              <div className="text-center pt-8">
                <h2 className="text-3xl font-bold text-gray-800">{t('loginPage.hello')}</h2>
                <p className="text-gray-500 mt-2">{t('loginPage.welcome')}</p>
              </div>

              <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-1 rounded-md">
                      <TabsTrigger value="login">
                        <Users className="inline h-4 w-4 mr-2" />
                        {t('loginPage.login')}
                      </TabsTrigger>
                      <TabsTrigger value="signup">
                        <Leaf className="inline h-4 w-4 mr-2" />
                        {t('loginPage.signup')}
                      </TabsTrigger>
                    </TabsList>

                    <CardContent className="mt-6">
                      <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-1">
                            <Label htmlFor="login-email">{t('loginPage.email')}</Label>
                            <Input id="login-email" name="email" type="email" value={loginData.email} onChange={handleLoginChange} required />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="login-password">{t('loginPage.password')}</Label>
                            <Input id="login-password" name="password" type="password" value={loginData.password} onChange={handleLoginChange} required />
                          </div>
                          <Button type="submit" className={`w-full ${bgTeal} text-white ${hoverGreen}`}>
                            {t('loginPage.loginBtn')}
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 space-y-1">
                            <Label htmlFor="signup-name">{t('loginPage.name')}</Label>
                            <Input id="signup-name" name="name" value={signupData.name} onChange={handleSignupChange} required />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="signup-email">{t('loginPage.email')}</Label>
                            <Input id="signup-email" name="email" type="email" value={signupData.email} onChange={handleSignupChange} required />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="signup-phone">{t('loginPage.phone')}</Label>
                            <Input id="signup-phone" name="phone" type="tel" value={signupData.phone} onChange={handleSignupChange} />
                          </div>
                          <div className="col-span-2 space-y-1">
                            <Label htmlFor="signup-location">{t('loginPage.location')}</Label>
                            <Input id="signup-location" name="location" value={signupData.location} onChange={handleSignupChange} />
                          </div>
                          <div className="col-span-2 space-y-1">
                            <Label htmlFor="signup-password">{t('loginPage.password')}</Label>
                            <Input id="signup-password" name="password" type="password" value={signupData.password} onChange={handleSignupChange} required />
                          </div>
                          <div className="col-span-2">
                            <Button type="submit" className={`w-full ${bgTeal} text-white ${hoverGreen}`}>
                              {t('loginPage.signupBtn')}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
