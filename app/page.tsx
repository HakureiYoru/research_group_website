import Link from 'next/link';
import Carousel from '@/components/ui/carousel';

export default function Home() {
  const carouselSlides = [
    {
      id: 'about',
      image: '/images/hero-image1.png',
      title: '关于我们',
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            西浦微系统课题组由宋鹏飞教授领导，致力于微纳米技术、生物传感器、微流控平台和自动化控制技术的前沿研究。
            我们的团队专注于将微尺度技术应用于生物医学、环境监测和智能制造等领域，通过跨学科的研究探索新型解决方案。
          </p>
          <p>
            课题组的核心研究方向包括：<strong>微流控平台</strong>、<strong>生物传感器设计</strong>、
            <strong>自动化微纳米机器人</strong>、以及<em>基于智能手机的便携式检测系统</em>。
          </p>
          <p>
            我们利用先进的材料科学和自动化技术，开发出高灵敏度的生物检测系统，能够快速、精确地检测疾病生物标志物、
            环境污染物和食品安全问题。
          </p>
        </div>
      ),
    },
    {
      id: 'research',
      image: '/images/hero-image3.png',
      title: '我们的研究方向',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white">微流控平台与自动化检测</h3>
            <p>
              我们专注于开发高效的微流控平台，结合智能手机等便携设备，实现离线自动化检测。
              这些技术已广泛应用于疾病生物标志物检测、环境监测等领域。
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white">生化传感与智能材料</h3>
            <p>
              课题组致力于设计新型生物传感器，基于纳米材料如石墨烯、碳纳米管和金属有机框架（MOF），
              这些传感器具备极高的灵敏度，能够在恶劣环境中准确检测疾病标志物。
            </p>
          </div>
          <Link
            href="/publications"
            className="inline-block mt-4 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
          >
            了解更多研究
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Carousel slides={carouselSlides} autoPlay interval={6000} />
      
      {/* Additional Sections Can Be Added Here */}
      <section className="container-custom mx-auto py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">快速导航</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/publications"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">学术成果</h3>
              <p className="text-gray-600">浏览我们的研究论文和发表</p>
            </Link>
            <Link
              href="/people"
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">团队成员</h3>
              <p className="text-gray-600">了解我们的导师和学生团队</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


