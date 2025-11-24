import Image from 'next/image';

export default function MentorCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Photo */}
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image
            src="/images/pengfeisong.jpg"
            alt="Pengfei Song"
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-3xl font-bold mb-2">Pengfei Song (宋鹏飞)</h2>
          <p className="text-xl text-primary mb-4">Assistant Professor</p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Pengfei Song is currently an Assistant Professor in the Department of Mechatronics and Robotics
            at Xi&apos;an Jiaotong-Liverpool University (XJTLU). He received his B.Eng. in Mechanical Engineering
            from Jilin University, China, in 2013, and his Ph.D. from McGill University, Canada, in 2018.
            Pengfei has extensive research experience, having visited Tsinghua University and the University
            of Toronto.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Research Focus</h3>
              <p className="text-gray-700 mb-2">His primary research focuses on microsystems, including:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Microfluidic biosensors and platforms</li>
                <li>Automation and robotics at micro/nanoscale</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Publications & Awards</h3>
              <p className="text-gray-700 mb-2">
                Pengfei has published 22 SCI journal papers in prestigious journals such as{' '}
                <em>Biosensors and Bioelectronics</em> and <em>Microsystems &amp; Nanoengineering</em>. 
                His contributions have been recognized through multiple awards, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Best Paper Award in Microfluidics Symposium at ASME 2014</li>
                <li>Finalist for Best Automation Paper at IEEE ICRA 2015</li>
                <li>Editor&apos;s Pick Article Award from AIP&apos;s Biomicrofluidics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Join Our Team</h3>
              <p className="text-gray-700">
                Pengfei is actively recruiting students and researchers interested in microfluidics,
                biosensors, and automation technologies. The group has a strong record of mentoring
                undergraduates who have gone on to prestigious universities such as Berkeley, Columbia, and UPenn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

