"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink, Award, Users, Code, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      type: "Full-time",
      description:
        "Leading development of enterprise web applications and mentoring junior developers. Architected and implemented scalable microservices using Node.js and React.",
      achievements: [
        "Increased application performance by 40% through optimization",
        "Led a team of 5 developers on multiple projects",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored 3 junior developers who were promoted within 6 months",
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
      current: true,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      period: "2020 - 2022",
      type: "Full-time",
      description:
        "Developed and maintained multiple client projects from conception to deployment. Worked closely with design and product teams to deliver high-quality solutions.",
      achievements: [
        "Built 15+ web applications from scratch",
        "Reduced client onboarding time by 50% with automated workflows",
        "Implemented real-time features using WebSocket technology",
        "Achieved 99.9% uptime across all deployed applications",
      ],
      technologies: ["Vue.js", "Express", "MongoDB", "Firebase", "Tailwind CSS"],
      current: false,
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "New York, NY",
      period: "2019 - 2020",
      type: "Full-time",
      description:
        "Specialized in creating responsive and interactive user interfaces for various client projects. Collaborated with UX designers to implement pixel-perfect designs.",
      achievements: [
        "Delivered 20+ responsive websites with 100% client satisfaction",
        "Improved website loading speed by 35% on average",
        "Established component library used across 10+ projects",
        "Trained team on modern React development practices",
      ],
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Figma"],
      current: false,
    },
    {
      id: 4,
      title: "Junior Web Developer",
      company: "WebDev Studio",
      location: "Austin, TX",
      period: "2018 - 2019",
      type: "Full-time",
      description:
        "Started my professional journey building websites and learning modern web development practices. Gained experience in both frontend and backend technologies.",
      achievements: [
        "Completed 30+ small to medium-sized projects",
        "Learned and implemented responsive design principles",
        "Contributed to open-source projects",
        "Received 'Rising Star' award for exceptional growth",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress"],
      current: false,
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      period: "2014 - 2018",
      description: "Focused on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.",
      achievements: ["GPA: 3.8/4.0", "Dean's List: 6 semesters", "Computer Science Honor Society"],
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      school: "General Assembly",
      period: "2018",
      description: "Intensive 12-week program covering modern web development technologies and best practices.",
      achievements: ["Top 10% of cohort", "Built 5 full-stack applications", "Received job placement assistance"],
    },
  ]

  const stats = [
    { icon: Code, label: "Projects Completed", value: "50+", color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Team Members Led", value: "15+", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Years Experience", value: "5+", color: "from-purple-500 to-violet-500" },
    { icon: TrendingUp, label: "Client Satisfaction", value: "99%", color: "from-orange-500 to-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Experience & Journey</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My professional journey in software development, from junior developer to senior engineer, with a focus on
            continuous learning and growth.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{exp.title}</CardTitle>
                          {exp.current && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">{exp.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Education & Training</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-medium">{edu.school}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{edu.description}</p>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Highlights:</h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
