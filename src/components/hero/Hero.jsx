import HeroLeft from './HeroLeft'
import HeroCenter from './HeroCenter'
import HeroRight from './HeroRight'

export default function Hero({ perf }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-5 md:px-12 laptop:pl-36 gap-8"
    >
      {/* Top row: text (left 55%) + avatar (right 45%) — avatar gets enough room */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 laptop:grid-cols-[55fr_45fr] gap-6 items-end">
        <div className="order-2 laptop:order-1 self-center"><HeroLeft /></div>
        <div className="order-1 laptop:order-2"><HeroCenter perf={perf} /></div>
      </div>

      {/* Bottom row: info dashboard cards */}
      <div className="max-w-7xl mx-auto w-full">
        <HeroRight />
      </div>
    </section>
  )
}
