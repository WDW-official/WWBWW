import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { businessPhoneDisplay } from '@/lib/business'

const contactItems = [
  ['Email', 'hello@woodworksbywale.com', Mail],
  ['Phone', businessPhoneDisplay, Phone],
  ['Studio', 'Lagos, Nigeria', MapPin],
]

export default function Contact() {
  return (
    <main>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-champagne">
              Contact us
            </div>
            <h1 className="editorial mt-3 text-5xl leading-none md:text-6xl">
              LET'S MAKE SOMETHING WORTH KEEPING.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">
              Ask about a product, request a custom piece, or share the first
              rough idea for a commission. We will help shape the details from
              there.
            </p>
            <div className="mt-8 grid gap-3">
              {contactItems.map(([label, value, Icon]) => (
                <div
                  key={label as string}
                  className="flex items-center gap-4 rounded-lg border border-black/10 bg-white p-4"
                >
                  <Icon className="text-champagne" size={19} />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-black/45">
                      {label as string}
                    </div>
                    <div className="mt-1 text-sm">{value as string}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
