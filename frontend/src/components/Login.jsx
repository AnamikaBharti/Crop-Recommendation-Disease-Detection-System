 import React, { useState, createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Users } from "lucide-react";
import { useTranslation } from "react-i18next"; // 1. Import the hook

// --- UI Component Placeholders (Unchanged) ---
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Card = ({ children, className, ...props }) => (
  <div
    className={`bg-white border border-gray-300 rounded-lg shadow-lg ${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-green-500 outline-none ${className}`}
    {...props}
  />
);
const Label = ({ children, className, ...props }) => (
  <label
    className={`text-sm font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </label>
);
const TabsContext = createContext();
const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};
const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);
const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`w-full p-2 text-sm font-semibold transition-colors ${className} ${
        isActive ? "bg-[#004D40] text-white rounded-md shadow" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
};
const TabsContent = ({ children, value }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
};

// --- Main Login Component ---
const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 2. Initialize the hook

  // A simple alert-based toast function
  const toast = (options) => {
    window.alert(`${options.title}\n${options.description}`);
  };

  // State for form data remains the same
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      toast({
        title: t('loginPage.toastLoginSuccess'), // Use t function
        description: t('loginPage.toastLoginDesc'), // Use t function
      });
      navigate("/dashboard");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.name && signupData.email && signupData.password) {
      toast({
        title: t('loginPage.toastSignupSuccess'), // Use t function
        description: t('loginPage.toastSignupDesc'), // Use t function
      });
      navigate("/dashboard");
    }
  };

  // Color variables for styling (Unchanged)
  const textCream = "text-white";
  const iconGreen = "text-[#4CAF50]";
  const bgTeal = "bg-[#004D40]";
  const bgGreen = "bg-[#F5FFFA]";
  const hoverGreen = "hover:bg-[#45a049]";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT HALF: Branding */}
      <div
        className={`${bgTeal} flex-col items-center justify-center p-12 text-white hidden lg:flex`}
      >
        <Link to="/" className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className={`h-8 w-8 ${iconGreen}`} />
            <span className={`text-3xl font-bold ${textCream}`}>
              {t('loginPage.brandName')} {/* Use t function */}
            </span>
          </div>
          <p className={`${textCream} font-medium text-lg`}>
            {t('loginPage.brandTagline')} {/* Use t function */}
          </p>
        </Link>
      </div>

      {/* RIGHT HALF: Form */}
      <div
        className={`${bgGreen} flex items-center justify-center p-4 sm:p-6 lg:p-8`}
      >
        <div className="w-full max-w-md space-y-3">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">{t('loginPage.hello')}</h2>
            <p className="text-gray-500 mt-2">{t('loginPage.welcome')}</p>
          </div>

          <Card>
            <CardHeader>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-md">
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
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="login-password">{t('loginPage.password')}</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className={`w-full ${bgTeal} text-white ${hoverGreen}`}
                      >
                        {t('loginPage.loginBtn')}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form
                      onSubmit={handleSignup}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="col-span-2 space-y-1">
                        <Label htmlFor="signup-name">{t('loginPage.name')}</Label>
                        <Input
                          id="signup-name"
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="signup-email">{t('loginPage.email')}</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="signup-phone">{t('loginPage.phone')}</Label>
                        <Input
                          id="signup-phone"
                          type="tel"
                          value={signupData.phone}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <Label htmlFor="signup-location">{t('loginPage.location')}</Label>
                        <Input
                          id="signup-location"
                          value={signupData.location}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <Label htmlFor="signup-password">{t('loginPage.password')}</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Button
                          type="submit"
                          className={`w-full ${bgTeal} text-white ${hoverGreen}`}
                        >
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
      </div>
    </div>
  );
};

export default Login;

