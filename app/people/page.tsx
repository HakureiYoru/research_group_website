import { Metadata } from 'next';
import MentorCard from '@/components/people/mentor-card';
import StudentGrid from '@/components/people/student-grid';

export const metadata: Metadata = {
  title: '团队成员',
  description: '西浦微系统课题组团队成员介绍',
};

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          团队成员
        </h1>

        {/* Mentor Section */}
        <section className="mb-16">
          <MentorCard />
        </section>

        {/* Students Section */}
        <section>
          <StudentGrid />
        </section>
      </div>
    </div>
  );
}


