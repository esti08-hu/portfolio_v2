import React from 'react';
import { Code2, Brain, Rocket, Users } from 'lucide-react';
import { Card } from '../ui/Card';

const values = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code that stands the test of time.'
  },
  {
    icon: Brain,
    title: 'Continuous Learning',
    description: 'Always exploring new technologies and methodologies to stay at the forefront of development.'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Building solutions that push boundaries and create meaningful impact for users.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working effectively with teams and stakeholders to deliver exceptional results.'
  }
];

// Updated skills based on resume and verified information
const skills = {
  'Languages': ['TypeScript', 'JavaScript', 'Python', 'Go'],
  'Frameworks & Libraries': ['NestJS', 'Next.js', 'Express.js', 'React.js', 'Drizzle ORM'],
  'Databases & ORMs': ['PostgreSQL', 'MongoDB', 'Prisma'],
  'DevOps & Tools': ['Docker', 'Git', 'GitHub', 'Nginx', 'Swagger', 'CI/CD']
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            A passionate full-stack developer with a love for crafting intelligent solutions that make a difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story - Updated to be more specific and truthful */}
          <div className="space-y-6">
            <Card variant="glass" className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  I am a Full-Stack Software Engineer with a <b>B.Sc. in Software Engineering from Adama Science and Technology University</b>. A graduate of the rigorous <b>ALX Software Engineering program</b> and a participant in the <b>A2SV program</b>, I have a strong foundation in both systems programming and modern web technologies. My journey is focused on applying my skills to solve complex problems and contribute to innovative projects.
                </p>
                <p>
                  Through projects like <b>Nutri-Focus</b> and my internship at <b>1888 EC</b>, I've gained hands-on experience in building scalable and secure backend systems with NestJS and PostgreSQL. I am a detail-oriented professional, highly capable of working independently and committed to delivering robust, well-structured, and fully responsive applications.
                </p>
                <p>
                  When I'm not coding, you can find me solving algorithmic challenges or exploring new technologies. I am dedicated to continuous learning and sharing my knowledge with the developer community, always excited to take on the next big challenge.
                </p>
              </div>
            </Card>

            {/* Core Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card key={index} variant="glass" padding="sm" className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                    <value.icon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                    <p className="text-sm text-neutral-400">{value.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills & Technologies - Updated to match resume */}
          <div className="space-y-6">
            <Card variant="glass">
              <h3 className="text-2xl font-semibold text-white mb-6">Skills & Technologies</h3>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, techs]) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium text-blue-400 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-neutral-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats - Updated for accuracy */}
            <div className="grid grid-cols-3 gap-4">
              <Card variant="glass" padding="sm" className="text-center">
                <div className="text-2xl font-bold gradient-text">2+</div>
                <div className="text-sm text-neutral-400">Years Experience</div>
              </Card>
              <Card variant="glass" padding="sm" className="text-center">
                <div className="text-2xl font-bold gradient-text">500+</div>
                <div className="text-sm text-neutral-400">Algorithmic Challenges</div>
              </Card>
              <Card variant="glass" padding="sm" className="text-center">
                <div className="text-2xl font-bold gradient-text">4+</div>
                <div className="text-sm text-neutral-400">Projects Built</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
