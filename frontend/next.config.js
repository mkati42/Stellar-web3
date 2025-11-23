const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Diğer ayarlarınız burada olabilir
};

if (process.env.NODE_ENV !== 'production') {
  nextConfig.server = {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'cert/localhost.key')),
      cert: fs.readFileSync(path.join(__dirname, 'cert/localhost.crt')),
    },
  };
}

module.exports = nextConfig;
