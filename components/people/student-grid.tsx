'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Student {
  name: string;
  photo: string;
  research: string;
}

const students: Student[] = [
  {
    name: 'Student A',
    photo: '/images/default-avatar.svg',
    research: 'Microfluidic Systems',
  },
  {
    name: 'Student B',
    photo: '/images/default-avatar.svg',
    research: 'Biosensors',
  },
  {
    name: 'Student C',
    photo: '/images/default-avatar.svg',
    research: 'Synthetic Biology',
  },
  {
    name: 'Student D',
    photo: '/images/default-avatar.svg',
    research: 'Machine Learning in Biological Data',
  },
];

export default function StudentGrid() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">学生团队</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {students.map((student, index) => (
          <Link
            key={index}
            href={`/publications?author=${encodeURIComponent(student.name)}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-200">
              <Image
                src={student.photo}
                alt={student.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default-avatar.svg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">{student.name}</h3>
              <p className="text-gray-600">研究方向：{student.research}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

