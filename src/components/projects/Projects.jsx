import SectionTitle from '../common/SectionTitle'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'

export default function Projects({ perf }) {
  return (
    <section id="projects" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="04" title="PROJECTS UNIVERSE" />
        <div className="grid sm:grid-cols-2 laptop:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} perf={perf} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
