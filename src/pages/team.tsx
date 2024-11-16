import React from 'react';

const teamMembers = [
  {
    name: 'Mehul Pardeshi',
    avatar_url: '/assets/mehul.jpg',
    role: 'ML Lead & Visionary',
    skills: ['Machine Learning', 'Python', 'Project Management'],
  },
  {
    name: 'Divyesh Mali',
    avatar_url: '/assets/divyesh.jpg',
    role: 'React Expert & Large Scale Development',
    skills: ['React', 'JavaScript', 'Scalability'],
  },
  {
    name: 'Siddhesh Rajale',
    avatar_url: '/assets/siddhesh.jpg',
    role: 'Frontend Developer & System Designer',
    skills: ['HTML', 'CSS', 'System Design'],
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
      <div className="grid md:grid-cols-2 gap-8 mt-20">
        {teamMembers.map((member) => (
          <div 
            key={member.name}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={member.avatar_url} 
                alt={`${member.name}'s avatar`}
                className="w-16 h-16 rounded-full bg-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                }}
              />
              <div>
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-white mb-2">Skills</h4>
              <ul className="list-disc list-inside text-gray-400">
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