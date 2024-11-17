import React from 'react';

const teamMembers = [
    {
      name: 'Mehul Pardeshi',
      avatar_url: '/assets/mehul.jpeg', 
      role: 'ML Lead & Visionary',
      skills: ['Machine Learning', 'Python', 'Project Management'],
    },
    {
      name: 'Divyesh Mali',
      avatar_url: '/assets/dd.jpeg', 
      role: 'React Expert & Large Scale Development',
      skills: ['React', 'JavaScript', 'Scalability'],
    },
    {
      name: 'Siddhesh Rajale',
      avatar_url: '/assets/sid.jpeg', 
      role: 'System Design & Architecture',
      skills: ['React', 'TypeScript', 'System Design'],
    },
  ];
  

export function Team() {
  return (
    <main className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Our Team
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          A diverse group of experts in AI, machine learning, and community management.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col items-center mb-6">
              <img
                src={member.avatar_url}
                alt={`${member.name}'s avatar`}
                className="w-24 h-24 rounded-full border-2 border-purple-500 mb-4 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                }}
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400">{member.role}</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-white mb-2">Skills</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {member.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
