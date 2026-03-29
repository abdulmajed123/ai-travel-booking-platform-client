// ১. টোকেন সেভ করা (Login সফল হলে ব্যবহার করবেন)
export const setTokens = (accessToken: string, refreshToken?: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }
};

// Navbar.tsx এর এরর ফিক্স করতে এই Alias টি দরকার
export const setAuth = setTokens;

// ২. টোকেন রিমুভ করা (Logout করার সময় ব্যবহার করবেন)
export const removeTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // আপনি যদি অন্য কোনো লোকাল স্টোরেজ ডেটা মুছতে চান এখানে যোগ করতে পারেন
  }
};

// AuthButton.tsx এর এরর ফিক্স করতে এই Alias টি দরকার
export const removeAuth = removeTokens;

// ৩. টোকেন গেট করা (API Header এ পাঠানোর জন্য)
export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

// ৪. রিফ্রেশ টোকেন গেট করা (Token Refresh করার জন্য)
export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

// ৫. ইউজার লগইন আছে কি না তা চেক করা (Boolean)
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token; // টোকেন থাকলে true, না থাকলে false রিটার্ন করবে
};

// ৬. লগআউট করে রিডাইরেক্ট করা (অতিরিক্ত সুবিধা)
export const logoutAndRedirect = () => {
  removeTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
