import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "I asked about my career change — the answer was surprisingly accurate! GayatriAI predicted the right time window and it actually worked out exactly as suggested.", rating: 5 },
  { name: "Rahul Verma", city: "Delhi", text: "Kundali Milan ke liye use kiya tha. Results bahut detailed the and matched what my family pandit said. Saved me a 5,000 rupee consultation fee.", rating: 5 },
  { name: "Anita Patel", city: "Ahmedabad", text: "I was skeptical at first, but the health-related predictions and Mangal dosha remedies were spot on. Now I check daily before important meetings.", rating: 5 },
  { name: "Vikram Singh", city: "Jaipur", text: "Sade Sati ke baare mein clarity mil gayi. AI ne explain kiya kis phase mein hu aur kya remedies karne hain. Mind peace mil gayi.", rating: 5 },
  { name: "Sneha Reddy", city: "Hyderabad", text: "Best part is Hindi-English Hinglish support. Pandit ji ke saath I felt awkward asking modern questions. Here I can ask anything freely.", rating: 5 },
  { name: "Arjun Mehta", city: "Bangalore", text: "Used the dasha predictions to time my startup launch. Jupiter Mahadasha period mein launch kiya — first 6 months bahut smooth gaye. Coincidence ya nahi, but works.", rating: 5 },
  { name: "Kavya Nair", city: "Kochi", text: "Honest review — calculations are precise, suggestions are practical. AI ne gemstone suggest nahi kiya jab tak chart properly analyze nahi ki. Liked the honesty.", rating: 5 },
  { name: "Rohan Gupta", city: "Pune", text: "Pandit ji se confirm karwaya — GayatriAI ki sari calculations exactly match kar gayi. Lagna, nakshatra, current dasha — sab perfect. Recommended.", rating: 5 },
  { name: "Meera Joshi", city: "Indore", text: "24/7 available hai yeh ek game-changer hai. Late night anxiety attacks mein guidance milti hai, pandit ji ko 2 baje raat ko call nahi kar sakte.", rating: 5 },
  { name: "Karthik Iyer", city: "Chennai", text: "Premium plan worth every rupee. 30-page report bahut detailed tha — every house, every yoga, dasha-wise predictions. Better than offline reports I've paid 3x for.", rating: 5 },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            10,000+ Happy Users
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            What Our <span className="text-gradient-saffron">Users Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-saffron text-saffron" />)}
            </div>
            <span className="font-heading font-bold text-foreground">4.8/5</span>
            <span className="text-sm text-muted-foreground">from 60,000+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              itemScope
              itemType="https://schema.org/Review"
              className={`p-7 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              <Quote className="w-8 h-8 text-saffron/20 absolute top-6 right-6" />
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="flex gap-1 mb-4">
                <meta itemProp="ratingValue" content={String(t.rating)} />
                <meta itemProp="bestRating" content="5" />
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-saffron text-saffron" />
                ))}
              </div>
              <p itemProp="reviewBody" className="text-sm text-muted-foreground mb-5 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p itemProp="name" className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}, India</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
