const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // 匹配所有路径
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**", // 匹配所有路径
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl", // 添加这一行
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
