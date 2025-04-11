import Hero from "@/components/Hero"
import EventList from "@/components/EventList"
import SignUpButton from "@/components/SignUpButton"
import Testimonials from "@/components/Testimonials"
import Services from "@/components/Services"

export default function Home() {
  return (
    <main>
      <Hero />
      <EventList />
      <Services />
      <Testimonials />
      <SignUpButton />
    </main>
  )
}
