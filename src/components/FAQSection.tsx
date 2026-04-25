import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  { q: "Is GayatriAI accurate for Vedic astrology predictions?", a: "GayatriAI uses NASA-grade Swiss Ephemeris for calculations and is trained on classical Vedic texts (Brihat Parashara Hora Shastra, Phaladeepika, Saravali) validated by certified Jyotish acharyas. Calculations are 100% accurate; predictions are reflective tendencies, not deterministic future." },
  { q: "Is my personal data and birth chart information safe?", a: "Absolutely. All data is protected with bank-grade SSL encryption in transit and at rest. We never sell, rent, or share your birth details, kundali, or chat history with any third party. You can request deletion anytime." },
  { q: "Is GayatriAI completely free to use?", a: "Yes — core features including kundali generation, daily insights, basic chart analysis, and 20 AI chats per month are 100% free forever. Premium plans (₹299/mo and ₹899/mo) unlock unlimited chats, detailed reports, and human consultations." },
  { q: "How is GayatriAI different from a real human astrologer?", a: "GayatriAI delivers instant, 24/7, judgment-free guidance — no appointments, no waiting, no expensive consultations. For complex life decisions, we recommend pairing AI insights with a human acharya. Our AI is reviewed by certified Jyotish experts." },
  { q: "Can I ask questions in Hindi or Hinglish?", a: "Haan bilkul! GayatriAI Hindi, English, aur Hinglish — teeno mein fluently kaam karta hai. Aap apne sawaal jis bhi bhasha mein comfortable ho, puch sakte hain." },
  { q: "What information do I need to provide for an accurate reading?", a: "Date of birth, exact time of birth (preferably to the minute), and place of birth (city). These three details let GayatriAI calculate your precise Lagna, planetary positions, and dashas." },
  { q: "Does GayatriAI use Vedic or Western astrology?", a: "GayatriAI uses Vedic (Indian) astrology — Jyotish Shastra. It uses the sidereal zodiac with Lahiri Ayanamsa, 27 nakshatras, and the Vimshottari Dasha system. The same standard followed by India's official astronomical calendar." },
  { q: "Can GayatriAI predict marriage, career, or financial timing?", a: "Yes. GayatriAI analyzes your 7th house & Venus for marriage timing, 10th house & Saturn for career trajectory, and 2nd & 11th houses for finances. You'll get specific time windows based on dasha and transits." },
  { q: "Is GayatriAI suitable for kundali milan (matchmaking)?", a: "Yes — premium users get full Ashtakoot Guna Milan compatibility scores (out of 36), Mangal Dosha checks, and detailed compatibility analysis between two charts." },
  { q: "How is GayatriAI's AI trained — is it just a generic chatbot?", a: "No. GayatriAI is fine-tuned exclusively on classical Vedic texts and validated case studies from practicing Jyotish acharyas. It is NOT a general-purpose chatbot — every response is grounded in shastra-based logic." },
  { q: "Mahadasha aur Antardasha kya hoti hai?", a: "Mahadasha aapki life ka 6-20 saal ka major period hai (e.g., Saturn Mahadasha = 19 years). Antardasha us bade period ke andar ka sub-period hai (months to years). Vimshottari Dasha system ke 120-year cycle se yeh calculate hote hain." },
  { q: "Mangal Dosha kya hota hai aur main isse kaise check karu?", a: "Mangal Dosha tab hota hai jab Mars 1st, 4th, 7th, 8th, ya 12th house mein ho — yeh marriage par effect daal sakta hai. GayatriAI free check karta hai aur applicable remedies suggest karta hai jaise Mangal mantra, Hanuman puja, ya specific donations." },
  { q: "Birth time exact pata nahi — phir bhi reading ho sakti hai?", a: "Haan, approximate time se bhi general reading ho jati hai. Lekin Lagna aur exact dasha ke liye birth time precise hona chahiye. AI birth time rectification techniques se approximate time se chart adjust kar sakta hai." },
  { q: "Kundali Milan ke liye dono partners ki birth details chahiye?", a: "Haan, dono ki complete birth details (date, exact time, place) chahiye. GayatriAI Ashtakoot Guna Milan (36 points), Mangal Dosha matching, Bhakoot, Nadi, aur emotional compatibility — sab analyze karta hai." },
  { q: "Sade Sati kya hoti hai aur main kab pad rahi hu?", a: "Sade Sati Saturn ka 7.5 saal ka transit hai aapki Moon sign ke around. GayatriAI aapki current transit position dekh ke batata hai ki aap Sade Sati mein hain ya nahi, kis phase mein hain, aur effects ko reduce karne ke remedies kya hain." },
  { q: "Daily horoscope se yeh kaise alag hai?", a: "Generic daily horoscope sirf aapki Sun sign ke base par hota hai — woh sab logon ke liye same hota hai. GayatriAI aapki personal kundali, current dasha, aur transit ke base par personalized prediction deta hai — jo sirf aapke liye hai." },
  { q: "Kya GayatriAI gemstones aur remedies suggest karta hai?", a: "Haan, lekin only after deep analysis. Hum unverified random gemstones nahi suggest karte. AI specifically dekhta hai aapki kundali mein kis grah ko strengthen ya pacify karna hai, phir Vedic granth-based authentic remedies (mantras, donations, fasts, gemstones) suggest karta hai." },
  { q: "Career change ke liye GayatriAI kaise help karta hai?", a: "AI aapka 10th house (career), uska lord, current Mahadasha-Antardasha, aur Saturn-Jupiter transits analyze karta hai. Ye batata hai aapke favorable time windows, suitable career fields based on planetary strengths, aur risk vs reward calculation." },
  { q: "Kya AI shaadi ka exact time bata sakta hai?", a: "Exact date predict karna possible nahi hai — koi astrologer nahi kar sakta. Lekin AI specific year-windows aur favorable months identify kar sakta hai based on 7th lord dasha, Venus transits, aur Jupiter ke aspects on 7th house." },
  { q: "Mera birth chart North Indian style mein hai ya South Indian?", a: "Aap dono dekh sakte hain. GayatriAI dono styles support karta hai — North Indian (diamond shape) aur South Indian (square fixed-house). Calculations same hain, sirf visual representation alag hai." },
  { q: "Lagna aur Rashi mein kya farak hai?", a: "Lagna (ascendant) — birth ke samay east horizon par jo rashi udh rahi thi. Rashi (Moon sign) — birth ke samay Moon jis rashi mein tha. Lagna personality aur outer self batati hai, Rashi mind aur emotional nature." },
  { q: "AI Astrology illegal ya unethical to nahi hai?", a: "Bilkul nahi. AI Astrology bas traditional Jyotish ko technology se accessible bana raha hai. Hum decisions impose nahi karte — guidance dete hain. Final choice hamesha user ke haath mein hai." },
  { q: "Refund policy kya hai premium plans ke liye?", a: "Premium plans pe 7-day no-questions-asked refund milta hai. Aap free plan se start karke try kar sakte hain — comfortable ho tabhi upgrade karein." },
  { q: "Kitni baar ek din mein puch sakte hain?", a: "Free plan: 20 questions per month. Sadhak (₹299): 500 per month. Guru (₹899): unlimited. Har AI response detailed hota hai — based on full chart analysis, na ki short generic answers." },
  { q: "Mobile app available hai?", a: "Filhal GayatriAI ek fully-responsive web app hai jo mobile, tablet, aur desktop teeno pe perfectly chalta hai. Native Android & iOS apps soon launch ho rahe hain." },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Frequently Asked <span className="text-gradient-saffron">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">25+ questions answered about GayatriAI, Vedic astrology, accuracy, dasha, kundali milan, remedies & data privacy.</p>
        </div>
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card hover:border-saffron/30 transition-colors">
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
