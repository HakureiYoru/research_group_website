export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t-4 border-blue-500">
      <div className="w-full max-w-[1600px] mx-auto py-8 md:py-10 px-4 md:px-8 lg:px-12">
        <div className="text-center space-y-3">
          {/* 版权信息 */}
          <p className="text-base md:text-lg font-medium text-white opacity-95">
            &copy; {new Date().getFullYear()} 西浦微系统课题组
          </p>

          {/* 联系方式 */}
          <div className="flex items-center justify-center gap-2 text-sm md:text-base">
            <span className="text-white opacity-90">联系方式测试action：</span>
            <a
              href="mailto:Pengfei.Song@xjtlu.edu.cn"
              className="text-white font-medium hover:text-blue-300 transition-colors duration-300 "
            >
              Pengfei.Song@xjtlu.edu.cn
            </a>
          </div>

          {/* 底部装饰 */}
          <div className="pt-4">
            <p className="text-xs md:text-sm text-white opacity-70">
              Xi&apos;an Jiaotong-Liverpool University
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
