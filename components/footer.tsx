export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container-custom mx-auto py-6">
        <div className="text-center">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} 西浦微系统课题组 | 联系我们：
            <a
              href="mailto:Pengfei.Song@xjtlu.edu.cn"
              className="text-blue-300 hover:text-blue-200 ml-1"
            >
              Pengfei.Song@xjtlu.edu.cn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

