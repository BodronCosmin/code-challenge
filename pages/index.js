import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'
import { Button } from '@/components/ui/button'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔍</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="lg">
            Outline Large
          </Button>
          <Button variant="destructive" size="sm">
            Small Destructive
          </Button>
          <Button variant="secondary" size="lg">
            Large Secondary
          </Button>
          <Button variant="ghost" size="default">
            Default Ghost
          </Button>
        </div>
      </section>
    </main>
  )
}
