"use client";
import { motion } from "framer-motion";

export default function ChokenBackground() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-gradient-to-br from-[#0a1833] via-[#232b36] to-[#181a1f]"
    >
      {/* Modern, abstract, animated blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-900 via-gray-800 to-black opacity-40 blur-3xl"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-gray-700 via-blue-800 to-black opacity-30 blur-2xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-blue-800 via-gray-900 to-gray-700 opacity-20 blur-2xl"
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -10, 15, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* 3 dev Choken yazısı, farklı hizalarda ve animasyonlarla */}
      {/* 5 satır, her satırda 3 Choken yazısı, farklı animasyonlarla */}
      {/* 5 satır, her satırda 3 Choken yazısı, satırlar arası dikey boşluk ile */}
      {[0, 1, 2, 3, 4].map((rowIdx) => {
        // Her satır için farklı animasyon ve opacity
        const direction = rowIdx % 2 === 0 ? 1 : -1;
        const duration = 28 + rowIdx * 2;
        const opacity = rowIdx % 2 === 0 ? "opacity-10" : "opacity-12";
        const size = rowIdx % 2 === 0 ? "text-[8vw] md:text-[6vw]" : "text-[7vw] md:text-[5vw]";
        // Satırın üstten uzaklığı (her satır için artan, aralık artırıldı)
        const top = 6 + rowIdx * 19; // 6%, 25%, 44%, 63%, 82%
        // Sonsuz döngü için iki set yazı yan yana, biri ekranı terk ederken diğeri giriyor
        return (
          <motion.div
            key={rowIdx}
            className={`absolute left-0 w-full flex items-center z-10 select-none pointer-events-none overflow-x-hidden`}
            style={{ top: `${top}%`, height: '14vh' }}
          >
            <motion.div
              className="flex w-max"
              animate={direction === 1
                ? { x: ["0%", "-100%"] }
                : { x: ["-100%", "0%"] }
              }
              transition={{ duration, repeat: Infinity, ease: "linear", delay: rowIdx * 2 }}
              style={{ minWidth: '200vw' }}
            >
              {/* 2 set yan yana, sonsuz döngü için */}
              {[0, 1].map((repeatIdx) => (
                <div className="flex justify-between px-[10vw]" key={repeatIdx} style={{ minWidth: '100vw' }}>
                  {[0, 1, 2].map((colIdx) => (
                    <span
                      key={colIdx}
                      className={`${size} font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-300 to-gray-600 ${opacity} whitespace-nowrap drop-shadow-lg`}
                      style={{ marginLeft: colIdx === 0 ? 0 : '5vw', marginRight: colIdx === 2 ? 0 : '5vw' }}
                    >
                      Choken
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
